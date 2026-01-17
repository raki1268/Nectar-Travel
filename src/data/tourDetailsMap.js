

export const tourDetailsMap = {
  1: {
    introduction: "体验加拿大东部的壮丽风光，从多伦多的现代都市风采，到尼亚加拉瀑布的自然奇观，再到魁北克古城的历史底蕴。这个12天的精致之旅将带你穿越加拿大最精华的地区，感受多元文化的碰撞和自然景观的震撼。",
    heroImages: [
      "images/categories/autumn.jpg",
      "images/categories/autumn.jpg",
      "images/categories/autumn.jpg"
    ],
    galleryImages: [
      "images/categories/autumn.jpg",
      "images/categories/autumn.jpg",
      "images/categories/autumn.jpg",
      "images/categories/autumn.jpg",
      "images/categories/autumn.jpg",
      "images/categories/autumn.jpg",
      "images/categories/autumn.jpg",
      "images/categories/autumn.jpg",
      "images/categories/autumn.jpg",
      "images/categories/autumn.jpg"
    ],
    introductionImage: "images/categories/autumn.jpg",
    destinations: [
      { name: "Toronto", days: "1-2", image: "images/categories/autumn.jpg" },
      { name: "Niagara Falls", days: "3", image: "images/categories/autumn.jpg" },
      { name: "Ottawa", days: "4-5", image: "images/categories/autumn.jpg" },
      { name: "Montreal", days: "6-8", image: "images/categories/autumn.jpg" },
      { name: "Quebec City", days: "9-12", image: "images/categories/autumn.jpg" }
    ],
    highlights: [
      "Priority access to CN Tower and behind-the-scenes Parliament tour",
      "Hornblower boat cruise to the base of Niagara Falls",
      "Private wine tasting in Niagara-on-the-Lake vineyards",
      "Gourmet food experiences in Montreal's best neighborhoods",
      "Luxury accommodation at Château Frontenac in Quebec City",
      "Exclusive visits to local farms and cideries on Île d'Orléans",
      "Expert local guides in each destination",
      "All inter-city transportation in comfort vehicles"
    ],
    relatedTours: [
      { id: "rel-western-002", title: "Western Canada Wilderness", price: 5200, days: 10 },
      { id: "rel-maritime-003", title: "Maritime Coastal Adventure", price: 4500, days: 8 },
      { id: "rel-rocky-004", title: "Rocky Mountain Explorer", price: 5500, days: 14 }
    ],
    bookingPolicy: {
      cancellation: [
        { days: "More than 60 days before departure", refund: "100% refund" },
        { days: "30-60 days before departure", refund: "75% refund" },
        { days: "15-30 days before departure", refund: "50% refund" },
        { days: "Less than 15 days", refund: "No refund" }
      ],
      payment: [
        { method: "Credit Card", description: "Visa, MasterCard, American Express accepted" },
        { method: "Bank Transfer", description: "Direct bank transfer available for orders over $5000" },
        { method: "Payment Plan", description: "Flexible 3-month payment plan with 5% surcharge" }
      ]
    },
    guide: {
      name: "Lorry",
      avatar: "images/categories/autumn.jpg",
      intro: "With over 15 years of experience exploring Canada's hidden gems, I bring passion and expertise to every journey."
    },
    teamInfo: {
      image: "images/categories/autumn.jpg",
      description: "Our professional team is dedicated to providing exceptional travel experiences. We carefully curate each detail to ensure your journey is seamless and memorable. From expert local guides to luxury accommodations, we handle everything so you can focus on enjoying the remarkable landscapes and vibrant cultures of Eastern Canada. Our commitment to excellence ensures every moment of your trip exceeds expectations."
    },
    itinerary: [
      {
        day: "1-2",
        location: "Toronto",
        description: "Experience Canada's largest city with iconic landmarks and vibrant neighborhoods.",
        image: "images/categories/autumn.jpg",
        hotel: { city: "Toronto", name: "The Distillery Lofts Hotel", description: "Luxury boutique hotel in Victorian-era historic district with modern amenities and charm." }
      },
      {
        day: "3",
        location: "Niagara Falls",
        description: "Witness the spectacular power of Niagara Falls and explore wine country.",
        image: "images/categories/autumn.jpg",
        hotel: { city: "Niagara-on-the-Lake", name: "Prince of Wales Hotel", description: "Historic luxury hotel overlooking the Niagara River with elegant Victorian architecture." }
      },
      {
        day: "4-5",
        location: "Ottawa",
        description: "Discover Canada's capital with Parliament Hill, museums, and river cruises.",
        image: "images/categories/autumn.jpg",
        hotel: { city: "Ottawa", name: "Fairmont Château Laurier", description: "Grand historic hotel in the heart of downtown near all major attractions." }
      },
      {
        day: "6-8",
        location: "Montreal",
        description: "Immerse in Montreal's artistic culture, gastronomy, and historic Old Town.",
        image: "images/categories/autumn.jpg",
        hotel: { city: "Montreal", name: "Ritz-Carlton Montreal", description: "Prestigious luxury hotel with sophisticated design and world-class service." }
      },
      {
        day: "9-12",
        location: "Quebec City",
        description: "Explore the charm of North America's only walled city and Île d'Orléans.",
        image: "images/categories/autumn.jpg",
        hotel: { city: "Quebec City", name: "Château Frontenac", description: "Iconic luxury castle hotel overlooking the St. Lawrence River with timeless elegance." }
      }
    ]
  },
  2: {
    introduction: "Experience the timeless elegance of Italy, from the fashion capital of Milan and the serene Lake Como to the artistic soul of Florence and the ancient grandeur of Rome. This 15-day classic journey takes you through Italy's most iconic landscapes, blending Renaissance art, Mediterranean sunshine, and exquisite gastronomy for an unforgettable Italian escape.",
    heroImages: [
      "images/tours/id2/hero1.jpg",
      "images/tours/id2/hero2.jpg",
      "images/tours/id2/hero3.jpg"
    ],
    galleryImages: [
      "images/tours/id2/gallary-1.jpg",
      "images/tours/id2/gallary-2.jpg",
      "images/tours/id2/gallary-3.jpg",
      "images/tours/id2/gallary-4.jpg",
      "images/tours/id2/gallary-5.jpg",
      "images/tours/id2/gallary-6.jpg",
      "images/tours/id2/gallary-7.jpg",
      "images/tours/id2/gallary-8.jpg",
      "images/tours/id2/gallary-9.jpg",
      "images/tours/id2/gallary-10.jpg"
    ],
    introductionImage: "images/tours/id2/pienza.jpg",
    destinations: [
      { name: "Milan & Lake Como", days: "1-3", image: "images/tours/id2/milan.jpg" },
      { name: "Dolomites", days: "4-5", image: "images/tours/id2/dolomites.jpg" },
      { name: "Venice", days: "6", image: "images/tours/id2/venice.jpg" },
      { name: "Tuscany & Florence", days: "7-10", image: "images/tours/id2/florence.jpg" },
      { name: "Amalfi Coast", days: "11-12", image: "images/tours/id2/amalfi-coast.jpg" },
      { name: "Rome", days: "13-15", image: "images/tours/id2/rome.jpg" }
    ],
   highlights: [
      "Private self-drive speedboat tour on the sparkling Lake Como",
      "Scenic cable car ride through the breathtaking Dolomite Alps",
      "Romantic gondola ride through the winding canals of Venice",
      "Summit climb of Florence Cathedral for a panoramic city view",
      "Savor premium Chianti wines amidst the rolling hills of Tuscany",
      "Elegant self-drive in a vintage classic car through cypress forests",
      "Relax on the sun-drenched Amalfi Coast with private leisure time",
      "Explore the ancient ruins of Pompeii with a private expert guide"
    ],
    relatedTours: [
      { id: "rel-france-001", title: "French Riviera & Provence", price: 6800, days: 12 },
      { id: "rel-swiss-002", title: "Swiss Alps & Lakes Luxury", price: 7200, days: 10 },
      { id: "rel-europe-003", title: "Grand European Capitals", price: 8500, days: 20 }
    ],
    bookingPolicy: {
      cancellation: [
        { days: "More than 60 days before departure", refund: "100% refund" },
        { days: "30-60 days before departure", refund: "75% refund" },
        { days: "15-30 days before departure", refund: "50% refund" },
        { days: "Less than 15 days", refund: "No refund" }
      ],
      payment: [
        { method: "Credit Card", description: "Visa, MasterCard, American Express accepted" },
        { method: "Bank Transfer", description: "Direct bank transfer available for orders over $5000" },
        { method: "Payment Plan", description: "Flexible 3-month payment plan with 5% surcharge" }
      ]
    },
    guide: {
      name: "Qi Wei",
      avatar: "images/categories/autumn.jpg",
      intro: "Our expert team provides professional Chinese-speaking services and curated luxury experiences across Italy's most beautiful regions."
    },
    teamInfo: {
      image: "images/categories/autumn.jpg",
      description: "Our professional team is dedicated to providing exceptional travel experiences. We carefully curate each detail to ensure your journey is seamless and memorable. From expert local guides to luxury accommodations, we handle everything so you can focus on enjoying the remarkable landscapes and vibrant cultures of Eastern Canada. Our commitment to excellence ensures every moment of your trip exceeds expectations."
    },
    itinerary: [
     {
        day: "1-3",
        location: "Milan & Lake Como",
        description: "Explore the global fashion hub of Milan and the stunning villas of Lake Como surrounded by the Alps.",
        image: "images/tour/id2/milan.jpg",
        hotel: { city: "Lake Como", name: "Grand Hotel Tremezzo", description: "An iconic art nouveau masterpiece offering unparalleled views of Bellagio and the lake." }
      },
      {
        day: "4-5",
        location: "Dolomites",
        description: "Experience the majestic peaks and jagged skylines of the Alps, a paradise for nature lovers.",
        image: "images/tours/id2/dolomites.jpg",
        hotel: { city: "Cortina d'Ampezzo", name: "Cristallo, a Luxury Collection Resort", description: "Historic mountain resort offering refined elegance in the heart of the Dolomites." }
      },
      {
        day: "6",
        location: "Venice",
        description: "The jewel of Italy, known for its intricate canals, elegant bridges, and deep cultural heritage.",
        image: "images/tours/id2/venice.jpg",
        hotel: { city: "Venice", name: "Belmond Hotel Cipriani", description: "Legendary luxury on Giudecca Island with spectacular views of the Venetian lagoon." }
      },
      {
        day: "7-10",
        location: "Tuscany & Florence",
        description: "Immerse in the Renaissance art of Florence and the rolling hills, vineyards, and cypress roads of Tuscany.",
        image: "images/tours/id2/florence.jpg",
        hotel: { city: "Florence", name: "Four Seasons Hotel Firenze", description: "A Renaissance palace featuring an enchanting private botanical garden." }
      },
      {
        day: "11-12",
        location: "Amalfi Coast",
        description: "Breathtaking cliffside views, colorful coastal towns, and the sparkling blue waters of the Mediterranean.",
        image: "images/tours/id2/amalfi-coast.jpg",
        hotel: { city: "Positano", name: "Le Sirenuse", description: "A luxury boutique hotel offering the most famous views of Positano's colorful houses." }
      },
      {
        day: "13-15",
        location: "Rome",
        description: "The Eternal City, home to glorious ancient ruins and a rich tapestry of history and culture.",
        image: "images/tours/id2/rome.jpg",
        hotel: { city: "Rome", name: "Hotel Hassler Roma", description: "Set at the top of the Spanish Steps, one of the city's most prestigious landmarks." }
      }
    ]
  }
};