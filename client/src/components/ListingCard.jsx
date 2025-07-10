import React from 'react';
import { useNavigate } from 'react-router-dom';

const amenityIcons = {
  water: '💧',
  electricity: '⚡',
  wifi: '📶',
  security: '🔒',
  parking: '🚗',
  kitchen: '🍳',
  balcony: '🌅',
  furnished: '🛋️',
};

const ListingCard = ({ listing }) => {
  const mainImage = listing.images?.find(img => img.isPrimary) || listing.images?.[0];
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col">
      {mainImage && (
        <img
          src={mainImage.url}
          alt={listing.title}
          className="h-48 w-full object-cover"
        />
      )}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-primary-700 truncate">{listing.title}</h3>
          <span className="text-primary-600 font-semibold text-lg">KES {listing.price.toLocaleString()}</span>
        </div>
        <div className="text-gray-600 text-sm mb-1">
          {listing.address?.city}, {listing.address?.street}
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {Object.entries(listing.amenities || {})
            .filter(([key, value]) => value && amenityIcons[key])
            .map(([key]) => (
              <span key={key} title={key} className="text-xl" aria-label={key}>
                {amenityIcons[key]}
              </span>
            ))}
        </div>
        <div className="text-xs text-gray-500 mb-2 capitalize">{listing.propertyType}</div>
        <button
          className="mt-auto w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-md shadow"
          onClick={() => navigate(`/listing/${listing._id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ListingCard; 