"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Start seeding...');
    const hashedPassword = await bcrypt.hash('password123', 10);
    const adminUser = await prisma.user.create({
        data: {
            email: 'admin@example.com',
            password: hashedPassword,
            name: 'Admin User',
            role: client_1.UserRole.ADMIN,
            emailVerified: true,
        },
    });
    const regularUser = await prisma.user.create({
        data: {
            email: 'user@example.com',
            password: hashedPassword,
            name: 'John Doe',
            phone: '+7 (999) 123-45-67',
            role: client_1.UserRole.USER,
            emailVerified: true,
        },
    });
    const restaurantOwner = await prisma.user.create({
        data: {
            email: 'owner@example.com',
            password: hashedPassword,
            name: 'Restaurant Owner',
            role: client_1.UserRole.RESTAURANT_OWNER,
            emailVerified: true,
        },
    });
    const restaurants = [
        {
            name: 'Итальянский Дворик',
            description: 'Уютный итальянский ресторан с традиционной кухней и домашней атмосферой',
            priceRange: client_1.PriceRange.MODERATE,
            cuisine: [client_1.CuisineType.ITALIAN],
            features: ['wifi', 'parking', 'romantic'],
        },
        {
            name: 'Суши Мастер',
            description: 'Аутентичный японский ресторан с широким выбором суши и роллов',
            priceRange: client_1.PriceRange.EXPENSIVE,
            cuisine: [client_1.CuisineType.JAPANESE],
            features: ['wifi', 'group-friendly'],
        },
        {
            name: 'Французский Бульвар',
            description: 'Элегантный ресторан французской кухни с изысканным меню',
            priceRange: client_1.PriceRange.LUXURY,
            cuisine: [client_1.CuisineType.FRENCH],
            features: ['wifi', 'parking', 'romantic', 'private-dining'],
        },
        {
            name: 'Бургер Хаус',
            description: 'Лучшие бургеры в городе с авторскими рецептами',
            priceRange: client_1.PriceRange.BUDGET,
            cuisine: [client_1.CuisineType.AMERICAN],
            features: ['wifi', 'kids-friendly', 'group-friendly'],
        },
    ];
    for (const restaurantData of restaurants) {
        const slug = restaurantData.name.toLowerCase().replace(/\s+/g, '-');
        const restaurant = await prisma.restaurant.create({
            data: {
                ...restaurantData,
                slug: slug,
                rating: Math.random() * 2 + 3,
                reviewsCount: Math.floor(Math.random() * 100),
                address: {
                    create: {
                        street: `ул. Примерная, ${Math.floor(Math.random() * 100)}`,
                        city: 'Москва',
                        state: 'Московская область',
                        postalCode: '123456',
                        country: 'Россия',
                        latitude: 55.7558 + (Math.random() - 0.5) * 0.1,
                        longitude: 37.6173 + (Math.random() - 0.5) * 0.1,
                    },
                },
                contact: {
                    create: {
                        phone: `+7 (495) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 90) + 10}-${Math.floor(Math.random() * 90) + 10}`,
                        email: `info@${slug}.ru`,
                        website: `https://${slug}.ru`,
                    },
                },
                images: {
                    create: [
                        {
                            url: `https://images.unsplash.com/photo-${1514536338 + Math.floor(Math.random() * 1000000)}-restaurant`,
                            alt: `${restaurantData.name} - главное фото`,
                            isPrimary: true,
                            order: 0,
                        },
                        {
                            url: `https://images.unsplash.com/photo-${1514536338 + Math.floor(Math.random() * 1000000)}-interior`,
                            alt: `${restaurantData.name} - интерьер`,
                            isPrimary: false,
                            order: 1,
                        },
                    ],
                },
                workingHours: {
                    create: [
                        {
                            dayOfWeek: client_1.DayOfWeek.MONDAY,
                            openTime: '10:00',
                            closeTime: '22:00',
                            isClosed: false,
                        },
                        {
                            dayOfWeek: client_1.DayOfWeek.TUESDAY,
                            openTime: '10:00',
                            closeTime: '22:00',
                            isClosed: false,
                        },
                        {
                            dayOfWeek: client_1.DayOfWeek.WEDNESDAY,
                            openTime: '10:00',
                            closeTime: '22:00',
                            isClosed: false,
                        },
                        {
                            dayOfWeek: client_1.DayOfWeek.THURSDAY,
                            openTime: '10:00',
                            closeTime: '22:00',
                            isClosed: false,
                        },
                        {
                            dayOfWeek: client_1.DayOfWeek.FRIDAY,
                            openTime: '10:00',
                            closeTime: '23:00',
                            isClosed: false,
                        },
                        {
                            dayOfWeek: client_1.DayOfWeek.SATURDAY,
                            openTime: '11:00',
                            closeTime: '23:00',
                            isClosed: false,
                        },
                        {
                            dayOfWeek: client_1.DayOfWeek.SUNDAY,
                            openTime: '11:00',
                            closeTime: '22:00',
                            isClosed: false,
                        },
                    ],
                },
                tables: {
                    create: [
                        {
                            tableNumber: '1',
                            capacity: 2,
                            location: client_1.TableLocation.INDOOR,
                            isActive: true,
                        },
                        {
                            tableNumber: '2',
                            capacity: 4,
                            location: client_1.TableLocation.INDOOR,
                            isActive: true,
                        },
                        {
                            tableNumber: '3',
                            capacity: 4,
                            location: client_1.TableLocation.INDOOR,
                            isActive: true,
                        },
                        {
                            tableNumber: '4',
                            capacity: 6,
                            location: client_1.TableLocation.INDOOR,
                            isActive: true,
                        },
                        {
                            tableNumber: 'T1',
                            capacity: 4,
                            location: client_1.TableLocation.TERRACE,
                            isActive: true,
                        },
                    ],
                },
                menus: {
                    create: {
                        name: 'Основное меню',
                        description: 'Наше основное меню',
                        isActive: true,
                        categories: {
                            create: [
                                {
                                    name: 'Закуски',
                                    displayOrder: 1,
                                    items: {
                                        create: [
                                            {
                                                name: 'Брускетта с томатами',
                                                description: 'Хрустящий хлеб с свежими томатами и базиликом',
                                                price: 350,
                                                isVegetarian: true,
                                                isVegan: true,
                                                isAvailable: true,
                                            },
                                            {
                                                name: 'Сырная тарелка',
                                                description: 'Ассорти из итальянских сыров',
                                                price: 890,
                                                isVegetarian: true,
                                                isAvailable: true,
                                            },
                                        ],
                                    },
                                },
                                {
                                    name: 'Основные блюда',
                                    displayOrder: 2,
                                    items: {
                                        create: [
                                            {
                                                name: 'Паста Карбонара',
                                                description: 'Классическая итальянская паста с беконом',
                                                price: 650,
                                                isAvailable: true,
                                            },
                                            {
                                                name: 'Пицца Маргарита',
                                                description: 'Традиционная пицца с томатами и моцареллой',
                                                price: 550,
                                                isVegetarian: true,
                                                isAvailable: true,
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                },
            },
        });
        for (let i = 0; i < 3; i++) {
            await prisma.review.create({
                data: {
                    userId: regularUser.id,
                    restaurantId: restaurant.id,
                    rating: Math.floor(Math.random() * 2) + 4,
                    comment: 'Отличный ресторан! Вкусная еда и прекрасное обслуживание.',
                    helpfulCount: Math.floor(Math.random() * 10),
                },
            });
        }
    }
    console.log('Seeding finished.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map