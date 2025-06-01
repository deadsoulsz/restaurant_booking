"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils/format";
import { Leaf, Wheat } from "lucide-react";
// Интерфейсы лишние
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface Menu {
  categories: MenuCategory[];
}

// Заглушка для меню (в реальном приложении будет API запрос)
const mockMenu: Menu = {
  categories: [
    {
      id: "1",
      name: "Закуски",
      items: [
        {
          id: "1",
          name: "Брускетта с томатами",
          description:
            "Хрустящий хлеб с свежими томатами, базиликом и оливковым маслом",
          price: 450,
          isVegetarian: true,
          isVegan: true,
        },
        {
          id: "2",
          name: "Карпаччо из говядины",
          description: "Тонкие ломтики говядины с рукколой и пармезаном",
          price: 890,
          isGlutenFree: true,
        },
      ],
    },
    {
      id: "2",
      name: "Основные блюда",
      items: [
        {
          id: "3",
          name: "Стейк рибай",
          description: "Мраморная говядина с картофелем и овощами гриль",
          price: 2450,
          isGlutenFree: true,
        },
        {
          id: "4",
          name: "Паста карбонара",
          description: "Классическая итальянская паста с беконом и сыром",
          price: 780,
        },
      ],
    },
  ],
};

interface RestaurantMenuProps {
  restaurantId: string;
}

export function RestaurantMenu({ restaurantId }: RestaurantMenuProps) {
  const [activeCategory, setActiveCategory] = useState(
    mockMenu.categories[0].id
  );

  return (
    <div>
      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="w-full justify-start overflow-x-auto">
          {mockMenu.categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {mockMenu.categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-6">
            <div className="grid gap-4">
              {category.items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold flex items-center gap-2">
                          {item.name}
                          {item.isVegetarian && (
                            <Leaf
                              className="h-4 w-4 text-green-600"
                              //   title="Вегетарианское"
                            >
                              <title>Вегетарианское</title>
                            </Leaf>
                          )}
                          {item.isGlutenFree && (
                            <Wheat
                              className="h-4 w-4 text-orange-600"
                              //   title="Без глютена"
                            >
                              <title>Без глютена</title>
                            </Wheat>
                          )}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.description}
                        </p>
                      </div>
                      <div className="ml-4">
                        <span className="font-semibold">
                          {formatCurrency(item.price)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
