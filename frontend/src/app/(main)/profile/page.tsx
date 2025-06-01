"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AuthGuard } from "@/components/auth/auth-guard";
import { useAuth } from "@/lib/hooks/use-auth";
import { User, Mail, Phone, Calendar, Settings } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils/format";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Мой профиль</h1>

        <div className="grid gap-6 md:grid-cols-3">
          {/* User Info Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Личная информация</CardTitle>
              <CardDescription>Управляйте своими данными</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Имя</p>
                  <p className="font-medium">{user?.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
              </div>

              {user?.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Телефон</p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Дата регистрации
                  </p>
                  <p className="font-medium">
                    {formatDate(user?.createdAt || new Date())}
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Button asChild>
                  <Link href="/profile/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Редактировать профиль
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Быстрые действия</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/profile/bookings">
                    <Calendar className="mr-2 h-4 w-4" />
                    Мои бронирования
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/profile/favorites">
                    <User className="mr-2 h-4 w-4" />
                    Избранные рестораны
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/profile/reviews">
                    <User className="mr-2 h-4 w-4" />
                    Мои отзывы
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
