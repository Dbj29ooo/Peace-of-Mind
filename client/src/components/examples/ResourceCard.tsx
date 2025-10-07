import ResourceCard from '../ResourceCard'

export default function ResourceCardExample() {
  return (
    <div className="max-w-sm">
      <ResourceCard
        id="1"
        name="Rainbow Health Clinic"
        category="health"
        distance="0.3 mi"
        address="1234 Pride Ave, Seattle, WA 98102"
        hours="Mon-Fri 9AM-5PM"
        phone="(206) 555-0123"
      />
    </div>
  )
}
