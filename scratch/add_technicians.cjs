const fs = require('fs');

const indianFirstNames = ["Aarav", "Vihaan", "Aditya", "Arjun", "Sai", "Riyan", "Krishna", "Ishaan", "Shaurya", "Atharv", "Ananya", "Aadhya", "Diya", "Kashvi", "Saanvi", "Meera", "Riya", "Kavya", "Anika", "Priya", "Rahul", "Karan", "Ravi", "Amit", "Vikram", "Suresh", "Ramesh", "Deepak", "Manoj", "Sanjay", "Rajesh", "Naveen", "Ashok", "Karthik", "Ganesh"];
const indianLastNames = ["Sharma", "Verma", "Gupta", "Kumar", "Singh", "Yadav", "Patel", "Reddy", "Nair", "Iyer", "Rao", "Das", "Mukherjee", "Bose", "Chowdhury", "Menon", "Pillai", "Krishnan", "Venkatesh", "Srinivasan"];
const categories = ["AC Repair & Service", "Electrical", "Plumbing", "Cleaning", "Appliance Repair", "Carpenter", "Painting", "Pest Control", "Home Maintenance"];

const generateRandomProvider = (id) => {
  const firstName = indianFirstNames[Math.floor(Math.random() * indianFirstNames.length)];
  const lastName = indianLastNames[Math.floor(Math.random() * indianLastNames.length)];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const rating = (Math.random() * (5.0 - 3.5) + 3.5).toFixed(1);
  const reviewCount = Math.floor(Math.random() * 500) + 10;
  
  return `
  {
    id: 'p_extra_${id}',
    name: '${firstName} ${lastName}',
    businessName: '${firstName} ${category.split(' ')[0]} Services',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000',
    category: '${category}',
    subCategories: ['General Service', 'Maintenance'],
    rating: ${rating},
    reviewCount: ${reviewCount},
    completedJobs: ${reviewCount * 2 + 10},
    startingPrice: ${Math.floor(Math.random() * 3 + 1) * 100 + 99},
    visitCharge: 199,
    priceUnit: 'fixed',
    distanceKm: ${(Math.random() * 10 + 1).toFixed(1)},
    etaMinutes: ${Math.floor(Math.random() * 40) + 15},
    nextAvailable: 'Today, ${Math.floor(Math.random() * 5) + 1}:00 PM',
    location: 'Chennai',
    serviceAreas: ['Chennai'],
    serviceRadiusKm: 20,
    isVerified: true,
    verificationStatus: 'VERIFIED',
    yearsExperience: ${Math.floor(Math.random() * 10) + 2},
    responseTime: '15 mins',
    bio: 'Professional ${category} expert providing quality services.',
    about: 'I am a dedicated professional committed to excellent service delivery.',
    skills: ['${category} Repair'],
    offeredServices: [],
    availabilitySlots: [],
    portfolio: [],
    reviews: [],
    phone: '+91 9${Math.floor(Math.random() * 900000000) + 100000000}',
    email: '${firstName.toLowerCase()}@example.com',
    isAvailable: true
  },`;
};

let extraProviders = '';
for (let i = 1; i <= 60; i++) {
  extraProviders += generateRandomProvider(i);
}

const filepath = 'src/data/mockData.ts';
let content = fs.readFileSync(filepath, 'utf8');
content = content.replace(/\];\s*export const initialBookings/, extraProviders + '\n];\n\nexport const initialBookings');
fs.writeFileSync(filepath, content);
console.log('Added 60 extra providers.');
