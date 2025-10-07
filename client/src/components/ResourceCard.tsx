import { MapPin, Clock, Phone, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ResourceCardProps {
  id: string;
  name: string;
  category: "health" | "community" | "support" | "social";
  distance: string;
  address: string;
  hours?: string;
  phone?: string;
}

export default function ResourceCard({
  id,
  name,
  category,
  distance,
  address,
  hours,
  phone
}: ResourceCardProps) {
  const categoryColors = {
    health: "bg-chart-2/10 text-chart-2 border-chart-2/20",
    community: "bg-chart-1/10 text-chart-1 border-chart-1/20",
    support: "bg-chart-3/10 text-chart-3 border-chart-3/20",
    social: "bg-chart-4/10 text-chart-4 border-chart-4/20"
  };

  const categoryLabels = {
    health: "Healthcare",
    community: "Community Center",
    support: "Support Services",
    social: "Social Group"
  };

  return (
    <Card className="hover-elevate" data-testid={`card-resource-${id}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base line-clamp-2 mb-2" data-testid={`text-resource-name-${id}`}>
              {name}
            </h3>
            <Badge variant="outline" className={categoryColors[category]}>
              {categoryLabels[category]}
            </Badge>
          </div>
          <div className="text-right shrink-0">
            <p className="font-mono font-semibold text-sm text-primary" data-testid={`text-distance-${id}`}>
              {distance}
            </p>
            <p className="text-xs text-muted-foreground">away</p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
            <span className="line-clamp-2">{address}</span>
          </div>
          
          {hours && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 shrink-0" />
              <span>{hours}</span>
            </div>
          )}
          
          {phone && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4 shrink-0" />
              <span>{phone}</span>
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
