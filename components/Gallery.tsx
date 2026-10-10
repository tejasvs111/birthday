"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GALLERY_TITLE, PHOTOS } from "@/config/site";

/** Photo gallery. Hidden until photos are added in config/site.ts. */
export default function Gallery() {
  if (PHOTOS.length === 0) return null;

  return (
    <section aria-labelledby="gallery-title" className="mx-auto w-full max-w-4xl px-4 py-10">
      <h2 id="gallery-title" className="mb-6 text-center font-display text-3xl font-semibold text-blush sm:text-4xl">
        {GALLERY_TITLE}
      </h2>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {PHOTOS.map((photo, i) => (
          <motion.li
            key={photo.src}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
            className="glass overflow-hidden rounded-2xl p-1.5"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
