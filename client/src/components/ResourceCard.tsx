import { MapPin, Clock, Phone, ExternalLink, Home, UtensilsCrossed, Shirt, Bus, HeartPulse, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type ResourceCategory = "shelter" | "food" | "clothing" | "transportation" | "healthcare" | "employment";

interface ResourceCardProps {
  id: string;
  name: string;
  category: ResourceCategory;
  distance: string;
  address: string;
  hours?: string;
  phone?: string;
  description?: string;
}

const categoryConfig: Record<ResourceCategory, { label: string; icon: typeof Home; colorClass: string }> = {
  shelter: { label: "Shelter", icon: Home, colorClass: "bg-chart-1/10 text-chart-1 border-chart-1/20" },
  food: { label: "Food Bank", icon: UtensilsCrossed, colorClass: "bg-chart-2/10 text-chart-2 border-chart-2/20" },
  clothing: { label: "Clothing", icon: Shirt, colorClass: "bg-chart-3/10 text-chart-3 border-chart-3/20" },
  transportation: { label: "Transportation", icon: Bus, colorClass: "bg-chart-4/10 text-chart-4 border-chart-4/20" },
  healthcare: { label: "Healthcare", icon: HeartPulse, colorClass: "bg-chart-5/10 text-chart-5 border-chart-5/20" },
  employment: { label: "Employment", icon: Briefcase, colorClass: "bg-primary/10 text-primary border-primary/20" },
};

export default function ResourceCard({
  id,
  name,
  category,
  distance,
  address,
  hours,
  phone,
  description
}: ResourceCardProps) {
  const config = categoryConfig[category];
  const CategoryIcon = config.icon;

  return (
    <Card className="hover-elevate" data-testid={`card-resource-${id}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <div className={`rounded-md p-1.5 ${config.colorClass}`}>
                <CategoryIcon className="h-4 w-4" />
              </div>
              <h3 className="font-semibold text-base line-clamp-2" data-testid={`text-resource-name-${id}`}>
                {name}
              </h3>
            </div>
            <Badge variant="outline" className={config.colorClass}>
              {config.label}
            </Badge>
          </div>
          <div className="text-right shrink-0">
            <p className="font-mono font-semibold text-sm text-primary" data-testid={`text-distance-${id}`}>
              {distance}
            </p>
            <p className="text-xs text-muted-foreground">away</p>
          </div>
        </div>

        {description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2" data-testid={`text-resource-description-${id}`}>{description}</p>
        )}

        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
            <span className="line-clamp-2" data-testid={`text-resource-address-${id}`}>{address}</span>
          </div>
          
          {hours && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 shrink-0" />
              <span data-testid={`text-resource-hours-${id}`}>{hours}</span>
            </div>
          )}
          
          {phone && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4 shrink-0" />
              <span data-testid={`text-resource-phone-${id}`}>{phone}</span>
            </div>
          )}
        </div>

        <Button variant="outline" size="sm" className="w-full mt-4 gap-2" data-testid={`button-view-map-${id}`}>
          <ExternalLink className="h-3.5 w-3.5" />
          View on Map
        </Button>
      </CardContent>
    </Card>
  );
}
