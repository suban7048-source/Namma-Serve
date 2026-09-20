import { ServiceCategory, Provider, Booking, Message, AppNotification } from '../types';

export const mockCategories: ServiceCategory[] = [
  {
    id: 'plumbing',
    name: 'Plumbing',
    iconName: 'Wrench',
    count: 142,
    description: 'Leak fixes, pipe replacements, drain cleaning, and emergency repairs.',
    popularServices: ['Drain Cleaning', 'Pipe Repair', 'Water Heater Setup', 'Faucet Replacement']
  },
  {
    id: 'electrical',
    name: 'Electrical',
    iconName: 'Zap',
    count: 98,
    description: 'Wiring, outlet installs, circuit breakers, and lighting fixtures.',
    popularServices: ['Lighting Installation', 'Circuit Repair', 'EV Charger Install', 'Panel Upgrade']
  },
  {
    id: 'cleaning',
    name: 'Cleaning',
    iconName: 'Sparkles',
    count: 215,
    description: 'Deep house cleaning, move-in/out service, and carpet sanitization.',
    popularServices: ['Deep Home Cleaning', 'Move-out Cleaning', 'Window Washing', 'Carpet Cleaning']
  },
  {
    id: 'appliance-repair',
    name: 'Appliance Repair',
    iconName: 'Refrigerator',
    count: 84,
    description: 'Refrigerator, washing machine, dishwasher, and stove servicing.',
    popularServices: ['Fridge Diagnostic', 'Washer Repair', 'Dishwasher Fix', 'Oven Maintenance']
  },
  {
    id: 'painting',
    name: 'Painting',
    iconName: 'Paintbrush',
    count: 110,
    description: 'Interior and exterior wall painting, touch-ups, and cabinet refinishing.',
    popularServices: ['Interior Room Painting', 'Exterior House Paint', 'Cabinet Refinishing', 'Wall Touchup']
  },
  {
    id: 'ac-hvac',
    name: 'AC & HVAC',
    iconName: 'Wind',
    count: 76,
    description: 'AC tune-ups, duct cleaning, thermostat setup, and furnace repair.',
    popularServices: ['AC Maintenance', 'Duct Sanitization', 'Thermostat Install', 'Heating Tune-up']
  },
  {
    id: 'carpentry',
    name: 'Carpentry',
    iconName: 'Hammer',
    count: 65,
    description: 'Custom furniture, door fittings, shelf building, and deck repairs.',
    popularServices: ['Custom Shelving', 'Door Installation', 'Furniture Repair', 'Deck Maintenance']
  },
  {
    id: 'computer-it',
    name: 'Computer & IT',
    iconName: 'Monitor',
    count: 52,
    description: 'Wi-Fi setup, computer repair, home network configuration, and smart home setups.',
    popularServices: ['Mesh Wi-Fi Setup', 'PC Diagnostic', 'Smart Home Setup', 'Data Recovery']
  },
  {
    id: 'home-maintenance',
    name: 'Home Maintenance',
    iconName: 'Home',
    count: 180,
    description: 'Handyman services, gutter clearing, drywall repair, and furniture assembly.',
    popularServices: ['Furniture Assembly', 'Drywall Repair', 'Gutter Cleaning', 'TV Wall Mounting']
  },
  {
    id: 'other',
    name: 'Other Services',
    iconName: 'Grid',
    count: 45,
    description: 'Locksmith, pest control, lawn care, and specialized home help.',
    popularServices: ['Lock Rekeying', 'Pest Extermination', 'Lawn Mowing', 'Pressure Washing']
  }
];

export const mockProviders: Provider[] = [
  {
    id: 'p1',
    name: 'Aarav Sharma',
    businessName: 'Sharma Plumbing & Drainage',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300',
    coverImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1000',
    category: 'Plumbing',
    subCategories: ['Pipe Repair', 'Drain Cleaning', 'Water Heaters'],
    rating: 4.9,
    reviewCount: 128,
    completedJobs: 312,
    startingPrice: 65,
    priceUnit: 'hourly',
    distanceMiles: 1.8,
    nextAvailable: 'Today, 2:30 PM',
    location: 'Anna Nagar, Chennai',
    serviceRadiusMiles: 15,
    isVerified: true,
    yearsExperience: 12,
    responseTime: '15 mins',
    bio: 'Licensed master plumber specializing in high-efficiency plumbing repairs, clogged drains, and tankless water heater installs.',
    about: 'I have over 12 years of hands-on plumbing experience serving residential and commercial properties. Guaranteed clean work site and transparent upfront pricing without hidden fees.',
    offeredServices: [
      { id: 's101', name: 'Emergency Drain Clog Clearing', description: 'Power snaking and camera inspection for blocked drains', price: 95, priceUnit: 'fixed', durationMinutes: 60 },
      { id: 's102', name: 'Standard Plumbing Inspection & Repair', description: 'General diagnosis for leaks, faucets, and valves', price: 65, priceUnit: 'hourly', durationMinutes: 90 },
      { id: 's103', name: 'Water Heater Replacement / Install', description: 'Full installation of tankless or standard water heaters', price: 250, priceUnit: 'fixed', durationMinutes: 180 },
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:30 PM', '4:00 PM', '5:30 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '1:30 PM', '3:30 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '2:00 PM', '4:00 PM'] }
    ],
    portfolio: [
      { id: 'pf1', title: 'Modern Bathroom Pipe Installation', imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600', description: 'Complete copper pipe re-routing' },
      { id: 'pf2', title: 'Tankless Water Heater Setup', imageUrl: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=600', description: 'Eco-friendly water heating system' }
    ],
    reviews: [
      {
        id: 'r1',
        authorName: 'Sunita Rao',
        authorAvatar: '',
        rating: 5,
        subRatings: { quality: 5, professionalism: 5, punctuality: 5 },
        date: '3 days ago',
        comment: 'Aarav arrived within 30 minutes for an emergency kitchen pipe leak! Super professional, clean, and reasonably priced. Highly recommend!',
        tags: ['Punctual', 'Fast Response', 'Fair Price'],
        serviceUsed: 'Emergency Drain Clog Clearing'
      },
      {
        id: 'r2',
        authorName: 'Amitabh Joshi',
        authorAvatar: '',
        rating: 5,
        subRatings: { quality: 5, professionalism: 5, punctuality: 4.8 },
        date: '2 weeks ago',
        comment: 'Installed our tankless water heater efficiently. Took time to explain the operation settings. Great work!',
        tags: ['Expert Work', 'Clean Cleanup'],
        serviceUsed: 'Water Heater Replacement'
      }
    ],
    phone: '+91 98765 43210',
    email: 'aarav@sharmaplumbing.in'
  },
  {
    id: 'p2',
    name: 'Priya Ananya',
    businessName: 'SparklePro Deep Clean',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    coverImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1000',
    category: 'Cleaning',
    subCategories: ['Deep House Clean', 'Move-Out Service', 'Office Sanitation'],
    rating: 4.95,
    reviewCount: 210,
    completedJobs: 540,
    startingPrice: 80,
    priceUnit: 'fixed',
    distanceMiles: 2.4,
    nextAvailable: 'Tomorrow, 9:00 AM',
    location: 'T. Nagar, Chennai',
    serviceRadiusMiles: 20,
    isVerified: true,
    yearsExperience: 8,
    responseTime: '10 mins',
    bio: 'Eco-friendly residential & commercial cleaning specialist using non-toxic products and HEPA filtration equipment.',
    about: 'SparklePro brings premium hotel-standard cleanliness to your living space. We provide background-checked, insured staff and supply all organic eco-friendly materials.',
    offeredServices: [
      { id: 's201', name: 'Standard 2-Bedroom Deep Cleaning', description: 'Full surface wipe down, bathroom sanitization, vacuuming, & kitchen detail', price: 120, priceUnit: 'fixed', durationMinutes: 150 },
      { id: 's202', name: 'Move-in / Move-out Turnaround Clean', description: 'Deep cabinet cleaning, appliance interior clean, baseboards, and windows', price: 180, priceUnit: 'fixed', durationMinutes: 240 },
      { id: 's203', name: 'Weekly Maintenance Clean', description: 'Recurring quick refreshes for busy households', price: 80, priceUnit: 'fixed', durationMinutes: 90 }
    ],
    availabilitySlots: [
      { day: 'Tomorrow', slots: ['9:00 AM', '1:00 PM', '4:00 PM'] },
      { day: 'This Week', slots: ['10:00 AM', '2:00 PM'] }
    ],
    portfolio: [
      { id: 'pf3', title: 'Living Room Deep Restoration', imageUrl: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=600', description: 'Spotless hardwood polishing' },
      { id: 'pf4', title: 'Kitchen Detail Sanitization', imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600', description: 'Stainless steel shine & oven clean' }
    ],
    reviews: [
      {
        id: 'r3',
        authorName: 'Neha Agarwal',
        authorAvatar: '',
        rating: 5,
        subRatings: { quality: 5, professionalism: 5, punctuality: 5 },
        date: 'Yesterday',
        comment: 'Priya and her team transformed our apartment before our landlord walk-through. We got our full deposit back!',
        tags: ['Hotel Quality', 'Eco Friendly', 'Spotless'],
        serviceUsed: 'Move-in / Move-out Turnaround Clean'
      }
    ],
    phone: '+91 98765 12345',
    email: 'priya@sparklepro.in'
  },
  {
    id: 'p3',
    name: 'Rajesh Kumar',
    businessName: 'Rajesh Electrical Solutions',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: 'Electrical',
    subCategories: ['Circuit Breakers', 'EV Chargers', 'Fixture Installs'],
    rating: 4.85,
    reviewCount: 94,
    completedJobs: 185,
    startingPrice: 75,
    priceUnit: 'hourly',
    distanceMiles: 3.1,
    nextAvailable: 'Today, 4:30 PM',
    location: 'Adyar, Chennai',
    serviceRadiusMiles: 25,
    isVerified: true,
    yearsExperience: 10,
    responseTime: '20 mins',
    bio: 'Certified master electrician for smart home upgrades, EV charger installs, panel modernizations, and safety audits.',
    about: 'Safety is #1. We ensure all electrical work meets National Electrical Code (NEC) standards and passes local inspections seamlessly.',
    offeredServices: [
      { id: 's301', name: 'Level 2 EV Charger Installation', description: '240V dedicated circuit installation and charger mounting', price: 350, priceUnit: 'fixed', durationMinutes: 180 },
      { id: 's302', name: 'Chandelier / Ceiling Fan Installation', description: 'Safe ceiling box reinforcement and wiring', price: 110, priceUnit: 'fixed', durationMinutes: 90 },
      { id: 's303', name: 'Electrical Troubleshooting & Audit', description: 'Locating short circuits, dead outlets, & breaker trips', price: 75, priceUnit: 'hourly', durationMinutes: 60 }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['4:30 PM'] },
      { day: 'Tomorrow', slots: ['8:30 AM', '11:30 AM', '2:30 PM'] }
    ],
    portfolio: [
      { id: 'pf5', title: 'Tesla Wall Connector Setup', imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=600', description: 'Clean conduit line in residential garage' }
    ],
    reviews: [
      {
        id: 'r4',
        authorName: 'Ravi Shankar',
        authorAvatar: '',
        rating: 5,
        subRatings: { quality: 5, professionalism: 5, punctuality: 5 },
        date: '1 week ago',
        comment: 'Rajesh installed my EV charger quickly and cleanly. Kept everything tidy and explained how to use the safety switches.',
        tags: ['Master Electrician', 'Safe Work'],
        serviceUsed: 'Level 2 EV Charger Installation'
      }
    ],
    phone: '+91 98765 67890',
    email: 'rajesh@rajeshelectric.in'
  },
  {
    id: 'p4',
    name: 'Ananya Iyer',
    businessName: 'Iyer Interior Painting & Decor',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
    coverImage: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=1000',
    category: 'Painting',
    subCategories: ['Accent Walls', 'Full Room Paint', 'Cabinet Refinishing'],
    rating: 4.9,
    reviewCount: 76,
    completedJobs: 145,
    startingPrice: 150,
    priceUnit: 'fixed',
    distanceMiles: 4.5,
    nextAvailable: 'Thursday, 9:00 AM',
    location: 'Velachery, Chennai',
    serviceRadiusMiles: 18,
    isVerified: true,
    yearsExperience: 7,
    responseTime: '30 mins',
    bio: 'Precision painter focused on flawless edges, zero-VOC premium paints, drywall repair, and kitchen cabinet revamps.',
    about: 'Transform your home with crisp lines and vibrant color schemes. Includes full furniture taping and floor protection on every job.',
    offeredServices: [
      { id: 's401', name: 'Single Room Accent Wall & Trim', description: 'Includes wall prep, taping, sanding, and two coats of Sherwin-Williams paint', price: 175, priceUnit: 'fixed', durationMinutes: 180 },
      { id: 's402', name: 'Kitchen Cabinet Refinishing Package', description: 'Degreasing, priming, spray finishing, and new hardware installation', price: 650, priceUnit: 'fixed', durationMinutes: 480 }
    ],
    availabilitySlots: [
      { day: 'This Week', slots: ['Thursday 9:00 AM', 'Friday 1:00 PM'] }
    ],
    portfolio: [
      { id: 'pf6', title: 'Modern Navy Accent Wall', imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600', description: 'Flawless edge line with matte finish' }
    ],
    reviews: [
      {
        id: 'r5',
        authorName: 'Pooja Hegde',
        authorAvatar: '',
        rating: 5,
        subRatings: { quality: 5, professionalism: 5, punctuality: 5 },
        date: '5 days ago',
        comment: 'Ananya painted our master bedroom accent wall. The precision on the crown molding edge is incredible!',
        tags: ['Precision', 'Clean Prep'],
        serviceUsed: 'Single Room Accent Wall & Trim'
      }
    ],
    phone: '+91 98765 23456',
    email: 'ananya@iyerpainting.in'
  },
  {
    id: 'p5',
    name: 'Rohan Verma',
    businessName: 'Verma HVAC & Climate Care',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    coverImage: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=1000',
    category: 'AC & HVAC',
    subCategories: ['AC Tune-up', 'Duct Sanitization', 'Heat Pump Repair'],
    rating: 4.88,
    reviewCount: 165,
    completedJobs: 410,
    startingPrice: 85,
    priceUnit: 'fixed',
    distanceMiles: 5.2,
    nextAvailable: 'Tomorrow, 11:00 AM',
    location: 'Ambattur, Chennai',
    serviceRadiusMiles: 30,
    isVerified: true,
    yearsExperience: 14,
    responseTime: '12 mins',
    bio: 'EPA Certified HVAC technician for central air conditioning, mini-split systems, and furnace maintenance.',
    about: 'Keep your home comfortable year-round. Honest diagnostic assessments and upfront flat-rate pricing on all repairs.',
    offeredServices: [
      { id: 's501', name: 'Comprehensive AC Annual Tune-Up', description: 'Refrigerant check, coil cleaning, filter swap, & electrical check', price: 99, priceUnit: 'fixed', durationMinutes: 75 },
      { id: 's502', name: 'Smart Thermostat Installation (Ecobee/Nest)', description: 'C-wire installation, wall plate mounting, & Wi-Fi sync', price: 85, priceUnit: 'fixed', durationMinutes: 60 }
    ],
    availabilitySlots: [
      { day: 'Tomorrow', slots: ['11:00 AM', '3:00 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 98765 89012',
    email: 'rohan@vermahvac.in'
  },
  {
    id: 'p6',
    name: 'Karthik Sundaram',
    businessName: 'Sundaram IT & Smart Home Tech',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000',
    category: 'Computer & IT',
    subCategories: ['Wi-Fi Mesh', 'Smart Locks & Cameras', 'PC Hardware'],
    rating: 4.92,
    reviewCount: 64,
    completedJobs: 130,
    startingPrice: 70,
    priceUnit: 'hourly',
    distanceMiles: 2.1,
    nextAvailable: 'Today, 6:00 PM',
    location: 'OMR / Sholinganallur, Chennai',
    serviceRadiusMiles: 15,
    isVerified: true,
    yearsExperience: 9,
    responseTime: '8 mins',
    bio: 'Network engineer and smart home specialist. Mesh Wi-Fi optimization, Ring/Nest doorbells, and PC troubleshooting.',
    about: 'Eliminate Wi-Fi dead zones in your house and integrate all your smart devices into one effortless phone app.',
    offeredServices: [
      { id: 's601', name: 'Whole-Home Mesh Wi-Fi Setup & Optimization', description: 'Hardware installation, SSID config, dead-zone elimination, & security setup', price: 120, priceUnit: 'fixed', durationMinutes: 90 },
      { id: 's602', name: 'Smart Security Camera / Doorbell Install', description: 'Mounting, power wiring, and mobile device pairing', price: 90, priceUnit: 'fixed', durationMinutes: 60 }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['6:00 PM'] },
      { day: 'Tomorrow', slots: ['10:00 AM', '2:00 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 98765 34567',
    email: 'karthik@sundaramtech.in'
  },
  {
    id: 'p7',
    name: 'Devendra Sharma',
    businessName: 'Devendra Appliance Repair',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300',
    coverImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1000',
    category: 'Appliance Repair',
    subCategories: ['Refrigerator Fix', 'Washer & Dryer', 'Oven Diagnostics'],
    rating: 4.94,
    reviewCount: 112,
    completedJobs: 290,
    startingPrice: 75,
    priceUnit: 'fixed',
    distanceMiles: 1.5,
    nextAvailable: 'Today, 3:00 PM',
    location: 'Downtown, Sector 4',
    serviceRadiusMiles: 18,
    isVerified: true,
    yearsExperience: 11,
    responseTime: '9 mins',
    bio: 'Factory-certified appliance technician servicing Samsung, LG, Whirlpool, Bosch, and GE home appliances.',
    about: 'Fast, reliable appliance repair with genuine OEM replacement parts and a 90-day warranty on all labor and components.',
    offeredServices: [
      { id: 's701', name: 'Refrigerator Cooling & Compressor Diagnostic', description: 'Temperature sensor check, coil cleaning, & coolant leak diagnostic', price: 85, priceUnit: 'fixed', durationMinutes: 60 },
      { id: 's702', name: 'Washing Machine Pump & Belt Repair', description: 'Drain pump replacement, drive belt alignment, & spin cycle repair', price: 110, priceUnit: 'fixed', durationMinutes: 90 },
      { id: 's703', name: 'Oven Igniter & Thermostat Replacement', description: 'Gas igniter calibration, heating element swap, & temperature check', price: 95, priceUnit: 'fixed', durationMinutes: 75 }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['3:00 PM', '5:30 PM'] },
      { day: 'Tomorrow', slots: ['10:00 AM', '1:00 PM', '4:00 PM'] }
    ],
    portfolio: [
      { id: 'pf7', title: 'French Door Refrigerator Repair', imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600', description: 'OEM compressor swap' }
    ],
    reviews: [
      {
        id: 'r7',
        authorName: 'Karan Malhotra',
        authorAvatar: '',
        rating: 5,
        subRatings: { quality: 5, professionalism: 5, punctuality: 5 },
        date: '4 days ago',
        comment: 'Devendra fixed our fridge on the same day! Had the exact LG sensor part in his truck.',
        tags: ['Fast Fix', 'OEM Parts', 'Fair Price'],
        serviceUsed: 'Refrigerator Cooling Diagnostic'
      }
    ],
    phone: '+91 98765 78901',
    email: 'devendra@sharmaappliance.in'
  },
  {
    id: 'p8',
    name: 'Tushar Deshmukh',
    businessName: 'Deshmukh Custom Woodworking & Shelving',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300',
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000',
    category: 'Carpentry',
    subCategories: ['Custom Built-ins', 'Door Alignment', 'Deck Restoration'],
    rating: 4.89,
    reviewCount: 88,
    completedJobs: 175,
    startingPrice: 115,
    priceUnit: 'fixed',
    distanceMiles: 3.8,
    nextAvailable: 'Tomorrow, 10:00 AM',
    location: 'Velachery, Chennai',
    serviceRadiusMiles: 22,
    isVerified: true,
    yearsExperience: 13,
    responseTime: '25 mins',
    bio: 'Master craftsman specializing in hardwood cabinetry, floating shelving, crown molding, and patio deck repair.',
    about: 'Custom carpentry built to stand the test of time. Precision measurements and immaculate wood finishing.',
    offeredServices: [
      { id: 's801', name: 'Custom Floating Shelves Installation', description: 'Concealed steel bracket mounting, custom hardwood stain, & wall leveling', price: 190, priceUnit: 'fixed', durationMinutes: 150 },
      { id: 's802', name: 'Interior Door Hanging & Alignment Fix', description: 'Hinge adjustment, latch alignment, and door trimming', price: 115, priceUnit: 'fixed', durationMinutes: 90 },
      { id: 's803', name: 'Outdoor Deck Board & Railing Repair', description: 'Replacing damaged cedar/composite boards and structural reinforcement', price: 220, priceUnit: 'fixed', durationMinutes: 240 }
    ],
    availabilitySlots: [
      { day: 'Tomorrow', slots: ['10:00 AM', '2:00 PM'] },
      { day: 'This Week', slots: ['Wednesday 9:00 AM', 'Friday 1:00 PM'] }
    ],
    portfolio: [
      { id: 'pf8', title: 'Oak Library Built-In Bookcase', imageUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=600', description: 'Custom stained oak with LED strip lighting' }
    ],
    reviews: [
      {
        id: 'r8',
        authorName: 'Jyoti Saxena',
        authorAvatar: '',
        rating: 5,
        subRatings: { quality: 5, professionalism: 5, punctuality: 4.9 },
        date: '1 week ago',
        comment: 'Tushar built custom floating oak shelves in our living room. Absolutely stunning craftsmanship!',
        tags: ['Master Craftsmanship', 'Precision', 'Clean Work'],
        serviceUsed: 'Custom Floating Shelves Installation'
      }
    ],
    phone: '+91 98765 43219',
    email: 'tushar@deshmukhwood.in'
  },
  {
    id: 'p9',
    name: 'Meera Banerjee',
    businessName: 'Meera HandyPro Home Repairs',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=300',
    coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1000',
    category: 'Home Maintenance',
    subCategories: ['TV Mounting', 'Furniture Assembly', 'Drywall Repair'],
    rating: 4.97,
    reviewCount: 156,
    completedJobs: 380,
    startingPrice: 75,
    priceUnit: 'fixed',
    distanceMiles: 1.2,
    nextAvailable: 'Today, 5:00 PM',
    location: 'Anna Nagar, Chennai',
    serviceRadiusMiles: 15,
    isVerified: true,
    yearsExperience: 7,
    responseTime: '5 mins',
    bio: 'Top-rated home assembly & repair pro. TV wall mounting, drywall patching, furniture building, and light fixture swaps.',
    about: 'I take the hassle out of home maintenance. Equipped with heavy-duty wall studs finders, cord concealers, and pro power tools.',
    offeredServices: [
      { id: 's901', name: 'TV Wall Mounting (Up to 75" with Concealed Wires)', description: 'Stud mounting, bracket installation, and wire routing behind drywall', price: 90, priceUnit: 'fixed', durationMinutes: 60 },
      { id: 's902', name: 'IKEA / Flat-Pack Furniture Assembly', description: 'Full assembly for beds, desks, dressers, & dining sets', price: 75, priceUnit: 'fixed', durationMinutes: 90 },
      { id: 's903', name: 'Drywall Hole Patching & Texture Match', description: 'Patching holes up to 12", sanding, texture matching, & primer coat', price: 130, priceUnit: 'fixed', durationMinutes: 120 }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['5:00 PM', '6:30 PM'] },
      { day: 'Tomorrow', slots: ['9:30 AM', '12:00 PM', '3:30 PM'] }
    ],
    portfolio: [
      { id: 'pf9', title: 'OLED TV Wall Mount & Soundbar', imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=600', description: 'Zero visible cables in living room setup' }
    ],
    reviews: [
      {
        id: 'r9',
        authorName: 'Chetan Kapoor',
        authorAvatar: '',
        rating: 5,
        subRatings: { quality: 5, professionalism: 5, punctuality: 5 },
        date: '2 days ago',
        comment: 'Meera mounted our 65" TV in under 45 minutes with zero mess. Wires are completely hidden inside the wall!',
        tags: ['Fast & Clean', 'Super Friendly', 'Expert Mount'],
        serviceUsed: 'TV Wall Mounting'
      }
    ],
    phone: '+91 98765 98765',
    email: 'meera@handypro.in'
  },
  {
    id: 'p10',
    name: 'Arjun Nair',
    businessName: 'Nair HydroClear Plumbing',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=300',
    coverImage: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=1000',
    category: 'Plumbing',
    subCategories: ['Hydro-jetting', 'Garbage Disposal', 'Sewer Inspection'],
    rating: 4.87,
    reviewCount: 94,
    completedJobs: 210,
    startingPrice: 125,
    priceUnit: 'fixed',
    distanceMiles: 4.1,
    nextAvailable: 'Tomorrow, 8:00 AM',
    location: 'Adyar, Chennai',
    serviceRadiusMiles: 25,
    isVerified: true,
    yearsExperience: 15,
    responseTime: '18 mins',
    bio: 'Heavy-duty drain and sewer specialist. Commercial hydro-jetting, garbage disposal replacements, and main line cleanouts.',
    about: 'When standard snakes fail, we use 4,000 PSI hydro-jetting technology to scour sewer pipes clean as new.',
    offeredServices: [
      { id: 's1001', name: 'Commercial 4,000 PSI Hydro-Jet Sewer Cleanout', description: 'High-pressure water jetting for root intrusion and heavy grease blockages', price: 280, priceUnit: 'fixed', durationMinutes: 120 },
      { id: 's1002', name: 'Garbage Disposal Unit Replacement & Install', description: 'Old unit removal, new InSinkErator installation, & leak testing', price: 125, priceUnit: 'fixed', durationMinutes: 60 }
    ],
    availabilitySlots: [
      { day: 'Tomorrow', slots: ['8:00 AM', '11:00 AM', '2:00 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 98765 87654',
    email: 'arjun@nairplumbing.in'
  },
  {
    id: 'p11',
    name: 'Kavya Reddy',
    businessName: 'Reddy Locksmith & Security Tech',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=300',
    coverImage: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1000',
    category: 'Other Services',
    subCategories: ['Lockout Service', 'Smart Lock Setup', 'Key Rekeying'],
    rating: 4.96,
    reviewCount: 140,
    completedJobs: 320,
    startingPrice: 75,
    priceUnit: 'fixed',
    distanceMiles: 1.9,
    nextAvailable: 'Today, 2:00 PM',
    location: 'T. Nagar, Chennai',
    serviceRadiusMiles: 20,
    isVerified: true,
    yearsExperience: 8,
    responseTime: '7 mins',
    bio: 'Licensed emergency locksmith & smart home entry technician. Schlage, Yale, August, & Kwikset certified.',
    about: '24/7 emergency response for home, car, and office lockouts. Upfront flat rates with zero hidden arrival surcharges.',
    offeredServices: [
      { id: 's1101', name: 'Emergency Residential Lockout Unlock', description: 'Non-destructive door opening service with zero lock damage guarantee', price: 75, priceUnit: 'fixed', durationMinutes: 30 },
      { id: 's1102', name: 'Smart Keyless Deadbolt Installation', description: 'Drilling alignment, Bluetooth/Wi-Fi hub connection, & mobile app access setup', price: 110, priceUnit: 'fixed', durationMinutes: 60 },
      { id: 's1103', name: 'Whole-House Lock Cylinder Rekeying', description: 'Rekeying up to 4 door locks to one master key', price: 140, priceUnit: 'fixed', durationMinutes: 90 }
    ],
    availabilitySlots: [
      { day: 'Today', slots: ['2:00 PM', '4:30 PM', '7:00 PM'] },
      { day: 'Tomorrow', slots: ['9:00 AM', '1:00 PM'] }
    ],
    portfolio: [],
    reviews: [
      {
        id: 'r11',
        authorName: 'Manish Patel',
        authorAvatar: '',
        rating: 5,
        subRatings: { quality: 5, professionalism: 5, punctuality: 5 },
        date: 'Yesterday',
        comment: 'Kavya arrived in 15 minutes when I locked myself out of my apartment! Super fast and professional.',
        tags: ['Lifesaver', 'Super Fast', 'Fair Price'],
        serviceUsed: 'Emergency Lockout Unlock'
      }
    ],
    phone: '+91 98765 76543',
    email: 'kavya@reddylocksmith.in'
  },
  {
    id: 'p12',
    name: 'Aditya Singhania',
    businessName: 'Singhania Carpet & Window Care',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=300',
    coverImage: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=1000',
    category: 'Cleaning',
    subCategories: ['Carpet Steam Clean', 'Window Detail', 'Upholstery'],
    rating: 4.91,
    reviewCount: 105,
    completedJobs: 240,
    startingPrice: 140,
    priceUnit: 'fixed',
    distanceMiles: 3.5,
    nextAvailable: 'Tomorrow, 9:30 AM',
    location: 'Velachery, Chennai',
    serviceRadiusMiles: 25,
    isVerified: true,
    yearsExperience: 10,
    responseTime: '14 mins',
    bio: 'Truck-mounted steam extraction specialist for carpets, rugs, sofas, and exterior streak-free window cleaning.',
    about: 'Deep heat extraction removes 99% of dust mites, pet dander, and stubborn stains without sticky chemical residues.',
    offeredServices: [
      { id: 's1201', name: 'Deep Steam Carpet Cleaning (3 Rooms)', description: 'Pre-spray treatment, high-temperature steam extraction, & deodorizing finish', price: 140, priceUnit: 'fixed', durationMinutes: 120 },
      { id: 's1202', name: 'Streak-Free Window Wash (Whole House Exterior)', description: 'Pure water-fed pole cleaning for ground & 2nd story windows including screens', price: 165, priceUnit: 'fixed', durationMinutes: 150 }
    ],
    availabilitySlots: [
      { day: 'Tomorrow', slots: ['9:30 AM', '1:30 PM'] }
    ],
    portfolio: [],
    reviews: [],
    phone: '+91 98765 65432',
    email: 'aditya@singhaniacare.in'
  }
];

export const initialBookings: Booking[] = [
  {
    id: 'b1',
    bookingNumber: 'BK-9482',
    providerId: 'p1',
    providerName: 'Aarav Sharma',
    providerAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300',
    providerCategory: 'Plumbing',
    providerPhone: '+91 98765 43210',
    customerId: 'usr_cust_1',
    customerName: 'Aakash Malhotra',
    customerPhone: '+91 99999 11122',
    serviceId: 's101',
    serviceName: 'Emergency Drain Clog Clearing',
    servicePrice: 95,
    serviceFee: 10,
    totalPrice: 105,
    status: 'Scheduled',
    scheduledDate: '2026-08-10',
    scheduledTime: '2:30 PM',
    serviceLocation: '742 Evergreen Terrace, Apt 4B',
    problemDescription: 'Kitchen sink is completely backed up and draining extremely slowly after dinner.',
    isEmergency: true,
    notes: 'Gate code #4492. Please call upon arrival.',
    createdAt: '2026-08-08T14:30:00Z'
  },
  {
    id: 'b2',
    bookingNumber: 'BK-9120',
    providerId: 'p2',
    providerName: 'Priya Ananya',
    providerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    providerCategory: 'Cleaning',
    providerPhone: '+91 98765 12345',
    customerId: 'usr_cust_1',
    customerName: 'Aakash Malhotra',
    customerPhone: '+91 99999 11122',
    serviceId: 's201',
    serviceName: 'Standard 2-Bedroom Deep Cleaning',
    servicePrice: 120,
    serviceFee: 12,
    totalPrice: 132,
    status: 'In Progress',
    scheduledDate: '2026-08-09',
    scheduledTime: '9:00 AM',
    serviceLocation: '742 Evergreen Terrace, Apt 4B',
    problemDescription: 'Deep clean needed prior to hosting family over the weekend.',
    isEmergency: false,
    createdAt: '2026-08-07T10:15:00Z'
  },
  {
    id: 'b3',
    bookingNumber: 'BK-8755',
    providerId: 'p3',
    providerName: 'Rajesh Kumar',
    providerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    providerCategory: 'Electrical',
    providerPhone: '+91 98765 67890',
    customerId: 'usr_cust_1',
    customerName: 'Aakash Malhotra',
    customerPhone: '+91 99999 11122',
    serviceId: 's302',
    serviceName: 'Chandelier / Ceiling Fan Installation',
    servicePrice: 110,
    serviceFee: 11,
    totalPrice: 121,
    status: 'Completed',
    scheduledDate: '2026-08-04',
    scheduledTime: '11:30 AM',
    serviceLocation: '742 Evergreen Terrace, Apt 4B',
    problemDescription: 'Installed new dining room fixture',
    isEmergency: false,
    createdAt: '2026-08-02T09:00:00Z',
    hasBeenReviewed: true
  }
];

export const initialMessages: Message[] = [
  {
    id: 'm1',
    bookingId: 'b1',
    senderId: 'p1',
    senderName: 'Aarav Sharma',
    senderRole: 'provider',
    receiverId: 'usr_cust_1',
    text: 'Hi Aakash! I got your emergency booking for the drain clog. I will bring the heavy-duty snake and camera unit.',
    timestamp: '14:35',
    isRead: true
  },
  {
    id: 'm2',
    bookingId: 'b1',
    senderId: 'usr_cust_1',
    senderName: 'Aakash Malhotra',
    senderRole: 'customer',
    receiverId: 'p1',
    text: 'Awesome, thanks Aarav! Let me know if you need gate code access.',
    timestamp: '14:38',
    isRead: true
  },
  {
    id: 'm3',
    bookingId: 'b1',
    senderId: 'p1',
    senderName: 'Aarav Sharma',
    senderRole: 'provider',
    receiverId: 'usr_cust_1',
    text: 'Got the gate code #4492 in the notes! I will update you when I am 15 minutes away tomorrow.',
    timestamp: '14:40',
    isRead: false
  }
];

export const initialNotifications: AppNotification[] = [
  {
    id: 'n1',
    title: 'Booking Confirmed',
    message: 'Aarav Sharma accepted your request for Emergency Drain Clog Clearing on Aug 10, 2:30 PM.',
    timestamp: '2 hours ago',
    isRead: false,
    type: 'booking',
    linkBookingId: 'b1'
  },
  {
    id: 'n2',
    title: 'Provider In Transit',
    message: 'Priya Ananya is on the way to your location for Standard 2-Bedroom Deep Cleaning.',
    timestamp: '20 mins ago',
    isRead: false,
    type: 'booking',
    linkBookingId: 'b2'
  },
  {
    id: 'n3',
    title: 'New Message',
    message: 'Aarav Sharma: "I will update you when I am 15 minutes away tomorrow."',
    timestamp: '1 hour ago',
    isRead: false,
    type: 'message',
    linkBookingId: 'b1'
  }
];
