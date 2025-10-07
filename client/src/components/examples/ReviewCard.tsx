import ReviewCard from '../ReviewCard'

export default function ReviewCardExample() {
  return (
    <div className="max-w-2xl">
      <ReviewCard
        id="1"
        userName="Alex Rivera"
        rating={5}
        date="2 weeks ago"
        review="This place has been a sanctuary for me. The landlord is incredibly supportive, and I've never felt more at home. The neighborhood is vibrant with plenty of LGBTQ+ friendly spaces nearby."
        tags={["Trans-Friendly", "Safe Neighborhood", "Supportive Landlord"]}
        helpfulCount={12}
      />
    </div>
  )
}
