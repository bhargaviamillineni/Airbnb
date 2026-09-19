const PHOTO_URLS = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
] as const;

export type PhotoSectionId = "living" | "bedroom" | "bathroom" | "kitchen" | "outdoor";

export interface PhotoSection {
  id: PhotoSectionId;
  title: string;
  subtitle?: string;
  thumbnail?: ListingPhoto;
  photos: ListingPhoto[];
}

export interface ListingPhoto {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  section: PhotoSectionId;
}

export interface Host {
  id: string;
  name: string;
  avatarUrl: string;
  isSuperhost: boolean;
  yearsHosting: number;
  reviewCount: number;
  rating: number;
  bio: string;
  languages: string[];
  coHosts: CoHost[];
  facts: HostFact[];
  responseRate: string;
  responseTime: string;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  unavailable?: boolean;
}

export interface CoHost {
  name: string;
  initial: string;
  color: string;
}

export interface HostFact {
  icon: string;
  text: string;
}

export interface Review {
  id: string;
  authorName: string;
  authorAvatarUrl: string;
  authorTenure: string;
  rating: number;
  date: string;
  text: string;
}

export interface RatingCategory {
  name: string;
  score: number;
}

export interface RatingChip {
  name: string;
  count: number;
}

export interface SleepingArrangement {
  id: string;
  roomName: string;
  bedDescription: string;
  imageUrl: string;
}

export interface Highlight {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Pricing {
  pricePerNight: number;
  currency: string;
  cleaningFee: number;
  serviceFee: number;
  totalForStay: number;
  nights: number;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface PolicySection {
  title: string;
  items: string[];
}

export interface NearbyStay {
  id: string;
  title: string;
  price: number;
  rating: number;
  imageUrl: string;
}

export interface Listing {
  id: string;
  title: string;
  propertyType: string;
  location: string;
  locationShort: string;
  guestCapacity: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  rating: number;
  reviewCount: number;
  isGuestFavorite: boolean;
  isSuperhost: boolean;
  photos: ListingPhoto[];
  photoSections: PhotoSection[];
  photoTourSections: PhotoSection[];
  host: Host;
  description: string;
  descriptionOriginal: string;
  highlights: Highlight[];
  amenities: Amenity[];
  totalAmenities: number;
  sleepingArrangements: SleepingArrangement[];
  reviews: Review[];
  ratingCategories: RatingCategory[];
  ratingChips: RatingChip[];
  ratingDistribution: number[];
  pricing: Pricing;
  neighbourhoodHighlights: string;
  coordinates: { lat: number; lng: number };
  policies: PolicySection[];
  nearbyStays: NearbyStay[];
}

function photoUrl(index: number): string {
  return PHOTO_URLS[index % PHOTO_URLS.length];
}

const PHOTO_ALT_SECTION: [string, PhotoSectionId][] = [
  ["Sunlit exterior facade of the Candolim apartment building", "outdoor"],
  ["Open-plan living area with a soft-gray sofa and wall-mounted television", "living"],
  ["Modern minimalist living room with woven rug and accent armchair", "living"],
  ["Calm bedroom with a queen-size bed and draped linen curtains", "bedroom"],
  ["Second bedroom corner with oak bedside table and reading lamp", "bedroom"],
  ["Sun-filled bedroom with white linen sheets and a wooden headboard", "bedroom"],
  ["Bright dining area framed by floor-to-ceiling windows", "living"],
  ["Polished bathroom with glass-door shower and marble tiles", "bathroom"],
  ["Warm kitchen with stone countertops and stainless-steel appliances", "kitchen"],
  ["Balcony lounge area with rattan armchairs overlooking the garden", "outdoor"],
  ["Private jacuzzi terrace at twilight surrounded by greenery", "outdoor"],
  ["Freshly made king bed dressed in soft cotton bedding", "bedroom"],
  ["Tiled bathroom vanity with round mirror and rainfall showerhead", "bathroom"],
  ["Scandi-style sitting nook with jute rug and linen drapes", "living"],
  ["U-shaped kitchen counter with breakfast bar and pendant lights", "kitchen"],
  ["Exterior courtyard at dusk with string lights and outdoor seating", "outdoor"],
  ["Spa-like bathroom with freestanding bathtub and wooden bench", "bathroom"],
  ["Dining table set for four with ceramic dinnerware", "kitchen"],
  ["Top-down view of a tidy double bedroom with accent cushions", "bedroom"],
  ["Compact home office corner with wooden desk and leather chair", "living"],
  ["Outdoor pool area next to sun loungers and cabana-style shade", "outdoor"],
  ["Rainfall shower and mosaic tile accent wall in the en-suite", "bathroom"],
  ["Open living-kitchen plan with an island and pendant lighting", "kitchen"],
  ["Sunlit balcony with outdoor wicker sofa and wooden side table", "outdoor"],
  ["Walk-in wardrobe with open shelving and brass clothing rails", "bedroom"],
  ["Downstairs powder room with patterned tiles and a vessel sink", "bathroom"],
  ["Pantry-style kitchen with open wooden shelves and ceramic jars", "kitchen"],
  ["Rooftop terrace jacuzzi framed by hanging lanterns and foliage", "outdoor"],
  ["Cozy reading corner with floor lamp, ottoman, and linen throw", "living"],
  ["Guest bedroom with a pair of twin beds and coastal-style artwork", "bedroom"],
  ["Marble-effect shower with rainfall head and wall niche for toiletries", "bathroom"],
  ["Breakfast bar on a wooden island with woven counter stools", "kitchen"],
  ["Night-time exterior of the building entry with warm lanterns", "outdoor"],
  ["Living area with a mid-century-style wooden credenza and potted plants", "living"],
  ["Nursery-style single room with oak crib and knitted blankets", "bedroom"],
  ["Modern en-suite bathroom with a double-sink vanity and LED mirror", "bathroom"],
  ["Kitchen open shelf displaying ceramic dishes and copper pans", "kitchen"],
  ["Garden view from the bedroom balcony with teak patio furniture", "outdoor"],
  ["Living room media wall with framed artwork and a low-profile media unit", "living"],
  ["Top-view of a hotel-style neatly made bed with bedside lamps on both sides", "bedroom"],
  ["Jacuzzi on the terrace with a poolside backdrop in daylight", "outdoor"],
  ["Full bathroom with a combined bathtub and a handheld showerhead", "bathroom"],
  ["Dining room with a long wooden table surrounded by upholstered chairs", "kitchen"],
];

const ALL_PHOTOS: ListingPhoto[] = PHOTO_ALT_SECTION.map(([alt, section], index) => ({
  id: `photo-${index + 1}`,
  url: photoUrl(index),
  alt,
  section,
}));

function photosBySection(section: PhotoSectionId): ListingPhoto[] {
  return ALL_PHOTOS.filter((photo) => photo.section === section);
}

const PHOTO_SECTIONS: PhotoSection[] = [
  { id: "living", title: "Living room", photos: photosBySection("living") },
  { id: "bedroom", title: "Bedroom", photos: photosBySection("bedroom") },
  { id: "bathroom", title: "Bathroom", photos: photosBySection("bathroom") },
  { id: "kitchen", title: "Kitchen and dining", photos: photosBySection("kitchen") },
  { id: "outdoor", title: "Outdoor spaces", photos: photosBySection("outdoor") },
];

const LIVING_PHOTOS = photosBySection("living");
const BEDROOM_PHOTOS = photosBySection("bedroom");
const BATHROOM_PHOTOS = photosBySection("bathroom");
const KITCHEN_DINING_PHOTOS = photosBySection("kitchen");
const OUTDOOR_PHOTOS = photosBySection("outdoor");

function pickPhotos(pool: ListingPhoto[], start: number, length: number): ListingPhoto[] {
  return pool.slice(start, start + length);
}

const PHOTO_TOUR_SECTIONS: PhotoSection[] = [
  {
    id: "living",
    title: "Living room 1",
    subtitle: "Sofa · Air conditioning · Ceiling fan · TV",
    photos: LIVING_PHOTOS.length > 0 ? pickPhotos(LIVING_PHOTOS, 0, Math.min(5, LIVING_PHOTOS.length)) : [],
  },
  {
    id: "living",
    title: "Living room 2",
    subtitle: "Ceiling fan · Hot tub",
    photos: LIVING_PHOTOS.length > 5 ? pickPhotos(LIVING_PHOTOS, 5, 5) : pickPhotos(LIVING_PHOTOS, 0, LIVING_PHOTOS.length),
  },
  {
    id: "kitchen",
    title: "Full kitchen",
    subtitle: "Stovetop · Fridge · Oven · Dishwasher",
    photos: KITCHEN_DINING_PHOTOS,
  },
  {
    id: "bedroom",
    title: "Bedroom",
    subtitle: "1 king bed · Bed linens · Iron · Wardrobe",
    photos: BEDROOM_PHOTOS,
  },
  {
    id: "bathroom",
    title: "Full bathroom",
    subtitle: "Shower · Bathtub · Hair dryer · Hot water",
    photos: BATHROOM_PHOTOS,
  },
  {
    id: "living",
    title: "Gym",
    subtitle: "Gym · Yoga mats · Fitness equipment",
    photos: LIVING_PHOTOS.length > 0 ? pickPhotos(LIVING_PHOTOS, 0, 2) : [],
  },
  {
    id: "outdoor",
    title: "Exterior",
    subtitle: "Terrace · Balcony · Garden view",
    photos: OUTDOOR_PHOTOS.length > 0 ? pickPhotos(OUTDOOR_PHOTOS, 0, Math.min(4, OUTDOOR_PHOTOS.length)) : [],
  },
  {
    id: "outdoor",
    title: "Pool",
    subtitle: "Swimming pool · Pool view · Sun loungers",
    photos: OUTDOOR_PHOTOS.length > 4 ? pickPhotos(OUTDOOR_PHOTOS, 4, OUTDOOR_PHOTOS.length) : pickPhotos(OUTDOOR_PHOTOS, 0, OUTDOOR_PHOTOS.length),
  },
  {
    id: "living",
    title: "Additional photos",
    photos: [],
  },
];

export const listingData: Listing = {
  id: "mirashya-ug10",
  title: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10",
  propertyType: "Entire serviced apartment",
  location: "Candolim, Goa, India",
  locationShort: "Candolim, India",
  guestCapacity: 3,
  bedrooms: 1,
  beds: 1,
  bathrooms: 1,
  rating: 4.95,
  reviewCount: 19,
  isGuestFavorite: true,
  isSuperhost: false,
  photos: ALL_PHOTOS,
  photoSections: PHOTO_SECTIONS,
  photoTourSections: PHOTO_TOUR_SECTIONS,
  host: {
    id: "mirashya-homes",
    name: "Mirashya Homes",
    avatarUrl: photoUrl(0),
    isSuperhost: false,
    yearsHosting: 2,
    reviewCount: 1463,
    rating: 4.68,
    bio: "Born in the 80s · Where I went to school: NICMAR GOA",
    languages: [],
    facts: [
      { icon: "briefcase", text: "Born in the 80s" },
      { icon: "graduation-cap", text: "Where I went to school: NICMAR GOA" },
    ],
    coHosts: [
      { name: "Sharath", initial: "S", color: "var(--color-cohost-1)" },
      { name: "Aman Dev Pahwa", initial: "A", color: "var(--color-cohost-2)" },
      { name: "Maria Karen Priyanka", initial: "M", color: "var(--color-cohost-3)" },
      { name: "Simran", initial: "S", color: "var(--color-cohost-4)" },
      { name: "Pallavi", initial: "P", color: "var(--color-cohost-5)" },
      { name: "Sanyukta", initial: "S", color: "var(--color-cohost-6)" },
      { name: "Shruti", initial: "S", color: "var(--color-cohost-7)" },
      { name: "Amisha", initial: "A", color: "var(--color-cohost-8)" },
    ],
    responseRate: "100%",
    responseTime: "within an hour",
  },
  description:
    "🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 💻, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹, it's ideal for couples seeking romance, relaxation, and a touch of luxury in North Goa. ❤️🌴",
  descriptionOriginal:
    "Amor De Goa by Mirashya Homes is a carefully designed one-bedroom serviced apartment located within a quiet, tree-lined lane in central Candolim. The home has been furnished with a calm coastal palette and thoughtfully chosen furniture to make short getaways feel spacious and unhurried. Guests have exclusive access to a private jacuzzi on the terrace, high-speed internet, a dedicated workspace for remote work, a fully stocked kitchenette, and a curated entertainment setup with streaming apps on the living-room television. The beachfront promenade, popular seafood spots, late-night bakeries, and the weekly market are all reachable within a short walk or a quick rickshaw ride. The property is suited for couples on a slow holiday, small groups of friends celebrating an occasion, and remote workers looking to spend a few productive weeks near the coast.",
  highlights: [
    {
      id: "outdoor",
      title: "Outdoor entertainment",
      description: "The pool and alfresco dining are great for summer trips.",
      icon: "sun",
    },
    {
      id: "cool",
      title: "Designed for staying cool",
      description: "Beat the heat with the A/C and ceiling fan.",
      icon: "snowflake",
    },
    {
      id: "checkin",
      title: "Self check-in",
      description: "You can check in with the building staff.",
      icon: "key",
    },
  ],
  amenities: [
    { id: "kitchen", name: "Kitchen", icon: "utensils" },
    { id: "wifi", name: "Wifi", icon: "wifi" },
    { id: "workspace", name: "Dedicated workspace", icon: "laptop" },
    { id: "parking", name: "Free parking on premises", icon: "car" },
    { id: "pool", name: "Pool", icon: "waves" },
    { id: "hottub", name: "Hot tub", icon: "bath" },
    { id: "pets", name: "Pets allowed", icon: "paw-print" },
    { id: "cameras", name: "Exterior security cameras on property", icon: "cctv" },
    { id: "ac", name: "Air conditioning", icon: "thermometer-snowflake" },
    { id: "tv", name: "TV with standard cable", icon: "tv" },
    { id: "washer", name: "Washing machine", icon: "washing-machine" },
    { id: "fridge", name: "Refrigerator", icon: "refrigerator" },
    { id: "microwave", name: "Microwave", icon: "microwave" },
    { id: "stove", name: "Stove and oven", icon: "cooking-pot" },
    { id: "kettle", name: "Electric kettle", icon: "coffee" },
    { id: "toaster", name: "Toaster", icon: "sandwich" },
    { id: "dishware", name: "Dishes and silverware", icon: "utensils-crossed" },
    { id: "dishwasher", name: "Dishwasher", icon: "sparkles" },
    { id: "essentials", name: "Essentials (towels, sheets, soap)", icon: "bath" },
    { id: "hangers", name: "Clothes hangers", icon: "shirt" },
    { id: "iron", name: "Iron and ironing board", icon: "shirt" },
    { id: "hairdryer", name: "Hair dryer", icon: "wind" },
    { id: "shampoo", name: "Shampoo and shower gel", icon: "droplet" },
    { id: "linens", name: "Extra pillows and blankets", icon: "bed-double" },
    { id: "firstaid", name: "First aid kit", icon: "heart-pulse" },
    { id: "fireext", name: "Fire extinguisher", icon: "shield-alert" },
    { id: "lockbox", name: "Lockbox bedroom safe", icon: "lock" },
    { id: "smokedetector", name: "Smoke detector", icon: "bell" },
    { id: "doorlock", name: "Smart lock on entry door", icon: "lock-keyhole" },
    { id: "balcony", name: "Private balcony or terrace", icon: "armchair" },
    { id: "garden", name: "Access to garden or patio", icon: "trees" },
    { id: "outdoordining", name: "Outdoor dining area", icon: "utensils-crossed" },
    { id: "sunloungers", name: "Sun loungers", icon: "armchair" },
    { id: "bbq", name: "Barbecue grill (charcoal)", icon: "flame" },
    { id: "streaming", name: "Streaming services on TV", icon: "play" },
    { id: "speaker", name: "Bluetooth speaker", icon: "speaker" },
    { id: "boardgames", name: "Board games and books", icon: "gamepad-2" },
    { id: "co-alarm", name: "Carbon monoxide alarm", icon: "alert-circle", unavailable: true },
    { id: "elevator", name: "Building elevator", icon: "arrow-up-down", unavailable: true },
  ],
  totalAmenities: 50,
  sleepingArrangements: [
    {
      id: "bedroom",
      roomName: "Bedroom",
      bedDescription: "1 double bed",
      imageUrl: photoUrl(3),
    },
    {
      id: "living",
      roomName: "Living room",
      bedDescription: "1 sofa",
      imageUrl: photoUrl(1),
    },
  ],
  reviews: [
    {
      id: "rev-1",
      authorName: "Amit",
      authorAvatarUrl: photoUrl(6),
      authorTenure: "2 months on Airbnb",
      rating: 5,
      date: "1 week ago",
      text: "Very helpful and responsive team. Safe and peaceful stay. loved everything about the property.",
    },
    {
      id: "rev-2",
      authorName: "Aheesh",
      authorAvatarUrl: photoUrl(7),
      authorTenure: "3 years on Airbnb",
      rating: 5,
      date: "2 weeks ago",
      text: "We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again.",
    },
    {
      id: "rev-3",
      authorName: "Samiksha",
      authorAvatarUrl: photoUrl(8),
      authorTenure: "8 months on Airbnb",
      rating: 5,
      date: "May 2026",
      text: "the host nitish was really great help",
    },
    {
      id: "rev-4",
      authorName: "Vedant",
      authorAvatarUrl: photoUrl(6),
      authorTenure: "4 years on Airbnb",
      rating: 5,
      date: "May 2026",
      text: "We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The cleanliness standards were truly impressive, with every corner of the house looking fresh and pristine.",
    },
    {
      id: "rev-5",
      authorName: "Vaibhav S",
      authorAvatarUrl: photoUrl(7),
      authorTenure: "3 years on Airbnb",
      rating: 5,
      date: "May 2026",
      text: "Great great experience living out there, can't expect more, will always look for it in the future and will recommend my friends too.",
    },
    {
      id: "rev-6",
      authorName: "Mohd",
      authorAvatarUrl: photoUrl(8),
      authorTenure: "5 years on Airbnb",
      rating: 5,
      date: "May 2026",
      text: "Great place. Exactly as described in the listing.",
    },
    {
      id: "rev-7",
      authorName: "Riya",
      authorAvatarUrl: photoUrl(9),
      authorTenure: "1 year on Airbnb",
      rating: 5,
      date: "April 2026",
      text: "Booked this for our anniversary weekend and it exceeded every expectation. The jacuzzi on the terrace was magical at sunset and the bedroom was plush and quiet. Communication with the host team was instant - we arrived late at night and everything was ready for us.",
    },
    {
      id: "rev-8",
      authorName: "Karan Arora",
      authorAvatarUrl: photoUrl(10),
      authorTenure: "6 years on Airbnb",
      rating: 4,
      date: "April 2026",
      text: "A solid apartment in a very convenient location. The kitchen had everything we needed for home-cooked breakfasts and the a/c worked perfectly even on 38-degree afternoons. Only minor points - the lift was out of service for a few hours one day and the wifi dropped briefly once. Otherwise smooth.",
    },
    {
      id: "rev-9",
      authorName: "Neha",
      authorAvatarUrl: photoUrl(11),
      authorTenure: "10 months on Airbnb",
      rating: 5,
      date: "April 2026",
      text: "Pet-friendly hosts made this trip stress-free for our little pup! Plenty of cafes and the beach are an easy rickshaw ride away. Would book again.",
    },
    {
      id: "rev-10",
      authorName: "Siddharth Mehra",
      authorAvatarUrl: photoUrl(6),
      authorTenure: "2 years on Airbnb",
      rating: 5,
      date: "March 2026",
      text: "Working remotely from this apartment was fantastic. The dedicated desk by the window had solid daylight and the wifi held up for Zoom calls all week. The co-hosts dropped off a complementary bottle of wine on our first night - such a classy touch.",
    },
    {
      id: "rev-11",
      authorName: "Anushka",
      authorAvatarUrl: photoUrl(7),
      authorTenure: "4 months on Airbnb",
      rating: 5,
      date: "March 2026",
      text: "Pictures do not do the terrace justice at all. We spent almost every evening out there with a book. The interiors look brand new, the linen is crisp, and the bathroom is spotless. Highly recommend.",
    },
    {
      id: "rev-12",
      authorName: "Prateek",
      authorAvatarUrl: photoUrl(8),
      authorTenure: "9 years on Airbnb",
      rating: 5,
      date: "February 2026",
      text: "Been coming to Goa for a decade and this is easily in my top three stays. The location is quiet enough to sleep well but close enough to walk to the main strip when you want it. The jacuzzi was spotlessly clean and hot.",
    },
    {
      id: "rev-13",
      authorName: "Ishita",
      authorAvatarUrl: photoUrl(9),
      authorTenure: "3 months on Airbnb",
      rating: 5,
      date: "February 2026",
      text: "First Airbnb booking and I'm sold. The host team walked me through the self-check-in patiently over call, the TV had all the apps I needed, and the bed was super comfortable. Five stars all the way.",
    },
    {
      id: "rev-14",
      authorName: "Rohit Nair",
      authorAvatarUrl: photoUrl(10),
      authorTenure: "7 years on Airbnb",
      rating: 4,
      date: "January 2026",
      text: "Overall a lovely space and great value. The living room gets a lot of natural light and the kitchen appliances are new. A couple of small fixtures in the bathroom could do with tightening but nothing that ruined the trip. Co-hosts were warm and check-in was seamless.",
    },
    {
      id: "rev-15",
      authorName: "Meera",
      authorAvatarUrl: photoUrl(11),
      authorTenure: "11 months on Airbnb",
      rating: 5,
      date: "January 2026",
      text: "Charming, quiet, clean and tastefully done up. Easy to book, easy to reach, and easy to love. Will be back next winter!",
    },
    {
      id: "rev-16",
      authorName: "Arjun",
      authorAvatarUrl: photoUrl(6),
      authorTenure: "5 months on Airbnb",
      rating: 5,
      date: "December 2025",
      text: "Slept like a log here every night. The curtains are blackout, the a/c is silent, and the street outside is very mellow after 10pm. Perfect recharge weekend for two tired people.",
    },
    {
      id: "rev-17",
      authorName: "Tanya",
      authorAvatarUrl: photoUrl(7),
      authorTenure: "3 years on Airbnb",
      rating: 5,
      date: "December 2025",
      text: "The host recommendations for local seafood restaurants were on the money and saved us a lot of research time. We tried three places off their list and every one was a winner. The home itself is gorgeous.",
    },
    {
      id: "rev-18",
      authorName: "Dhruv Kapoor",
      authorAvatarUrl: photoUrl(8),
      authorTenure: "8 years on Airbnb",
      rating: 5,
      date: "November 2025",
      text: "Everything worked. Check-in, check-out, appliances, jacuzzi, TV, the works. Co-hosts were reachable within minutes for anything. No-nonsense, professional, classy stay.",
    },
    {
      id: "rev-19",
      authorName: "Sonakshi",
      authorAvatarUrl: photoUrl(9),
      authorTenure: "1 year on Airbnb",
      rating: 5,
      date: "November 2025",
      text: "Came for a long girls' weekend with two friends and the sofa bed got good reviews too. Plenty of closet space, large towels, good water pressure in the shower, and the little balcony off the living area was our morning coffee spot.",
    },
  ],
  ratingCategories: [
    { name: "Cleanliness", score: 5.0 },
    { name: "Accuracy", score: 5.0 },
    { name: "Check-in", score: 5.0 },
    { name: "Communication", score: 5.0 },
    { name: "Location", score: 4.8 },
    { name: "Value", score: 4.8 },
  ],
  ratingChips: [
    { name: "Comfort", count: 6 },
    { name: "Accuracy", count: 5 },
    { name: "Hot tub", count: 5 },
    { name: "Condition", count: 4 },
    { name: "Hospitality", count: 8 },
    { name: "Cleanliness", count: 4 },
    { name: "Amenities", count: 2 },
    { name: "Decor", count: 2 },
    { name: "Indoor spaces", count: 2 },
    { name: "Location", count: 2 },
  ],
  ratingDistribution: [85, 10, 3, 2, 0],
  pricing: {
    pricePerNight: 5700,
    currency: "INR",
    cleaningFee: 0,
    serviceFee: 0,
    totalForStay: 28499,
    nights: 5,
    checkIn: "10/18/2026",
    checkOut: "10/23/2026",
    guests: 2,
  },
  neighbourhoodHighlights:
    "Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.",
  coordinates: { lat: 15.518, lng: 73.762 },
  policies: [
    {
      title: "Cancellation policy",
      items: [
        "Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.",
        "Review this host's full policy for details on service fees and exceptions.",
        "Longer stays of 28+ nights follow a separate monthly policy.",
      ],
    },
    {
      title: "House rules",
      items: [
        "Check-in after 2:00 pm",
        "Checkout before 11:00 am",
        "3 guests maximum",
        "No parties or events of any kind.",
        "No smoking inside the apartment; designated smoking zone on the terrace.",
        "Quiet hours between 10:00 pm and 8:00 am out of respect for neighbours.",
      ],
    },
    {
      title: "Safety & property",
      items: [
        "Carbon monoxide alarm not reported on the premises.",
        "Smoke alarm not reported on the premises.",
        "Exterior security cameras record the building entry, terrace entrance, and parking lane.",
        "The swimming pool has an active shallow-end lifeguard on duty from 9:00 am to 7:00 pm.",
        "Window restrictors are installed on all upper-floor bedroom windows.",
      ],
    },
  ],
  nearbyStays: [
    {
      id: "nearby-1",
      title: "Beautiful Studio with a view to die for",
      price: 23600,
      rating: 4.91,
      imageUrl: photoUrl(4),
    },
    {
      id: "nearby-2",
      title: "NAQAB - 1bhk with private pool",
      price: 42218,
      rating: 4.95,
      imageUrl: photoUrl(5),
    },
    {
      id: "nearby-3",
      title: "Greentique Luxury Flat with plunge pool, Calangute",
      price: 44506,
      rating: 4.94,
      imageUrl: photoUrl(6),
    },
    {
      id: "nearby-4",
      title: "The Tropical Studio | 5 mins to Beach",
      price: 22824,
      rating: 4.96,
      imageUrl: photoUrl(7),
    },
    {
      id: "nearby-5",
      title: "Luxury Casa Bella 1BHK with plunge pool, Calangute",
      price: 39942,
      rating: 4.95,
      imageUrl: photoUrl(8),
    },
    {
      id: "nearby-6",
      title: "Kanso by Earthen Window | Jacuzzi | Terrace | Pool",
      price: 45648,
      rating: 5.0,
      imageUrl: photoUrl(9),
    },
    {
      id: "nearby-7",
      title: "Luxury Apt | Private Pool | 6 Mins from Beach",
      price: 48786,
      rating: 4.93,
      imageUrl: photoUrl(10),
    },
    {
      id: "nearby-8",
      title: "Serendipity Cottage - Calm Stay in Calangute-Baga.",
      price: 22824,
      rating: 4.92,
      imageUrl: photoUrl(11),
    },
  ],
};
