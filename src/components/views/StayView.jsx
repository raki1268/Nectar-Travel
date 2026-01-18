import { MapPin, Star } from 'lucide-react';
import { hotels } from '../../data/hotels';

export default function StayView() {
  // 将对象转换为数组
  const hotelList = Object.values(hotels);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Stay</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotelList.map(hotel => (
          <div key={hotel.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
            <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <span className="text-white text-sm">Hotel Image</span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg">{hotel.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 my-2">
                <MapPin size={16} />
                <span>{hotel.cityId}</span>
              </div>
              <p className="text-gray-600 text-sm mt-3 line-clamp-2">{hotel.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}