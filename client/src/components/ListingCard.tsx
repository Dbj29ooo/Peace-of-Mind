import { Heart, MapPin, Home, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface ListingCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  type: "rental" | "shared" | "sale" | "student";
  rating: number;
  reviewCount: number;
  nearbyResources: number;
  images: string[];
  verified: boolean;
}

export default function ListingCard({
  id,
  title,
  location,
  price,
  type,
  rating,
  reviewCount,
  nearbyResources,
  images,
  verified
}: ListingCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const typeLabels = {
    rental: "Rental",
    shared: "Shared",
    sale: "For Sale",
    student: "Student"
  };

  const typeIcons = {
    rental: Home,
    shared: Users,
    sale: Home,
    student: Home
  };

  const TypeIcon = typeIcons[type];

  return (
    <Card className="overflow-hidden hover-elevate" data-testid={`card-listing-${id}`}>
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={images[currentImageIndex]}
          alt={title}
          className="w-full h-full object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
          onClick={() => setIsFavorite(!isFavorite)}
          data-testid={`button-favorite-${id}`}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-primary text-primary" : ""}`} />
        </Button>
        {verified && (
          <Badge className="absolute top-2 left-2 bg-primary/90 backdrop-blur-sm">
            Verified Safe
          </Badge>
        )}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === currentImageIndex ? "bg-white w-4" : "bg-white/60"
                }`}
                data-testid={`button-image-${id}-${idx}`}
              />
            ))}
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-heading font-semibold text-lg line-clamp-1" data-testid={`text-title-${id}`}>
            {title}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-mono font-semibold text-sm" data-testid={`text-rating-${id}`}>
              {rating.toFixed(1)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <MapPin className="h-3.5 w-3.5" />
          <span className="line-clamp-1" data-testid={`text-location-${id}`}>{location}</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap mb-3">
          <Badge variant="secondary" className="gap-1">
            <TypeIcon className="h-3 w-3" />
            {typeLabels[type]}
          </Badge>
          <Badge variant="outline" className="gap-1">
            {nearbyResources} resources nearby
          </Badge>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="font-mono text-2xl font-bold text-foreground" data-testid={`text-price-${id}`}>
            ${price.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground">
            {type === "sale" ? "total" : "/month"}
          </span>
        </div>
        
        <p className="text-xs text-muted-foreground mt-1" data-testid={`text-reviews-${id}`}>
          {reviewCount} community reviews
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button variant="outline" className="w-full" data-testid={`button-view-${id}`}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
