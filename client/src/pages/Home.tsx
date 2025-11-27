import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ListingCard from "@/components/ListingCard";
import ResourceCard from "@/components/ResourceCard";
import ReviewCard from "@/components/ReviewCard";
import SimpleMap from "@/components/SimpleMap";
import EmailCaptureDialog from "@/components/EmailCaptureDialog";

export default function Home() {
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [hasSubmittedEmail, setHasSubmittedEmail] = useState(false);

  useEffect(() => {
    const emailSubmitted = localStorage.getItem("emailSubmitted");
    if (emailSubmitted === "true") {
      setHasSubmittedEmail(true);
    } else {
      setShowEmailDialog(true);
    }
  }, []);

  const handleEmailSubmit = (email: string) => {
    console.log("Email captured:", email);
    localStorage.setItem("emailSubmitted", "true");
    localStorage.setItem("userEmail", email);
    setHasSubmittedEmail(true);
    setShowEmailDialog(false);
  };
  const featuredListings = [
    {
      id: "1",
      title: "Serene Garden Apartment",
      location: "Forest Hills, Portland, OR",
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
      title: "Quiet Retreat Home",
      location: "Peaceful Valley, Boulder, CO",
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
      title: "Mindful Living Space",
      location: "Nature's Edge, Asheville, NC",
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
      name: "Wellness Center & Yoga Studio",
      category: "health" as const,
      distance: "0.3 mi",
      address: "1234 Zen Way, Portland, OR 97214",
      hours: "Mon-Fri 6AM-8PM",
      phone: "(503) 555-0123"
    },
    {
      id: "2",
      name: "Community Garden & Park",
      category: "community" as const,
      distance: "0.5 mi",
      address: "5678 Nature Blvd, Portland, OR 97214",
      hours: "Daily 6AM-Dusk",
      phone: "(503) 555-0456"
    },
    {
      id: "3",
      name: "Meditation & Mindfulness Center",
      category: "support" as const,
      distance: "0.7 mi",
      address: "9101 Peace St, Portland, OR 97214",
      hours: "Mon-Sat 9AM-6PM",
      phone: "(503) 555-0789"
    },
    {
      id: "4",
      name: "Sustainable Living Collective",
      category: "social" as const,
      distance: "0.4 mi",
      address: "2345 Green Way, Portland, OR 97214"
    }
  ];

  const communityReviews = [
    {
      id: "1",
      userName: "Sarah Mitchell",
      rating: 5,
      date: "2 weeks ago",
      review: "Finally found my peace here. The apartment overlooks a beautiful garden, and the neighborhood is incredibly quiet. I've been able to focus on my wellness practice. The landlord is thoughtful and respectful of my quiet time.",
      tags: ["Peaceful", "Garden Views", "Mindful Landlord"],
      helpfulCount: 12
    },
    {
      id: "2",
      userName: "James Park",
      rating: 5,
      date: "1 month ago",
      review: "Living here has transformed my stress levels. The community shares similar values around sustainability and mindful living. Being close to nature trails and the meditation center has been amazing for my well-being.",
      tags: ["Nature Access", "Sustainable", "Great Community"],
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
      <EmailCaptureDialog open={showEmailDialog} onEmailSubmit={handleEmailSubmit} />
      
      <Header />
      
      {hasSubmittedEmail && <HeroSection />}

      {!hasSubmittedEmail && (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="mb-6 bg-primary/10 rounded-full p-6 w-fit mx-auto">
              <svg className="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="font-heading font-bold text-3xl mb-4">Welcome to Zenith</h2>
            <p className="text-muted-foreground text-lg">
              Join our community to discover peaceful rental properties and serene living spaces
            </p>
          </div>
        </div>
      )}

      {hasSubmittedEmail && (
        <>
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="mb-8">
              <h2 className="font-heading font-bold text-3xl mb-2">Featured Properties</h2>
              <p className="text-muted-foreground">Peaceful rental homes in serene locations</p>
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
                <h2 className="font-heading font-bold text-3xl mb-2">Explore Properties & Amenities</h2>
                <p className="text-muted-foreground">Discover peaceful homes and nearby wellness centers</p>
              </div>
              
              <SimpleMap markers={mapMarkers} />
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="mb-8">
              <h2 className="font-heading font-bold text-3xl mb-2">Nearby Wellness & Amenities</h2>
              <p className="text-muted-foreground">Yoga studios, parks, meditation centers, and community spaces</p>
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
                <h2 className="font-heading font-bold text-3xl mb-2">Resident Reviews</h2>
                <p className="text-muted-foreground">Real experiences from residents who've found their zen</p>
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
                Ready to Find Your Zen Sanctuary?
              </h2>
              <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
                Join thousands of people who have found peaceful, serene homes through our curated platform
              </p>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
