"use client";
import { useState } from "react";
import { Heart, Share2, Truck, RotateCcw, Shield, Star, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { notFound, useParams } from "next/navigation";
import { mockProducts } from "@/assets/dummy-data/mockData";
import PagesLayout from "@/components/layout/PagesLayout";
import Image from "next/image";

const ProductDetail = () => {
  const { id } = useParams();
  const product = mockProducts.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!product) {
    return notFound();
  }

  const breadcrumbItems = [
    { label: "Shop", href: "/shop" },
    { label: product.category, href: `/category/${product.category}` },
    { label: product.name }
  ];

  return (
    <PagesLayout showBreadcrumbs breadcrumbItems={breadcrumbItems}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                width={720}
                height={480}
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-96 lg:h-[600px] object-cover"
              />
              {product.isNew && (
                <Badge className="absolute top-4 left-4" variant="default">
                  New
                </Badge>
              )}
              {product.isOnSale && (
                <Badge className="absolute top-4 right-4" variant="destructive">
                  Sale
                </Badge>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${selectedImageIndex === index ? 'border-primary' : 'border-border'
                    }`}
                >
                  <Image
                    width={720}
                    height={480}
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-light mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-semibold">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-current text-yellow-400" />
                  <span className="text-sm">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            <div>
              <h3 className="font-medium mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size)}
                    className="min-w-12"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-medium mb-3">Color: {selectedColor}</h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-primary' : 'border-border'
                      }`}
                    style={{
                      backgroundColor: color.toLowerCase() === 'beige' ? '#F5F5DC' : color.toLowerCase()
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
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

            {/* Actions */}
            <div className="space-y-3 pt-4">
              <Button size="lg" className="w-full btn-hero">
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </Button>
              <div className="flex gap-3">
                <Button variant="outline" size="lg" className="flex-1">
                  <Heart className="h-4 w-4 mr-2" />
                  Save to Wishlist
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Features */}
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

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="sizing">Size Guide</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-4">Product Details</h3>
                  <div className="prose prose-sm max-w-none text-muted-foreground">
                    <p>{product.description}</p>
                    <ul className="mt-4 space-y-2">
                      <li>Premium quality materials</li>
                      <li>Carefully crafted construction</li>
                      <li>Designed for comfort and style</li>
                      <li>Machine washable</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sizing" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-4">Size Guide</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Size</th>
                          <th className="text-left py-2">Bust (in)</th>
                          <th className="text-left py-2">Waist (in)</th>
                          <th className="text-left py-2">Hips (in)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2">XS</td>
                          <td className="py-2">32-34</td>
                          <td className="py-2">24-26</td>
                          <td className="py-2">34-36</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">S</td>
                          <td className="py-2">34-36</td>
                          <td className="py-2">26-28</td>
                          <td className="py-2">36-38</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">M</td>
                          <td className="py-2">36-38</td>
                          <td className="py-2">28-30</td>
                          <td className="py-2">38-40</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">L</td>
                          <td className="py-2">38-40</td>
                          <td className="py-2">30-32</td>
                          <td className="py-2">40-42</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-4">Customer Reviews</h3>
                  <div className="space-y-6">
                    {/* Mock Review */}
                    <div className="border-b pb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                          ))}
                        </div>
                        <span className="font-medium">Sarah M.</span>
                        <span className="text-sm text-muted-foreground">Verified Purchase</span>
                      </div>
                      <p className="text-muted-foreground">
                        Absolutely love this piece! The quality is excellent and the fit is perfect.
                        The fabric feels luxurious and the color is exactly as shown.
                      </p>
                    </div>

                    <Button variant="outline" className="w-full">
                      View All Reviews
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PagesLayout>
  );
};

export default ProductDetail;