import { Search, MapPin, DollarSign, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export default function SearchWidget() {
  const [location, setLocation] = useState("");
  const [housingType, setHousingType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSearch = () => {
    console.log("Search triggered:", { location, housingType, priceRange });
  };

  return (
    <div className="bg-card border border-card-border rounded-xl p-4 sm:p-6 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <label className="text-sm font-medium mb-2 block text-foreground">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="City or ZIP code"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-9"
              data-testid="input-location"
            />
          </div>
        </div>

        <div className="md:col-span-1">
          <label className="text-sm font-medium mb-2 block text-foreground">Housing Type</label>
          <Select value={housingType} onValueChange={setHousingType}>
            <SelectTrigger data-testid="select-housing-type">
              <Home className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="rental">Rental/Apartment</SelectItem>
              <SelectItem value="shared">Shared Housing</SelectItem>
              <SelectItem value="sale">For Sale</SelectItem>
              <SelectItem value="student">Student Housing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-1">
          <label className="text-sm font-medium mb-2 block text-foreground">Price Range</label>
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger data-testid="select-price-range">
              <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Any price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Price</SelectItem>
              <SelectItem value="0-500">$0 - $500</SelectItem>
              <SelectItem value="500-1000">$500 - $1,000</SelectItem>
              <SelectItem value="1000-1500">$1,000 - $1,500</SelectItem>
              <SelectItem value="1500+">$1,500+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-1 flex items-end">
          <Button onClick={handleSearch} className="w-full gap-2" data-testid="button-search">
            <Search className="h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
