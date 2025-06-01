export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
};

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(":");
  return `${hours}:${minutes}`;
};

export const formatDateTime = (date: Date | string, time: string): string => {
  const d = new Date(date);
  const formattedDate = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
  }).format(d);

  return `${formattedDate} в ${formatTime(time)}`;
};

export const formatPhoneNumber = (phone: string): string => {
  // Удаляем все нецифровые символы
  const cleaned = phone.replace(/\D/g, "");

  // Форматируем номер
  if (cleaned.length === 11 && cleaned.startsWith("7")) {
    return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(
      7,
      9
    )}-${cleaned.slice(9, 11)}`;
  }

  return phone;
};

export const getPriceRangeSymbol = (priceRange: string): string => {
  const symbols: Record<string, string> = {
    BUDGET: "₽",
    MODERATE: "₽₽",
    EXPENSIVE: "₽₽₽",
    LUXURY: "₽₽₽₽",
  };

  return symbols[priceRange] || "₽₽";
};

export const getRatingStars = (rating: number): string => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    "★".repeat(fullStars) + (hasHalfStar ? "½" : "") + "☆".repeat(emptyStars)
  );
};
