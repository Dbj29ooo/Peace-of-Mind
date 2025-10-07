import SimpleMap from '../SimpleMap'

export default function SimpleMapExample() {
  const markers = [
    { id: "1", lat: 47.6062, lng: -122.3321, type: "listing" as const, name: "Modern Studio" },
    { id: "2", lat: 47.6092, lng: -122.3351, type: "listing" as const, name: "Shared Housing" },
    { id: "3", lat: 47.6042, lng: -122.3291, type: "resource" as const, name: "Rainbow Health Clinic" },
    { id: "4", lat: 47.6072, lng: -122.3371, type: "resource" as const, name: "Pride Community Center" },
  ];

  return <SimpleMap markers={markers} />
}
