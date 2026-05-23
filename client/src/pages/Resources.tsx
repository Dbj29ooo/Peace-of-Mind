import { useState } from "react";
import Header from "@/components/Header";
import ResourceCard, { type ResourceCategory } from "@/components/ResourceCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Home, UtensilsCrossed, Shirt, Bus, HeartPulse, Briefcase } from "lucide-react";

const allResources = [
  {
    id: "r1",
    name: "City Mission Emergency Shelter",
    category: "shelter" as ResourceCategory,
    distance: "0.3 mi",
    address: "1234 Main St, Seattle, WA 98102",
    hours: "24/7 Emergency Access",
    phone: "(206) 555-0123",
    description: "Emergency overnight shelter with meals, showers, and case management services."
  },
  {
    id: "r2",
    name: "Hope House Transitional Housing",
    category: "shelter" as ResourceCategory,
    distance: "1.2 mi",
    address: "890 Harbor Ave, Seattle, WA 98104",
    hours: "Office: Mon-Fri 8AM-5PM",
    phone: "(206) 555-0190",
    description: "Transitional housing program with up to 24 months of support for families."
  },
  {
    id: "r3",
    name: "Northwest Harvest Food Bank",
    category: "food" as ResourceCategory,
    distance: "0.5 mi",
    address: "5678 Market Blvd, Seattle, WA 98102",
    hours: "Tue-Sat 9AM-4PM",
    phone: "(206) 555-0456",
    description: "Free groceries and fresh produce distribution for individuals and families."
  },
  {
    id: "r4",
    name: "Community Meals Program",
    category: "food" as ResourceCategory,
    distance: "0.8 mi",
    address: "3456 Church St, Seattle, WA 98103",
    hours: "Daily 11AM-1PM, 5PM-7PM",
    phone: "(206) 555-0234",
    description: "Free hot meals served daily, no ID or proof of income required."
  },
  {
    id: "r5",
    name: "WIC Nutrition Center",
    category: "food" as ResourceCategory,
    distance: "1.5 mi",
    address: "7890 Health Way, Seattle, WA 98105",
    hours: "Mon-Fri 8AM-4:30PM",
    phone: "(206) 555-0567",
    description: "Supplemental nutrition program for women, infants, and children."
  },
  {
    id: "r6",
    name: "Goodwill Clothing Center",
    category: "clothing" as ResourceCategory,
    distance: "0.7 mi",
    address: "9101 Commerce St, Seattle, WA 98102",
    hours: "Mon-Sat 9AM-6PM",
    phone: "(206) 555-0789",
    description: "Affordable clothing and household items. Free vouchers available for those in need."
  },
  {
    id: "r7",
    name: "Dress for Success",
    category: "clothing" as ResourceCategory,
    distance: "1.1 mi",
    address: "4567 Professional Dr, Seattle, WA 98104",
    hours: "Mon-Fri 10AM-4PM",
    phone: "(206) 555-0345",
    description: "Free professional attire for job interviews and employment."
  },
  {
    id: "r8",
    name: "Metro Transit Hub",
    category: "transportation" as ResourceCategory,
    distance: "0.2 mi",
    address: "2345 Transit Way, Seattle, WA 98102",
    hours: "5AM-12AM Daily",
    description: "Major bus and light rail connections. Reduced fare programs available."
  },
  {
    id: "r9",
    name: "ORCA Lift Program Office",
    category: "transportation" as ResourceCategory,
    distance: "0.9 mi",
    address: "6789 County Rd, Seattle, WA 98103",
    hours: "Mon-Fri 8:30AM-4:30PM",
    phone: "(206) 555-0678",
    description: "Reduced transit fare cards for qualifying low-income residents."
  },
  {
    id: "r10",
    name: "Community Health Center",
    category: "healthcare" as ResourceCategory,
    distance: "0.6 mi",
    address: "1357 Wellness Blvd, Seattle, WA 98102",
    hours: "Mon-Fri 8AM-6PM, Sat 9AM-1PM",
    phone: "(206) 555-0890",
    description: "Sliding-scale primary care, dental, and mental health services."
  },
  {
    id: "r11",
    name: "Free Clinic of Seattle",
    category: "healthcare" as ResourceCategory,
    distance: "1.3 mi",
    address: "2468 Care St, Seattle, WA 98104",
    hours: "Mon, Wed, Fri 9AM-3PM",
    phone: "(206) 555-0912",
    description: "No-cost medical care for uninsured individuals. Walk-ins welcome."
  },
  {
    id: "r12",
    name: "WorkSource Employment Center",
    category: "employment" as ResourceCategory,
    distance: "0.4 mi",
    address: "3579 Job Lane, Seattle, WA 98102",
    hours: "Mon-Fri 8AM-5PM",
    phone: "(206) 555-0111",
    description: "Free job search assistance, resume help, training programs, and career counseling."
  },
  {
    id: "r13",
    name: "Goodwill Job Training",
    category: "employment" as ResourceCategory,
    distance: "1.0 mi",
    address: "8642 Skills Ave, Seattle, WA 98103",
    hours: "Mon-Fri 9AM-4PM",
    phone: "(206) 555-0222",
    description: "Vocational training, digital literacy classes, and job placement services."
  }
];

const categoryFilters: { value: ResourceCategory | "all"; label: string; icon: typeof Home }[] = [
  { value: "all", label: "All", icon: MapPin },
  { value: "shelter", label: "Shelters", icon: Home },
  { value: "food", label: "Food Banks", icon: UtensilsCrossed },
  { value: "clothing", label: "Clothing", icon: Shirt },
  { value: "transportation", label: "Transportation", icon: Bus },
  { value: "healthcare", label: "Healthcare", icon: HeartPulse },
  { value: "employment", label: "Employment", icon: Briefcase },
];

export default function Resources() {
  const [searchLocation, setSearchLocation] = useState("");
  const [activeCategory, setActiveCategory] = useState<ResourceCategory | "all">("all");

  const filteredResources = allResources.filter((r) => {
    if (activeCategory !== "all" && r.category !== activeCategory) return false;
    if (searchLocation) {
      const query = searchLocation.toLowerCase();
      return (
        r.name.toLowerCase().includes(query) ||
        r.address.toLowerCase().includes(query) ||
        r.description?.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const resourceCounts = allResources.reduce<Record<string, number>>((acc, r) => {
    acc[r.category] = (acc[r.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="bg-gradient-to-br from-primary/10 via-background to-chart-2/5 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl mb-4">
            Community Resources
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            Find shelters, food banks, clothing centers, transportation, healthcare, and employment services near you.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, address, or keyword"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="pl-9 h-12 text-base"
                data-testid="input-resource-search"
              />
            </div>
            <Button className="h-12 px-6 gap-2" data-testid="button-resource-search">
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {categoryFilters.map((filter) => {
            const Icon = filter.icon;
            const isActive = activeCategory === filter.value;
            const count = filter.value === "all" ? allResources.length : (resourceCounts[filter.value] || 0);
            return (
              <Badge
                key={filter.value}
                variant={isActive ? "default" : "secondary"}
                className="cursor-pointer gap-1.5 px-3 py-1.5 text-sm rounded-full"
                onClick={() => setActiveCategory(filter.value)}
                data-testid={`filter-${filter.value}`}
              >
                <Icon className="h-3.5 w-3.5" />
                {filter.label}
                <span className="ml-0.5 text-xs opacity-70">({count})</span>
              </Badge>
            );
          })}
        </div>

        {filteredResources.length === 0 ? (
          <div className="text-center py-16" data-testid="text-empty-state">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground/40" />
            <h3 className="font-heading font-semibold text-xl mb-2">No Resources Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or selecting a different category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} {...resource} />
            ))}
          </div>
        )}

        <div className="mt-8 text-sm text-muted-foreground text-center" data-testid="text-resource-count">
          Showing {filteredResources.length} of {allResources.length} resources
        </div>
      </div>
    </div>
  );
}
