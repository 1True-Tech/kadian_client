import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface FiltersProps {
  onFiltersChange?: (filters: any) => void;
  className?: string;
}

const FiltersSidebar = ({ onFiltersChange, className = "" }: FiltersProps) => {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const categories = ["Dresses", "Tops", "Bottoms", "Outerwear", "Kids"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = ["Black", "White", "Navy", "Gray", "Beige", "Red", "Blue", "Green"];

  const clearFilters = () => {
    setPriceRange([0, 500]);
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    onFiltersChange?.({
      priceRange: [0, 500],
      categories: [],
      sizes: [],
      colors: []
    });
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const updated = checked 
      ? [...selectedCategories, category]
      : selectedCategories.filter(c => c !== category);
    setSelectedCategories(updated);
    onFiltersChange?.({ categories: updated, sizes: selectedSizes, colors: selectedColors, priceRange });
  };

  return (
    <Card className={`w-full ${className} !border-0 !bg-transparent !shadow-none`}>
      <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-background md:bg-card z-10">
        <CardTitle className="text-lg">Filters</CardTitle>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Price Range */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-0 hover:no-underline">
            <h3 className="font-medium">Price Range</h3>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <div className="space-y-4">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={500}
                min={0}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Categories */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-0 hover:no-underline">
            <h3 className="font-medium">Categories</h3>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) => handleCategoryChange(category, !!checked)}
                  />
                  <Label htmlFor={category} className="text-sm font-normal">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Sizes */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-0 hover:no-underline">
            <h3 className="font-medium">Size</h3>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <div className="grid grid-cols-3 gap-2">
              {sizes.map((size) => (
                <Label
                  key={size}
                  className={`border rounded-md p-2 text-center cursor-pointer transition-colors ${
                    selectedSizes.includes(size)
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={selectedSizes.includes(size)}
                    onChange={(e) => {
                      const updated = e.target.checked 
                        ? [...selectedSizes, size]
                        : selectedSizes.filter(s => s !== size);
                      setSelectedSizes(updated);
                    }}
                  />
                  {size}
                </Label>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Colors */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-0 hover:no-underline">
            <h3 className="font-medium">Color</h3>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <div className="grid grid-cols-4 gap-2">
              {colors.map((color) => (
                <div
                  key={color}
                  className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                    selectedColors.includes(color) ? 'border-primary' : 'border-border'
                  }`}
                  style={{
                    backgroundColor: color.toLowerCase() === 'beige' ? '#F5F5DC' : color.toLowerCase()
                  }}
                  onClick={() => {
                    const updated = selectedColors.includes(color)
                      ? selectedColors.filter(c => c !== color)
                      : [...selectedColors, color];
                    setSelectedColors(updated);
                  }}
                  title={color}
                />
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default FiltersSidebar;