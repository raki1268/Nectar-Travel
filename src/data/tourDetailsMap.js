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
  }
};