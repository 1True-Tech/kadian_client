"use client";

import { CardContent } from "@/components/ui/card";
import type { StyleGuide } from "@/types/guides";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { PortableText } from "next-sanity";
import Image from "next/image";

interface StyleGuideDetailsProps {
  styleGuide: StyleGuide;
}

export default function StyleGuideDetails({ styleGuide }: StyleGuideDetailsProps) {
  console.log(styleGuide)
  return (
    <section className="py-20 bg-gradient-to-b from-background to-background/95">
      <div className="px-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="text-xs font-medium text-accent uppercase tracking-widest mb-3">
            {styleGuide.category}
          </div>
          <h1 className="text-5xl sm:text-6xl font-cinzel mb-6 text-primary leading-tight">
            {styleGuide.title}
          </h1>
          {styleGuide.introduction && (
            <div className="prose prose-lg prose-elegant mx-auto text-muted-foreground max-w-3xl">
              <PortableText value={styleGuide.introduction} />
            </div>
          )}

          {/* Metadata */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {styleGuide.difficulty && (
              <span className="px-3 py-1 border border-accent/30 rounded-full">
                {styleGuide.difficulty}
              </span>
            )}
            {styleGuide.targetAudience && styleGuide.targetAudience.length > 0 && (
              <span className="px-3 py-1 border border-accent/30 rounded-full">
                {styleGuide.targetAudience.join(", ")}
              </span>
            )}
            {styleGuide.seasonality && styleGuide.seasonality.length > 0 && (
              <span className="px-3 py-1 border border-accent/30 rounded-full">
                {styleGuide.seasonality.join(", ")}
              </span>
            )}
          </div>
        </motion.div>

        {/* Sections */}
        <div className="space-y-28">
          {styleGuide.sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Text */}
                <div className="space-y-8">
                  <h2 className="text-3xl font-semibold text-primary">{section.title}</h2>
                  <div className="prose prose-elegant max-w-none text-lg text-muted-foreground">
                    <PortableText value={section.content} />
                  </div>

                  {/* Quick Tips */}
                  {section.tips && section.tips.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-primary">Quick Tips</h3>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        {section.tips.map((tip, tIdx) => (
                          <li key={tIdx}>
                            {tip.tip}{" "}
                            <span className="ml-2 text-xs uppercase tracking-wide text-accent">
                              {tip.importance}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Image Gallery */}
                {section.styleImages && section.styleImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-6">
                    {section.styleImages.map((image, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="relative overflow-hidden rounded-2xl shadow-md"
                      >
                        {image.src ? (
                          <Image
                            src={image.src}
                            alt={image.alt}
                            width={600}
                            height={800}
                            className="object-cover w-full h-full transition-transform duration-700 hover:scale-110"
                          />
                        ) : (
                          <div className="aspect-[3/4] bg-muted flex items-center justify-center">
                            <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
                          </div>
                        )}
                        {image.caption && (
                          <div className="absolute bottom-0 w-full p-3 bg-black/50 text-white text-xs tracking-wide">
                            {image.caption}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Related Products */}
              {section.relatedProducts && section.relatedProducts.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-lg font-medium text-primary mb-4">Recommended Products</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {section.relatedProducts.map((prod) => (
                      <motion.div
                        key={prod._id}
                        whileHover={{ scale: 1.05 }}
                        className="rounded-xl border border-accent/30 shadow-sm overflow-hidden"
                      >
                        <CardContent className="p-0">
                          {prod.image ? (
                            <div className="relative aspect-square">
                              <Image
                                src={prod.image.src}
                                alt={prod.image.alt}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="aspect-square flex items-center justify-center bg-muted">
                              <ImageIcon className="h-10 w-10 text-muted-foreground/40" />
                            </div>
                          )}
                          <div className="p-3">
                            <p className="text-sm font-medium">{prod.title}</p>
                            {prod.price !== undefined && (
                              <p className="text-sm text-muted-foreground">${prod.price}</p>
                            )}
                          </div>
                        </CardContent>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Divider */}
              {idx < styleGuide.sections.length - 1 && (
                <div className="absolute -bottom-14 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
