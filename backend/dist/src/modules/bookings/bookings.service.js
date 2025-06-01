"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const restaurants_service_1 = require("../restaurants/restaurants.service");
const client_1 = require("@prisma/client");
let BookingsService = class BookingsService {
    constructor(prisma, restaurantsService) {
        this.prisma = prisma;
        this.restaurantsService = restaurantsService;
    }
    async create(userId, createBookingDto) {
        const { restaurantId, date, time, guestsCount, tableId, specialRequests } = createBookingDto;
        await this.restaurantsService.findOne(restaurantId);
        const timeSlots = await this.restaurantsService.getAvailableTimeSlots(restaurantId, {
            date,
            guestsCount,
        });
        const selectedSlot = timeSlots.find((slot) => slot.time === time);
        if (!selectedSlot || !selectedSlot.available) {
            throw new common_1.BadRequestException('Выбранное время недоступно');
        }
        if (tableId) {
            const table = await this.prisma.table.findUnique({
                where: { id: tableId },
            });
            if (!table || table.restaurantId !== restaurantId) {
                throw new common_1.BadRequestException('Столик не найден');
            }
            if (table.capacity < guestsCount) {
                throw new common_1.BadRequestException('Столик слишком маленький для указанного количества гостей');
            }
            const existingBooking = await this.prisma.booking.findFirst({
                where: {
                    tableId,
                    date: new Date(date),
                    time,
                    status: { in: [client_1.BookingStatus.CONFIRMED, client_1.BookingStatus.PENDING] },
                },
            });
            if (existingBooking) {
                throw new common_1.BadRequestException('Столик уже забронирован на это время');
            }
        }
        const confirmationCode = this.generateConfirmationCode();
        const booking = await this.prisma.booking.create({
            data: {
                userId,
                restaurantId,
                tableId,
                date: new Date(date),
                time,
                guestsCount,
                specialRequests,
                confirmationCode,
                status: client_1.BookingStatus.PENDING,
            },
            include: {
                restaurant: {
                    include: {
                        address: true,
                        images: true,
                    },
                },
                table: true,
            },
        });
        const confirmedBooking = await this.update(booking.id, userId, {
            status: client_1.BookingStatus.CONFIRMED,
        });
        return confirmedBooking;
    }
    async findAll(userId, query) {
        const { page = 1, limit = 20, status } = query;
        const where = {
            userId,
            ...(status && { status }),
        };
        const [total, bookings] = await Promise.all([
            this.prisma.booking.count({ where }),
            this.prisma.booking.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    restaurant: {
                        include: {
                            address: true,
                            images: {
                                where: { isPrimary: true },
                                take: 1,
                            },
                        },
                    },
                    table: true,
                },
            }),
        ]);
        return {
            data: bookings,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOne(id, userId) {
        const booking = await this.prisma.booking.findUnique({
            where: { id },
            include: {
                restaurant: {
                    include: {
                        address: true,
                        contact: true,
                        images: true,
                    },
                },
                table: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Бронирование не найдено');
        }
        if (booking.userId !== userId) {
            throw new common_1.ForbiddenException('Нет доступа к этому бронированию');
        }
        return booking;
    }
    async update(id, userId, updateBookingDto) {
        const booking = await this.findOne(id, userId);
        if (updateBookingDto.status) {
            this.validateStatusTransition(booking.status, updateBookingDto.status);
        }
        return this.prisma.booking.update({
            where: { id },
            data: updateBookingDto,
            include: {
                restaurant: {
                    include: {
                        address: true,
                        images: true,
                    },
                },
                table: true,
            },
        });
    }
    async cancel(id, userId) {
        const booking = await this.findOne(id, userId);
        if (booking.status !== client_1.BookingStatus.CONFIRMED &&
            booking.status !== client_1.BookingStatus.PENDING) {
            throw new common_1.BadRequestException('Невозможно отменить это бронирование');
        }
        const bookingDateTime = new Date(booking.date);
        const [hours, minutes] = booking.time.split(':');
        bookingDateTime.setHours(parseInt(hours), parseInt(minutes));
        const now = new Date();
        const timeDiff = bookingDateTime.getTime() - now.getTime();
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        if (hoursDiff < 2) {
            throw new common_1.BadRequestException('Бронирование можно отменить не позднее чем за 2 часа до визита');
        }
        return this.update(id, userId, { status: client_1.BookingStatus.CANCELLED });
    }
    async getUpcomingBookings(userId) {
        const now = new Date();
        return this.prisma.booking.findMany({
            where: {
                userId,
                status: client_1.BookingStatus.CONFIRMED,
                OR: [
                    { date: { gt: now } },
                    {
                        date: now,
                        time: { gt: now.toTimeString().slice(0, 5) },
                    },
                ],
            },
            orderBy: [{ date: 'asc' }, { time: 'asc' }],
            include: {
                restaurant: {
                    include: {
                        address: true,
                        images: {
                            where: { isPrimary: true },
                            take: 1,
                        },
                    },
                },
            },
            take: 5,
        });
    }
    generateConfirmationCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return code;
    }
    validateStatusTransition(currentStatus, newStatus) {
        const validTransitions = {
            [client_1.BookingStatus.PENDING]: [
                client_1.BookingStatus.CONFIRMED,
                client_1.BookingStatus.CANCELLED,
            ],
            [client_1.BookingStatus.CONFIRMED]: [
                client_1.BookingStatus.CANCELLED,
                client_1.BookingStatus.COMPLETED,
            ],
            [client_1.BookingStatus.CANCELLED]: [],
            [client_1.BookingStatus.COMPLETED]: [],
            [client_1.BookingStatus.NO_SHOW]: [],
        };
        if (!validTransitions[currentStatus].includes(newStatus)) {
            throw new common_1.BadRequestException(`Невозможно изменить статус с ${currentStatus} на ${newStatus}`);
        }
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        restaurants_service_1.RestaurantsService])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map