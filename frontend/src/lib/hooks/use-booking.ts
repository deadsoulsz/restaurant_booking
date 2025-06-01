import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { bookingsApi } from "@/lib/api/bookings";
import { restaurantsApi } from "@/lib/api/restaurants";
import { BookingRequest } from "@/types/booking";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useCreateBooking() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BookingRequest) => bookingsApi.createBooking(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Успешно!", {
        description: "Ваше бронирование подтверждено",
      });
      router.push(`/profile/bookings/${response.data.id}`);
    },
    onError: (error: any) => {
      toast.error("Ошибка", {
        description: error.message || "Не удалось создать бронирование",
      });
    },
  });
}

export function useMyBookings(status?: string) {
  return useQuery({
    queryKey: ["bookings", "my", status],
    queryFn: () => bookingsApi.getMyBookings({ status }),
  });
}

export function useBooking(id: string) {
  return useQuery({
    queryKey: ["booking", id],
    queryFn: () => bookingsApi.getBooking(id),
    enabled: !!id,
  });
}

export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => bookingsApi.cancelBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Бронирование отменено", {
        description: "Ваше бронирование успешно отменено",
      });
    },
    onError: (error: any) => {
      toast.error("Ошибка", {
        description: error.message || "Не удалось отменить бронирование",
      });
    },
  });
}

export function useAvailableTimeSlots(
  restaurantId: string,
  date: Date | null,
  guestsCount: number
) {
  const dateString = date ? date.toISOString().split("T")[0] : "";

  return useQuery({
    queryKey: ["timeSlots", restaurantId, dateString, guestsCount],
    queryFn: () =>
      restaurantsApi.getAvailableTimeSlots({
        restaurantId,
        date: dateString,
        guestsCount,
      }),
    enabled: !!restaurantId && !!date && guestsCount > 0,
  });
}
