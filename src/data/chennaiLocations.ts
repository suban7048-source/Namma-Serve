export interface ChennaiLocality {
  name: string;
  zone: 'Central Chennai' | 'South Chennai' | 'West Chennai' | 'North Chennai' | 'OMR IT Corridor' | 'ECR Coastal';
  lat: number;
  lng: number;
  pincode: string;
  popular?: boolean;
}

export const CHENNAI_LOCALITIES: ChennaiLocality[] = [
  { name: 'Anna Nagar', zone: 'Central Chennai', lat: 13.0850, lng: 80.2101, pincode: '600040', popular: true },
  { name: 'T. Nagar', zone: 'Central Chennai', lat: 13.0418, lng: 80.2341, pincode: '600017', popular: true },
  { name: 'Adyar', zone: 'South Chennai', lat: 13.0012, lng: 80.2565, pincode: '600020', popular: true },
  { name: 'Velachery', zone: 'South Chennai', lat: 12.9815, lng: 80.2180, pincode: '600042', popular: true },
  { name: 'Mylapore', zone: 'Central Chennai', lat: 13.0368, lng: 80.2676, pincode: '600004', popular: true },
  { name: 'Alwarpet', zone: 'Central Chennai', lat: 13.0337, lng: 80.2497, pincode: '600018', popular: true },
  { name: 'Besant Nagar', zone: 'South Chennai', lat: 13.0003, lng: 80.2667, pincode: '600090', popular: true },
  { name: 'Nungambakkam', zone: 'Central Chennai', lat: 13.0569, lng: 80.2425, pincode: '600034', popular: true },
  { name: 'Kilpauk', zone: 'Central Chennai', lat: 13.0784, lng: 80.2412, pincode: '600010', popular: false },
  { name: 'Egmore', zone: 'Central Chennai', lat: 13.0732, lng: 80.2609, pincode: '600008', popular: false },
  { name: 'Gopalapuram', zone: 'Central Chennai', lat: 13.0504, lng: 80.2520, pincode: '600086', popular: false },
  { name: 'Kodambakkam', zone: 'Central Chennai', lat: 13.0524, lng: 80.2227, pincode: '600024', popular: true },
  { name: 'Vadapalani', zone: 'West Chennai', lat: 13.0500, lng: 80.2121, pincode: '600026', popular: true },
  { name: 'Ashok Nagar', zone: 'Central Chennai', lat: 13.0354, lng: 80.2114, pincode: '600083', popular: false },
  { name: 'KK Nagar', zone: 'Central Chennai', lat: 13.0382, lng: 80.1970, pincode: '600078', popular: false },
  { name: 'Koyambedu', zone: 'West Chennai', lat: 13.0700, lng: 80.1948, pincode: '600107', popular: false },
  { name: 'Porur', zone: 'West Chennai', lat: 13.0382, lng: 80.1565, pincode: '600116', popular: true },
  { name: 'Ramapuram', zone: 'West Chennai', lat: 13.0308, lng: 80.1793, pincode: '600089', popular: false },
  { name: 'Valasaravakkam', zone: 'West Chennai', lat: 13.0403, lng: 80.1724, pincode: '600087', popular: false },
  { name: 'Iyyappanthangal', zone: 'West Chennai', lat: 13.0435, lng: 80.1385, pincode: '600056', popular: false },
  { name: 'Guindy', zone: 'South Chennai', lat: 13.0067, lng: 80.2025, pincode: '600032', popular: true },
  { name: 'Saidapet', zone: 'South Chennai', lat: 13.0213, lng: 80.2231, pincode: '600015', popular: false },
  { name: 'Thiruvanmiyur', zone: 'South Chennai', lat: 12.9830, lng: 80.2594, pincode: '600041', popular: true },
  { name: 'Kotturpuram', zone: 'South Chennai', lat: 13.0180, lng: 80.2427, pincode: '600085', popular: false },
  { name: 'Perungudi', zone: 'OMR IT Corridor', lat: 12.9654, lng: 80.2461, pincode: '600096', popular: true },
  { name: 'Thoraipakkam', zone: 'OMR IT Corridor', lat: 12.9431, lng: 80.2364, pincode: '600097', popular: true },
  { name: 'Sholinganallur', zone: 'OMR IT Corridor', lat: 12.9010, lng: 80.2279, pincode: '600119', popular: true },
  { name: 'Navalur', zone: 'OMR IT Corridor', lat: 12.8458, lng: 80.2265, pincode: '603103', popular: false },
  { name: 'Siruseri', zone: 'OMR IT Corridor', lat: 12.8285, lng: 80.2195, pincode: '603103', popular: false },
  { name: 'Kelambakkam', zone: 'OMR IT Corridor', lat: 12.7871, lng: 80.2185, pincode: '603103', popular: false },
  { name: 'Medavakkam', zone: 'South Chennai', lat: 12.9171, lng: 80.1924, pincode: '600100', popular: true },
  { name: 'Madipakkam', zone: 'South Chennai', lat: 12.9647, lng: 80.1961, pincode: '600091', popular: false },
  { name: 'Pallikaranai', zone: 'South Chennai', lat: 12.9377, lng: 80.2154, pincode: '600100', popular: false },
  { name: 'Tambaram', zone: 'South Chennai', lat: 12.9249, lng: 80.1000, pincode: '600045', popular: true },
  { name: 'Chromepet', zone: 'South Chennai', lat: 12.9516, lng: 80.1462, pincode: '600044', popular: false },
  { name: 'Pallavaram', zone: 'South Chennai', lat: 12.9675, lng: 80.1491, pincode: '600043', popular: false },
  { name: 'Neelankarai', zone: 'ECR Coastal', lat: 12.9492, lng: 80.2575, pincode: '600115', popular: false },
  { name: 'Injambakkam', zone: 'ECR Coastal', lat: 12.9234, lng: 80.2520, pincode: '600115', popular: false },
  { name: 'Ambattur', zone: 'North Chennai', lat: 13.1143, lng: 80.1548, pincode: '600053', popular: false },
  { name: 'Avadi', zone: 'North Chennai', lat: 13.1147, lng: 80.1011, pincode: '600054', popular: false },
  { name: 'Perambur', zone: 'North Chennai', lat: 13.1075, lng: 80.2434, pincode: '600011', popular: false },
  { name: 'Royapettah', zone: 'Central Chennai', lat: 13.0537, lng: 80.2605, pincode: '600014', popular: false },
];

/**
 * Calculates geometric distance between two coordinate pairs in kilometers using Haversine formula
 */
export function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Finds the closest Chennai locality to a given GPS coordinate
 */
export function findClosestChennaiLocality(latitude: number, longitude: number): { locality: ChennaiLocality; distanceKm: number } {
  let closest = CHENNAI_LOCALITIES[0];
  let minDistance = Infinity;

  for (const loc of CHENNAI_LOCALITIES) {
    const dist = getDistanceKm(latitude, longitude, loc.lat, loc.lng);
    if (dist < minDistance) {
      minDistance = dist;
      closest = loc;
    }
  }

  return { locality: closest, distanceKm: Math.round(minDistance * 10) / 10 };
}
