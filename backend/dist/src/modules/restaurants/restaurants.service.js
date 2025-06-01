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
exports.RestaurantsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let RestaurantsService = class RestaurantsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createRestaurantDto) {
        const { address, contact, images, workingHours, ...restaurantData } = createRestaurantDto;
        return this.prisma.restaurant.create({
            data: {
                ...restaurantData,
                slug: this.generateSlug(restaurantData.name),
                address: address ? { create: address } : undefined,
                contact: contact ? { create: contact } : undefined,
                images: images
                    ? {
                        create: images.map((img, index) => ({
                            ...img,
                            order: index,
                        })),
                    }
                    : undefined,
                workingHours: workingHours
                    ? {
                        create: workingHours,
                    }
                    : undefined,
            },
            include: {
                address: true,
                contact: true,
                images: true,
                workingHours: true,
            },
        });
    }
    async findAll(query) {
        const { page = 1, limit = 20, search, cuisine, priceRange, rating, features, lat, lng, radius = 5, sortBy = 'rating', sortOrder = 'desc', } = query;
        const where = {
            isActive: true,
        };
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (cuisine && cuisine.length > 0) {
            where.cuisine = { hasSome: cuisine };
        }
        if (priceRange && priceRange.length > 0) {
            where.priceRange = { in: priceRange };
        }
        if (rating) {
            where.rating = { gte: rating };
        }
        if (features && features.length > 0) {
            where.features = { hasSome: features };
        }
        const orderBy = {};
        if (sortBy === 'rating') {
            orderBy.rating = sortOrder;
        }
        else if (sortBy === 'price') {
            orderBy.priceRange = sortOrder;
        }
        else if (sortBy === 'name') {
            orderBy.name = sortOrder;
        }
        const total = await this.prisma.restaurant.count({ where });
        let restaurants = await this.prisma.restaurant.findMany({
            where,
            skip: (page - 1) * limit,
            take: limit,
            orderBy,
            include: {
                address: true,
                images: {
                    where: { isPrimary: true },
                    take: 1,
                },
                _count: {
                    select: { reviews: true },
                },
            },
        });
        if (lat && lng) {
            restaurants = restaurants.filter((restaurant) => {
                if (!restaurant.address)
                    return false;
                const distance = this.calculateDistance(lat, lng, restaurant.address.latitude, restaurant.address.longitude);
                return distance <= radius;
            });
            if (sortBy === 'distance') {
                restaurants.sort((a, b) => {
                    const distA = this.calculateDistance(lat, lng, a.address.latitude, a.address.longitude);
                    const distB = this.calculateDistance(lat, lng, b.address.latitude, b.address.longitude);
                    return sortOrder === 'asc' ? distA - distB : distB - distA;
                });
            }
        }
        return {
            data: restaurants.map((r) => ({
                ...r,
                reviewsCount: r._count.reviews,
            })),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        const restaurant = await this.prisma.restaurant.findUnique({
            where: { id },
            include: {
                address: true,
                contact: true,
                images: true,
                workingHours: true,
                tables: true,
                _count: {
                    select: { reviews: true },
                },
            },
        });
        if (!restaurant) {
            throw new common_1.NotFoundException('Ресторан не найден');
        }
        return {
            ...restaurant,
            reviewsCount: restaurant._count.reviews,
        };
    }
    async update(id, updateRestaurantDto) {
        const { address, contact, images, workingHours, ...restaurantData } = updateRestaurantDto;
        return this.prisma.restaurant.update({
            where: { id },
            data: {
                ...restaurantData,
                address: address
                    ? {
                        upsert: {
                            create: address,
                            update: address,
                        },
                    }
                    : undefined,
                contact: contact
                    ? {
                        upsert: {
                            create: contact,
                            update: contact,
                        },
                    }
                    : undefined,
            },
            include: {
                address: true,
                contact: true,
                images: true,
                workingHours: true,
            },
        });
    }
    async remove(id) {
        return this.prisma.restaurant.delete({
            where: { id },
        });
    }
    async getAvailableTimeSlots(restaurantId, query) {
        const { date, guestsCount } = query;
        const restaurant = await this.findOne(restaurantId);
        const dayOfWeek = [
            'SUNDAY',
            'MONDAY',
            'TUESDAY',
            'WEDNESDAY',
            'THURSDAY',
            'FRIDAY',
            'SATURDAY',
        ][new Date(date).getDay()];
        const workingHours = restaurant.workingHours.find((wh) => wh.dayOfWeek === dayOfWeek);
        if (!workingHours || workingHours.isClosed) {
            return [];
        }
        const bookings = await this.prisma.booking.findMany({
            where: {
                restaurantId,
                date: new Date(date),
                status: { in: ['CONFIRMED', 'PENDING'] },
            },
            include: {
                table: true,
            },
        });
        const tables = await this.prisma.table.findMany({
            where: {
                restaurantId,
                isActive: true,
                capacity: { gte: guestsCount },
            },
        });
        const timeSlots = [];
        const [startHour, startMinute] = workingHours.openTime
            .split(':')
            .map(Number);
        const [endHour, endMinute] = workingHours.closeTime.split(':').map(Number);
        for (let hour = startHour; hour < endHour; hour++) {
            for (const minute of [0, 30]) {
                if (hour === startHour && minute < startMinute)
                    continue;
                if (hour === endHour - 1 && minute > endMinute - 30)
                    continue;
                const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                const bookedTableIds = bookings
                    .filter((booking) => {
                    const bookingStartTime = booking.time;
                    const bookingEndTime = this.addMinutes(booking.time, booking.duration);
                    const slotEndTime = this.addMinutes(time, 120);
                    return ((time >= bookingStartTime && time < bookingEndTime) ||
                        (slotEndTime > bookingStartTime && slotEndTime <= bookingEndTime));
                })
                    .map((booking) => booking.tableId)
                    .filter(Boolean);
                const availableTables = tables.filter((table) => !bookedTableIds.includes(table.id));
                timeSlots.push({
                    time,
                    available: availableTables.length > 0,
                    tablesAvailable: availableTables.length,
                });
            }
        }
        return timeSlots;
    }
    async searchByLocation(lat, lng, radius = 5) {
        const restaurants = await this.prisma.restaurant.findMany({
            where: { isActive: true },
            include: {
                address: true,
                images: {
                    where: { isPrimary: true },
                    take: 1,
                },
            },
        });
        return restaurants
            .filter((restaurant) => {
            if (!restaurant.address)
                return false;
            const distance = this.calculateDistance(lat, lng, restaurant.address.latitude, restaurant.address.longitude);
            return distance <= radius;
        })
            .sort((a, b) => {
            const distA = this.calculateDistance(lat, lng, a.address.latitude, a.address.longitude);
            const distB = this.calculateDistance(lat, lng, b.address.latitude, b.address.longitude);
            return distA - distB;
        });
    }
    generateSlug(name) {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    }
    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) *
                Math.cos(this.deg2rad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d;
    }
    deg2rad(deg) {
        return deg * (Math.PI / 180);
    }
    addMinutes(time, minutes) {
        const [hours, mins] = time.split(':').map(Number);
        const totalMinutes = hours * 60 + mins + minutes;
        const newHours = Math.floor(totalMinutes / 60);
        const newMinutes = totalMinutes % 60;
        return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
    }
};
exports.RestaurantsService = RestaurantsService;
exports.RestaurantsService = RestaurantsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RestaurantsService);
//# sourceMappingURL=restaurants.service.js.map