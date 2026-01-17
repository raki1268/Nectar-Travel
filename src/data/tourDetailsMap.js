import { cities } from './cities';
import { hotels } from './hotels';
import { guides } from './guides';
import { globalConfig } from './globalConfig';

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
    guideId: "lorry",
    destinations: [
      { cityId: "toronto", days: "1-2" },
      { cityId: "niagaraFalls", days: "3" },
      { cityId: "ottawa", days: "4-5" },
      { cityId: "montreal", days: "6-8" },
      { cityId: "quebecCity", days: "9-12" }
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
    itinerary: [
      {
        day: "1-2",
        cityId: "toronto",
        hotelId: "distillery-lofts"
      },
      {
        day: "3",
        cityId: "niagaraFalls",
        hotelId: "prince-of-wales"
      },
      {
        day: "4-5",
        cityId: "ottawa",
        hotelId: "fairmont-chateau-laurier"
      },
      {
        day: "6-8",
        cityId: "montreal",
        hotelId: "ritz-carlton-montreal"
      },
      {
        day: "9-12",
        cityId: "quebecCity",
        hotelId: "chateau-frontenac"
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
    guideId: "qi-wei",
    destinations: [
      { cityId: "milan", days: "1-3" },
      { cityId: "dolomites", days: "4-5" },
      { cityId: "venice", days: "6" },
      { cityId: "florence", days: "7-10" },
      { cityId: "amalfiCoast", days: "11-12" },
      { cityId: "rome", days: "13-15" }
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
    itinerary: [
      {
        day: "1-3",
        cityId: "milan",
        hotelId: "grand-hotel-tremezzo"
      },
      {
        day: "4-5",
        cityId: "dolomites",
        hotelId: "cristallo"
      },
      {
        day: "6",
        cityId: "venice",
        hotelId: "belmond-hotel-cipriani"
      },
      {
        day: "7-10",
        cityId: "florence",
        hotelId: "four-seasons-firenze"
      },
      {
        day: "11-12",
        cityId: "amalfiCoast",
        hotelId: "le-sirenuse"
      },
      {
        day: "13-15",
        cityId: "rome",
        hotelId: "hotel-hassler-roma"
      }
    ]
  }
};

/**
 * 获取完整的行程详情（包含所有引用数据）
 * @param {number} tourId - 行程ID
 * @returns {object} 完整的行程信息
 */
export function getTourDetails(tourId) {
  const tour = tourDetailsMap[tourId];
  
  if (!tour) {
    console.warn(`Tour with ID ${tourId} not found`);
    return null;
  }

  // 调试日志
  console.log(`=== getTourDetails for tour ${tourId} ===`);
  console.log('Available hotel keys:', Object.keys(hotels));
  
  // 构建完整的itinerary，包含城市和酒店详情
  const itineraryWithDetails = tour.itinerary.map(item => {
    const hotelData = hotels[item.hotelId];
    console.log(`Looking for hotel: ${item.hotelId}`, hotelData ? '✓ Found' : '✗ NOT FOUND');
    
    return {
      day: item.day,
      city: cities[item.cityId],
      hotel: hotelData
    };
  });

  // 构建完整的destinations，包含城市详情
  const destinationsWithDetails = tour.destinations.map(dest => ({
    days: dest.days,
    ...cities[dest.cityId]
  }));

  // 返回完整的行程数据
  return {
    ...tour,
    guide: guides[tour.guideId],
    destinations: destinationsWithDetails,
    itinerary: itineraryWithDetails,
    bookingPolicy: globalConfig.bookingPolicy,
    teamInfo: globalConfig.teamInfo
  };
}