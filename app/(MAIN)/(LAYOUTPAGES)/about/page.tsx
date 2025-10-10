// app/about/page.tsx
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Users, Award, Shirt, Leaf } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Kadian Fashion",
  description:
    "Learn about Kadian Fashion, a premium clothing brand with 10+ years of experience in delivering quality, style, and fashion expertise. Connect with us for consultations.",
};

const businessFeatures = [
  {
    title: "Premium Fashion",
    description:
      "Curated collections of high-quality clothing and accessories for every style.",
    icon: <Shirt className="w-8 h-8 text-blue-500" />,
  },
  {
    title: "Sustainable Practices",
    description: "Committed to eco-friendly materials and ethical production.",
    icon: <Leaf className="w-8 h-8 text-green-500" />,
  },
  {
    title: "Award-Winning Service",
    description:
      "Recognized for outstanding customer support and satisfaction.",
    icon: <Award className="w-8 h-8 text-yellow-500" />,
  },
  {
    title: "Community Focused",
    description:
      "Building a fashion community that values creativity and inclusivity.",
    icon: <Users className="w-8 h-8 text-purple-500" />,
  },
];

export default function AboutPage() {
  return (
    <main className="flex flex-col gap-24 py-16 px-4 sm:px-6 md:px-12 lg:px-24">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-cinzel font-bold tracking-wide">
          About Kadian Fashion
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg md:text-xl font-light max-w-xl">
          Elevating fashion for over a decade. Quality, style, and innovation in
          every stitch.
        </p>
        <div className="w-full max-w-full overflow-hidden rounded-3xl shadow-lg mt-6">
          <Image
            src="/images/content/image (1).jpg"
            alt="Kadian Fashion Store"
            width={1200}
            loading="lazy"
            height={600}
            className="w-full h-auto max-h-[30vh] object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </section>

      {/* Core Features */}
      <section className="max-w-6xl mx-auto flex flex-col gap-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wide text-center">
          Why Choose Kadian
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {businessFeatures.map((feature, idx) => (
            <Card
              key={idx}
              className="flex flex-col items-center gap-4 p-4 sm:p-6 text-center hover:scale-105 transition-transform duration-300 shadow-md"
            >
              {feature.icon}
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm sm:text-base">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-3xl sm:max-w-4xl mx-auto flex flex-col gap-6 sm:gap-8 px-2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wide text-center">
          Our Story
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed text-center">
          Kadian Fashion started 10 years ago with a simple vision: to bring
          high-quality, stylish clothing to everyone who values elegance and
          individuality. From our humble beginnings in a small boutique, we have
          grown into a trusted name in fashion.
        </p>
        <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed text-center">
          Our designers, tailors, and stylists ensure every piece meets our
          strict standards. We are committed to creating fashion experiences
          that inspire confidence and self-expression.
        </p>
      </section>

      {/* Our Mission */}
      <section className="max-w-3xl sm:max-w-4xl mx-auto text-center flex flex-col gap-4 sm:gap-6 px-2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wide">
          Our Mission
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
          We aim to make fashion an experience, not just clothing. By merging
          creativity, quality, and expertise, Kadian Fashion empowers you to
          express your personality with confidence and elegance.
        </p>
      </section>

      {/* Call to Action */}
      <section className="max-w-2xl sm:max-w-3xl mx-auto text-center flex flex-col gap-4 sm:gap-6 px-2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wide">
          Want Personalized Advice?
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
          Reach out to our fashion experts for a personalized consultation and
          style guidance. We’ll help you curate your perfect wardrobe.
        </p>
        <Button
          asChild
          size="lg"
          className={cn(
            "mx-auto mt-4 bg-black text-white hover:bg-gray-900 transition-colors"
          )}
        >
          <Link href="/contact">Book a Consultation</Link>
        </Button>
      </section>
    </main>
  );
}
