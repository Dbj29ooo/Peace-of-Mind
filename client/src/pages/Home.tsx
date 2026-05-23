import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ListingCard from "@/components/ListingCard";
import ResourceCard from "@/components/ResourceCard";
import ReviewCard from "@/components/ReviewCard";
import SimpleMap from "@/components/SimpleMap";
import EmailCaptureDialog from "@/components/EmailCaptureDialog";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user && !user.onboardingCompleted) {
      setLocation("/onboarding");
    }
  }, [isAuthenticated, user, setLocation]);

  const showLoginDialog = !isLoading && !isAuthenticated && !dismissed;

  const featuredListings = [
    {
      id: "1",
      title: "Affordable Studio near Downtown",
      location: "Capitol Hill, Seattle, WA",
      price: 950,
      type: "rental" as const,
      rating: 4.8,
      reviewCount: 24,
      nearbyResources: 5,
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"
      ],
      verified: true
    },
    {
      id: "2",
      title: "HUD-Supported 2BR Apartment",
      location: "Fremont, Seattle, WA",
      price: 650,
      type: "section8" as const,
      rating: 4.9,
      reviewCount: 31,
      nearbyResources: 8,
      images: [
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800"
      ],
      verified: true
    },
    {
      id: "3",
      title: "Income-Based Senior Housing",
      location: "University District, Seattle, WA",
      price: 750,
      type: "senior" as const,
      rating: 4.6,
      reviewCount: 18,
      nearbyResources: 3,
      images: [
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800"
      ],
      verified: false
    }
  ];

  const nearbyResources = [
    {
      id: "1",
      name: "City Mission Shelter",
      category: "shelter" as const,
      distance: "0.3 mi",
      address: "1234 Main St, Seattle, WA 98102",
      hours: "24/7 Emergency Access",
      phone: "(206) 555-0123"
    },
    {
      id: "2",
      name: "Northwest Harvest Food Bank",
      category: "food" as const,
      distance: "0.5 mi",
      address: "5678 Market Blvd, Seattle, WA 98102",
      hours: "Tue-Sat 9AM-4PM",
      phone: "(206) 555-0456"
    },
    {
      id: "3",
      name: "Goodwill Clothing Center",
      category: "clothing" as const,
      distance: "0.7 mi",
      address: "9101 Commerce St, Seattle, WA 98102",
      hours: "Mon-Sat 9AM-6PM",
      phone: "(206) 555-0789"
    },
    {
      id: "4",
      name: "Metro Transit Hub",
      category: "transportation" as const,
      distance: "0.2 mi",
      address: "2345 Transit Way, Seattle, WA 98102"
    }
  ];

  const communityReviews = [
    {
      id: "1",
      userName: "Maria Garcia",
      rating: 5,
      date: "2 weeks ago",
      review: "This apartment complex was a lifesaver during our relocation. The Section 8 application process was straightforward, and the management helped us connect with local food banks and transit options.",
      tags: ["Affordable", "Helpful Management", "Near Transit"],
      helpfulCount: 12
    },
    {
      id: "2",
      userName: "James Wilson",
      rating: 5,
      date: "1 month ago",
      review: "After months of searching, HomeBase helped me find an income-based apartment close to public transportation and a food bank. The neighborhood is safe and the community is welcoming.",
      tags: ["Section 8 Accepted", "Safe Area", "Near Resources"],
      helpfulCount: 8
    }
  ];

  const mapMarkers = [
    { id: "1", lat: 47.6062, lng: -122.3321, type: "listing" as const, name: "Affordable Studio" },
    { id: "2", lat: 47.6092, lng: -122.3351, type: "listing" as const, name: "HUD-Supported 2BR" },
    { id: "3", lat: 47.6042, lng: -122.3291, type: "resource" as const, name: "City Mission Shelter" },
    { id: "4", lat: 47.6072, lng: -122.3371, type: "resource" as const, name: "Northwest Harvest Food Bank" },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <EmailCaptureDialog open={showLoginDialog} onClose={() => setDismissed(true)} />
      
      <div className={showLoginDialog ? "blur-sm pointer-events-none select-none" : ""}>
        <Header />
        
        <HeroSection />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-8">
            <h2 className="font-heading font-bold text-3xl mb-2">Featured Listings</h2>
            <p className="text-muted-foreground">Verified affordable housing and HUD-supported options</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredListings.map((listing) => (
              <ListingCard key={listing.id} {...listing} />
            ))}
          </div>
        </section>

        <section className="bg-muted/30 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="font-heading font-bold text-3xl mb-2">Explore Listings & Resources</h2>
              <p className="text-muted-foreground">See where affordable housing meets essential community resources</p>
            </div>
            
            <SimpleMap markers={mapMarkers} />
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
            <div>
              <h2 className="font-heading font-bold text-3xl mb-2">Nearby Resources</h2>
              <p className="text-muted-foreground">Shelters, food banks, clothing, and transportation near you</p>
            </div>
            <Link href="/resources">
              <Button variant="outline" className="gap-2" data-testid="link-view-all-resources">
                View All Resources
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nearbyResources.map((resource) => (
              <ResourceCard key={resource.id} {...resource} />
            ))}
          </div>
        </section>

        <section className="bg-muted/30 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="font-heading font-bold text-3xl mb-2">Community Reviews</h2>
              <p className="text-muted-foreground">Real experiences from residents who relocated affordably</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {communityReviews.map((review) => (
                <ReviewCard key={review.id} {...review} />
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-br from-primary/10 to-chart-2/10 rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4">
              Ready to Find Affordable Housing?
            </h2>
            <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
              Join thousands of families who have found affordable homes and essential relocation resources through HomeBase
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
