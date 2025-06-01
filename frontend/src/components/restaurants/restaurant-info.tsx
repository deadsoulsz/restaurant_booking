import { Restaurant } from "@/types/restaurant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  MapPin,
  Phone,
  Mail,
  Wifi,
  Car,
  Users,
  Heart,
} from "lucide-react";

interface RestaurantInfoProps {
  restaurant: Restaurant;
}

export function RestaurantInfo({ restaurant }: RestaurantInfoProps) {
  const getDayName = (day: string): string => {
    const days: Record<string, string> = {
      MONDAY: "Понедельник",
      TUESDAY: "Вторник",
      WEDNESDAY: "Среда",
      THURSDAY: "Четверг",
      FRIDAY: "Пятница",
      SATURDAY: "Суббота",
      SUNDAY: "Воскресенье",
    };
    return days[day] || day;
  };

  const featureIcons: Record<string, any> = {
    wifi: Wifi,
    parking: Car,
    "group-friendly": Users,
    romantic: Heart,
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* About */}
      <Card>
        <CardHeader>
          <CardTitle>О ресторане</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{restaurant.description}</p>
        </CardContent>
      </Card>

      {/* Working Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Часы работы
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {restaurant.workingHours.map((hours) => (
              <div
                key={hours.dayOfWeek}
                className="flex justify-between text-sm"
              >
                <span className="font-medium">
                  {getDayName(hours.dayOfWeek)}
                </span>
                <span className="text-muted-foreground">
                  {hours.isClosed
                    ? "Закрыто"
                    : `${hours.openTime} - ${hours.closeTime}`}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact & Location */}
      <Card>
        <CardHeader>
          <CardTitle>Контакты и местоположение</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium">Адрес</p>
              <p className="text-sm text-muted-foreground">
                {restaurant.address.street}, {restaurant.address.city}
                {restaurant.address.state && `, ${restaurant.address.state}`}
                {", "}
                {restaurant.address.postalCode}
              </p>
            </div>
          </div>
          {restaurant.contact.phone && (
            <div className="flex items-start gap-3">
              <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Телефон</p>
                <p className="text-sm text-muted-foreground">
                  {restaurant.contact.phone}
                </p>
              </div>
            </div>
          )}
          {restaurant.contact.email && (
            <div className="flex items-start gap-3">
              <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-muted-foreground">
                  {restaurant.contact.email}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>Особенности</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {restaurant.features.map((feature) => {
              const Icon = featureIcons[feature] || null;
              return (
                <Badge key={feature} variant="secondary" className="gap-1">
                  {Icon && <Icon className="h-3 w-3" />}
                  {feature}
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
