import { Restaurant, Table } from "./restaurant";

export interface Booking {
  id: string;
  userId: string;
  restaurantId: string;
  restaurant?: Restaurant;
  tableId: string;
  table?: Table;
  date: Date;
  time: string; // "19:00"
  duration: number; // в минутах
  guestsCount: number;
  specialRequests?: string;
  status: BookingStatus;
  confirmationCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
  NO_SHOW = "NO_SHOW",
}

export interface TimeSlot {
  time: string;
  available: boolean;
  tablesAvailable: number;
}

export interface BookingRequest {
  restaurantId: string;
  date: Date;
  time: string;
  guestsCount: number;
  tableId?: string;
  specialRequests?: string;
}
