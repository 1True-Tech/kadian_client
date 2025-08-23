import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-md mx-auto">
        <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
        <h1 className="text-2xl font-light mb-4">Your wishlist is empty</h1>
        <p className="text-muted-foreground mb-8">
          Save items you love for later by clicking the heart icon.
        </p>
        <Button asChild size="lg" className="btn-hero">
          <Link href="/shop">Start Shopping</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
