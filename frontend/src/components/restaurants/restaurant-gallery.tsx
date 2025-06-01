"use client";

import { useState } from "react";
import Image from "next/image";
import { RestaurantImage } from "@/types/restaurant";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface RestaurantGalleryProps {
  images: RestaurantImage[];
}

export function RestaurantGallery({ images }: RestaurantGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<RestaurantImage | null>(
    null
  );

  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Нет доступных изображений</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative aspect-square cursor-pointer overflow-hidden rounded-lg"
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover transition-transform hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          </div>
        ))}
      </div>

      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-4xl">
          {selectedImage && (
            <div className="relative aspect-video">
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt}
                fill
                className="object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
