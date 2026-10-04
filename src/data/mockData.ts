import {
  ServiceCategory, Provider, Booking, Message, AppNotification,
  Warranty, Complaint, Offer, ChennaiArea
} from '../types';

export const chennaiAreas: ChennaiArea[] = [
  { name: 'Anna Nagar', pincode: '600040', lat: 13.0850, lng: 80.2101 },
  { name: 'T. Nagar', pincode: '600017', lat: 13.0418, lng: 80.2341 },
  { name: 'Adyar', pincode: '600020', lat: 13.0067, lng: 80.2572 },
  { name: 'Velachery', pincode: '600042', lat: 12.9815, lng: 80.2209 },
  { name: 'Tambaram', pincode: '600045', lat: 12.9249, lng: 80.1000 },
  { name: 'OMR', pincode: '600119', lat: 12.8990, lng: 80.2295 },
  { name: 'Sholinganallur', pincode: '600119', lat: 12.8996, lng: 80.2272 },
  { name: 'Perungudi', pincode: '600096', lat: 12.9647, lng: 80.2401 },
  { name: 'Guindy', pincode: '600032', lat: 13.0067, lng: 80.2143 },
  { name: 'Porur', pincode: '600116', lat: 13.0359, lng: 80.1573 },
  { name: 'Ambattur', pincode: '600053', lat: 13.1143, lng: 80.1548 },
  { name: 'Thoraipakkam', pincode: '600097', lat: 12.9388, lng: 80.2317 },
  { name: 'Medavakkam', pincode: '600100', lat: 12.9230, lng: 80.2000 },
  { name: 'Pallavaram', pincode: '600043', lat: 12.9675, lng: 80.1491 },
  { name: 'Chromepet', pincode: '600044', lat: 12.9516, lng: 80.1462 },
];

export const mockCategories: ServiceCategory[] = [
  {
    id: 'ac-repair',
    name: 'AC Repair & Service',
    nameTa: 'AC பழுது & சேவை',
    iconName: 'Wind',
    count: 76,
    description: 'AC servicing, gas refill, PCB repair, and installation.',
    popularServices: ['AC Annual Service', 'Gas Refill', 'AC Installation', 'PCB Repair'],
    color: 'bg-brand-50 text-ns-primary border-brand-200',
    isEmergency: true,
  },
  {
    id: 'electrical',
    name: 'Electrical',
    nameTa: 'மின்சாரம்',
    iconName: 'Zap',
    count: 98,
    description: 'Wiring, switchboard repair, MCB, and fan installation.',
    popularServices: ['Switchboard Repair', 'Fan Installation', 'MCB Repair', 'Wiring'],
    color: 'bg-brand-50 text-ns-primary border-brand-200',
    isEmergency: true,
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    nameTa: 'குழாய் வேலை',
    iconName: 'Wrench',
    count: 142,
    description: 'Leak fixes, tap repair, pipe replacement, and drain cleaning.',
    popularServices: ['Tap Repair', 'Drain Cleaning', 'Pipe Leak Fix', 'Toilet Repair'],
    color: 'bg-brand-50 text-ns-primary border-brand-200',
    isEmergency: true,
  },
  {
    id: 'cleaning',
    name: 'Cleaning',
    nameTa: 'சுத்தப்படுத்துதல்',
    iconName: 'Sparkles',
    count: 215,
    description: 'Deep home cleaning, bathroom, kitchen, and sofa cleaning.',
    popularServices: ['Deep Home Cleaning', 'Bathroom Cleaning', 'Kitchen Cleaning', 'Sofa Cleaning'],
    color: 'bg-brand-50 text-ns-primary border-brand-200',
  },
  {
    id: 'appliance-repair',
    name: 'Appliance Repair',
    nameTa: 'உபகரண பழுது',
    iconName: 'Settings',
    count: 84,
    description: 'Fridge, washing machine, dishwasher, and microwave repair.',
    popularServices: ['Fridge Repair', 'Washing Machine Repair', 'Microwave Repair', 'Dishwasher Fix'],
    color: 'bg-brand-50 text-ns-primary border-brand-200',
    isEmergency: true,
  },
  {
    id: 'carpenter',
    name: 'Carpenter',
    nameTa: 'தச்சர்',
    iconName: 'Hammer',
    count: 65,
    description: 'Furniture repair, door fitting, cupboard and shelf work.',
    popularServices: ['Door Repair', 'Furniture Assembly', 'Wardrobe Fix', 'Shelf Installation'],
    color: 'bg-brand-50 text-ns-primary border-brand-200',
  },
  {
    id: 'painting',
    name: 'Painting',
    nameTa: 'வண்ணம் பூசுதல்',
    iconName: 'Paintbrush',
    count: 110,
    description: 'Interior and exterior painting, waterproofing, and texture.',
    popularServices: ['Room Painting', 'Exterior Paint', 'Waterproofing', 'Texture Painting'],
    color: 'bg-brand-50 text-ns-primary border-brand-200',
  },
  {
    id: 'pest-control',
    name: 'Pest Control',
    nameTa: 'பூச்சி கட்டுப்பாடு',
    iconName: 'Bug',
    count: 58,
    description: 'Cockroach, rat, termite, and mosquito treatment.',
    popularServices: ['Cockroach Treatment', 'Rat Control', 'Termite Treatment', 'Mosquito Spray'],
    color: 'bg-brand-50 text-ns-primary border-brand-200',
  },
  {
    id: 'home-maintenance',
    name: 'Home Maintenance',
    nameTa: 'வீட்டு பராமரிப்பு',
    iconName: 'Home',
    count: 180,
    description: 'Handyman, TV mounting, drywall, and assembly services.',
    popularServices: ['TV Mounting', 'Furniture Assembly', 'Drywall Repair', 'Gutter Cleaning'],
    color: 'bg-brand-50 text-ns-primary border-brand-200',
  },
  {
    id: 'washing-machine',
    name: 'Washing Machine Repair',
    nameTa: 'வாஷிங் மெஷின் பழுது',
    iconName: 'Waves',
    count: 92,
    description: 'All brands - LG, Samsung, Whirlpool, IFB washing machine repair.',
    popularServices: ['Not Spinning Fix', 'Drainage Issue', 'Drum Repair', 'PCB Repair'],
    color: 'bg-brand-50 text-ns-primary border-brand-200',
  },
  {
    id: 'refrigerator',
    name: 'Refrigerator Repair',
    nameTa: 'குளிர்சாதன பெட்டி பழுது',
    iconName: 'Thermometer',
    count: 88,
    description: 'Fridge not cooling, compressor, ice maker, and thermostat repair.',
    popularServices: ['Not Cooling Fix', 'Compressor Repair', 'Gas Refill', 'Thermostat Fix'],
    color: 'bg-brand-50 text-ns-primary border-brand-200',
  },
  {
    id: 'ro-purifier',
    name: 'RO/Water Purifier',
    nameTa: 'RO வடிகட்டி சேவை',
    iconName: 'Droplets',
    count: 64,
    description: 'RO service, membrane change, UV filter, and installation.',
    popularServices: ['RO Annual Service', 'Membrane Change', 'Filter Replacement', 'New Installation'],
    color: 'bg-brand-50 text-ns-primary border-brand-200',
  },
  {
    id: 'tv-repair',
    name: 'TV Repair',
    nameTa: 'தொலைக்காட்சி பழுது',
    iconName: 'Tv',
    count: 47,
    description: 'LED, LCD, OLED TV screen repair, no display, sound issues.',
    popularServices: ['No Display Fix', 'Screen Repair', 'Sound Issue', 'Remote Programming'],
    color: 'bg-brand-50 text-ns-primary border-brand-200',
  },
];

export const mockProviders: Provider[] = [
  {
    id: 'p1',
    name: 'Ravi Kumar',
    businessName: 'Ravi AC & Appliance Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'AC Repair & Service',
    subCategories: ['AC Servicing', 'Gas Refill', 'PCB Repair'],
    rating: 4.8,
    reviewCount: 326,
    completedJobs: 812,
    startingPrice: 199,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 2.1,
    etaMinutes: 20,
    nextAvailable: 'Today, 2:30 PM',
    location: 'Velachery, Chennai',
    serviceAreas: ['Velachery', 'Adyar', 'Guindy', 'Perungudi'],
    serviceRadiusKm: 15,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 8,
    responseTime: '15 mins',
    bio: 'Expert AC technician with 8 years experience. All brands — Samsung, LG, Daikin, Voltas.',
    about: 'I provide transparent pricing with no hidden charges. All work comes with a 30-day warranty.',
    skills: ['AC Repair', 'Gas Refill', 'Refrigerator Repair', 'Washing Machine Repair'],
    offeredServices: [
      {
        id: 's101', name: 'AC Annual Service', description: 'Deep cleaning, filter wash, gas check, and performance test',
        price: 499, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's102', name: 'AC Gas Refill (R410A)', description: 'Leak check, gas top-up, pressure test',
        price: 1200, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 90
      },
      {
        id: 's103', name: 'AC Installation', description: 'Indoor/outdoor unit mounting, piping, and commissioning',
        price: 1500, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 180, warrantyDays: 30
      },
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:30 PM', '4:00 PM', '5:30 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:30 PM', '3:30 PM'] },
    ],
    portfolio: [
      { id: 'pf1', title: 'Daikin Split AC Service', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600', description: '3-ton split unit annual servicing' }
    ],
    reviews: [
      {
        id: 'r1', authorName: 'Sunita Raghunathan', authorAvatar: '',
        rating: 5, subRatings: { quality: 5, professionalism: 5, punctuality: 5 },
        date: '3 days ago', comment: 'Ravi serviced our Daikin AC perfectly. Very professional and clean work!',
        tags: ['Punctual', 'Clean Work', 'Fair Price'], serviceUsed: 'AC Annual Service'
      },
    ],
    phone: '+91 98765 43210', email: 'annanagar1@nammaserve.in', isAvailable: true,
  },
  {
    id: 'p2',
    name: 'Priya Ananya',
    businessName: 'SparklePro Deep Clean',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1000',
    category: 'Cleaning',
    subCategories: ['Deep House Clean', 'Bathroom Clean', 'Kitchen Clean'],
    rating: 4.95,
    reviewCount: 210,
    completedJobs: 540,
    startingPrice: 799,
    visitCharge: 0,
    priceUnit: 'fixed',
    distanceKm: 1.8,
    etaMinutes: 25,
    nextAvailable: 'Tomorrow, 9:00 AM',
    location: 'T. Nagar, Chennai',
    serviceAreas: ['T. Nagar', 'Anna Nagar', 'Adyar', 'Nungambakkam'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 8,
    responseTime: '10 mins',
    bio: 'Eco-friendly cleaning specialist using non-toxic products and professional equipment.',
    about: 'SparklePro brings hotel-standard cleanliness to your home. All staff are background-checked.',
    skills: ['Deep Cleaning', 'Bathroom Cleaning', 'Kitchen Cleaning', 'Sofa Cleaning'],
    offeredServices: [
      {
        id: 's201', name: '2BHK Deep Home Cleaning', description: 'Full floor-to-ceiling cleaning, bathroom, kitchen deep clean',
        price: 1499, visitCharge: 0, priceUnit: 'fixed', durationMinutes: 180, warrantyDays: 0
      },
      {
        id: 's202', name: 'Bathroom Deep Cleaning', description: 'Tiles, commode, taps, mirror sanitization',
        price: 799, visitCharge: 0, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 0
      },
      {
        id: 's203', name: 'Kitchen Deep Cleaning', description: 'Hob, chimney, tiles, and cabinet exterior cleaning',
        price: 999, visitCharge: 0, priceUnit: 'fixed', durationMinutes: 120, warrantyDays: 0
      }
    ],
    availabilitySlots: [
      { day: 'Tomorrow', slots: ['9:00 AM', '1:00 PM', '4:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '2:00 PM'] }
    ],
    portfolio: [
      { id: 'pf3', title: 'Kitchen Deep Clean', imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600', description: 'Spotless kitchen restoration' }
    ],
    reviews: [
      {
        id: 'r3', authorName: 'Neha Krishnamurthy', authorAvatar: '',
        rating: 5, subRatings: { quality: 5, professionalism: 5, punctuality: 5 },
        date: 'Yesterday', comment: 'Priya and her team transformed our apartment! Worth every rupee.',
        tags: ['Hotel Quality', 'Eco Friendly', 'Spotless'], serviceUsed: '2BHK Deep Cleaning'
      }
    ],
    phone: '+91 98765 12345', email: 'priyaananya2@nammaserve.in', isAvailable: true,
  },
  {
    id: 'p3',
    name: 'Rajesh Kumar',
    businessName: 'Rajesh Electrical Solutions',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Electrical',
    subCategories: ['Switchboard Repair', 'Fan Installation', 'MCB Repair'],
    rating: 4.85,
    reviewCount: 94,
    completedJobs: 185,
    startingPrice: 199,
    visitCharge: 149,
    priceUnit: 'fixed',
    distanceKm: 3.1,
    etaMinutes: 25,
    nextAvailable: 'Today, 4:30 PM',
    location: 'Adyar, Chennai',
    serviceAreas: ['Adyar', 'Guindy', 'Velachery', 'Thiruvanmiyur'],
    serviceRadiusKm: 15,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 10,
    responseTime: '20 mins',
    bio: 'Licensed electrician for switchboard repairs, fan installations, and MCB issues.',
    about: 'Safety is priority. All work meets BIS standards. No shortcuts taken.',
    skills: ['Switchboard Repair', 'Fan Installation', 'MCB Repair', 'Wiring'],
    offeredServices: [
      {
        id: 's301', name: 'Switchboard & Socket Repair', description: 'Loose connections, sparking, and burning smell diagnosis',
        price: 249, visitCharge: 149, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's302', name: 'Ceiling Fan Installation', description: 'New fan mounting, wiring, and regulator setup',
        price: 349, visitCharge: 149, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 90
      },
      {
        id: 's303', name: 'Electrical Troubleshooting', description: 'Locate short circuits, dead outlets, and tripping MCBs',
        price: 199, visitCharge: 149, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['4:30 PM'] },
      { day: 'Tomorrow', slots: ['8:30 AM', '11:30 AM', '2:30 PM'] }
    ],
    portfolio: [],
    reviews: [
      {
        id: 'r4', authorName: 'Ravi Shankar', authorAvatar: '',
        rating: 5, subRatings: { quality: 5, professionalism: 5, punctuality: 5 },
        date: '1 week ago', comment: 'Fixed sparking switchboard safely. Great work!',
        tags: ['Safe Work', 'Professional'], serviceUsed: 'Switchboard Repair'
      }
    ],
    phone: '+91 98765 67890', email: 'rajeshkumar3@nammaserve.in', isAvailable: true,
  },
  {
    id: 'p4',
    name: 'Arun Plumbing',
    businessName: 'Arun Plumbing Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=1000',
    category: 'Plumbing',
    subCategories: ['Tap Repair', 'Pipe Leak', 'Drain Cleaning'],
    rating: 4.9,
    reviewCount: 178,
    completedJobs: 420,
    startingPrice: 149,
    visitCharge: 149,
    priceUnit: 'fixed',
    distanceKm: 1.4,
    etaMinutes: 15,
    nextAvailable: 'Today, Now',
    location: 'Velachery, Chennai',
    serviceAreas: ['Velachery', 'Pallavaram', 'Chromepet', 'Medavakkam'],
    serviceRadiusKm: 12,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 12,
    responseTime: '10 mins',
    bio: 'Emergency plumber available 24/7. Pipe leaks, tap repair, and drain cleaning.',
    about: '12 years of experience in Chennai. Fast response, clean work, fair pricing.',
    skills: ['Pipe Leak', 'Tap Repair', 'Drain Cleaning', 'Toilet Repair'],
    offeredServices: [
      {
        id: 's401', name: 'Tap Repair & Replacement', description: 'Dripping tap, broken handle, or full replacement',
        price: 249, visitCharge: 149, priceUnit: 'fixed', durationMinutes: 45, warrantyDays: 30
      },
      {
        id: 's402', name: 'Pipe Leak Repair', description: 'Locating and fixing water pipe leaks in walls or under sinks',
        price: 399, visitCharge: 149, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's403', name: 'Drain Clog Cleaning', description: 'Power drain cleaning for kitchen, bathroom, or floor drains',
        price: 349, visitCharge: 149, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 14
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['Now', '2:00 PM', '4:00 PM'] },
      { day: 'Tomorrow', slots: ['8:00 AM', '11:00 AM', '2:00 PM'] }
    ],
    portfolio: [],
    reviews: [
      {
        id: 'r_arun1', authorName: 'Meena Balakrishnan', authorAvatar: '',
        rating: 5, subRatings: { quality: 5, professionalism: 5, punctuality: 5 },
        date: '2 days ago', comment: 'Arun arrived in 15 minutes for an emergency pipe burst! Lifesaver.',
        tags: ['Emergency Response', 'Fast', 'Professional'], serviceUsed: 'Pipe Leak Repair'
      }
    ],
    phone: '+91 98765 87654', email: 'arunplumbing4@nammaserve.in', isAvailable: true,
  },
  {
    id: 'p5',
    name: 'Ananya Iyer',
    businessName: 'Iyer Interior Painting',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=1000',
    category: 'Painting',
    subCategories: ['Room Painting', 'Exterior Paint', 'Waterproofing'],
    rating: 4.9,
    reviewCount: 76,
    completedJobs: 145,
    startingPrice: 12,
    visitCharge: 0,
    priceUnit: 'fixed',
    distanceKm: 4.5,
    etaMinutes: 40,
    nextAvailable: 'Thursday, 9:00 AM',
    location: 'Adyar, Chennai',
    serviceAreas: ['Adyar', 'Thiruvanmiyur', 'Besant Nagar', 'Sholinganallur'],
    serviceRadiusKm: 18,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 7,
    responseTime: '30 mins',
    bio: 'Premium painting contractor using Asian Paints and Berger. Clean, precise work guaranteed.',
    about: 'Every wall gets full furniture protection and proper surface preparation before painting.',
    skills: ['Interior Painting', 'Exterior Painting', 'Waterproofing', 'Texture Painting'],
    offeredServices: [
      {
        id: 's501', name: 'Single Room Interior Painting', description: 'Surface prep, 2 coats premium paint, furniture protection',
        price: 3500, visitCharge: 0, priceUnit: 'fixed', durationMinutes: 480, warrantyDays: 0
      },
      {
        id: 's502', name: 'Full Home Painting (2BHK)', description: 'Complete 2BHK interior painting with premium emulsion',
        price: 18000, visitCharge: 0, priceUnit: 'fixed', durationMinutes: 2880, warrantyDays: 0
      }
    ],
    availabilitySlots: [
      { day: 'This Week', slots: ['Thursday 9:00 AM', 'Friday 1:00 PM'] }
    ],
    portfolio: [
      { id: 'pf6', title: 'Modern Living Room Paint', imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600', description: 'Elegant texture finish' }
    ],
    reviews: [
      {
        id: 'r5', authorName: 'Pooja Subramaniam', authorAvatar: '',
        rating: 5, subRatings: { quality: 5, professionalism: 5, punctuality: 5 },
        date: '5 days ago', comment: 'Ananya and team did an amazing job on our 2BHK. Spotless and no paint spills!',
        tags: ['Precision', 'Clean Work', 'On Time'], serviceUsed: 'Full Home Painting'
      }
    ],
    phone: '+91 98765 23456', email: 'ananyaiyer5@nammaserve.in', isAvailable: true,
  },
  {
    id: 'p6',
    name: 'Murugan Karthikeyan',
    businessName: 'MK Appliance Repair',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1000',
    category: 'Washing Machine Repair',
    subCategories: ['Not Spinning', 'Drainage Issue', 'PCB Repair'],
    rating: 4.87,
    reviewCount: 134,
    completedJobs: 310,
    startingPrice: 299,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 2.8,
    etaMinutes: 30,
    nextAvailable: 'Today, 3:00 PM',
    location: 'Anna Nagar, Chennai',
    serviceAreas: ['Anna Nagar', 'Kilpauk', 'Aminjikarai', 'Arumbakkam'],
    serviceRadiusKm: 15,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 11,
    responseTime: '15 mins',
    bio: 'Factory-trained technician for LG, Samsung, IFB, Whirlpool, and Bosch washing machines.',
    about: '90-day warranty on all labor and genuine parts. Same-day repair available.',
    skills: ['Washing Machine Repair', 'Dryer Repair', 'Dishwasher Repair'],
    offeredServices: [
      {
        id: 's601', name: 'Washing Machine Diagnosis & Repair', description: 'Full diagnosis, drum cleaning, pump repair',
        price: 499, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 90
      },
      {
        id: 's602', name: 'Washing Machine PCB Repair', description: 'Circuit board diagnosis and repair/replacement',
        price: 899, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 120, warrantyDays: 90
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['3:00 PM', '5:30 PM'] },
      { day: 'Tomorrow', slots: ['10:00 AM', '1:00 PM', '4:00 PM'] }
    ],
    portfolio: [],
    reviews: [
      {
        id: 'r6', authorName: 'Karthik Suresh', authorAvatar: '',
        rating: 5, subRatings: { quality: 5, professionalism: 5, punctuality: 5 },
        date: '4 days ago', comment: 'Fixed our IFB washer same day. Had the exact part in his bag!',
        tags: ['Fast Fix', 'Genuine Parts', 'Fair Price'], serviceUsed: 'Washing Machine Repair'
      }
    ],
    phone: '+91 98765 78901', email: 'murugankarthikeyan6@nammaserve.in', isAvailable: true,
  },
  {
    id: 'p7',
    name: 'Deepa Venkataraman',
    businessName: 'Deepa Fridge Repair',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1000',
    category: 'Refrigerator Repair',
    subCategories: ['Not Cooling', 'Compressor Repair', 'Gas Refill'],
    rating: 4.88,
    reviewCount: 98,
    completedJobs: 230,
    startingPrice: 349,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 3.5,
    etaMinutes: 35,
    nextAvailable: 'Today, 5:00 PM',
    location: 'Tambaram, Chennai',
    serviceAreas: ['Tambaram', 'Chromepet', 'Pallavaram', 'Medavakkam'],
    serviceRadiusKm: 15,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 9,
    responseTime: '18 mins',
    bio: 'Expert fridge technician for all brands. Specializing in compressor and gas-related issues.',
    about: 'Genuine OEM parts used. All repairs come with 90-day warranty.',
    skills: ['Refrigerator Repair', 'AC Repair', 'Compressor Repair'],
    offeredServices: [
      {
        id: 's701', name: 'Refrigerator Diagnosis & Repair', description: 'Cooling check, coil cleaning, thermostat test',
        price: 499, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 90
      },
      {
        id: 's702', name: 'Refrigerator Gas Refill', description: 'Leak detection and gas recharge',
        price: 1299, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 90
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['5:00 PM', '6:30 PM'] },
      { day: 'Tomorrow', slots: ['9:30 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 98765 98765', email: 'deepavenkataraman7@nammaserve.in', isAvailable: false,
  },
  {
    id: 'p8',
    name: 'Suresh Nadar',
    businessName: 'Suresh Carpenter Works',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000',
    category: 'Carpenter',
    subCategories: ['Door Repair', 'Furniture Assembly', 'Wardrobe Fix'],
    rating: 4.92,
    reviewCount: 112,
    completedJobs: 240,
    startingPrice: 349,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 2.3,
    etaMinutes: 22,
    nextAvailable: 'Tomorrow, 10:00 AM',
    location: 'Porur, Chennai',
    serviceAreas: ['Porur', 'Guindy', 'Vadapalani', 'Ashok Nagar'],
    serviceRadiusKm: 18,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 13,
    responseTime: '20 mins',
    bio: 'Master carpenter for furniture repair, door fixing, and custom woodwork in Chennai.',
    about: 'Quality work with proper finishing. Furniture polishing and hardware replacement available.',
    skills: ['Door Repair', 'Furniture Assembly', 'Wardrobe Fix', 'Wood Polishing'],
    offeredServices: [
      {
        id: 's801', name: 'Door Repair & Alignment', description: 'Hinge replacement, latch fix, and door trimming',
        price: 399, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 30
      },
      {
        id: 's802', name: 'Furniture Assembly', description: 'IKEA and modular furniture assembly with proper tools',
        price: 499, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 120, warrantyDays: 30
      }
    ],
    availabilitySlots: [
      { day: 'Tomorrow', slots: ['10:00 AM', '2:00 PM'] }
    ],
    portfolio: [
      { id: 'pf8', title: 'Custom Wardrobe Repair', imageUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=600', description: 'Sliding door wardrobe fix' }
    ],
    reviews: [],
    phone: '+91 98765 43219', email: 'sureshnadar8@nammaserve.in', isAvailable: true,
  },
  {
    id: 'p9',
    name: 'Kavitha Nair',
    businessName: 'Kavitha RO & Water Purifier',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&q=80&w=1000',
    category: 'RO/Water Purifier',
    subCategories: ['RO Service', 'Membrane Change', 'Filter Replacement'],
    rating: 4.82,
    reviewCount: 76,
    completedJobs: 180,
    startingPrice: 399,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 1.9,
    etaMinutes: 20,
    nextAvailable: 'Today, 2:00 PM',
    location: 'OMR, Chennai',
    serviceAreas: ['OMR', 'Sholinganallur', 'Perungudi', 'Thoraipakkam'],
    serviceRadiusKm: 12,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 6,
    responseTime: '15 mins',
    bio: 'Authorized service for Kent, Aquaguard, Pureit, and all major RO brands.',
    about: 'Annual maintenance contracts available. Genuine membranes and filters only.',
    skills: ['RO Repair', 'Filter Replacement', 'UV Purifier Service'],
    offeredServices: [
      {
        id: 's901', name: 'RO Annual Service', description: 'All filters replaced, UV lamp check, membrane testing',
        price: 599, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 90
      },
      {
        id: 's902', name: 'RO Membrane Replacement', description: 'Genuine RO membrane replacement with TDS check',
        price: 1299, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 90
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:30 PM', '7:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '1:00 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 98765 76543', email: 'kavithanair9@nammaserve.in', isAvailable: true,
  },
  {
    id: 'p10',
    name: 'Senthil Raja',
    businessName: 'Senthil TV & Electronics',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=1000',
    category: 'TV Repair',
    subCategories: ['No Display', 'Screen Repair', 'Sound Issues'],
    rating: 4.78,
    reviewCount: 65,
    completedJobs: 156,
    startingPrice: 299,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 4.2,
    etaMinutes: 40,
    nextAvailable: 'Tomorrow, 9:30 AM',
    location: 'Guindy, Chennai',
    serviceAreas: ['Guindy', 'Ashok Nagar', 'Vadapalani', 'Saidapet'],
    serviceRadiusKm: 15,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 8,
    responseTime: '25 mins',
    bio: 'Samsung, LG, Sony, and all LED/LCD/OLED TV repair specialist.',
    about: '8 years experience in TV panel repair, backlight issues, and PCB replacement.',
    skills: ['LED TV Repair', 'LCD Repair', 'OLED Repair', 'Sound System Repair'],
    offeredServices: [
      {
        id: 's1001', name: 'TV Diagnosis & Repair', description: 'Full diagnosis for no display, black screen, or sound issues',
        price: 499, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 90
      },
      {
        id: 's1002', name: 'TV Panel Repair', description: 'Display panel repair or replacement diagnosis',
        price: 1499, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 180, warrantyDays: 90
      }
    ],
    availabilitySlots: [
      { day: 'Tomorrow', slots: ['9:30 AM', '1:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 98765 65432', email: 'senthilraja10@nammaserve.in', isAvailable: true,
  },
  {
    id: 'p11',
    name: 'Balamurugan S',
    businessName: 'Chennai Pest Control Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1000',
    category: 'Pest Control',
    subCategories: ['Cockroach Treatment', 'Termite Control', 'Rat Control'],
    rating: 4.75,
    reviewCount: 88,
    completedJobs: 215,
    startingPrice: 599,
    visitCharge: 0,
    priceUnit: 'fixed',
    distanceKm: 3.8,
    etaMinutes: 35,
    nextAvailable: 'Today, 6:00 PM',
    location: 'Ambattur, Chennai',
    serviceAreas: ['Ambattur', 'Mogappair', 'Avadi', 'Padi'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 9,
    responseTime: '20 mins',
    bio: 'Licensed pest control operator with WHO-approved chemicals. Pet-safe treatment available.',
    about: 'Eco-friendly and safe for families with children and pets. 3-month warranty on all treatments.',
    skills: ['Cockroach Control', 'Termite Treatment', 'Rat Control', 'Mosquito Control'],
    offeredServices: [
      {
        id: 's1101', name: 'Cockroach & Ant Treatment (2BHK)', description: 'Gel-based treatment for kitchen, bathroom, and store room',
        price: 799, visitCharge: 0, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 90
      },
      {
        id: 's1102', name: 'Termite Treatment', description: 'Pre and post construction anti-termite treatment',
        price: 3999, visitCharge: 0, priceUnit: 'fixed', durationMinutes: 240, warrantyDays: 365
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['6:00 PM'] },
      { day: 'Tomorrow', slots: ['10:00 AM', '2:00 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 98765 34567', email: 'balamurugans11@nammaserve.in', isAvailable: true,
  },
  {
    id: 'p12',
    name: 'Nithya Selvaraj',
    businessName: 'NithyaHome Maintenance',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1000',
    category: 'Home Maintenance',
    subCategories: ['TV Mounting', 'Furniture Assembly', 'Handyman Services'],
    rating: 4.93,
    reviewCount: 142,
    completedJobs: 355,
    startingPrice: 249,
    visitCharge: 149,
    priceUnit: 'fixed',
    distanceKm: 1.2,
    etaMinutes: 12,
    nextAvailable: 'Today, 5:00 PM',
    location: 'Sholinganallur, Chennai',
    serviceAreas: ['Sholinganallur', 'Perungudi', 'Thoraipakkam', 'OMR'],
    serviceRadiusKm: 12,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 7,
    responseTime: '8 mins',
    bio: 'Top-rated handywoman for TV mounting, furniture assembly, and general home repairs.',
    about: 'Equipped with professional tools. Fast, clean, and reliable service every time.',
    skills: ['TV Mounting', 'Furniture Assembly', 'Drywall Repair', 'Picture Hanging'],
    offeredServices: [
      {
        id: 's1201', name: 'TV Wall Mounting (up to 65")', description: 'Stud mounting, bracket installation, concealed wires',
        price: 399, visitCharge: 149, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's1202', name: 'Furniture Assembly', description: 'Full assembly for beds, wardrobes, dining sets',
        price: 499, visitCharge: 149, priceUnit: 'fixed', durationMinutes: 120, warrantyDays: 0
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['5:00 PM', '6:30 PM'] },
      { day: 'Tomorrow', slots: ['9:30 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [
      { id: 'pf12', title: 'OLED TV Wall Mount', imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=600', description: 'Zero visible cables' }
    ],
    reviews: [
      {
        id: 'r12', authorName: 'Venkat Krishnan', authorAvatar: '',
        rating: 5, subRatings: { quality: 5, professionalism: 5, punctuality: 5 },
        date: '2 days ago', comment: 'Nithya mounted our 65" TV in 45 minutes perfectly. Wires completely hidden!',
        tags: ['Fast & Clean', 'Expert'], serviceUsed: 'TV Wall Mounting'
      }
    ],
    phone: '+91 98765 98765', email: 'nithyaselvaraj12@nammaserve.in', isAvailable: true,
  },
  // Additional technicians for variety
  {
    id: 'p13',
    name: 'Ganesan Pillai',
    businessName: 'Ganesan AC Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=1000',
    category: 'AC Repair & Service',
    subCategories: ['AC Service', 'Installation', 'PCB Repair'],
    rating: 4.72,
    reviewCount: 89,
    completedJobs: 210,
    startingPrice: 179,
    visitCharge: 179,
    priceUnit: 'fixed',
    distanceKm: 4.8,
    etaMinutes: 45,
    nextAvailable: 'Tomorrow, 11:00 AM',
    location: 'Tambaram, Chennai',
    serviceAreas: ['Tambaram', 'Chromepet', 'Pallavaram', 'Mudichur'],
    serviceRadiusKm: 15,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 6,
    responseTime: '25 mins',
    bio: 'Authorized service center technician for Voltas, Hitachi, and Blue Star ACs.',
    about: 'Serving Tambaram and surrounding areas for 6+ years.',
    skills: ['AC Repair', 'AC Installation', 'Refrigerator Repair'],
    offeredServices: [
      {
        id: 's1301', name: 'AC Annual Service', description: 'Cleaning, gas check, and performance test',
        price: 449, visitCharge: 179, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
    ],
    availabilitySlots: [
      { day: 'Tomorrow', slots: ['11:00 AM', '3:00 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 98765 11223', email: 'ganesanpillai13@nammaserve.in', isAvailable: true,
  },
  {
    id: 'p14',
    name: 'Thirumalai K',
    businessName: 'Thirumalai Electrical Works',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Electrical',
    subCategories: ['Wiring', 'Fan Repair', 'Light Fitting'],
    rating: 4.65,
    reviewCount: 54,
    completedJobs: 120,
    startingPrice: 179,
    visitCharge: 149,
    priceUnit: 'fixed',
    distanceKm: 5.2,
    etaMinutes: 50,
    nextAvailable: 'Tomorrow, 10:00 AM',
    location: 'Perungudi, Chennai',
    serviceAreas: ['Perungudi', 'Sholinganallur', 'Thoraipakkam', 'Navalur'],
    serviceRadiusKm: 12,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 5,
    responseTime: '30 mins',
    bio: 'Residential electrician for fan repair, tube light fitting, and socket replacement.',
    about: 'Fair pricing with no hidden charges. Safety-first approach in all electrical work.',
    skills: ['Wiring', 'Fan Repair', 'Light Fitting', 'Socket Replacement'],
    offeredServices: [
      {
        id: 's1401', name: 'Fan Repair & Replacement', description: 'Ceiling fan winding, capacitor, or full replacement',
        price: 299, visitCharge: 149, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      }
    ],
    availabilitySlots: [
      { day: 'Tomorrow', slots: ['10:00 AM', '2:00 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 98765 44332', email: 'thirumalaik14@nammaserve.in', isAvailable: true,
  },
  {
    id: 'p15',
    name: 'Vasanthi Devi',
    businessName: 'Vasanthi Cleaning Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=1000',
    category: 'Cleaning',
    subCategories: ['Deep Cleaning', 'Post-Construction Clean', 'Move-in Cleaning'],
    rating: 4.8,
    reviewCount: 67,
    completedJobs: 145,
    startingPrice: 699,
    visitCharge: 0,
    priceUnit: 'fixed',
    distanceKm: 3.2,
    etaMinutes: 30,
    nextAvailable: 'Today, 4:00 PM',
    location: 'Guindy, Chennai',
    serviceAreas: ['Guindy', 'Ashok Nagar', 'KK Nagar', 'Saidapet'],
    serviceRadiusKm: 15,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 4,
    responseTime: '15 mins',
    bio: 'Deep cleaning and move-in/move-out specialist for residential properties.',
    about: 'Trained staff, professional equipment, and eco-friendly cleaning products.',
    skills: ['Deep Cleaning', 'Post-Construction Cleaning', 'Move-in Cleaning'],
    offeredServices: [
      {
        id: 's1501', name: '1BHK Deep Cleaning', description: 'Complete deep clean for 1BHK apartment',
        price: 999, visitCharge: 0, priceUnit: 'fixed', durationMinutes: 120, warrantyDays: 0
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['4:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '1:00 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 98765 55667', email: 'vasanthidevi15@nammaserve.in', isAvailable: true,
  },
  {
    id: 'p16',
    name: 'Subramanian R',
    businessName: 'SR Plumbing Works',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1000',
    category: 'Plumbing',
    subCategories: ['Overhead Tank Cleaning', 'Water Heater', 'Pipe Replacement'],
    rating: 4.7,
    reviewCount: 42,
    completedJobs: 98,
    startingPrice: 249,
    visitCharge: 149,
    priceUnit: 'fixed',
    distanceKm: 6.1,
    etaMinutes: 55,
    nextAvailable: 'Tomorrow, 8:00 AM',
    location: 'Medavakkam, Chennai',
    serviceAreas: ['Medavakkam', 'Velachery', 'Pallavaram', 'Tambaram'],
    serviceRadiusKm: 15,
    isVerified: false,
    verificationStatus: 'PENDING',
    yearsExperience: 4,
    responseTime: '25 mins',
    bio: 'General plumber for overhead tank cleaning, water heater repair, and pipe work.',
    about: 'Affordable and reliable plumbing services in south Chennai.',
    skills: ['Tank Cleaning', 'Water Heater Repair', 'Pipe Work'],
    offeredServices: [
      {
        id: 's1601', name: 'Overhead Tank Cleaning', description: 'Complete tank draining, scrubbing, and refilling',
        price: 699, visitCharge: 149, priceUnit: 'fixed', durationMinutes: 120, warrantyDays: 0
      }
    ],
    availabilitySlots: [
      { day: 'Tomorrow', slots: ['8:00 AM', '1:00 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 98765 22334', email: 'subramanianr16@nammaserve.in', isAvailable: true,
  },
  {
    id: 'p17',
    name: 'Arumugam T',
    businessName: 'Arumugam AC & Fridge',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=1000',
    category: 'Appliance Repair',
    subCategories: ['AC Repair', 'Fridge Repair', 'Washing Machine'],
    rating: 4.6,
    reviewCount: 34,
    completedJobs: 78,
    startingPrice: 349,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 7.2,
    etaMinutes: 60,
    nextAvailable: 'Tomorrow, 2:00 PM',
    location: 'Porur, Chennai',
    serviceAreas: ['Porur', 'Valasaravakkam', 'Moulivakkam', 'Koyambedu'],
    serviceRadiusKm: 18,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 5,
    responseTime: '35 mins',
    bio: 'Multi-brand appliance repair for AC, refrigerator, and washing machines.',
    about: 'Serving West Chennai localities with genuine parts and affordable pricing.',
    skills: ['AC Repair', 'Refrigerator Repair', 'Washing Machine Repair'],
    offeredServices: [
      {
        id: 's1701', name: 'Multi-Appliance Diagnosis', description: 'Comprehensive check and repair for any home appliance',
        price: 599, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 60
      }
    ],
    availabilitySlots: [
      { day: 'Tomorrow', slots: ['2:00 PM', '5:00 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 98765 66778', email: 'arumugamt17@nammaserve.in', isAvailable: true,
  },
  {
    id: 'p18',
    name: 'Sathyanarayanan P',
    businessName: 'Sathya Pest Solutions',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1000',
    category: 'Pest Control',
    subCategories: ['Mosquito Treatment', 'Cockroach Control', 'Bed Bug Treatment'],
    rating: 4.82,
    reviewCount: 58,
    completedJobs: 140,
    startingPrice: 499,
    visitCharge: 0,
    priceUnit: 'fixed',
    distanceKm: 3.9,
    etaMinutes: 38,
    nextAvailable: 'Tomorrow, 9:00 AM',
    location: 'Velachery, Chennai',
    serviceAreas: ['Velachery', 'Guindy', 'Adyar', 'Thiruvanmiyur'],
    serviceRadiusKm: 15,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 7,
    responseTime: '20 mins',
    bio: 'Government-licensed pest control operator. Safe chemicals for homes with children.',
    about: 'Herbal and chemical treatments available. No smell, no mess guarantee.',
    skills: ['Mosquito Control', 'Cockroach Control', 'Bed Bug Treatment', 'Termite Control'],
    offeredServices: [
      {
        id: 's1801', name: 'Mosquito Fogging Treatment', description: 'Indoor and outdoor mosquito fogging and larvicide treatment',
        price: 599, visitCharge: 0, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      }
    ],
    availabilitySlots: [
      { day: 'Tomorrow', slots: ['9:00 AM', '12:00 PM', '3:00 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 98765 77889', email: 'sathyanarayananp18@nammaserve.in', isAvailable: true,
  },
  {
    id: 'p19',
    name: 'Ponraj D',
    businessName: 'Ponraj Home Works',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1000',
    category: 'Home Maintenance',
    subCategories: ['General Repair', 'Painting Touch-up', 'Grill Work'],
    rating: 4.55,
    reviewCount: 28,
    completedJobs: 65,
    startingPrice: 199,
    visitCharge: 149,
    priceUnit: 'fixed',
    distanceKm: 5.5,
    etaMinutes: 50,
    nextAvailable: 'Tomorrow, 11:00 AM',
    location: 'Chromepet, Chennai',
    serviceAreas: ['Chromepet', 'Pallavaram', 'Tambaram', 'Perungalathur'],
    serviceRadiusKm: 12,
    isVerified: false,
    verificationStatus: 'UNDER_REVIEW',
    yearsExperience: 3,
    responseTime: '30 mins',
    bio: 'General handyman for small home repairs, painting touch-ups, and grill work.',
    about: 'Affordable handyman services for everyday home repair needs.',
    skills: ['General Repair', 'Painting', 'Grill Work', 'Door Handles'],
    offeredServices: [
      {
        id: 's1901', name: 'General Home Repair', description: 'Small fixes, hinges, handles, bolts, and misc repairs',
        price: 299, visitCharge: 149, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 14
      }
    ],
    availabilitySlots: [
      { day: 'Tomorrow', slots: ['11:00 AM', '3:00 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 98765 33445', email: 'ponrajd19@nammaserve.in', isAvailable: true,
  },
  {
    id: 'p20',
    name: 'Lakshmi Narasimhan',
    businessName: 'LN Carpenter & Furniture',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000',
    category: 'Carpenter',
    subCategories: ['Custom Furniture', 'Modular Kitchen', 'Wardrobe Design'],
    rating: 4.88,
    reviewCount: 72,
    completedJobs: 165,
    startingPrice: 499,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 2.6,
    etaMinutes: 25,
    nextAvailable: 'Tomorrow, 10:00 AM',
    location: 'Anna Nagar, Chennai',
    serviceAreas: ['Anna Nagar', 'Kilpauk', 'Aminjikarai', 'Arumbakkam'],
    serviceRadiusKm: 18,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 14,
    responseTime: '20 mins',
    bio: 'Expert carpenter for modular kitchens, custom wardrobes, and premium woodwork.',
    about: '14 years of craftsmanship. Premium plywood, laminates, and hardware.',
    skills: ['Modular Kitchen', 'Wardrobe Design', 'Custom Furniture', 'Wood Polish'],
    offeredServices: [
      {
        id: 's2001', name: 'Modular Kitchen Repair & Refitting', description: 'Hinge fix, drawer slides, shutter alignment, and handles',
        price: 799, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 120, warrantyDays: 60
      },
      {
        id: 's2002', name: 'Custom Wardrobe Installation', description: 'Full wardrobe design, installation, and finishing',
        price: 25000, visitCharge: 0, priceUnit: 'fixed', durationMinutes: 2880, warrantyDays: 365
      }
    ],
    availabilitySlots: [
      { day: 'Tomorrow', slots: ['10:00 AM', '2:00 PM', '5:00 PM'] }
    ],
    portfolio: [
      { id: 'pf20', title: 'Modular Wardrobe', imageUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=600', description: 'Custom sliding wardrobe' }
    ],
    reviews: [],
    phone: '+91 98765 88990', email: 'lakshminarasimhan20@nammaserve.in', isAvailable: true,
  },

  {
    id: 'p_extra_1',
    name: 'Sai Bose',
    businessName: 'Sai Electrical Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Electrical',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.9,
    reviewCount: 449,
    completedJobs: 908,
    startingPrice: 199,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 1.3,
    etaMinutes: 45,
    nextAvailable: 'Today, 1:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 6,
    responseTime: '15 mins',
    bio: 'Professional Electrical expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Electrical Repair'],
    offeredServices: [
      {
        id: 's_p_extra_1_1', name: 'Switchboard & Socket Repair', description: 'Loose connections, sparking and burning-smell diagnosis',
        price: 200, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 45, warrantyDays: 30
      },
      {
        id: 's_p_extra_1_2', name: 'Fan / Light Installation', description: 'Ceiling fan, chandelier or light fitting with regulator setup',
        price: 260, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's_p_extra_1_3', name: 'Wiring & MCB Fault Finding', description: 'Short circuits, dead outlets and tripping MCBs traced and fixed',
        price: 400, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 60
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9287475926',
    email: 'saibose21@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_2',
    name: 'Aditya Menon',
    businessName: 'Aditya Home Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Home Maintenance',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.6,
    reviewCount: 489,
    completedJobs: 988,
    startingPrice: 299,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 6.8,
    etaMinutes: 53,
    nextAvailable: 'Today, 1:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 2,
    responseTime: '15 mins',
    bio: 'Professional Home Maintenance expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Home Maintenance Repair'],
    offeredServices: [
      {
        id: 's_p_extra_2_1', name: 'General Handyman Visit', description: 'Small repairs, fittings and odd jobs around the house',
        price: 300, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's_p_extra_2_2', name: 'TV & Shelf Wall Mounting', description: 'Bracket fitting, drilling, levelling and cable management',
        price: 390, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 75, warrantyDays: 30
      },
      {
        id: 's_p_extra_2_3', name: 'Home Repair Combo', description: 'Multiple small fixes across rooms in a single visit',
        price: 600, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 150, warrantyDays: 30
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9578713210',
    email: 'adityamenon22@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_3',
    name: 'Meera Reddy',
    businessName: 'Meera Electrical Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Electrical',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.9,
    reviewCount: 205,
    completedJobs: 420,
    startingPrice: 299,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 5.7,
    etaMinutes: 36,
    nextAvailable: 'Today, 4:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 9,
    responseTime: '15 mins',
    bio: 'Professional Electrical expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Electrical Repair'],
    offeredServices: [
      {
        id: 's_p_extra_3_1', name: 'Switchboard & Socket Repair', description: 'Loose connections, sparking and burning-smell diagnosis',
        price: 300, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 45, warrantyDays: 30
      },
      {
        id: 's_p_extra_3_2', name: 'Fan / Light Installation', description: 'Ceiling fan, chandelier or light fitting with regulator setup',
        price: 390, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's_p_extra_3_3', name: 'Wiring & MCB Fault Finding', description: 'Short circuits, dead outlets and tripping MCBs traced and fixed',
        price: 600, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 60
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9286056386',
    email: 'meerareddy23@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_4',
    name: 'Priya Reddy',
    businessName: 'Priya Painting Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Painting',
    subCategories: ['General Service', 'Maintenance'],
    rating: 3.9,
    reviewCount: 86,
    completedJobs: 182,
    startingPrice: 399,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 4.4,
    etaMinutes: 16,
    nextAvailable: 'Today, 3:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 11,
    responseTime: '15 mins',
    bio: 'Professional Painting expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Painting Repair'],
    offeredServices: [
      {
        id: 's_p_extra_4_1', name: 'Single Room Painting', description: 'Two coats of emulsion with surface prep and masking',
        price: 400, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 480, warrantyDays: 180
      },
      {
        id: 's_p_extra_4_2', name: 'Texture & Accent Wall', description: 'Designer texture or accent finish on one feature wall',
        price: 640, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 360, warrantyDays: 180
      },
      {
        id: 's_p_extra_4_3', name: 'Waterproofing & Damp Repair', description: 'Damp patch treatment, sealing and protective coating',
        price: 960, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 480, warrantyDays: 365
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9399610992',
    email: 'priyareddy24@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_5',
    name: 'Priya Mukherjee',
    businessName: 'Priya Cleaning Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Cleaning',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.2,
    reviewCount: 207,
    completedJobs: 424,
    startingPrice: 199,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 8.6,
    etaMinutes: 17,
    nextAvailable: 'Today, 4:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 3,
    responseTime: '15 mins',
    bio: 'Professional Cleaning expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Cleaning Repair'],
    offeredServices: [
      {
        id: 's_p_extra_5_1', name: 'Bathroom Deep Cleaning', description: 'Tiles, commode, taps, mirror descaling and sanitisation',
        price: 200, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 7
      },
      {
        id: 's_p_extra_5_2', name: 'Kitchen Deep Cleaning', description: 'Hob, chimney, tiles and cabinet exteriors degreased',
        price: 320, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 120, warrantyDays: 7
      },
      {
        id: 's_p_extra_5_3', name: 'Full Home Deep Cleaning', description: 'Floor to ceiling across all rooms, bathrooms and kitchen',
        price: 720, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 300, warrantyDays: 7
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9549670623',
    email: 'priyamukherjee25@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_6',
    name: 'Rajesh Gupta',
    businessName: 'Rajesh Carpenter Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Carpenter',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.2,
    reviewCount: 288,
    completedJobs: 586,
    startingPrice: 199,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 10.0,
    etaMinutes: 45,
    nextAvailable: 'Today, 3:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 2,
    responseTime: '15 mins',
    bio: 'Professional Carpenter expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Carpenter Repair'],
    offeredServices: [
      {
        id: 's_p_extra_6_1', name: 'Door & Window Repair', description: 'Alignment, hinges, handles, locks and frame fixes',
        price: 200, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's_p_extra_6_2', name: 'Furniture Assembly', description: 'Flat-pack beds, wardrobes, tables and shelving',
        price: 280, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 30
      },
      {
        id: 's_p_extra_6_3', name: 'Wardrobe & Cabinet Work', description: 'Sliding doors, drawer channels, shutters and custom shelving',
        price: 520, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 180, warrantyDays: 60
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9553905266',
    email: 'rajeshgupta26@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_7',
    name: 'Deepak Chowdhury',
    businessName: 'Deepak Appliance Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Appliance Repair',
    subCategories: ['General Service', 'Maintenance'],
    rating: 3.9,
    reviewCount: 12,
    completedJobs: 34,
    startingPrice: 399,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 2.3,
    etaMinutes: 27,
    nextAvailable: 'Today, 3:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 4,
    responseTime: '15 mins',
    bio: 'Professional Appliance Repair expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Appliance Repair Repair'],
    offeredServices: [
      {
        id: 's_p_extra_7_1', name: 'Appliance Diagnosis & Repair', description: 'Fault diagnosis and on-site repair with genuine parts',
        price: 400, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 90
      },
      {
        id: 's_p_extra_7_2', name: 'Microwave / OTG Repair', description: 'Magnetron, heating element and control panel faults',
        price: 520, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 75, warrantyDays: 90
      },
      {
        id: 's_p_extra_7_3', name: 'Geyser Service & Repair', description: 'Element, thermostat and tank descaling',
        price: 680, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 90
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9900250006',
    email: 'deepakchowdhury27@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_8',
    name: 'Vihaan Yadav',
    businessName: 'Vihaan Appliance Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Appliance Repair',
    subCategories: ['General Service', 'Maintenance'],
    rating: 3.7,
    reviewCount: 422,
    completedJobs: 854,
    startingPrice: 299,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 8.9,
    etaMinutes: 41,
    nextAvailable: 'Today, 3:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 2,
    responseTime: '15 mins',
    bio: 'Professional Appliance Repair expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Appliance Repair Repair'],
    offeredServices: [
      {
        id: 's_p_extra_8_1', name: 'Appliance Diagnosis & Repair', description: 'Fault diagnosis and on-site repair with genuine parts',
        price: 300, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 90
      },
      {
        id: 's_p_extra_8_2', name: 'Microwave / OTG Repair', description: 'Magnetron, heating element and control panel faults',
        price: 390, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 75, warrantyDays: 90
      },
      {
        id: 's_p_extra_8_3', name: 'Geyser Service & Repair', description: 'Element, thermostat and tank descaling',
        price: 510, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 90
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9827239314',
    email: 'vihaanyadav28@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_9',
    name: 'Manoj Menon',
    businessName: 'Manoj Cleaning Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Cleaning',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.4,
    reviewCount: 284,
    completedJobs: 578,
    startingPrice: 399,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 8.0,
    etaMinutes: 24,
    nextAvailable: 'Today, 2:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 2,
    responseTime: '15 mins',
    bio: 'Professional Cleaning expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Cleaning Repair'],
    offeredServices: [
      {
        id: 's_p_extra_9_1', name: 'Bathroom Deep Cleaning', description: 'Tiles, commode, taps, mirror descaling and sanitisation',
        price: 400, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 7
      },
      {
        id: 's_p_extra_9_2', name: 'Kitchen Deep Cleaning', description: 'Hob, chimney, tiles and cabinet exteriors degreased',
        price: 640, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 120, warrantyDays: 7
      },
      {
        id: 's_p_extra_9_3', name: 'Full Home Deep Cleaning', description: 'Floor to ceiling across all rooms, bathrooms and kitchen',
        price: 1440, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 300, warrantyDays: 7
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9475825785',
    email: 'manojmenon29@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_10',
    name: 'Aditya Pillai',
    businessName: 'Aditya Plumbing Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Plumbing',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.1,
    reviewCount: 346,
    completedJobs: 702,
    startingPrice: 399,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 10.7,
    etaMinutes: 27,
    nextAvailable: 'Today, 2:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 4,
    responseTime: '15 mins',
    bio: 'Professional Plumbing expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Plumbing Repair'],
    offeredServices: [
      {
        id: 's_p_extra_10_1', name: 'Tap & Mixer Repair', description: 'Dripping tap, broken handle or full replacement',
        price: 400, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 45, warrantyDays: 30
      },
      {
        id: 's_p_extra_10_2', name: 'Drain & Blockage Clearing', description: 'Kitchen sink, washbasin and bathroom drain unclogging',
        price: 560, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's_p_extra_10_3', name: 'Pipe Leak & Concealed Repair', description: 'Leak tracing, pipe section replacement and resealing',
        price: 880, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 120, warrantyDays: 60
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9163647115',
    email: 'adityapillai30@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_11',
    name: 'Diya Yadav',
    businessName: 'Diya Home Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Home Maintenance',
    subCategories: ['General Service', 'Maintenance'],
    rating: 3.6,
    reviewCount: 230,
    completedJobs: 470,
    startingPrice: 299,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 8.8,
    etaMinutes: 41,
    nextAvailable: 'Today, 4:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 10,
    responseTime: '15 mins',
    bio: 'Professional Home Maintenance expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Home Maintenance Repair'],
    offeredServices: [
      {
        id: 's_p_extra_11_1', name: 'General Handyman Visit', description: 'Small repairs, fittings and odd jobs around the house',
        price: 300, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's_p_extra_11_2', name: 'TV & Shelf Wall Mounting', description: 'Bracket fitting, drilling, levelling and cable management',
        price: 390, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 75, warrantyDays: 30
      },
      {
        id: 's_p_extra_11_3', name: 'Home Repair Combo', description: 'Multiple small fixes across rooms in a single visit',
        price: 600, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 150, warrantyDays: 30
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9148378198',
    email: 'diyayadav31@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_12',
    name: 'Priya Nair',
    businessName: 'Priya Electrical Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Electrical',
    subCategories: ['General Service', 'Maintenance'],
    rating: 5.0,
    reviewCount: 159,
    completedJobs: 328,
    startingPrice: 399,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 4.2,
    etaMinutes: 18,
    nextAvailable: 'Today, 1:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 10,
    responseTime: '15 mins',
    bio: 'Professional Electrical expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Electrical Repair'],
    offeredServices: [
      {
        id: 's_p_extra_12_1', name: 'Switchboard & Socket Repair', description: 'Loose connections, sparking and burning-smell diagnosis',
        price: 400, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 45, warrantyDays: 30
      },
      {
        id: 's_p_extra_12_2', name: 'Fan / Light Installation', description: 'Ceiling fan, chandelier or light fitting with regulator setup',
        price: 520, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's_p_extra_12_3', name: 'Wiring & MCB Fault Finding', description: 'Short circuits, dead outlets and tripping MCBs traced and fixed',
        price: 800, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 60
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9979497968',
    email: 'priyanair32@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_13',
    name: 'Rajesh Singh',
    businessName: 'Rajesh Pest Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Pest Control',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.0,
    reviewCount: 351,
    completedJobs: 712,
    startingPrice: 299,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 2.1,
    etaMinutes: 38,
    nextAvailable: 'Today, 1:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 8,
    responseTime: '15 mins',
    bio: 'Professional Pest Control expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Pest Control Repair'],
    offeredServices: [
      {
        id: 's_p_extra_13_1', name: 'Cockroach & Ant Treatment', description: 'Gel and spray treatment across kitchen and bathrooms',
        price: 300, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 90
      },
      {
        id: 's_p_extra_13_2', name: 'Termite Treatment', description: 'Drill-fill-seal treatment for woodwork and skirting',
        price: 960, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 180, warrantyDays: 365
      },
      {
        id: 's_p_extra_13_3', name: 'Mosquito & Bed Bug Control', description: 'Fogging and mattress-level treatment',
        price: 480, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 60
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9458276488',
    email: 'rajeshsingh33@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_14',
    name: 'Ramesh Rao',
    businessName: 'Ramesh Cleaning Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Cleaning',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.7,
    reviewCount: 274,
    completedJobs: 558,
    startingPrice: 199,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 1.2,
    etaMinutes: 54,
    nextAvailable: 'Today, 2:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 6,
    responseTime: '15 mins',
    bio: 'Professional Cleaning expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Cleaning Repair'],
    offeredServices: [
      {
        id: 's_p_extra_14_1', name: 'Bathroom Deep Cleaning', description: 'Tiles, commode, taps, mirror descaling and sanitisation',
        price: 200, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 7
      },
      {
        id: 's_p_extra_14_2', name: 'Kitchen Deep Cleaning', description: 'Hob, chimney, tiles and cabinet exteriors degreased',
        price: 320, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 120, warrantyDays: 7
      },
      {
        id: 's_p_extra_14_3', name: 'Full Home Deep Cleaning', description: 'Floor to ceiling across all rooms, bathrooms and kitchen',
        price: 720, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 300, warrantyDays: 7
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9360278710',
    email: 'rameshrao34@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_15',
    name: 'Anika Sharma',
    businessName: 'Anika Carpenter Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Carpenter',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.2,
    reviewCount: 171,
    completedJobs: 352,
    startingPrice: 299,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 2.1,
    etaMinutes: 50,
    nextAvailable: 'Today, 5:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 10,
    responseTime: '15 mins',
    bio: 'Professional Carpenter expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Carpenter Repair'],
    offeredServices: [
      {
        id: 's_p_extra_15_1', name: 'Door & Window Repair', description: 'Alignment, hinges, handles, locks and frame fixes',
        price: 300, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's_p_extra_15_2', name: 'Furniture Assembly', description: 'Flat-pack beds, wardrobes, tables and shelving',
        price: 420, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 30
      },
      {
        id: 's_p_extra_15_3', name: 'Wardrobe & Cabinet Work', description: 'Sliding doors, drawer channels, shutters and custom shelving',
        price: 780, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 180, warrantyDays: 60
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9314509776',
    email: 'anikasharma35@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_16',
    name: 'Anika Menon',
    businessName: 'Anika Painting Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Painting',
    subCategories: ['General Service', 'Maintenance'],
    rating: 3.7,
    reviewCount: 119,
    completedJobs: 248,
    startingPrice: 199,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 10.7,
    etaMinutes: 30,
    nextAvailable: 'Today, 3:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 9,
    responseTime: '15 mins',
    bio: 'Professional Painting expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Painting Repair'],
    offeredServices: [
      {
        id: 's_p_extra_16_1', name: 'Single Room Painting', description: 'Two coats of emulsion with surface prep and masking',
        price: 200, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 480, warrantyDays: 180
      },
      {
        id: 's_p_extra_16_2', name: 'Texture & Accent Wall', description: 'Designer texture or accent finish on one feature wall',
        price: 320, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 360, warrantyDays: 180
      },
      {
        id: 's_p_extra_16_3', name: 'Waterproofing & Damp Repair', description: 'Damp patch treatment, sealing and protective coating',
        price: 480, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 480, warrantyDays: 365
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9555620911',
    email: 'anikamenon36@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_17',
    name: 'Ramesh Nair',
    businessName: 'Ramesh Carpenter Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Carpenter',
    subCategories: ['General Service', 'Maintenance'],
    rating: 3.7,
    reviewCount: 50,
    completedJobs: 110,
    startingPrice: 199,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 6.4,
    etaMinutes: 51,
    nextAvailable: 'Today, 3:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 10,
    responseTime: '15 mins',
    bio: 'Professional Carpenter expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Carpenter Repair'],
    offeredServices: [
      {
        id: 's_p_extra_17_1', name: 'Door & Window Repair', description: 'Alignment, hinges, handles, locks and frame fixes',
        price: 200, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's_p_extra_17_2', name: 'Furniture Assembly', description: 'Flat-pack beds, wardrobes, tables and shelving',
        price: 280, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 30
      },
      {
        id: 's_p_extra_17_3', name: 'Wardrobe & Cabinet Work', description: 'Sliding doors, drawer channels, shutters and custom shelving',
        price: 520, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 180, warrantyDays: 60
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9192387450',
    email: 'rameshnair37@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_18',
    name: 'Ramesh Singh',
    businessName: 'Ramesh Pest Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Pest Control',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.1,
    reviewCount: 109,
    completedJobs: 228,
    startingPrice: 299,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 3.4,
    etaMinutes: 18,
    nextAvailable: 'Today, 5:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 10,
    responseTime: '15 mins',
    bio: 'Professional Pest Control expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Pest Control Repair'],
    offeredServices: [
      {
        id: 's_p_extra_18_1', name: 'Cockroach & Ant Treatment', description: 'Gel and spray treatment across kitchen and bathrooms',
        price: 300, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 90
      },
      {
        id: 's_p_extra_18_2', name: 'Termite Treatment', description: 'Drill-fill-seal treatment for woodwork and skirting',
        price: 960, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 180, warrantyDays: 365
      },
      {
        id: 's_p_extra_18_3', name: 'Mosquito & Bed Bug Control', description: 'Fogging and mattress-level treatment',
        price: 480, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 60
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9245373476',
    email: 'rameshsingh38@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_19',
    name: 'Rajesh Kumar',
    businessName: 'Rajesh Appliance Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Appliance Repair',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.9,
    reviewCount: 133,
    completedJobs: 276,
    startingPrice: 299,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 10.7,
    etaMinutes: 54,
    nextAvailable: 'Today, 1:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 3,
    responseTime: '15 mins',
    bio: 'Professional Appliance Repair expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Appliance Repair Repair'],
    offeredServices: [
      {
        id: 's_p_extra_19_1', name: 'Appliance Diagnosis & Repair', description: 'Fault diagnosis and on-site repair with genuine parts',
        price: 300, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 90
      },
      {
        id: 's_p_extra_19_2', name: 'Microwave / OTG Repair', description: 'Magnetron, heating element and control panel faults',
        price: 390, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 75, warrantyDays: 90
      },
      {
        id: 's_p_extra_19_3', name: 'Geyser Service & Repair', description: 'Element, thermostat and tank descaling',
        price: 510, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 90
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9219229671',
    email: 'rajeshkumar39@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_20',
    name: 'Karan Reddy',
    businessName: 'Karan Appliance Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Appliance Repair',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.0,
    reviewCount: 53,
    completedJobs: 116,
    startingPrice: 399,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 4.7,
    etaMinutes: 42,
    nextAvailable: 'Today, 1:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 8,
    responseTime: '15 mins',
    bio: 'Professional Appliance Repair expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Appliance Repair Repair'],
    offeredServices: [
      {
        id: 's_p_extra_20_1', name: 'Appliance Diagnosis & Repair', description: 'Fault diagnosis and on-site repair with genuine parts',
        price: 400, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 90
      },
      {
        id: 's_p_extra_20_2', name: 'Microwave / OTG Repair', description: 'Magnetron, heating element and control panel faults',
        price: 520, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 75, warrantyDays: 90
      },
      {
        id: 's_p_extra_20_3', name: 'Geyser Service & Repair', description: 'Element, thermostat and tank descaling',
        price: 680, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 90
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9856282143',
    email: 'karanreddy40@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_21',
    name: 'Vikram Rao',
    businessName: 'Vikram Electrical Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Electrical',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.9,
    reviewCount: 12,
    completedJobs: 34,
    startingPrice: 399,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 2.3,
    etaMinutes: 50,
    nextAvailable: 'Today, 2:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 7,
    responseTime: '15 mins',
    bio: 'Professional Electrical expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Electrical Repair'],
    offeredServices: [
      {
        id: 's_p_extra_21_1', name: 'Switchboard & Socket Repair', description: 'Loose connections, sparking and burning-smell diagnosis',
        price: 400, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 45, warrantyDays: 30
      },
      {
        id: 's_p_extra_21_2', name: 'Fan / Light Installation', description: 'Ceiling fan, chandelier or light fitting with regulator setup',
        price: 520, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's_p_extra_21_3', name: 'Wiring & MCB Fault Finding', description: 'Short circuits, dead outlets and tripping MCBs traced and fixed',
        price: 800, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 60
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9515696125',
    email: 'vikramrao41@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_22',
    name: 'Ramesh Chowdhury',
    businessName: 'Ramesh Home Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Home Maintenance',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.1,
    reviewCount: 30,
    completedJobs: 70,
    startingPrice: 299,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 5.2,
    etaMinutes: 24,
    nextAvailable: 'Today, 5:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 11,
    responseTime: '15 mins',
    bio: 'Professional Home Maintenance expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Home Maintenance Repair'],
    offeredServices: [
      {
        id: 's_p_extra_22_1', name: 'General Handyman Visit', description: 'Small repairs, fittings and odd jobs around the house',
        price: 300, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's_p_extra_22_2', name: 'TV & Shelf Wall Mounting', description: 'Bracket fitting, drilling, levelling and cable management',
        price: 390, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 75, warrantyDays: 30
      },
      {
        id: 's_p_extra_22_3', name: 'Home Repair Combo', description: 'Multiple small fixes across rooms in a single visit',
        price: 600, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 150, warrantyDays: 30
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9308091269',
    email: 'rameshchowdhury42@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_23',
    name: 'Naveen Menon',
    businessName: 'Naveen AC Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'AC Repair & Service',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.8,
    reviewCount: 322,
    completedJobs: 654,
    startingPrice: 399,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 4.1,
    etaMinutes: 31,
    nextAvailable: 'Today, 3:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 2,
    responseTime: '15 mins',
    bio: 'Professional AC Repair & Service expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['AC Repair & Service Repair'],
    offeredServices: [
      {
        id: 's_p_extra_23_1', name: 'AC Service & Cleaning', description: 'Deep clean, filter wash, gas pressure check and performance test',
        price: 400, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's_p_extra_23_2', name: 'AC Gas Refill', description: 'Leak detection, gas top-up and pressure testing',
        price: 960, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 90
      },
      {
        id: 's_p_extra_23_3', name: 'AC Installation / Uninstall', description: 'Indoor and outdoor unit mounting, piping and commissioning',
        price: 1200, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 180, warrantyDays: 30
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9745701990',
    email: 'naveenmenon43@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_24',
    name: 'Sanjay Pillai',
    businessName: 'Sanjay Carpenter Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Carpenter',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.3,
    reviewCount: 170,
    completedJobs: 350,
    startingPrice: 199,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 2.9,
    etaMinutes: 48,
    nextAvailable: 'Today, 5:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 4,
    responseTime: '15 mins',
    bio: 'Professional Carpenter expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Carpenter Repair'],
    offeredServices: [
      {
        id: 's_p_extra_24_1', name: 'Door & Window Repair', description: 'Alignment, hinges, handles, locks and frame fixes',
        price: 200, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's_p_extra_24_2', name: 'Furniture Assembly', description: 'Flat-pack beds, wardrobes, tables and shelving',
        price: 280, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 30
      },
      {
        id: 's_p_extra_24_3', name: 'Wardrobe & Cabinet Work', description: 'Sliding doors, drawer channels, shutters and custom shelving',
        price: 520, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 180, warrantyDays: 60
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9800013746',
    email: 'sanjaypillai44@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_25',
    name: 'Naveen Pillai',
    businessName: 'Naveen Painting Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Painting',
    subCategories: ['General Service', 'Maintenance'],
    rating: 3.5,
    reviewCount: 162,
    completedJobs: 334,
    startingPrice: 299,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 1.4,
    etaMinutes: 29,
    nextAvailable: 'Today, 5:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 2,
    responseTime: '15 mins',
    bio: 'Professional Painting expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Painting Repair'],
    offeredServices: [
      {
        id: 's_p_extra_25_1', name: 'Single Room Painting', description: 'Two coats of emulsion with surface prep and masking',
        price: 300, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 480, warrantyDays: 180
      },
      {
        id: 's_p_extra_25_2', name: 'Texture & Accent Wall', description: 'Designer texture or accent finish on one feature wall',
        price: 480, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 360, warrantyDays: 180
      },
      {
        id: 's_p_extra_25_3', name: 'Waterproofing & Damp Repair', description: 'Damp patch treatment, sealing and protective coating',
        price: 720, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 480, warrantyDays: 365
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9683982825',
    email: 'naveenpillai45@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_26',
    name: 'Aadhya Kumar',
    businessName: 'Aadhya Home Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Home Maintenance',
    subCategories: ['General Service', 'Maintenance'],
    rating: 3.5,
    reviewCount: 202,
    completedJobs: 414,
    startingPrice: 199,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 3.1,
    etaMinutes: 54,
    nextAvailable: 'Today, 4:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 6,
    responseTime: '15 mins',
    bio: 'Professional Home Maintenance expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Home Maintenance Repair'],
    offeredServices: [
      {
        id: 's_p_extra_26_1', name: 'General Handyman Visit', description: 'Small repairs, fittings and odd jobs around the house',
        price: 200, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's_p_extra_26_2', name: 'TV & Shelf Wall Mounting', description: 'Bracket fitting, drilling, levelling and cable management',
        price: 260, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 75, warrantyDays: 30
      },
      {
        id: 's_p_extra_26_3', name: 'Home Repair Combo', description: 'Multiple small fixes across rooms in a single visit',
        price: 400, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 150, warrantyDays: 30
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9183329878',
    email: 'aadhyakumar46@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_27',
    name: 'Ananya Sharma',
    businessName: 'Ananya Painting Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Painting',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.4,
    reviewCount: 472,
    completedJobs: 954,
    startingPrice: 199,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 5.2,
    etaMinutes: 50,
    nextAvailable: 'Today, 1:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 6,
    responseTime: '15 mins',
    bio: 'Professional Painting expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Painting Repair'],
    offeredServices: [
      {
        id: 's_p_extra_27_1', name: 'Single Room Painting', description: 'Two coats of emulsion with surface prep and masking',
        price: 200, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 480, warrantyDays: 180
      },
      {
        id: 's_p_extra_27_2', name: 'Texture & Accent Wall', description: 'Designer texture or accent finish on one feature wall',
        price: 320, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 360, warrantyDays: 180
      },
      {
        id: 's_p_extra_27_3', name: 'Waterproofing & Damp Repair', description: 'Damp patch treatment, sealing and protective coating',
        price: 480, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 480, warrantyDays: 365
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9754714222',
    email: 'ananyasharma47@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_28',
    name: 'Vikram Iyer',
    businessName: 'Vikram Home Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Home Maintenance',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.8,
    reviewCount: 305,
    completedJobs: 620,
    startingPrice: 399,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 1.3,
    etaMinutes: 44,
    nextAvailable: 'Today, 1:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 11,
    responseTime: '15 mins',
    bio: 'Professional Home Maintenance expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Home Maintenance Repair'],
    offeredServices: [
      {
        id: 's_p_extra_28_1', name: 'General Handyman Visit', description: 'Small repairs, fittings and odd jobs around the house',
        price: 400, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's_p_extra_28_2', name: 'TV & Shelf Wall Mounting', description: 'Bracket fitting, drilling, levelling and cable management',
        price: 520, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 75, warrantyDays: 30
      },
      {
        id: 's_p_extra_28_3', name: 'Home Repair Combo', description: 'Multiple small fixes across rooms in a single visit',
        price: 800, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 150, warrantyDays: 30
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9720279862',
    email: 'vikramiyer48@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_29',
    name: 'Aarav Sharma',
    businessName: 'Aarav Plumbing Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Plumbing',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.9,
    reviewCount: 194,
    completedJobs: 398,
    startingPrice: 299,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 3.5,
    etaMinutes: 17,
    nextAvailable: 'Today, 2:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 3,
    responseTime: '15 mins',
    bio: 'Professional Plumbing expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Plumbing Repair'],
    offeredServices: [
      {
        id: 's_p_extra_29_1', name: 'Tap & Mixer Repair', description: 'Dripping tap, broken handle or full replacement',
        price: 300, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 45, warrantyDays: 30
      },
      {
        id: 's_p_extra_29_2', name: 'Drain & Blockage Clearing', description: 'Kitchen sink, washbasin and bathroom drain unclogging',
        price: 420, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's_p_extra_29_3', name: 'Pipe Leak & Concealed Repair', description: 'Leak tracing, pipe section replacement and resealing',
        price: 660, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 120, warrantyDays: 60
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9127204088',
    email: 'aaravsharma49@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_30',
    name: 'Arjun Mukherjee',
    businessName: 'Arjun Electrical Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Electrical',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.0,
    reviewCount: 301,
    completedJobs: 612,
    startingPrice: 199,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 7.6,
    etaMinutes: 46,
    nextAvailable: 'Today, 2:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 6,
    responseTime: '15 mins',
    bio: 'Professional Electrical expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Electrical Repair'],
    offeredServices: [
      {
        id: 's_p_extra_30_1', name: 'Switchboard & Socket Repair', description: 'Loose connections, sparking and burning-smell diagnosis',
        price: 200, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 45, warrantyDays: 30
      },
      {
        id: 's_p_extra_30_2', name: 'Fan / Light Installation', description: 'Ceiling fan, chandelier or light fitting with regulator setup',
        price: 260, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's_p_extra_30_3', name: 'Wiring & MCB Fault Finding', description: 'Short circuits, dead outlets and tripping MCBs traced and fixed',
        price: 400, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 60
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9137729049',
    email: 'arjunmukherjee50@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_31',
    name: 'Ishaan Iyer',
    businessName: 'Ishaan AC Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'AC Repair & Service',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.6,
    reviewCount: 79,
    completedJobs: 168,
    startingPrice: 299,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 5.4,
    etaMinutes: 33,
    nextAvailable: 'Today, 5:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 6,
    responseTime: '15 mins',
    bio: 'Professional AC Repair & Service expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['AC Repair & Service Repair'],
    offeredServices: [
      {
        id: 's_p_extra_31_1', name: 'AC Service & Cleaning', description: 'Deep clean, filter wash, gas pressure check and performance test',
        price: 300, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's_p_extra_31_2', name: 'AC Gas Refill', description: 'Leak detection, gas top-up and pressure testing',
        price: 720, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 90
      },
      {
        id: 's_p_extra_31_3', name: 'AC Installation / Uninstall', description: 'Indoor and outdoor unit mounting, piping and commissioning',
        price: 900, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 180, warrantyDays: 30
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9697130325',
    email: 'ishaaniyer51@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_32',
    name: 'Rahul Gupta',
    businessName: 'Rahul Appliance Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Appliance Repair',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.6,
    reviewCount: 51,
    completedJobs: 112,
    startingPrice: 399,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 8.5,
    etaMinutes: 20,
    nextAvailable: 'Today, 1:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 9,
    responseTime: '15 mins',
    bio: 'Professional Appliance Repair expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Appliance Repair Repair'],
    offeredServices: [
      {
        id: 's_p_extra_32_1', name: 'Appliance Diagnosis & Repair', description: 'Fault diagnosis and on-site repair with genuine parts',
        price: 400, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 90
      },
      {
        id: 's_p_extra_32_2', name: 'Microwave / OTG Repair', description: 'Magnetron, heating element and control panel faults',
        price: 520, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 75, warrantyDays: 90
      },
      {
        id: 's_p_extra_32_3', name: 'Geyser Service & Repair', description: 'Element, thermostat and tank descaling',
        price: 680, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 90
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9649429528',
    email: 'rahulgupta52@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_33',
    name: 'Priya Rao',
    businessName: 'Priya Cleaning Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Cleaning',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.7,
    reviewCount: 178,
    completedJobs: 366,
    startingPrice: 199,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 4.9,
    etaMinutes: 23,
    nextAvailable: 'Today, 5:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 10,
    responseTime: '15 mins',
    bio: 'Professional Cleaning expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Cleaning Repair'],
    offeredServices: [
      {
        id: 's_p_extra_33_1', name: 'Bathroom Deep Cleaning', description: 'Tiles, commode, taps, mirror descaling and sanitisation',
        price: 200, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 7
      },
      {
        id: 's_p_extra_33_2', name: 'Kitchen Deep Cleaning', description: 'Hob, chimney, tiles and cabinet exteriors degreased',
        price: 320, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 120, warrantyDays: 7
      },
      {
        id: 's_p_extra_33_3', name: 'Full Home Deep Cleaning', description: 'Floor to ceiling across all rooms, bathrooms and kitchen',
        price: 720, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 300, warrantyDays: 7
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9789912526',
    email: 'priyarao53@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_34',
    name: 'Riyan Yadav',
    businessName: 'Riyan AC Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'AC Repair & Service',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.6,
    reviewCount: 472,
    completedJobs: 954,
    startingPrice: 399,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 4.9,
    etaMinutes: 29,
    nextAvailable: 'Today, 5:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 2,
    responseTime: '15 mins',
    bio: 'Professional AC Repair & Service expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['AC Repair & Service Repair'],
    offeredServices: [
      {
        id: 's_p_extra_34_1', name: 'AC Service & Cleaning', description: 'Deep clean, filter wash, gas pressure check and performance test',
        price: 400, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's_p_extra_34_2', name: 'AC Gas Refill', description: 'Leak detection, gas top-up and pressure testing',
        price: 960, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 90
      },
      {
        id: 's_p_extra_34_3', name: 'AC Installation / Uninstall', description: 'Indoor and outdoor unit mounting, piping and commissioning',
        price: 1200, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 180, warrantyDays: 30
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9500577153',
    email: 'riyanyadav54@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_35',
    name: 'Kashvi Das',
    businessName: 'Kashvi Carpenter Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Carpenter',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.2,
    reviewCount: 44,
    completedJobs: 98,
    startingPrice: 199,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 2.4,
    etaMinutes: 41,
    nextAvailable: 'Today, 4:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 5,
    responseTime: '15 mins',
    bio: 'Professional Carpenter expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Carpenter Repair'],
    offeredServices: [
      {
        id: 's_p_extra_35_1', name: 'Door & Window Repair', description: 'Alignment, hinges, handles, locks and frame fixes',
        price: 200, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's_p_extra_35_2', name: 'Furniture Assembly', description: 'Flat-pack beds, wardrobes, tables and shelving',
        price: 280, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 30
      },
      {
        id: 's_p_extra_35_3', name: 'Wardrobe & Cabinet Work', description: 'Sliding doors, drawer channels, shutters and custom shelving',
        price: 520, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 180, warrantyDays: 60
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9797358100',
    email: 'kashvidas55@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_36',
    name: 'Arjun Bose',
    businessName: 'Arjun Plumbing Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Plumbing',
    subCategories: ['General Service', 'Maintenance'],
    rating: 3.9,
    reviewCount: 331,
    completedJobs: 672,
    startingPrice: 299,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 2.1,
    etaMinutes: 26,
    nextAvailable: 'Today, 4:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 3,
    responseTime: '15 mins',
    bio: 'Professional Plumbing expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Plumbing Repair'],
    offeredServices: [
      {
        id: 's_p_extra_36_1', name: 'Tap & Mixer Repair', description: 'Dripping tap, broken handle or full replacement',
        price: 300, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 45, warrantyDays: 30
      },
      {
        id: 's_p_extra_36_2', name: 'Drain & Blockage Clearing', description: 'Kitchen sink, washbasin and bathroom drain unclogging',
        price: 420, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's_p_extra_36_3', name: 'Pipe Leak & Concealed Repair', description: 'Leak tracing, pipe section replacement and resealing',
        price: 660, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 120, warrantyDays: 60
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9799465108',
    email: 'arjunbose56@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_37',
    name: 'Meera Iyer',
    businessName: 'Meera Carpenter Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Carpenter',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.7,
    reviewCount: 242,
    completedJobs: 494,
    startingPrice: 399,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 1.6,
    etaMinutes: 28,
    nextAvailable: 'Today, 3:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 8,
    responseTime: '15 mins',
    bio: 'Professional Carpenter expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Carpenter Repair'],
    offeredServices: [
      {
        id: 's_p_extra_37_1', name: 'Door & Window Repair', description: 'Alignment, hinges, handles, locks and frame fixes',
        price: 400, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's_p_extra_37_2', name: 'Furniture Assembly', description: 'Flat-pack beds, wardrobes, tables and shelving',
        price: 560, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 30
      },
      {
        id: 's_p_extra_37_3', name: 'Wardrobe & Cabinet Work', description: 'Sliding doors, drawer channels, shutters and custom shelving',
        price: 1040, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 180, warrantyDays: 60
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9850754276',
    email: 'meeraiyer57@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_38',
    name: 'Naveen Mukherjee',
    businessName: 'Naveen AC Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'AC Repair & Service',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.5,
    reviewCount: 175,
    completedJobs: 360,
    startingPrice: 399,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 3.1,
    etaMinutes: 21,
    nextAvailable: 'Today, 3:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 9,
    responseTime: '15 mins',
    bio: 'Professional AC Repair & Service expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['AC Repair & Service Repair'],
    offeredServices: [
      {
        id: 's_p_extra_38_1', name: 'AC Service & Cleaning', description: 'Deep clean, filter wash, gas pressure check and performance test',
        price: 400, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's_p_extra_38_2', name: 'AC Gas Refill', description: 'Leak detection, gas top-up and pressure testing',
        price: 960, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 90
      },
      {
        id: 's_p_extra_38_3', name: 'AC Installation / Uninstall', description: 'Indoor and outdoor unit mounting, piping and commissioning',
        price: 1200, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 180, warrantyDays: 30
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9233607432',
    email: 'naveenmukherjee58@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_39',
    name: 'Deepak Chowdhury',
    businessName: 'Deepak Plumbing Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Plumbing',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.0,
    reviewCount: 279,
    completedJobs: 568,
    startingPrice: 299,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 3.8,
    etaMinutes: 54,
    nextAvailable: 'Today, 3:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 10,
    responseTime: '15 mins',
    bio: 'Professional Plumbing expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Plumbing Repair'],
    offeredServices: [
      {
        id: 's_p_extra_39_1', name: 'Tap & Mixer Repair', description: 'Dripping tap, broken handle or full replacement',
        price: 300, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 45, warrantyDays: 30
      },
      {
        id: 's_p_extra_39_2', name: 'Drain & Blockage Clearing', description: 'Kitchen sink, washbasin and bathroom drain unclogging',
        price: 420, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's_p_extra_39_3', name: 'Pipe Leak & Concealed Repair', description: 'Leak tracing, pipe section replacement and resealing',
        price: 660, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 120, warrantyDays: 60
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9553933736',
    email: 'deepakchowdhury59@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_40',
    name: 'Riyan Das',
    businessName: 'Riyan Plumbing Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Plumbing',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.1,
    reviewCount: 491,
    completedJobs: 992,
    startingPrice: 199,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 3.0,
    etaMinutes: 26,
    nextAvailable: 'Today, 1:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 11,
    responseTime: '15 mins',
    bio: 'Professional Plumbing expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Plumbing Repair'],
    offeredServices: [
      {
        id: 's_p_extra_40_1', name: 'Tap & Mixer Repair', description: 'Dripping tap, broken handle or full replacement',
        price: 200, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 45, warrantyDays: 30
      },
      {
        id: 's_p_extra_40_2', name: 'Drain & Blockage Clearing', description: 'Kitchen sink, washbasin and bathroom drain unclogging',
        price: 280, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's_p_extra_40_3', name: 'Pipe Leak & Concealed Repair', description: 'Leak tracing, pipe section replacement and resealing',
        price: 440, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 120, warrantyDays: 60
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9777328062',
    email: 'riyandas60@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_41',
    name: 'Ananya Nair',
    businessName: 'Ananya Pest Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Pest Control',
    subCategories: ['General Service', 'Maintenance'],
    rating: 3.6,
    reviewCount: 19,
    completedJobs: 48,
    startingPrice: 199,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 1.1,
    etaMinutes: 17,
    nextAvailable: 'Today, 3:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 7,
    responseTime: '15 mins',
    bio: 'Professional Pest Control expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Pest Control Repair'],
    offeredServices: [
      {
        id: 's_p_extra_41_1', name: 'Cockroach & Ant Treatment', description: 'Gel and spray treatment across kitchen and bathrooms',
        price: 200, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 90
      },
      {
        id: 's_p_extra_41_2', name: 'Termite Treatment', description: 'Drill-fill-seal treatment for woodwork and skirting',
        price: 640, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 180, warrantyDays: 365
      },
      {
        id: 's_p_extra_41_3', name: 'Mosquito & Bed Bug Control', description: 'Fogging and mattress-level treatment',
        price: 320, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 60
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9263303207',
    email: 'ananyanair61@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_42',
    name: 'Atharv Nair',
    businessName: 'Atharv Appliance Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Appliance Repair',
    subCategories: ['General Service', 'Maintenance'],
    rating: 5.0,
    reviewCount: 144,
    completedJobs: 298,
    startingPrice: 199,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 3.7,
    etaMinutes: 27,
    nextAvailable: 'Today, 4:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 3,
    responseTime: '15 mins',
    bio: 'Professional Appliance Repair expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Appliance Repair Repair'],
    offeredServices: [
      {
        id: 's_p_extra_42_1', name: 'Appliance Diagnosis & Repair', description: 'Fault diagnosis and on-site repair with genuine parts',
        price: 200, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 90
      },
      {
        id: 's_p_extra_42_2', name: 'Microwave / OTG Repair', description: 'Magnetron, heating element and control panel faults',
        price: 260, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 75, warrantyDays: 90
      },
      {
        id: 's_p_extra_42_3', name: 'Geyser Service & Repair', description: 'Element, thermostat and tank descaling',
        price: 340, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 90
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9294248660',
    email: 'atharvnair62@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_43',
    name: 'Rahul Kumar',
    businessName: 'Rahul AC Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'AC Repair & Service',
    subCategories: ['General Service', 'Maintenance'],
    rating: 3.8,
    reviewCount: 83,
    completedJobs: 176,
    startingPrice: 299,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 6.2,
    etaMinutes: 54,
    nextAvailable: 'Today, 4:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 10,
    responseTime: '15 mins',
    bio: 'Professional AC Repair & Service expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['AC Repair & Service Repair'],
    offeredServices: [
      {
        id: 's_p_extra_43_1', name: 'AC Service & Cleaning', description: 'Deep clean, filter wash, gas pressure check and performance test',
        price: 300, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's_p_extra_43_2', name: 'AC Gas Refill', description: 'Leak detection, gas top-up and pressure testing',
        price: 720, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 90
      },
      {
        id: 's_p_extra_43_3', name: 'AC Installation / Uninstall', description: 'Indoor and outdoor unit mounting, piping and commissioning',
        price: 900, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 180, warrantyDays: 30
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9964345350',
    email: 'rahulkumar63@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_44',
    name: 'Karthik Iyer',
    businessName: 'Karthik Electrical Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Electrical',
    subCategories: ['General Service', 'Maintenance'],
    rating: 3.5,
    reviewCount: 423,
    completedJobs: 856,
    startingPrice: 399,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 6.7,
    etaMinutes: 25,
    nextAvailable: 'Today, 2:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 2,
    responseTime: '15 mins',
    bio: 'Professional Electrical expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Electrical Repair'],
    offeredServices: [
      {
        id: 's_p_extra_44_1', name: 'Switchboard & Socket Repair', description: 'Loose connections, sparking and burning-smell diagnosis',
        price: 400, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 45, warrantyDays: 30
      },
      {
        id: 's_p_extra_44_2', name: 'Fan / Light Installation', description: 'Ceiling fan, chandelier or light fitting with regulator setup',
        price: 520, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's_p_extra_44_3', name: 'Wiring & MCB Fault Finding', description: 'Short circuits, dead outlets and tripping MCBs traced and fixed',
        price: 800, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 60
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9270632915',
    email: 'karthikiyer64@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_45',
    name: 'Karthik Pillai',
    businessName: 'Karthik Carpenter Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Carpenter',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.2,
    reviewCount: 283,
    completedJobs: 576,
    startingPrice: 299,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 9.0,
    etaMinutes: 15,
    nextAvailable: 'Today, 1:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 4,
    responseTime: '15 mins',
    bio: 'Professional Carpenter expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Carpenter Repair'],
    offeredServices: [
      {
        id: 's_p_extra_45_1', name: 'Door & Window Repair', description: 'Alignment, hinges, handles, locks and frame fixes',
        price: 300, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's_p_extra_45_2', name: 'Furniture Assembly', description: 'Flat-pack beds, wardrobes, tables and shelving',
        price: 420, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 30
      },
      {
        id: 's_p_extra_45_3', name: 'Wardrobe & Cabinet Work', description: 'Sliding doors, drawer channels, shutters and custom shelving',
        price: 780, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 180, warrantyDays: 60
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9485526036',
    email: 'karthikpillai65@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_46',
    name: 'Diya Yadav',
    businessName: 'Diya Painting Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Painting',
    subCategories: ['General Service', 'Maintenance'],
    rating: 3.8,
    reviewCount: 405,
    completedJobs: 820,
    startingPrice: 399,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 5.9,
    etaMinutes: 38,
    nextAvailable: 'Today, 5:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 2,
    responseTime: '15 mins',
    bio: 'Professional Painting expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Painting Repair'],
    offeredServices: [
      {
        id: 's_p_extra_46_1', name: 'Single Room Painting', description: 'Two coats of emulsion with surface prep and masking',
        price: 400, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 480, warrantyDays: 180
      },
      {
        id: 's_p_extra_46_2', name: 'Texture & Accent Wall', description: 'Designer texture or accent finish on one feature wall',
        price: 640, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 360, warrantyDays: 180
      },
      {
        id: 's_p_extra_46_3', name: 'Waterproofing & Damp Repair', description: 'Damp patch treatment, sealing and protective coating',
        price: 960, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 480, warrantyDays: 365
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9128470776',
    email: 'diyayadav66@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_47',
    name: 'Shaurya Venkatesh',
    businessName: 'Shaurya Home Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Home Maintenance',
    subCategories: ['General Service', 'Maintenance'],
    rating: 3.9,
    reviewCount: 347,
    completedJobs: 704,
    startingPrice: 399,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 6.9,
    etaMinutes: 41,
    nextAvailable: 'Today, 2:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 8,
    responseTime: '15 mins',
    bio: 'Professional Home Maintenance expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Home Maintenance Repair'],
    offeredServices: [
      {
        id: 's_p_extra_47_1', name: 'General Handyman Visit', description: 'Small repairs, fittings and odd jobs around the house',
        price: 400, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's_p_extra_47_2', name: 'TV & Shelf Wall Mounting', description: 'Bracket fitting, drilling, levelling and cable management',
        price: 520, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 75, warrantyDays: 30
      },
      {
        id: 's_p_extra_47_3', name: 'Home Repair Combo', description: 'Multiple small fixes across rooms in a single visit',
        price: 800, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 150, warrantyDays: 30
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9659737110',
    email: 'shauryavenkatesh67@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_48',
    name: 'Sai Iyer',
    businessName: 'Sai Appliance Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Appliance Repair',
    subCategories: ['General Service', 'Maintenance'],
    rating: 3.8,
    reviewCount: 61,
    completedJobs: 132,
    startingPrice: 299,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 9.7,
    etaMinutes: 52,
    nextAvailable: 'Today, 3:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 11,
    responseTime: '15 mins',
    bio: 'Professional Appliance Repair expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Appliance Repair Repair'],
    offeredServices: [
      {
        id: 's_p_extra_48_1', name: 'Appliance Diagnosis & Repair', description: 'Fault diagnosis and on-site repair with genuine parts',
        price: 300, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 90
      },
      {
        id: 's_p_extra_48_2', name: 'Microwave / OTG Repair', description: 'Magnetron, heating element and control panel faults',
        price: 390, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 75, warrantyDays: 90
      },
      {
        id: 's_p_extra_48_3', name: 'Geyser Service & Repair', description: 'Element, thermostat and tank descaling',
        price: 510, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 90
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9176847924',
    email: 'saiiyer68@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_49',
    name: 'Anika Krishnan',
    businessName: 'Anika Electrical Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Electrical',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.8,
    reviewCount: 254,
    completedJobs: 518,
    startingPrice: 199,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 3.9,
    etaMinutes: 41,
    nextAvailable: 'Today, 5:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 7,
    responseTime: '15 mins',
    bio: 'Professional Electrical expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Electrical Repair'],
    offeredServices: [
      {
        id: 's_p_extra_49_1', name: 'Switchboard & Socket Repair', description: 'Loose connections, sparking and burning-smell diagnosis',
        price: 200, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 45, warrantyDays: 30
      },
      {
        id: 's_p_extra_49_2', name: 'Fan / Light Installation', description: 'Ceiling fan, chandelier or light fitting with regulator setup',
        price: 260, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's_p_extra_49_3', name: 'Wiring & MCB Fault Finding', description: 'Short circuits, dead outlets and tripping MCBs traced and fixed',
        price: 400, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 60
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9821117105',
    email: 'anikakrishnan69@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_50',
    name: 'Vikram Kumar',
    businessName: 'Vikram Appliance Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Appliance Repair',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.6,
    reviewCount: 375,
    completedJobs: 760,
    startingPrice: 299,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 6.0,
    etaMinutes: 16,
    nextAvailable: 'Today, 2:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 5,
    responseTime: '15 mins',
    bio: 'Professional Appliance Repair expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Appliance Repair Repair'],
    offeredServices: [
      {
        id: 's_p_extra_50_1', name: 'Appliance Diagnosis & Repair', description: 'Fault diagnosis and on-site repair with genuine parts',
        price: 300, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 90
      },
      {
        id: 's_p_extra_50_2', name: 'Microwave / OTG Repair', description: 'Magnetron, heating element and control panel faults',
        price: 390, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 75, warrantyDays: 90
      },
      {
        id: 's_p_extra_50_3', name: 'Geyser Service & Repair', description: 'Element, thermostat and tank descaling',
        price: 510, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 90
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9679245735',
    email: 'vikramkumar70@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_51',
    name: 'Ramesh Bose',
    businessName: 'Ramesh Home Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Home Maintenance',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.6,
    reviewCount: 451,
    completedJobs: 912,
    startingPrice: 299,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 3.3,
    etaMinutes: 36,
    nextAvailable: 'Today, 2:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 7,
    responseTime: '15 mins',
    bio: 'Professional Home Maintenance expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Home Maintenance Repair'],
    offeredServices: [
      {
        id: 's_p_extra_51_1', name: 'General Handyman Visit', description: 'Small repairs, fittings and odd jobs around the house',
        price: 300, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's_p_extra_51_2', name: 'TV & Shelf Wall Mounting', description: 'Bracket fitting, drilling, levelling and cable management',
        price: 390, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 75, warrantyDays: 30
      },
      {
        id: 's_p_extra_51_3', name: 'Home Repair Combo', description: 'Multiple small fixes across rooms in a single visit',
        price: 600, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 150, warrantyDays: 30
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9820223337',
    email: 'rameshbose71@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_52',
    name: 'Amit Yadav',
    businessName: 'Amit Painting Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Painting',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.3,
    reviewCount: 490,
    completedJobs: 990,
    startingPrice: 299,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 5.4,
    etaMinutes: 21,
    nextAvailable: 'Today, 4:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 2,
    responseTime: '15 mins',
    bio: 'Professional Painting expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Painting Repair'],
    offeredServices: [
      {
        id: 's_p_extra_52_1', name: 'Single Room Painting', description: 'Two coats of emulsion with surface prep and masking',
        price: 300, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 480, warrantyDays: 180
      },
      {
        id: 's_p_extra_52_2', name: 'Texture & Accent Wall', description: 'Designer texture or accent finish on one feature wall',
        price: 480, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 360, warrantyDays: 180
      },
      {
        id: 's_p_extra_52_3', name: 'Waterproofing & Damp Repair', description: 'Damp patch treatment, sealing and protective coating',
        price: 720, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 480, warrantyDays: 365
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9996878367',
    email: 'amityadav72@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_53',
    name: 'Vikram Menon',
    businessName: 'Vikram Pest Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Pest Control',
    subCategories: ['General Service', 'Maintenance'],
    rating: 3.6,
    reviewCount: 64,
    completedJobs: 138,
    startingPrice: 399,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 7.7,
    etaMinutes: 37,
    nextAvailable: 'Today, 5:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 10,
    responseTime: '15 mins',
    bio: 'Professional Pest Control expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Pest Control Repair'],
    offeredServices: [
      {
        id: 's_p_extra_53_1', name: 'Cockroach & Ant Treatment', description: 'Gel and spray treatment across kitchen and bathrooms',
        price: 400, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 90
      },
      {
        id: 's_p_extra_53_2', name: 'Termite Treatment', description: 'Drill-fill-seal treatment for woodwork and skirting',
        price: 1280, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 180, warrantyDays: 365
      },
      {
        id: 's_p_extra_53_3', name: 'Mosquito & Bed Bug Control', description: 'Fogging and mattress-level treatment',
        price: 640, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 60
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9910028299',
    email: 'vikrammenon73@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_54',
    name: 'Ramesh Pillai',
    businessName: 'Ramesh Plumbing Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Plumbing',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.4,
    reviewCount: 96,
    completedJobs: 202,
    startingPrice: 299,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 9.9,
    etaMinutes: 23,
    nextAvailable: 'Today, 2:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 4,
    responseTime: '15 mins',
    bio: 'Professional Plumbing expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Plumbing Repair'],
    offeredServices: [
      {
        id: 's_p_extra_54_1', name: 'Tap & Mixer Repair', description: 'Dripping tap, broken handle or full replacement',
        price: 300, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 45, warrantyDays: 30
      },
      {
        id: 's_p_extra_54_2', name: 'Drain & Blockage Clearing', description: 'Kitchen sink, washbasin and bathroom drain unclogging',
        price: 420, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 30
      },
      {
        id: 's_p_extra_54_3', name: 'Pipe Leak & Concealed Repair', description: 'Leak tracing, pipe section replacement and resealing',
        price: 660, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 120, warrantyDays: 60
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9853953266',
    email: 'rameshpillai74@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_55',
    name: 'Shaurya Singh',
    businessName: 'Shaurya Pest Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Pest Control',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.5,
    reviewCount: 196,
    completedJobs: 402,
    startingPrice: 399,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 4.8,
    etaMinutes: 30,
    nextAvailable: 'Today, 2:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 8,
    responseTime: '15 mins',
    bio: 'Professional Pest Control expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Pest Control Repair'],
    offeredServices: [
      {
        id: 's_p_extra_55_1', name: 'Cockroach & Ant Treatment', description: 'Gel and spray treatment across kitchen and bathrooms',
        price: 400, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 90
      },
      {
        id: 's_p_extra_55_2', name: 'Termite Treatment', description: 'Drill-fill-seal treatment for woodwork and skirting',
        price: 1280, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 180, warrantyDays: 365
      },
      {
        id: 's_p_extra_55_3', name: 'Mosquito & Bed Bug Control', description: 'Fogging and mattress-level treatment',
        price: 640, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 60
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9765382074',
    email: 'shauryasingh75@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_56',
    name: 'Karthik Menon',
    businessName: 'Karthik Appliance Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Appliance Repair',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.5,
    reviewCount: 161,
    completedJobs: 332,
    startingPrice: 399,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 7.1,
    etaMinutes: 42,
    nextAvailable: 'Today, 5:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 11,
    responseTime: '15 mins',
    bio: 'Professional Appliance Repair expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Appliance Repair Repair'],
    offeredServices: [
      {
        id: 's_p_extra_56_1', name: 'Appliance Diagnosis & Repair', description: 'Fault diagnosis and on-site repair with genuine parts',
        price: 400, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 90
      },
      {
        id: 's_p_extra_56_2', name: 'Microwave / OTG Repair', description: 'Magnetron, heating element and control panel faults',
        price: 520, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 75, warrantyDays: 90
      },
      {
        id: 's_p_extra_56_3', name: 'Geyser Service & Repair', description: 'Element, thermostat and tank descaling',
        price: 680, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 90
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9631214877',
    email: 'karthikmenon76@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_57',
    name: 'Ramesh Das',
    businessName: 'Ramesh Pest Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Pest Control',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.9,
    reviewCount: 119,
    completedJobs: 248,
    startingPrice: 199,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 10.2,
    etaMinutes: 33,
    nextAvailable: 'Today, 1:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 4,
    responseTime: '15 mins',
    bio: 'Professional Pest Control expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Pest Control Repair'],
    offeredServices: [
      {
        id: 's_p_extra_57_1', name: 'Cockroach & Ant Treatment', description: 'Gel and spray treatment across kitchen and bathrooms',
        price: 200, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 90
      },
      {
        id: 's_p_extra_57_2', name: 'Termite Treatment', description: 'Drill-fill-seal treatment for woodwork and skirting',
        price: 640, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 180, warrantyDays: 365
      },
      {
        id: 's_p_extra_57_3', name: 'Mosquito & Bed Bug Control', description: 'Fogging and mattress-level treatment',
        price: 320, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 60
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9505616750',
    email: 'rameshdas77@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_58',
    name: 'Kavya Kumar',
    businessName: 'Kavya Cleaning Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Cleaning',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.1,
    reviewCount: 134,
    completedJobs: 278,
    startingPrice: 199,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 8.9,
    etaMinutes: 21,
    nextAvailable: 'Today, 3:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 6,
    responseTime: '15 mins',
    bio: 'Professional Cleaning expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Cleaning Repair'],
    offeredServices: [
      {
        id: 's_p_extra_58_1', name: 'Bathroom Deep Cleaning', description: 'Tiles, commode, taps, mirror descaling and sanitisation',
        price: 200, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 7
      },
      {
        id: 's_p_extra_58_2', name: 'Kitchen Deep Cleaning', description: 'Hob, chimney, tiles and cabinet exteriors degreased',
        price: 320, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 120, warrantyDays: 7
      },
      {
        id: 's_p_extra_58_3', name: 'Full Home Deep Cleaning', description: 'Floor to ceiling across all rooms, bathrooms and kitchen',
        price: 720, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 300, warrantyDays: 7
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9374797114',
    email: 'kavyakumar78@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_59',
    name: 'Ashok Das',
    businessName: 'Ashok Appliance Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Appliance Repair',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.8,
    reviewCount: 131,
    completedJobs: 272,
    startingPrice: 399,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 5.6,
    etaMinutes: 48,
    nextAvailable: 'Today, 2:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 2,
    responseTime: '15 mins',
    bio: 'Professional Appliance Repair expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Appliance Repair Repair'],
    offeredServices: [
      {
        id: 's_p_extra_59_1', name: 'Appliance Diagnosis & Repair', description: 'Fault diagnosis and on-site repair with genuine parts',
        price: 400, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 90
      },
      {
        id: 's_p_extra_59_2', name: 'Microwave / OTG Repair', description: 'Magnetron, heating element and control panel faults',
        price: 520, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 75, warrantyDays: 90
      },
      {
        id: 's_p_extra_59_3', name: 'Geyser Service & Repair', description: 'Element, thermostat and tank descaling',
        price: 680, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 90
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9933063732',
    email: 'ashokdas79@nammaserve.in',
    isAvailable: true
  },
  {
    id: 'p_extra_60',
    name: 'Amit Das',
    businessName: 'Amit Appliance Services',
    avatar: '',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Appliance Repair',
    subCategories: ['General Service', 'Maintenance'],
    rating: 4.3,
    reviewCount: 186,
    completedJobs: 382,
    startingPrice: 299,
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: 2.1,
    etaMinutes: 48,
    nextAvailable: 'Today, 1:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: 11,
    responseTime: '15 mins',
    bio: 'Professional Appliance Repair expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['Appliance Repair Repair'],
    offeredServices: [
      {
        id: 's_p_extra_60_1', name: 'Appliance Diagnosis & Repair', description: 'Fault diagnosis and on-site repair with genuine parts',
        price: 300, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 60, warrantyDays: 90
      },
      {
        id: 's_p_extra_60_2', name: 'Microwave / OTG Repair', description: 'Magnetron, heating element and control panel faults',
        price: 390, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 75, warrantyDays: 90
      },
      {
        id: 's_p_extra_60_3', name: 'Geyser Service & Repair', description: 'Element, thermostat and tank descaling',
        price: 510, visitCharge: 199, priceUnit: 'fixed', durationMinutes: 90, warrantyDays: 90
      }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 9916242991',
    email: 'amitdas80@nammaserve.in',
    isAvailable: true
  },
];

export const initialBookings: Booking[] = [
  {
    id: 'b1',
    bookingNumber: 'LF-CHN-9482',
    providerId: 'p1',
    providerName: 'Ravi Kumar',
    providerAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300',
    providerCategory: 'AC Repair & Service',
    providerPhone: '+91 98765 43210',
    customerId: 'usr_cust_1',
    customerName: 'Aakash Malhotra',
    customerPhone: '+91 99999 11122',
    serviceId: 's101',
    serviceName: 'AC Annual Service',
    servicePrice: 499,
    visitCharge: 199,
    serviceFee: 0,
    partsCharge: 0,
    gst: 126,
    discount: 0,
    totalPrice: 824,
    status: 'ON_THE_WAY',
    scheduledDate: '2026-09-29',
    scheduledTime: '10:30 AM',
    serviceLocation: '12, 4th Cross Street, Velachery, Chennai - 600042',
    serviceArea: 'Velachery',
    problemDescription: 'AC is not cooling properly. Ice formation visible on outdoor unit.',
    isEmergency: false,
    notes: 'Ring bell on arrival.',
    createdAt: '2026-09-28T08:30:00Z',
    paymentMethod: 'upi',
    paymentStatus: 'PENDING',
    warrantyDays: 30,
    statusHistory: [
      { status: 'PENDING', timestamp: '2026-09-28T08:30:00Z', note: 'Booking created' },
      { status: 'TECHNICIAN_ASSIGNED', timestamp: '2026-09-28T08:35:00Z', note: 'Ravi Kumar assigned' },
      { status: 'TECHNICIAN_ACCEPTED', timestamp: '2026-09-28T08:40:00Z', note: 'Technician confirmed' },
      { status: 'ON_THE_WAY', timestamp: '2026-09-29T09:50:00Z', note: 'Technician in transit - ETA 20 mins' },
    ]
  },
  {
    id: 'b2',
    bookingNumber: 'LF-CHN-9120',
    providerId: 'p2',
    providerName: 'Priya Ananya',
    providerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    providerCategory: 'Cleaning',
    providerPhone: '+91 98765 12345',
    customerId: 'usr_cust_1',
    customerName: 'Aakash Malhotra',
    customerPhone: '+91 99999 11122',
    serviceId: 's201',
    serviceName: '2BHK Deep Home Cleaning',
    servicePrice: 1499,
    visitCharge: 0,
    serviceFee: 0,
    partsCharge: 0,
    gst: 270,
    discount: 150,
    totalPrice: 1619,
    status: 'COMPLETED',
    scheduledDate: '2026-09-25',
    scheduledTime: '9:00 AM',
    serviceLocation: '12, 4th Cross Street, Velachery, Chennai - 600042',
    serviceArea: 'Velachery',
    problemDescription: 'Deep clean needed before family visit.',
    isEmergency: false,
    createdAt: '2026-09-24T10:15:00Z',
    paymentMethod: 'upi',
    paymentStatus: 'SUCCESS',
    warrantyDays: 0,
    statusHistory: [
      { status: 'PENDING', timestamp: '2026-09-24T10:15:00Z', note: 'Booking created' },
      { status: 'TECHNICIAN_ASSIGNED', timestamp: '2026-09-24T10:20:00Z', note: 'Priya Ananya assigned' },
      { status: 'TECHNICIAN_ACCEPTED', timestamp: '2026-09-24T10:25:00Z', note: 'Confirmed' },
      { status: 'ARRIVED', timestamp: '2026-09-25T08:55:00Z', note: 'Team arrived' },
      { status: 'SERVICE_STARTED', timestamp: '2026-09-25T09:05:00Z', note: 'Cleaning started' },
      { status: 'SERVICE_COMPLETED', timestamp: '2026-09-25T12:30:00Z', note: 'Service done' },
      { status: 'COMPLETED', timestamp: '2026-09-25T12:45:00Z', note: 'Payment confirmed' },
    ],
    hasBeenReviewed: false,
  },
  {
    id: 'b3',
    bookingNumber: 'LF-CHN-8755',
    providerId: 'p3',
    providerName: 'Rajesh Kumar',
    providerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    providerCategory: 'Electrical',
    providerPhone: '+91 98765 67890',
    customerId: 'usr_cust_1',
    customerName: 'Aakash Malhotra',
    customerPhone: '+91 99999 11122',
    serviceId: 's302',
    serviceName: 'Ceiling Fan Installation',
    servicePrice: 349,
    visitCharge: 149,
    serviceFee: 0,
    partsCharge: 0,
    gst: 90,
    discount: 0,
    totalPrice: 588,
    status: 'COMPLETED',
    scheduledDate: '2026-09-20',
    scheduledTime: '11:30 AM',
    serviceLocation: '12, 4th Cross Street, Velachery, Chennai - 600042',
    serviceArea: 'Velachery',
    problemDescription: 'New fan to be installed in master bedroom.',
    isEmergency: false,
    createdAt: '2026-09-19T09:00:00Z',
    paymentMethod: 'cash',
    paymentStatus: 'SUCCESS',
    warrantyDays: 90,
    warrantyExpiresAt: '2026-12-20',
    hasBeenReviewed: true,
    statusHistory: []
  }
];

export const initialWarranties: Warranty[] = [
  {
    id: 'w1',
    bookingId: 'b3',
    bookingNumber: 'LF-CHN-8755',
    customerId: 'usr_cust_1',
    technicianId: 'p3',
    technicianName: 'Rajesh Kumar',
    serviceName: 'Ceiling Fan Installation',
    serviceDate: '2026-09-20',
    warrantyDays: 90,
    expiresAt: '2026-12-20',
    status: 'ACTIVE',
  }
];

export const initialComplaints: Complaint[] = [];

export const initialMessages: Message[] = [
  {
    id: 'm1',
    bookingId: 'b1',
    senderId: 'p1',
    senderName: 'Ravi Kumar',
    senderRole: 'provider',
    receiverId: 'usr_cust_1',
    text: 'Vanakkam! I have accepted your AC service booking. I will be there by 10:30 AM tomorrow.',
    timestamp: '08:41',
    isRead: true
  },
  {
    id: 'm2',
    bookingId: 'b1',
    senderId: 'usr_cust_1',
    senderName: 'Aakash Malhotra',
    senderRole: 'customer',
    receiverId: 'p1',
    text: 'Thank you Ravi! I will be home. Please ring the bell.',
    timestamp: '08:45',
    isRead: true
  },
  {
    id: 'm3',
    bookingId: 'b1',
    senderId: 'p1',
    senderName: 'Ravi Kumar',
    senderRole: 'provider',
    receiverId: 'usr_cust_1',
    text: 'I am on my way! Should reach in about 20 minutes.',
    timestamp: '09:52',
    isRead: false
  }
];

export const initialNotifications: AppNotification[] = [
  {
    id: 'n1',
    title: 'Technician On The Way',
    message: 'Ravi Kumar is on his way for your AC Service. ETA: 20 minutes.',
    timestamp: '5 mins ago',
    isRead: false,
    type: 'booking',
    linkBookingId: 'b1'
  },
  {
    id: 'n2',
    title: 'Booking Completed',
    message: 'Your Deep Home Cleaning with Priya Ananya is completed. Please rate the service!',
    timestamp: '3 days ago',
    isRead: false,
    type: 'booking',
    linkBookingId: 'b2'
  },
  {
    id: 'n3',
    title: 'Warranty Active',
    message: 'Your Ceiling Fan Installation warranty is active until Dec 20, 2026.',
    timestamp: '1 week ago',
    isRead: true,
    type: 'warranty',
    linkBookingId: 'b3'
  },
  {
    id: 'n4',
    title: 'New Message',
    message: 'Ravi Kumar: "I am on my way! Should reach in about 20 minutes."',
    timestamp: '5 mins ago',
    isRead: false,
    type: 'message',
    linkBookingId: 'b1'
  }
];

export const mockOffers: Offer[] = [
  {
    id: 'o1',
    title: 'First Booking Offer',
    description: '₹100 off on your first AC service booking',
    discountAmount: 100,
    code: 'FIRST100',
    validUntil: '2026-10-31',
    category: 'AC Repair & Service',
    bgColor: 'from-brand-600 to-ns-navy',
    textColor: 'text-white'
  },
  {
    id: 'o2',
    title: 'Festival Special',
    description: '15% off on all home cleaning services',
    discountPercent: 15,
    code: 'FESTIVE15',
    validUntil: '2026-10-15',
    category: 'Cleaning',
    bgColor: 'from-brand-600 to-ns-navy',
    textColor: 'text-white'
  },
  {
    id: 'o3',
    title: 'Refer & Earn',
    description: 'Refer a friend and get ₹200 NammaServe wallet credit',
    discountAmount: 200,
    code: 'REFER200',
    validUntil: '2026-12-31',
    bgColor: 'from-brand-600 to-ns-navy',
    textColor: 'text-white'
  },
  {
    id: 'o4',
    title: 'Weekend Deal',
    description: '₹50 off on all electrical and plumbing bookings this weekend',
    discountAmount: 50,
    code: 'WEEKEND50',
    validUntil: '2026-10-05',
    bgColor: 'from-brand-600 to-ns-navy',
    textColor: 'text-white'
  },
];
