import axios from 'axios';

const API_BASE = '/api/listings';

export const getListings = async (filters = {}) => {
  // Convert filters to query string
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== '' && value !== undefined && value !== null) {
      if (Array.isArray(value) && value.length > 0) {
        value.forEach((v) => params.append(key, v));
      } else {
        params.append(key, value);
      }
    }
  });
  const res = await axios.get(`${API_BASE}?${params.toString()}`);
  return res.data.listings;
};

export const getListingById = async (id) => {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data;
}; 