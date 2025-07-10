import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Smart Search',
    desc: 'Find rentals by location, budget, and amenities in seconds.',
    icon: '🔍',
  },
  {
    title: 'Verified Listings',
    desc: 'No more scams. All listings and agents are verified for your safety.',
    icon: '✅',
  },
  {
    title: 'Map & Directions',
    desc: 'See exactly where each house is and get directions from your location.',
    icon: '🗺️',
  },
  {
    title: 'Local Guides',
    desc: 'Book a trusted local to view a house for you, even if you’re far away.',
    icon: '🤝',
  },
  {
    title: 'M-PESA Payments',
    desc: 'Pay securely for premium services with M-PESA or card.',
    icon: '💸',
  },
  {
    title: 'Save Favorites',
    desc: 'Bookmark listings and get alerts when new houses match your criteria.',
    icon: '⭐',
  },
];

const testimonials = [
  {
    name: 'Grace W.',
    text: 'I found my apartment in Juja in just 2 days! No more endless WhatsApp groups.',
  },
  {
    name: 'Brian K.',
    text: 'The local guide service is a game changer. I booked a viewing while still upcountry.',
  },
  {
    name: 'Janet M.',
    text: 'I love the verified listings. I feel much safer using RentRadar.',
  },
];

const LandingPage = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    {/* Hero Section */}
    <div className="bg-primary-600 text-white py-20 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Find Your Perfect Rental, Stress-Free</h1>
      <p className="text-lg md:text-2xl mb-8 max-w-2xl mx-auto">
        Discover affordable, verified houses and apartments. Search by location, budget, and amenities. Book local guides. All in one place.
      </p>
      <Link to="/register">
        <button className="bg-white text-primary-700 font-bold px-8 py-3 rounded-lg shadow hover:bg-primary-100 transition">
          Get Started
        </button>
      </Link>
    </div>

    {/* Features Grid */}
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h2 className="text-2xl font-bold text-center mb-8 text-primary-700">Why Choose RentRadar?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {features.map((f) => (
          <div key={f.title} className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center">
            <div className="text-4xl mb-3">{f.icon}</div>
            <h3 className="font-semibold text-lg mb-2 text-primary-700">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Testimonials */}
    <div className="bg-white py-12 px-4">
      <h2 className="text-xl font-bold text-center mb-8 text-primary-700">What Our Users Say</h2>
      <div className="max-w-3xl mx-auto grid gap-8 md:grid-cols-3">
        {testimonials.map((t) => (
          <div key={t.name} className="bg-gray-50 rounded-lg shadow p-6 flex flex-col items-center">
            <div className="text-3xl mb-2">“</div>
            <p className="text-gray-700 mb-4">{t.text}</p>
            <div className="font-semibold text-primary-600">{t.name}</div>
          </div>
        ))}
      </div>
    </div>

    {/* CTA Footer */}
    <div className="bg-primary-700 text-white py-8 text-center mt-auto">
      <h3 className="text-2xl font-bold mb-2">Ready to find your next home?</h3>
      <Link to="/register">
        <button className="bg-white text-primary-700 font-bold px-8 py-3 rounded-lg shadow hover:bg-primary-100 transition">
          Get Started
        </button>
      </Link>
    </div>
  </div>
);

export default LandingPage; 