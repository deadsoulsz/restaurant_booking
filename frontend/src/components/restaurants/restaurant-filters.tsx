"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { SearchFilters, CuisineType, PriceRange } from "@/types/restaurant";
import { CUISINE_OPTIONS, PRICE_RANGE_OPTIONS } from "@/lib/utils/constants";
import { useDebounce } from "@/lib/hooks/use-debounce";
import React from "react";

interface RestaurantFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
}

export function RestaurantFilters({
  filters,
  onFiltersChange,
}: RestaurantFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 500);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  React.useEffect(() => {
    onFiltersChange({ ...filters, search: debouncedSearch });
  }, [debouncedSearch]);

  const handleCuisineChange = (cuisine: CuisineType, checked: boolean) => {
    const newCuisines = checked
      ? [...(filters.cuisine || []), cuisine]
      : (filters.cuisine || []).filter((c) => c !== cuisine);

    onFiltersChange({ ...filters, cuisine: newCuisines });
  };

  const handlePriceRangeChange = (priceRange: PriceRange, checked: boolean) => {
    const newPriceRanges = checked
      ? [...(filters.priceRange || []), priceRange]
      : (filters.priceRange || []).filter((p) => p !== priceRange);

    onFiltersChange({ ...filters, priceRange: newPriceRanges });
  };

  const handleRatingChange = (value: number[]) => {
    onFiltersChange({ ...filters, rating: value[0] });
  };

  const clearFilters = () => {
    setSearchTerm("");
    onFiltersChange({});
  };

  const activeFiltersCount =
    (filters.cuisine?.length || 0) +
    (filters.priceRange?.length || 0) +
    (filters.rating ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Поиск ресторанов..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <SlidersHorizontal className="h-4 w-4" />
              {activeFiltersCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
                >
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Фильтры</SheetTitle>
              <SheetDescription>
                Настройте параметры поиска ресторанов
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              {/* Cuisine Types */}
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Тип кухни
                </Label>
                <div className="space-y-2">
                  {CUISINE_OPTIONS.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={option.value}
                        checked={(filters.cuisine || []).includes(
                          option.value as CuisineType
                        )}
                        onCheckedChange={(checked) =>
                          handleCuisineChange(
                            option.value as CuisineType,
                            checked as boolean
                          )
                        }
                      />
                      <Label
                        htmlFor={option.value}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Ценовая категория
                </Label>
                <div className="space-y-2">
                  {PRICE_RANGE_OPTIONS.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={option.value}
                        checked={(filters.priceRange || []).includes(
                          option.value as PriceRange
                        )}
                        onCheckedChange={(checked) =>
                          handlePriceRangeChange(
                            option.value as PriceRange,
                            checked as boolean
                          )
                        }
                      />
                      <Label
                        htmlFor={option.value}
                        className="text-sm font-normal cursor-pointer flex items-center gap-2"
                      >
                        <span className="font-medium">{option.label}</span>
                        <span className="text-muted-foreground">
                          {option.description}
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Минимальный рейтинг: {filters.rating || 0}
                </Label>
                <Slider
                  value={[filters.rating || 0]}
                  onValueChange={handleRatingChange}
                  min={0}
                  max={5}
                  step={0.5}
                  className="w-full"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={clearFilters}
                >
                  Сбросить
                </Button>
                <Button className="flex-1" onClick={() => setIsOpen(false)}>
                  Применить
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.cuisine?.map((cuisine) => (
            <Badge key={cuisine} variant="secondary">
              {CUISINE_OPTIONS.find((c) => c.value === cuisine)?.label}
              <button
                className="ml-1 hover:text-destructive"
                onClick={() => handleCuisineChange(cuisine, false)}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {filters.priceRange?.map((range) => (
            <Badge key={range} variant="secondary">
              {PRICE_RANGE_OPTIONS.find((p) => p.value === range)?.label}
              <button
                className="ml-1 hover:text-destructive"
                onClick={() => handlePriceRangeChange(range, false)}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {filters.rating && (
            <Badge variant="secondary">
              Рейтинг от {filters.rating}
              <button
                className="ml-1 hover:text-destructive"
                onClick={() =>
                  onFiltersChange({ ...filters, rating: undefined })
                }
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
