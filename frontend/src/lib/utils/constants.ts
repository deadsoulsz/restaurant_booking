export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "TableBook";
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const BOOKING_DURATIONS = [
  { value: 60, label: "1 час" },
  { value: 90, label: "1.5 часа" },
  { value: 120, label: "2 часа" },
  { value: 180, label: "3 часа" },
];

export const GUEST_COUNTS = Array.from({ length: 20 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1} ${i === 0 ? "гость" : i < 4 ? "гостя" : "гостей"}`,
}));

export const TIME_SLOTS = Array.from({ length: 28 }, (_, i) => {
  const hour = Math.floor(i / 2) + 9; // Начинаем с 9:00
  const minute = i % 2 === 0 ? "00" : "30";
  return {
    value: `${hour.toString().padStart(2, "0")}:${minute}`,
    label: `${hour.toString().padStart(2, "0")}:${minute}`,
  };
});

export const CUISINE_OPTIONS = [
  { value: "ITALIAN", label: "Итальянская" },
  { value: "FRENCH", label: "Французская" },
  { value: "JAPANESE", label: "Японская" },
  { value: "CHINESE", label: "Китайская" },
  { value: "INDIAN", label: "Индийская" },
  { value: "MEXICAN", label: "Мексиканская" },
  { value: "THAI", label: "Тайская" },
  { value: "AMERICAN", label: "Американская" },
  { value: "MEDITERRANEAN", label: "Средиземноморская" },
  { value: "OTHER", label: "Другая" },
];

export const PRICE_RANGE_OPTIONS = [
  { value: "BUDGET", label: "₽", description: "до 1000₽" },
  { value: "MODERATE", label: "₽₽", description: "1000-2000₽" },
  { value: "EXPENSIVE", label: "₽₽₽", description: "2000-4000₽" },
  { value: "LUXURY", label: "₽₽₽₽", description: "от 4000₽" },
];
