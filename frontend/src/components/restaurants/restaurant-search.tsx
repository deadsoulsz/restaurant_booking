"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { useRestaurantSearch } from "@/lib/hooks/use-restaurants";
import { useGeolocation } from "@/lib/hooks/use-geolocation";
import { Restaurant } from "@/types/restaurant";

interface RestaurantSearchProps {
  onSelect?: (restaurant: Restaurant) => void;
  showLocationSearch?: boolean;
  className?: string;
}

export function RestaurantSearch({
  onSelect,
  showLocationSearch = true,
  className,
}: RestaurantSearchProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const {
    latitude,
    longitude,
    error: geoError,
    loading: geoLoading,
  } = useGeolocation();

  const { data, isLoading } = useRestaurantSearch(debouncedSearch);

  const handleSelect = useCallback(
    (restaurant: Restaurant) => {
      setOpen(false);
      setSearch("");

      if (onSelect) {
        onSelect(restaurant);
      } else {
        router.push(`/restaurants/${restaurant.id}`);
      }
    },
    [onSelect, router]
  );

  const handleNearbySearch = () => {
    if (latitude && longitude) {
      router.push(`/restaurants?near=me&lat=${latitude}&lng=${longitude}`);
    }
  };

  return (
    <div className={className}>
      <div className="flex gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск ресторанов..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setOpen(true)}
                className="pl-10"
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0" align="start">
            <Command>
              <CommandList>
                {isLoading ? (
                  <div className="flex items-center justify-center py-6">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                ) : search.length > 0 &&
                  (!data?.data || data.data.length === 0) ? (
                  <CommandEmpty>Ничего не найдено</CommandEmpty>
                ) : (
                  <CommandGroup heading="Рестораны">
                    {data?.data.map((restaurant) => (
                      <CommandItem
                        key={restaurant.id}
                        onSelect={() => handleSelect(restaurant)}
                        className="cursor-pointer"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{restaurant.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {restaurant.address.street},{" "}
                            {restaurant.address.city}
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {showLocationSearch && (
          <Button
            variant="outline"
            size="icon"
            onClick={handleNearbySearch}
            disabled={geoLoading || !!geoError || !latitude || !longitude}
            title={geoError || "Найти рядом"}
          >
            {geoLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <MapPin className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
