"use client";

import { AuthGuard } from "@/components/auth/auth-guard";
import { RestaurantGrid } from "@/components/restaurants/restaurant-grid";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Restaurant } from "@/types/restaurant";

// Заглушка для избранных ресторанов
const mockFavorites: Restaurant[] = [];

export default function FavoritesPage() {
  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Избранные рестораны</h1>
        </div>

        {mockFavorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground mb-4">
              У вас пока нет избранных ресторанов
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Добавляйте понравившиеся рестораны в избранное, чтобы быстро
              находить их
            </p>
            <Button asChild>
              <Link href="/restaurants">Найти рестораны</Link>
            </Button>
          </div>
        ) : (
          <RestaurantGrid restaurants={mockFavorites} />
        )}
      </div>
    </AuthGuard>
  );
}
