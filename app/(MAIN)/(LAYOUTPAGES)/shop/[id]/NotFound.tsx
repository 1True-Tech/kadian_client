import PagesLayout from "@/components/layout/PagesLayout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <PagesLayout>
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The product you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button asChild>
          <a href="/shop">Continue Shopping</a>
        </Button>
      </div>
    </PagesLayout>
  );
};

export default NotFound;
