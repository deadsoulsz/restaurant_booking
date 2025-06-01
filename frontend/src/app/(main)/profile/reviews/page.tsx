"use client";

import { AuthGuard } from "@/components/auth/auth-guard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MessageSquare } from "lucide-react";
import Link from "next/link";

// Заглушка для отзывов пользователя
const mockReviews = [];

export default function MyReviewsPage() {
  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <MessageSquare className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Мои отзывы</h1>
        </div>

        {mockReviews.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground mb-4">
                Вы еще не оставляли отзывов
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                После посещения ресторана вы сможете оставить отзыв и помочь
                другим пользователям
              </p>
              <Button asChild>
                <Link href="/profile/bookings">Мои бронирования</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">{/* Здесь будет список отзывов */}</div>
        )}
      </div>
    </AuthGuard>
  );
}
