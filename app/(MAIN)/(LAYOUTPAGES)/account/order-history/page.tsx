"use client";
import OrderHistoryItem from "@/components/pages/account/OrderHistoryItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "@/components/ui/loaders";
import { useUserStore } from "@/store/user";
import { useState } from "react";

export default function Page() {
  const { user } = useUserStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const ordersPerPage = 5;

  if (!user) return null;
  const { orders = [] } = user;

  // Calculate pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handlePageChange = (pageNumber: number) => {
    setIsLoading(true);
    setCurrentPage(pageNumber);
    // Simulate loading for better UX
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <main className="w-full">
      <Card className="!bg-transparent !shadow-none !border-none !p-0">
        <CardContent className="!px-0">
          {isLoading ? (
            <div className="flex justify-center py-10">
              <Loader loaderSize="parent" loader="flip-text-loader" text="Loading orders..." />
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {currentOrders.length > 0 ? (
                  currentOrders.map((order, idx) => (
                    <OrderHistoryItem key={idx} {...order} />
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No orders found</p>
                  </div>
                )}
              </div>
              
              {totalPages > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  ))}
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
