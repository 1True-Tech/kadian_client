"use client";
import { useState } from "react";
import {
  Heart,
  Share2,
  Truck,
  RotateCcw,
  Shield,
  Plus,
  Minus,
  ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ProductReady, Size } from "@/types/product";
import { PortableText } from "next-sanity";
import { lBPtComponents } from "@/components/feautures/PortableText";
import { Badge } from "@/components/ui/badge";
import { Color } from "@/types/structures";
import AddToCartButton from "@/components/product/AddToCartButton";

interface ProductDetailClientProps {
  product: ProductReady;
}

const ProductDetailClient = ({ product }: ProductDetailClientProps) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  // All variants are source of truth
  const sizes: Size[] = Array.from(
    new Map(product.variants.map((v) => [v.size.label, v.size])).values()
  );
  const colors: Color[] = Array.from(
    new Set(product.variants.map((v) => v.color!))
  );

  // Restrict options based on current selection
  const availableSizes: Size[] = product.variants
    .filter((v) => v.color === selectedVariant.color)
    .map((v) => v.size);

  const availableColors: Color[] = product.variants
    .filter((v) => v.size.label === selectedVariant.size.label)
    .map((v) => v.color!);

  // All possible images
  const allImages = [
    ...new Set([...selectedVariant.images, ...product.gallery]),
  ];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleSizeChange = (size: Size) => {
    const variant = product.variants.find(
      (v) => v.size.label === size.label && v.color === selectedVariant.color
    );
    if (variant) setSelectedVariant(variant);
  };

  const handleColorChange = (colorName: string) => {
    const variant = product.variants.find(
      (v) =>
        v.color?.name === colorName &&
        v.size.label === selectedVariant.size.label
    );
    if (variant) setSelectedVariant(variant);
  };

  return (
    <div className="container h-fit mx-auto px-4 py-8">
      <div className="h-fit grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image viewer */}
        <div className="h-fit space-y-4 md:sticky md:top-20">
          <div className="relative overflow-hidden rounded-lg">
            {allImages[selectedImageIndex]?.src ? (
              <Image
                width={720}
                height={480}
                src={allImages[selectedImageIndex].src}
                alt={
                  allImages[selectedImageIndex].alt ||
                  `${product.name} ${selectedImageIndex + 1} image`
                }
                className="w-full h-96 lg:h-[600px] object-cover duration-300"
              />
            ) : (
              <span className="w-full h-96 lg:h-[600px] bg-muted flex items-center justify-center">
                <ImageIcon className="h-16 w-16 text-muted-foreground/30" />
              </span>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {allImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                  selectedImageIndex === index
                    ? "border-primary"
                    : "border-border"
                }`}
              >
                {image.src ? (
                  <Image
                    width={80}
                    height={80}
                    src={image.src}
                    alt={image.alt || `${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="w-full h-full bg-muted flex items-center justify-center">
                    <ImageIcon className="h-6 w-6 text-muted-foreground/30" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-light mb-2">{product.name}</h1>
            <div className="text-2xl font-semibold">
              ${selectedVariant.price}
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Sizes */}
          <div>
            <h3 className="font-medium mb-3">Size</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size, idx) => {
                const available = availableSizes.some(
                  (s) => s.label === size.label
                );
                return (
                  <Button
                    key={idx}
                    variant={
                      selectedVariant.size.label === size.label
                        ? "default"
                        : "outline"
                    }
                    onClick={() => handleSizeChange(size)}
                    disabled={!available}
                    className="min-w-12"
                  >
                    {size.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Colors */}
          <div>
            <h3 className="font-medium mb-3">
              Color: {selectedVariant.color?.name}
            </h3>
            <div className="flex gap-2">
              {colors.map((color, idx) => {
                const available = availableColors.includes(color);
                return (
                  <button
                    key={idx}
                    onClick={() => handleColorChange(color.name)}
                    disabled={!available}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedVariant.color === color
                        ? "border-primary"
                        : "border-border"
                    } ${!available ? "opacity-40 cursor-not-allowed" : ""}`}
                    style={{ backgroundColor: color.hex || color.rgba }}
                    title={color.name}
                  />
                );
              })}
            </div>
          </div>


          {/* Actions */}
          <div className="space-y-3 pt-4">
            <AddToCartButton
              productVariant={selectedVariant}
              product={product}
              size="lg"
              variant="glow"
              className="w-full btn-hero"
            >
              Add to Cart
            </AddToCartButton>
            <div className="flex gap-3">
              <Button variant="secondary" size="lg" className="flex-1">
                <Heart className="h-4 w-4 mr-2" />
                Save to Wishlist
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Trust info */}
          <div className="grid grid-cols-1 gap-4 pt-6 border-t">
            <div className="flex items-center gap-3 text-sm">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <span>Free shipping on orders over $75</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <RotateCcw className="h-5 w-5 text-muted-foreground" />
              <span>30-day return policy</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <span>Secure checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full flex *:w-full">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="sizing">Size Guide</TabsTrigger>
            <TabsTrigger value="care">Care</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {product.description}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {product.details}
                </p>

                <div className="w-full flex flex-col gap-small">
                  <h4>Features</h4>
                  <ul className="w-full grid grid-cols-[repeat(auto-fill,_minmax(10rem,1fr))] gap-small">
                    {product.features.map((f, idx) => (
                      <Badge key={idx} className="px-4 py-small">
                        {f}
                      </Badge>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sizing" className="mt-8">
            {product.sizeGuide && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-4">
                    {product.sizeGuide.title}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Measurement Guide</h4>
                      <div className="prose prose-sm text-muted-foreground">
                        <PortableText
                          value={product.sizeGuide.measurementInstructions}
                          components={lBPtComponents("")}
                        />
                      </div>
                      {product.sizeGuide.images?.map((image, index) => (
                        <Image
                          key={index}
                          src={image.src}
                          alt={image.alt}
                          width={300}
                          height={300}
                          className="mt-4 rounded-lg"
                        />
                      ))}
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Size Chart</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">Size</th>
                              <th className="text-left py-2">Chest</th>
                              <th className="text-left py-2">Waist</th>
                              <th className="text-left py-2">Hips</th>
                              {product.sizeGuide.sizeChart.measurements[0]
                                .inseam !== undefined && (
                                <th className="text-left py-2">Inseam</th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {product.sizeGuide.sizeChart.measurements.map(
                              (measurement, index) => (
                                <tr key={index} className="border-b">
                                  <td className="py-2">
                                    {measurement.sizeName}
                                  </td>
                                  <td className="py-2">
                                    {measurement.chest}{" "}
                                    {product.sizeGuide.sizeChart.units}
                                  </td>
                                  <td className="py-2">
                                    {measurement.waist}{" "}
                                    {product.sizeGuide.sizeChart.units}
                                  </td>
                                  <td className="py-2">
                                    {measurement.hips}{" "}
                                    {product.sizeGuide.sizeChart.units}
                                  </td>
                                  {measurement.inseam !== undefined && (
                                    <td className="py-2">
                                      {measurement.inseam}{" "}
                                      {product.sizeGuide.sizeChart.units}
                                    </td>
                                  )}
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="care" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-4">Care Instructions</h3>
                <ul className="flex flex-col gap-small list-disc">
                  {product.careInstructions.map((c, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground">
                      {c}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetailClient;
