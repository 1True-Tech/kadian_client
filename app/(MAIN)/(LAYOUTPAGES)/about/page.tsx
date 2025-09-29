import ServiceFeatures from "@/components/pages/home/features";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Award, Shirt, Leaf } from "lucide-react";

const businessFeatures = [
  {
    title: "Premium Fashion",
    description: "Curated collections of high-quality clothing and accessories for every style.",
    icon: <Shirt />,
  },
  {
    title: "Sustainable Practices",
    description: "Committed to eco-friendly materials and ethical production.",
    icon: <Leaf />,
  },
  {
    title: "Award-Winning Service",
    description: "Recognized for outstanding customer support and satisfaction.",
    icon: <Award />,
  },
  {
    title: "Community Focused",
    description: "Building a fashion community that values creativity and inclusivity.",
    icon: <Users />,
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="heading-section mb-4">About Kadian</h1>
        <p className="text-elegant max-w-2xl mx-auto">
          Kadian is your destination for premium fashion, blending timeless style with modern trends. Our mission is to provide high-quality clothing and accessories while championing sustainability and community values. Discover our story, our values, and what makes us unique.
        </p>
      </div>
      <div className="mb-12">
        <ServiceFeatures items={businessFeatures} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Our Story</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Founded with a passion for fashion and a commitment to quality, Kadian has grown into a trusted brand for those seeking style and substance. We believe in making fashion accessible, sustainable, and enjoyable for everyone.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Contact & Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Have questions or need assistance? Visit our <a href="/contact" className="text-accent underline">Contact page</a> to get in touch. Our team is here to help you with anything you need.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
