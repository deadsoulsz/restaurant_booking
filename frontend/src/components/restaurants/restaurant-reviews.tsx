"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { reviewsApi } from "@/lib/api/reviews";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, ThumbsUp } from "lucide-react";
import { formatDate } from "@/lib/utils/format";

interface RestaurantReviewsProps {
  restaurantId: string;
}

export function RestaurantReviews({ restaurantId }: RestaurantReviewsProps) {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<"newest" | "oldest" | "rating">("newest");

  const { data, isLoading } = useQuery({
    queryKey: ["reviews", restaurantId, page, sort],
    queryFn: () =>
      reviewsApi.getRestaurantReviews(restaurantId, { page, sort }),
  });

  if (isLoading) {
    return <div>Загрузка отзывов...</div>;
  }

  if (!data || data.data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Пока нет отзывов</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.data.map((review) => (
        <Card key={review.id}>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage
                  src={review.user?.avatar}
                  alt={review.user?.name}
                />
                <AvatarFallback>
                  {review.user?.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold">
                      {review.user?.name || "Пользователь"}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm">{review.comment}</p>
                <Button variant="ghost" size="sm" className="mt-2 -ml-2">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Полезно ({review.helpfulCount})
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
