import ListingCard from '../ListingCard'

export default function ListingCardExample() {
  return (
    <div className="max-w-sm">
      <ListingCard
        id="1"
        title="Modern Studio in Capitol Hill"
        location="Capitol Hill, Seattle, WA"
        price={1200}
        type="rental"
        rating={4.8}
        reviewCount={24}
        nearbyResources={5}
        images={[
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"
        ]}
        verified={true}
      />
    </div>
  )
}
