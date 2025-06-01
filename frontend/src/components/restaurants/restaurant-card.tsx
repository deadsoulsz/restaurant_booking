"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Restaurant } from "@/types/restaurant";
import { getPriceRangeSymbol } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

interface RestaurantCardProps {
  restaurant: Restaurant;
  className?: string;
}

export function RestaurantCard({ restaurant, className }: RestaurantCardProps) {
  const primaryImage =
    restaurant.images.find((img) => img.isPrimary) || restaurant.images[0];
  const isOpen = checkIfOpen(restaurant.workingHours);

  return (
    <Link href={`/restaurants/${restaurant.id}`}>
      <Card
        className={cn(
          "overflow-hidden hover:shadow-lg transition-shadow",
          className
        )}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={primaryImage?.url || "/images/placeholder-restaurant.jpg"}
            alt={primaryImage?.alt || restaurant.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-4 right-4">
            {/* <Badge variant={isOpen ? "default" : "secondary"}>
              {isOpen ? "Открыто" : "Закрыто"}
            </Badge> */}
            <Badge variant={"default"}> {"Открыто"}</Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="mb-2">
            <h3 className="text-lg font-semibold line-clamp-1">
              {restaurant.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {restaurant.description}
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">
                {restaurant.rating.toFixed(1)}
              </span>
              <span className="text-muted-foreground">
                ({restaurant.reviewsCount})
              </span>
            </div>
            <span className="text-muted-foreground">•</span>
            <span className="font-medium">
              {getPriceRangeSymbol(restaurant.priceRange)}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">
              {restaurant.address.city}, {restaurant.address.street}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {restaurant.cuisine.slice(0, 2).map((cuisine) => (
              <Badge key={cuisine} variant="outline" className="text-xs">
                {getCuisineName(cuisine)}
              </Badge>
            ))}
            {restaurant.cuisine.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{restaurant.cuisine.length - 2}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function checkIfOpen(workingHours: Restaurant["workingHours"]): boolean {
  const now = new Date();
  const dayOfWeek = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ][now.getDay()];
  const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  const todayHours = workingHours.find((h) => h.dayOfWeek === dayOfWeek);
  if (!todayHours || todayHours.isClosed) return false;

  return (
    currentTime >= todayHours.openTime && currentTime <= todayHours.closeTime
  );
}

function getCuisineName(cuisine: string): string {
  const cuisineNames: Record<string, string> = {
    ITALIAN: "Итальянская",
    FRENCH: "Французская",
    JAPANESE: "Японская",
    CHINESE: "Китайская",
    INDIAN: "Индийская",
    MEXICAN: "Мексиканская",
    THAI: "Тайская",
    AMERICAN: "Американская",
    MEDITERRANEAN: "Средиземноморская",
    OTHER: "Другая",
  };
  return cuisineNames[cuisine] || cuisine;
}
