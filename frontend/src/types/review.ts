import { User } from "./user";

export interface Review {
  id: string;
  userId: string;
  user?: User;
  restaurantId: string;
  bookingId?: string;
  rating: number; // 1-5
  comment: string;
  images?: ReviewImage[];
  helpfulCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewImage {
  id: string;
  url: string;
  caption?: string;
}

export interface CreateReviewData {
  restaurantId: string;
  bookingId?: string;
  rating: number;
  comment: string;
}
