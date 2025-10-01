"use client";
import { lBPtComponents } from "@/components/feautures/PortableText";
import AddToCartButton from "@/components/product/AddToCartButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "@/components/ui/loaders";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserStore } from "@/store/user";
import { ProductReady } from "@/types/product";
import {
  Heart,
  ImageIcon,
  RotateCcw,
  Share2,
  Shield,
  Truck
} from "lucide-react";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ProductDetailClientProps {
  product: ProductReady;
}

const ProductDetailClient = ({ product }: ProductDetailClientProps) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [variantSheetOpen, setVariantSheetOpen] = useState(false);
  const {user} = useUserStore()
  
  useEffect(() => {
    // Simulate loading of product details
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Remove size/color selection logic. Variants are selected directly.

  // All possible images, unique by src
  const allImages = Array.from(
    new Map(
      [...selectedVariant.images, ...product.gallery].map((img) => [img.src, img])
    ).values()
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // No size/color change handlers needed.

  if (isLoading) {
    return (
      <div className="container h-fit mx-auto px-4 py-8 flex justify-center items-center min-h-[600px]">
        <Loader loaderSize="parent" loader="flip-text-loader" text="Loading product details..." />
      </div>
    );
  }

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

          {/* Variant Selector */}
          <div>
            <h3 className="font-medium mb-3">Select Variant</h3>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant, idx) => (
                <Button
                  key={variant.sku + idx}
                  variant={selectedVariant.sku === variant.sku ? "default" : "outline"}
                  onClick={() => setSelectedVariant(variant)}
                  className="min-w-24 flex flex-col items-center"
                >
                  <span className="font-semibold">{variant.sku}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Variant Info Sheet Trigger */}
          <Sheet open={variantSheetOpen} onOpenChange={setVariantSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="secondary" className="mt-2" onClick={() => setVariantSheetOpen(true)}>
                View Variant Info
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="max-w-md w-full rounded-t-2xl">
              <SheetHeader>
                <SheetTitle>Variant Information</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  {selectedVariant.sku && <>
                    <span className="font-medium">SKU:</span>
                    <span>{selectedVariant.sku}</span>
                  </>}
                  {selectedVariant.size?.label && <>
                    <span className="font-medium">Size:</span>
                    <span>{selectedVariant.size.label}</span>
                  </>}
                  {selectedVariant.size?.description && <>
                    <span className="font-medium">Size Description:</span>
                    <span>{selectedVariant.size.description}</span>
                  </>}
                  {selectedVariant.size?.measurements && (
                    <>
                      <span className="font-medium">Measurements:</span>
                      <span>
                        {selectedVariant.size.measurements.chest !== undefined && <>Chest: {selectedVariant.size.measurements.chest}</>}
                        {selectedVariant.size.measurements.waist !== undefined && <>, Waist: {selectedVariant.size.measurements.waist}</>}
                        {selectedVariant.size.measurements.hips !== undefined && <>, Hips: {selectedVariant.size.measurements.hips}</>}
                        {selectedVariant.size.measurements.length !== undefined && <>, Length: {selectedVariant.size.measurements.length}</>}
                      </span>
                    </>
                  )}
                  {selectedVariant.color && <>
                    <span className="font-medium">Color:</span>
                    <span>{selectedVariant.color.name} <span className="inline-block w-4 h-4 rounded-full border ml-2 align-middle" style={{background:selectedVariant.color.hex||selectedVariant.color.rgba}} title={selectedVariant.color.name}></span></span>
                  </>}
                  {selectedVariant.price !== undefined && <>
                    <span className="font-medium">Price:</span>
                    <span>${selectedVariant.price}</span>
                  </>}
                  {selectedVariant.stock !== undefined && <>
                    <span className="font-medium">Stock:</span>
                    <span>{selectedVariant.stock}</span>
                  </>}
                  {selectedVariant.stockThreshold !== undefined && <>
                    <span className="font-medium">Stock Threshold:</span>
                    <span>{selectedVariant.stockThreshold}</span>
                  </>}
                  {selectedVariant.weight && selectedVariant.weight.value !== undefined && selectedVariant.weight.unit && <>
                    <span className="font-medium">Weight:</span>
                    <span>{selectedVariant.weight.value} {selectedVariant.weight.unit}</span>
                  </>}
                </div>
                {selectedVariant.images && selectedVariant.images.length > 0 && (
                  <div>
                    <span className="font-medium block mb-1">Images:</span>
                    <div className="flex gap-2 flex-wrap">
                      {selectedVariant.images.map((img, i) => (
                        <Image key={i} src={img.src} alt={img.alt || ""} width={60} height={60} className="rounded border" />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>


          {/* Actions */}
          {user && (
            <div className="space-y-3 pt-4">
              <AddToCartButton
                productVariant={selectedVariant}
                product={product}
                size="lg"
                variant="glow"
                className="w-full btn-hero"
                cartActionStatus={{
                  onAddStatusChange(status, context) {
                    const toastId = "cart-add-loading";
                    if (status === "loading") {
                      toast.loading("Adding item to cart...", { id: toastId });
                    } else if (status === "success") {
                      toast.dismiss(toastId);
                      toast.success(
                        `${context.quantity} x ${product.name} (${selectedVariant.sku}) added to cart.`,
                        { duration: 4000 }
                      );
                    } else if (status === "error") {
                      toast.dismiss(toastId);
                      toast.error("Failed to add item to cart. Please try again.", { duration: 3500 });
                    }
                  },
                  onRemoveStatusChange(status, context) {
                    const toastId = "cart-remove-loading";
                    if (status === "loading") {
                      toast.loading("Removing item from cart...", { id: toastId });
                    } else if (status === "success") {
                      toast.dismiss(toastId);
                      toast.success(
                        `${context.quantity} x ${product.name} (${selectedVariant.sku}) removed from cart.`,
                        { duration: 4000 }
                      );
                    } else if (status === "error") {
                      toast.dismiss(toastId);
                      toast.error("Failed to remove item from cart. Please try again.", { duration: 3500 });
                    }
                  },
                  onUpdateStatusChange(status, context) {
                    const toastId = "cart-update-loading";
                    if (status === "loading") {
                      toast.loading("Updating cart item...", { id: toastId });
                    } else if (status === "success") {
                      toast.dismiss(toastId);
                      toast.success(
                        `Updated ${product.name} (${selectedVariant.sku}) quantity to ${context.newQuantity}.`,
                        { duration: 4000 }
                      );
                    } else if (status === "error") {
                      toast.dismiss(toastId);
                      toast.error("Failed to update cart item. Please try again.", { duration: 3500 });
                    }
                  },
                }}
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
          )}

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
                            {product.sizeGuide.sizeChart.measurements&&product.sizeGuide.sizeChart.measurements.map(
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
