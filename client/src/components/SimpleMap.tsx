import { MapPin, Home } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  type: "listing" | "resource";
  name: string;
}

interface SimpleMapProps {
  markers: MapMarker[];
  center?: { lat: number; lng: number };
}

export default function SimpleMap({ markers, center }: SimpleMapProps) {
  const defaultCenter = center || { lat: 47.6062, lng: -122.3321 };

  const normalizeCoord = (value: number, min: number, max: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  const latitudes = markers.map(m => m.lat);
  const longitudes = markers.map(m => m.lng);
  const minLat = Math.min(...latitudes, defaultCenter.lat - 0.05);
  const maxLat = Math.max(...latitudes, defaultCenter.lat + 0.05);
  const minLng = Math.min(...longitudes, defaultCenter.lng - 0.05);
  const maxLng = Math.max(...longitudes, defaultCenter.lng + 0.05);

  return (
    <Card className="overflow-hidden">
      <div className="relative w-full aspect-[16/9] bg-muted">
        <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted-foreground/5 to-muted" />
        
        <div className="absolute inset-0 opacity-10">
          {[...Array(8)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute w-full border-t border-border"
              style={{ top: `${(i + 1) * 12.5}%` }}
            />
          ))}
          {[...Array(8)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute h-full border-l border-border"
              style={{ left: `${(i + 1) * 12.5}%` }}
            />
          ))}
        </div>

        {markers.map((marker) => {
          const x = normalizeCoord(marker.lng, minLng, maxLng);
          const y = 100 - normalizeCoord(marker.lat, minLat, maxLat);
          
          return (
            <div
              key={marker.id}
              className="absolute -translate-x-1/2 -translate-y-full group cursor-pointer"
              style={{ left: `${x}%`, top: `${y}%` }}
              data-testid={`marker-${marker.id}`}
            >
              {marker.type === "listing" ? (
                <div className="bg-primary text-primary-foreground rounded-full p-2 shadow-lg hover-elevate border-2 border-background">
                  <Home className="h-4 w-4" />
                </div>
              ) : (
                <div className="bg-chart-2 text-white rounded-full p-2 shadow-lg hover-elevate border-2 border-background">
                  <MapPin className="h-4 w-4" />
                </div>
              )}
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-popover-border">
                {marker.name}
              </div>
            </div>
          );
        })}

        <div className="absolute bottom-2 left-2 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-md text-xs flex items-center gap-4 border border-border">
          <div className="flex items-center gap-1.5">
            <div className="bg-primary rounded-full p-1">
              <Home className="h-2.5 w-2.5 text-primary-foreground" />
            </div>
            <span>Listings</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="bg-chart-2 rounded-full p-1">
              <MapPin className="h-2.5 w-2.5 text-white" />
            </div>
            <span>Resources</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
