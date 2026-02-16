import { Search, MapPin, DollarSign, Home, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function SearchWidget() {
  const [location, setLocation] = useState("");
  const [housingType, setHousingType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [isAffordableOnly, setIsAffordableOnly] = useState(true);

  const handleSearch = () => {
    console.log("Search triggered:", { location, housingType, priceRange, isAffordableOnly });
  };

  return (
    <div className="bg-card border border-card-border rounded-xl p-4 sm:p-6 shadow-lg space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="City, Neighborhood, or ZIP code"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-9 h-12 text-base rounded-lg border-2 focus-visible:ring-primary"
              data-testid="input-location"
            />
          </div>
        </div>

        <div className="flex gap-2 shrink-0">
          <Select value={housingType} onValueChange={setHousingType}>
            <SelectTrigger className="h-12 w-[140px] md:w-[160px]" data-testid="select-housing-type">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Price</SelectItem>
              <SelectItem value="under-1000">Under $1,000</SelectItem>
              <SelectItem value="1000-1500">$1,000 - $1,500</SelectItem>
              <SelectItem value="1500-2000">$1,500 - $2,000</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className="h-12 w-[140px] md:w-[160px]" data-testid="select-beds">
              <SelectValue placeholder="Beds" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="studio">Studio</SelectItem>
              <SelectItem value="1">1+ Bed</SelectItem>
              <SelectItem value="2">2+ Beds</SelectItem>
              <SelectItem value="3">3+ Beds</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-12 px-4 gap-2" data-testid="button-filters">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filters</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <div className="space-y-4">
                <h4 className="font-heading font-semibold">Additional Filters</h4>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="affordable" 
                    checked={isAffordableOnly} 
                    onCheckedChange={(checked) => setIsAffordableOnly(checked as boolean)}
                  />
                  <Label htmlFor="affordable" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Affordable Housing (HUD/Section 8)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="pet-friendly" />
                  <Label htmlFor="pet-friendly" className="text-sm font-medium leading-none">
                    Pet Friendly
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="laundry" />
                  <Label htmlFor="laundry" className="text-sm font-medium leading-none">
                    In-unit Laundry
                  </Label>
                </div>
                <Button className="w-full mt-2" size="sm">Apply Filters</Button>
              </div>
            </PopoverContent>
          </Popover>

          <Button onClick={handleSearch} className="h-12 px-8 font-semibold shadow-md bg-primary hover:bg-primary/90 transition-all rounded-lg" data-testid="button-search">
            Search
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center text-sm">
        <span className="text-muted-foreground mr-1">Quick filters:</span>
        <Badge 
          variant={isAffordableOnly ? "default" : "secondary"} 
          className="cursor-pointer hover-elevate rounded-full px-3 py-1"
          onClick={() => setIsAffordableOnly(!isAffordableOnly)}
        >
          Affordable Housing
        </Badge>
        <Badge variant="secondary" className="cursor-pointer hover-elevate rounded-full px-3 py-1">Under $1,200</Badge>
        <Badge variant="secondary" className="cursor-pointer hover-elevate rounded-full px-3 py-1">Pet Friendly</Badge>
        <Badge variant="secondary" className="cursor-pointer hover-elevate rounded-full px-3 py-1">Near Transit</Badge>
      </div>
    </div>
  );
}
