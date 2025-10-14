import { useState } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { GALLERY_IMAGES } from "@/data/portfolio";

export const GallerySection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeImage =
    activeIndex !== null ? GALLERY_IMAGES[activeIndex] : GALLERY_IMAGES[0];

  return (
    <section id="gallery" className="bg-secondary/40 py-24 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-3xl">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Gallery
          </h2>
          <p className="mt-4 text-base text-foreground/75 md:text-lg">
            Highlights from conferences, workshops, collaborations, and award
            ceremonies led or attended by Dr. Ghuge.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_IMAGES.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group relative overflow-hidden rounded-2xl border border-primary/15 bg-background shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
              <span className="absolute bottom-4 left-4 right-4 text-left text-sm font-semibold text-background opacity-0 transition duration-300 group-hover:opacity-100">
                {image.alt}
              </span>
            </button>
          ))}
        </div>
        <Dialog
          open={activeIndex !== null}
          onOpenChange={(open) => !open && setActiveIndex(null)}
        >
          <DialogContent className="max-w-3xl border-none bg-transparent p-0 shadow-none">
            <div className="overflow-hidden rounded-3xl">
              <img
                src={activeImage.src}
                alt={activeImage.alt}
                className="h-full w-full object-cover"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
