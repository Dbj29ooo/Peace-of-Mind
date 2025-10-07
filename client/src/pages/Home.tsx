import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ListingCard from "@/components/ListingCard";
import ResourceCard from "@/components/ResourceCard";
import ReviewCard from "@/components/ReviewCard";
import SimpleMap from "@/components/SimpleMap";

export default function Home() {
  const featuredListings = [
    {
      id: "1",
      title: "Modern Studio in Capitol Hill",
      location: "Capitol Hill, Seattle, WA",
      price: 1200,
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
      title: "Spacious Room in Shared House",
      location: "Fremont, Seattle, WA",
      price: 850,
      type: "shared" as const,
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
      title: "Student Housing Near UW",
      location: "University District, Seattle, WA",
      price: 950,
      type: "student" as const,
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
      name: "Rainbow Health Clinic",
      category: "health" as const,
      distance: "0.3 mi",
      address: "1234 Pride Ave, Seattle, WA 98102",
      hours: "Mon-Fri 9AM-5PM",
      phone: "(206) 555-0123"
    },
    {
      id: "2",
      name: "Pride Community Center",
      category: "community" as const,
      distance: "0.5 mi",
      address: "5678 Rainbow Blvd, Seattle, WA 98102",
      hours: "Daily 10AM-8PM",
      phone: "(206) 555-0456"
    },
    {
      id: "3",
      name: "LGBTQ+ Support Services",
      category: "support" as const,
      distance: "0.7 mi",
      address: "9101 Equality St, Seattle, WA 98102",
      hours: "Mon-Sat 9AM-6PM",
      phone: "(206) 555-0789"
    },
    {
      id: "4",
      name: "Queer Social Meetup Group",
      category: "social" as const,
      distance: "0.4 mi",
      address: "2345 Community Way, Seattle, WA 98102"
    }
  ];

  const communityReviews = [
    {
      id: "1",
      userName: "Alex Rivera",
      rating: 5,
      date: "2 weeks ago",
      review: "This place has been a sanctuary for me. The landlord is incredibly supportive, and I've never felt more at home. The neighborhood is vibrant with plenty of LGBTQ+ friendly spaces nearby.",
      tags: ["Trans-Friendly", "Safe Neighborhood", "Supportive Landlord"],
      helpfulCount: 12
    },
    {
      id: "2",
      userName: "Jordan Chen",
      rating: 5,
      date: "1 month ago",
      review: "Amazing community and roommates who truly understand and respect each other. The proximity to the Pride Center has been life-changing for connecting with the community.",
      tags: ["Couples Welcome", "Great Roommates", "Community Connection"],
      helpfulCount: 8
    }
  ];

  const mapMarkers = [
    { id: "1", lat: 47.6062, lng: -122.3321, type: "listing" as const, name: "Modern Studio" },
    { id: "2", lat: 47.6092, lng: -122.3351, type: "listing" as const, name: "Shared Housing" },
    { id: "3", lat: 47.6042, lng: -122.3291, type: "resource" as const, name: "Rainbow Health Clinic" },
    { id: "4", lat: 47.6072, lng: -122.3371, type: "resource" as const, name: "Pride Community Center" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <HeroSection />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h2 className="font-heading font-bold text-3xl mb-2">Featured Listings</h2>
          <p className="text-muted-foreground">Community-verified safe and welcoming spaces</p>
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
            <p className="text-muted-foreground">See where safe housing meets essential community resources</p>
          </div>
          
          <SimpleMap markers={mapMarkers} />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h2 className="font-heading font-bold text-3xl mb-2">Nearby LGBTQ+ Resources</h2>
          <p className="text-muted-foreground">Essential services and community spaces near you</p>
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
            <p className="text-muted-foreground">Real experiences from LGBTQ+ residents</p>
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
            Ready to Find Your Safe Space?
          </h2>
          <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
            Join thousands of LGBTQ+ individuals who have found welcoming homes through our community-driven platform
          </p>
        </div>
      </section>
    </div>
  );
}
