import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CategoryShowcase = () => {
  const categories = [
    {
      title: "Women's Collection",
      description: "Elegant pieces for the modern woman",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=800&fit=crop",
      href: "/women",
    },
    {
      title: "Children's Line",
      description: "Comfortable and stylish for little ones",
      image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&h=800&fit=crop",
      href: "/children",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="heading-section mb-4">Shop by Category</h2>
          <p className="text-elegant max-w-2xl mx-auto">
            Explore our thoughtfully designed collections, each crafted with attention to detail and quality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <Card key={category.title} className="card-premium group cursor-pointer hover-lift animate-fade-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <CardContent className="p-0 relative overflow-hidden">
                <div className="relative h-96">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <h3 className="text-2xl font-light mb-2">{category.title}</h3>
                    <p className="text-white/90 mb-4">{category.description}</p>
                    <Button variant="outline" className="btn-ghost-elegant bg-white/10 border-white/30 text-white hover:bg-white/20">
                      Explore Collection
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;