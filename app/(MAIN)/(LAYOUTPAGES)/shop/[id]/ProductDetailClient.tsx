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

interface ProductDetailClientProps {
  product: ProductReady;
}

const ProductDetailClient = ({ product }: ProductDetailClientProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<Size>(
    product.variants[0].size
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.variants[0].color
  );
  const [quantity, setQuantity] = useState(1);

  const allImages = [...new Set([
    ...product.variants.flatMap((v) => v.images),
    ...product.gallery,
  ])];
  const sizes = [...new Set(product.variants.map((v) => v.size))];
  const colors = [...new Set(product.variants.map((v) => v.color))];
  const selectedVariant =
    product.variants.find(
      (v) => v.size === selectedSize && v.color === selectedColor
    ) || product.variants[0];

  return (
    <div className="container h-fit mx-auto px-4 py-8">
      <div className="h-fit grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="h-fit space-y-4 md:sticky md:top-20">
          <div className="relative overflow-hidden rounded-lg">
            {allImages[selectedImageIndex].src ? (
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
              <span className="w-full h-96 lg:h-[600px] duration-300 bg-muted flex items-center justify-center">
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
                    width={720}
                    height={480}
                    src={image.src}
                    alt={image.alt || `${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="w-full h-full bg-muted flex items-center justify-center">
                    <ImageIcon className="h-16 w-16 text-muted-foreground/30" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

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

          <div>
            <h3 className="font-medium mb-3">Size</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <Button
                  key={size.label}
                  variant={selectedSize === size ? "default" : "outline"}
                  onClick={() => setSelectedSize(size)}
                  className="min-w-12"
                >
                  {size.label}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Color: {selectedColor}</h3>
            <div className="flex gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color ? "border-primary" : "border-border"
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Quantity</h3>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-4 py-2 border rounded-md min-w-16 text-center">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <Button size="lg" variant="glow" className="w-full btn-hero">
              Add to Cart - ${(selectedVariant.price * quantity).toFixed(2)}
            </Button>
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
                  {product.features.map((f, idx) => <Badge key={idx} className="px-4 py-small">{f}</Badge>)}
                </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sizing" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-4">{product.sizeGuide.title}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Measurement Guide</h4>
                    <div className="prose prose-sm text-muted-foreground">
                      {}
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
                                <td className="py-2">{measurement.sizeName}</td>
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
