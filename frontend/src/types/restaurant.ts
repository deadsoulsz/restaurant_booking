export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  description: string;
  cuisine: CuisineType[];
  priceRange: PriceRange;
  images: RestaurantImage[];
  address: Address;
  contact: ContactInfo;
  workingHours: WorkingHours[];
  features: string[];
  rating: number;
  reviewsCount: number;
  tables: Table[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RestaurantImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface Address {
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface ContactInfo {
  phone: string;
  email?: string;
  website?: string;
}

export interface WorkingHours {
  dayOfWeek: DayOfWeek;
  openTime: string; // "09:00"
  closeTime: string; // "22:00"
  isClosed: boolean;
}

export interface Table {
  id: string;
  tableNumber: string;
  capacity: number;
  location: TableLocation;
  isAvailable: boolean;
}

export interface SearchFilters {
  search?: string;
  cuisine?: CuisineType[];
  priceRange?: PriceRange[];
  location?: {
    lat: number;
    lng: number;
    radius: number; // в километрах
  };
  rating?: number;
  features?: string[];
  availableDate?: Date;
  availableTime?: string;
  guestsCount?: number;
}

export interface SortOptions {
  field?: "rating" | "price" | "distance" | "name";
  order?: "asc" | "desc";
}

export enum CuisineType {
  ITALIAN = "ITALIAN",
  FRENCH = "FRENCH",
  JAPANESE = "JAPANESE",
  CHINESE = "CHINESE",
  INDIAN = "INDIAN",
  MEXICAN = "MEXICAN",
  THAI = "THAI",
  AMERICAN = "AMERICAN",
  MEDITERRANEAN = "MEDITERRANEAN",
  OTHER = "OTHER",
}

export enum PriceRange {
  BUDGET = "BUDGET", // $
  MODERATE = "MODERATE", // $$
  EXPENSIVE = "EXPENSIVE", // $$$
  LUXURY = "LUXURY", // $$$$
}

export enum DayOfWeek {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

export enum TableLocation {
  INDOOR = "INDOOR",
  OUTDOOR = "OUTDOOR",
  TERRACE = "TERRACE",
  PRIVATE = "PRIVATE",
}
