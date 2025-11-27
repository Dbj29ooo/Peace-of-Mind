import { Leaf, Users, MapPin } from "lucide-react";
import SearchWidget from "./SearchWidget";

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/5 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Leaf className="h-4 w-4" />
              10,000+ Peaceful Homes
            </div>
            
            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight">
              Discover Your{" "}
              <span className="text-primary">Zen Sanctuary</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Find serene rental properties in peaceful neighborhoods. Curated spaces designed for mindful living, tranquility, and personal growth.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-lg p-2.5">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Verified Reviews</p>
                  <p className="text-sm text-muted-foreground">Real experiences from residents</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-secondary/10 rounded-lg p-2.5">
                  <MapPin className="h-5 w-5 text-chart-2" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Peaceful Locations</p>
                  <p className="text-sm text-muted-foreground">Near parks, quiet areas & wellness centers</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
              <div className="text-center p-8">
                <Leaf className="h-24 w-24 mx-auto mb-4 text-primary/40" />
                <p className="text-muted-foreground">Tranquil & Serene Living</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <SearchWidget />
        </div>
      </div>
    </div>
  );
}
