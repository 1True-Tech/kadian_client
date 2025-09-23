import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function SizeGuideSkeleton() {
  return (
    <section className="py-16">
      <div className="px-container">
        <div className="text-center mb-12 animate-fade-up">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-5 w-96 mx-auto" />
        </div>

        <div className="grid gap-12">
          {[1, 2].map((index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Image Skeleton */}
                  <div className="md:w-1/3">
                    <Skeleton className="aspect-[3/4] rounded-lg w-full" />
                  </div>

                  {/* Size Chart Skeleton */}
                  <div className="md:w-2/3 space-y-6">
                    <div>
                      <Skeleton className="h-8 w-48 mb-2" />
                      <Skeleton className="h-4 w-32" />
                    </div>

                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                      <Skeleton className="h-4 w-4/6" />
                    </div>

                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            {[1, 2, 3, 4, 5].map((cell) => (
                              <TableHead key={cell}>
                                <Skeleton className="h-4 w-16" />
                              </TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[1, 2, 3].map((row) => (
                            <TableRow key={row}>
                              {[1, 2, 3, 4, 5].map((cell) => (
                                <TableCell key={cell}>
                                  <Skeleton className="h-4 w-12" />
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}