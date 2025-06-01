"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const restaurantImages = {
    italian: {
        main: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=800&fit=crop',
        interior1: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&h=600&fit=crop',
        interior2: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800&h=600&fit=crop',
        terrace: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
        food1: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=600&fit=crop',
        food2: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=600&fit=crop',
        food3: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=600&fit=crop',
    },
    japanese: {
        main: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=1200&h=800&fit=crop',
        interior1: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop',
        interior2: 'https://images.unsplash.com/photo-1582991032384-41bb2c230b7e?w=800&h=600&fit=crop',
        private: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?w=800&h=600&fit=crop',
        food1: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&h=600&fit=crop',
        food2: 'https://images.unsplash.com/photo-1563612116625-3012372fccce?w=600&h=600&fit=crop',
        food3: 'https://images.unsplash.com/photo-1562436260-8c9216eeb703?w=600&h=600&fit=crop',
    },
    french: {
        main: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop',
        interior1: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop',
        interior2: 'https://images.unsplash.com/photo-1521917441209-e886f0404a7b?w=800&h=600&fit=crop',
        terrace: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&h=600&fit=crop',
        food1: 'https://images.unsplash.com/photo-1549488344-cbb6c34cf08b?w=600&h=600&fit=crop',
        food2: 'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=600&h=600&fit=crop',
        food3: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=600&fit=crop',
    },
    burger: {
        main: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1200&h=800&fit=crop',
        interior1: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=600&fit=crop',
        interior2: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=800&h=600&fit=crop',
        bar: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=800&h=600&fit=crop',
        food1: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=600&fit=crop',
        food2: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&h=600&fit=crop',
        food3: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&h=600&fit=crop',
    },
    steakhouse: {
        main: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&h=800&fit=crop',
        interior1: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&h=600&fit=crop',
        interior2: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&h=600&fit=crop',
        wine: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=600&fit=crop',
        food1: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=600&fit=crop',
        food2: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&h=600&fit=crop',
        food3: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600&h=600&fit=crop',
    },
    thai: {
        main: 'https://images.unsplash.com/photo-1559978137-8c560d91e9e1?w=1200&h=800&fit=crop',
        interior1: 'https://images.unsplash.com/photo-1571524420135-f1a2a2c4b96f?w=800&h=600&fit=crop',
        interior2: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop',
        garden: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&h=600&fit=crop',
        food1: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=600&h=600&fit=crop',
        food2: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600&h=600&fit=crop',
        food3: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=600&h=600&fit=crop',
    },
    seafood: {
        main: 'https://images.unsplash.com/photo-1528458876861-544fd1b4c3a2?w=1200&h=800&fit=crop',
        interior1: 'https://images.unsplash.com/photo-1525610843433-fdc7f52a7b21?w=800&h=600&fit=crop',
        interior2: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop',
        terrace: 'https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?w=800&h=600&fit=crop',
        food1: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&h=600&fit=crop',
        food2: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=600&h=600&fit=crop',
        food3: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&h=600&fit=crop',
    },
    cafe: {
        main: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&h=800&fit=crop',
        interior1: 'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=800&h=600&fit=crop',
        interior2: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&h=600&fit=crop',
        terrace: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&h=600&fit=crop',
        food1: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop',
        food2: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=600&fit=crop',
        food3: 'https://images.unsplash.com/photo-1464979681340-bdd28a61699e?w=600&h=600&fit=crop',
    },
};
const menuItems = {
    italian: {
        appetizers: [
            {
                name: 'Брускетта с томатами',
                price: 450,
                description: 'Хрустящий хлеб с свежими томатами, базиликом и оливковым маслом',
                vegan: true,
            },
            {
                name: 'Капрезе',
                price: 590,
                description: 'Моцарелла с томатами и базиликом под бальзамическим соусом',
                vegetarian: true,
            },
            {
                name: 'Антипасто',
                price: 890,
                description: 'Ассорти итальянских закусок: оливки, вяленые томаты, сыры, мясные деликатесы',
            },
            {
                name: 'Карпаччо из говядины',
                price: 790,
                description: 'Тонкие ломтики говядины с рукколой, пармезаном и трюфельным маслом',
            },
        ],
        main: [
            {
                name: 'Паста Карбонара',
                price: 650,
                description: 'Спагетти с беконом, яйцом и пармезаном',
            },
            {
                name: 'Лазанья Болоньезе',
                price: 750,
                description: 'Классическая лазанья с мясным соусом болоньезе',
            },
            {
                name: 'Ризотто с морепродуктами',
                price: 1290,
                description: 'Кремовый ризотто с креветками, мидиями и кальмарами',
            },
            {
                name: 'Оссобуко',
                price: 1590,
                description: 'Томленая телячья голяшка с овощами и полентой',
            },
            {
                name: 'Пицца Маргарита',
                price: 550,
                description: 'Классическая пицца с томатами, моцареллой и базиликом',
                vegetarian: true,
            },
            {
                name: 'Пицца Четыре сыра',
                price: 690,
                description: 'Пицца с моцареллой, горгонзолой, пармезаном и рикоттой',
                vegetarian: true,
            },
        ],
        desserts: [
            {
                name: 'Тирамису',
                price: 450,
                description: 'Классический итальянский десерт с маскарпоне и кофе',
            },
            {
                name: 'Панна котта',
                price: 390,
                description: 'Нежный сливочный десерт с ягодным соусом',
            },
            {
                name: 'Канноли',
                price: 420,
                description: 'Хрустящие трубочки с рикоттой и фисташками',
            },
        ],
    },
    japanese: {
        appetizers: [
            {
                name: 'Эдамаме',
                price: 290,
                description: 'Соевые бобы с морской солью',
                vegan: true,
            },
            {
                name: 'Гёдза',
                price: 420,
                description: 'Жареные пельмени с курицей и овощами',
            },
            {
                name: 'Темпура овощная',
                price: 490,
                description: 'Овощи в хрустящем кляре',
                vegetarian: true,
            },
            {
                name: 'Татаки из тунца',
                price: 890,
                description: 'Слегка обжаренный тунец с кунжутом и соусом понзу',
            },
        ],
        main: [
            {
                name: 'Сет Филадельфия',
                price: 1290,
                description: '8 роллов с лососем, сыром и авокадо',
            },
            {
                name: 'Сет Дракон',
                price: 1590,
                description: 'Ассорти из 24 роллов с угрем, лососем и тунцом',
            },
            {
                name: 'Сашими микс',
                price: 1890,
                description: 'Ассорти из свежей рыбы: лосось, тунец, гребешок',
            },
            {
                name: 'Рамен с курицей',
                price: 650,
                description: 'Японский суп с лапшой, курицей и яйцом',
            },
            {
                name: 'Якитори',
                price: 590,
                description: 'Шашлычки из курицы с соусом терияки',
            },
            {
                name: 'Удон с морепродуктами',
                price: 790,
                description: 'Толстая лапша с креветками и овощами в соусе',
            },
        ],
        desserts: [
            {
                name: 'Моти',
                price: 390,
                description: 'Японские рисовые пирожные с разными начинками',
            },
            {
                name: 'Дораяки',
                price: 350,
                description: 'Японские панкейки с начинкой из красной фасоли',
            },
            {
                name: 'Матча чизкейк',
                price: 490,
                description: 'Чизкейк с японским зеленым чаем',
            },
        ],
    },
    french: {
        appetizers: [
            {
                name: 'Фуа-гра',
                price: 2490,
                description: 'Гусиная печень с карамелизированными яблоками',
            },
            {
                name: 'Устрицы (6 шт)',
                price: 1890,
                description: 'Свежие устрицы с лимоном и соусом миньонет',
            },
            {
                name: 'Эскарго',
                price: 890,
                description: 'Виноградные улитки в чесночном масле',
            },
            {
                name: 'Французский луковый суп',
                price: 590,
                description: 'Классический суп с сыром грюйер',
            },
        ],
        main: [
            {
                name: 'Утка конфи',
                price: 1890,
                description: 'Томленая утиная ножка с картофелем сарладез',
            },
            {
                name: 'Буйабес',
                price: 2290,
                description: 'Марсельский рыбный суп с морепродуктами',
            },
            {
                name: 'Бланкет де во',
                price: 1690,
                description: 'Телятина в сливочном соусе с овощами',
            },
            {
                name: 'Стейк с соусом беарнез',
                price: 2490,
                description: 'Говяжий стейк с классическим французским соусом',
            },
            {
                name: 'Кок-о-вен',
                price: 1490,
                description: 'Петух в вине с грибами и жемчужным луком',
            },
            {
                name: 'Рататуй',
                price: 890,
                description: 'Овощное рагу по-провансальски',
                vegetarian: true,
            },
        ],
        desserts: [
            {
                name: 'Моти',
                price: 390,
                description: 'Японские рисовые пирожные с разными начинками',
            },
            {
                name: 'Дораяки',
                price: 350,
                description: 'Японские панкейки с начинкой из красной фасоли',
            },
            {
                name: 'Матча чизкейк',
                price: 490,
                description: 'Чизкейк с японским зеленым чаем',
            },
        ],
    },
};
//# sourceMappingURL=seed-extended.js.map