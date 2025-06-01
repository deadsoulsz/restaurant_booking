"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Restaurant } from "@/types/restaurant";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RestaurantInfo } from "./restaurant-info";
import { RestaurantMenu } from "./restaurant-menu";
import { RestaurantReviews } from "./restaurant-reviews";
import { RestaurantGallery } from "./restaurant-gallery";
import { getPriceRangeSymbol } from "@/lib/utils/format";
import { MapPin, Phone, Globe, Star, Clock, Calendar } from "lucide-react";
import { useAuth } from "@/lib/hooks/use-auth";

interface RestaurantDetailsProps {
  restaurant: Restaurant;
}

export function RestaurantDetails({ restaurant }: RestaurantDetailsProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("info");

  const handleBooking = () => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/restaurants/" + restaurant.id + "/booking");
      return;
    }
    router.push(`/restaurants/${restaurant.id}/booking`);
  };

  const primaryImage =
    restaurant.images.find((img) => img.isPrimary) || restaurant.images[0];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
          <Image
            src={primaryImage?.url || "/images/placeholder-restaurant.jpg"}
            alt={primaryImage?.alt || restaurant.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">
                  {restaurant.rating.toFixed(1)}
                </span>
                <span className="text-white/80">
                  ({restaurant.reviewsCount} отзывов)
                </span>
              </div>
              <span>•</span>
              <span className="font-medium">
                {getPriceRangeSymbol(restaurant.priceRange)}
              </span>
              <span>•</span>
              <div className="flex gap-2">
                {restaurant.cuisine.map((cuisine) => (
                  <Badge key={cuisine} variant="secondary">
                    {getCuisineName(cuisine)}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info Bar */}
      <div className="bg-muted/30 rounded-lg p-4 mb-8">
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {restaurant.address.street}, {restaurant.address.city}
            </span>
          </div>
          {restaurant.contact.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a
                href={`tel:${restaurant.contact.phone}`}
                className="text-sm hover:underline"
              >
                {restaurant.contact.phone}
              </a>
            </div>
          )}
          {restaurant.contact.website && (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <a
                href={restaurant.contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:underline"
              >
                Сайт ресторана
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Booking Button */}
      <div className="flex justify-center mb-8">
        <Button size="lg" onClick={handleBooking} className="min-w-[200px]">
          <Calendar className="mr-2 h-5 w-5" />
          Забронировать столик
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="info">Информация</TabsTrigger>
          <TabsTrigger value="menu">Меню</TabsTrigger>
          <TabsTrigger value="gallery">Галерея</TabsTrigger>
          <TabsTrigger value="reviews">Отзывы</TabsTrigger>
        </TabsList>
        <TabsContent value="info" className="mt-6">
          <RestaurantInfo restaurant={restaurant} />
        </TabsContent>
        <TabsContent value="menu" className="mt-6">
          <RestaurantMenu restaurantId={restaurant.id} />
        </TabsContent>
        <TabsContent value="gallery" className="mt-6">
          <RestaurantGallery images={restaurant.images} />
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <RestaurantReviews restaurantId={restaurant.id} />
        </TabsContent>
      </Tabs>
    </div>
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
