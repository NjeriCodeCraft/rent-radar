import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddListingForm from '../components/AddListingForm';

const AgentDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [agentProfile, setAgentProfile] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (user?.role !== 'agent') {
      navigate('/agent/register');
      return;
    }

    loadAgentData();
  }, [isAuthenticated, user, navigate]);

  const loadAgentData = async () => {
    try {
      const [profileRes, listingsRes] = await Promise.all([
        axios.get('/api/agents/profile'),
        axios.get('/api/agents/listings')
      ]);
      setAgentProfile(profileRes.data.agent);
      setListings(listingsRes.data.listings);
    } catch (err) {
      setError('Failed to load agent data');
    } finally {
      setLoading(false);
    }
  };

  const handleListingSuccess = () => {
    loadAgentData();
    setActiveTab('listings');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'listings', label: 'My Listings' },
    { id: 'add-listing', label: 'Add Listing' },
    { id: 'profile', label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-4">
            <h1 className="text-2xl font-bold text-primary-700">Agent Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name}</p>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-700">Total Listings</h3>
                  <p className="text-3xl font-bold text-blue-600">{listings.length}</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-700">Active Listings</h3>
                  <p className="text-3xl font-bold text-green-600">
                    {listings.filter(l => l.isAvailable).length}
                  </p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-700">Base Rate</h3>
                  <p className="text-3xl font-bold text-purple-600">
                    KES {agentProfile?.pricing?.baseRate?.toLocaleString()}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'listings' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">My Listings</h2>
                  <button
                    onClick={() => setActiveTab('add-listing')}
                    className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
                  >
                    Add New Listing
                  </button>
                </div>
                {listings.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No listings yet. Add your first listing!
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {listings.map((listing) => (
                      <div key={listing._id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{listing.title}</h3>
                            <p className="text-gray-600">{listing.address?.city}, {listing.address?.street}</p>
                            <p className="text-primary-600 font-semibold">KES {listing.price?.toLocaleString()}</p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs ${
                            listing.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {listing.isAvailable ? 'Available' : 'Rented'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'add-listing' && (
              <AddListingForm 
                onSuccess={handleListingSuccess}
                onCancel={() => setActiveTab('listings')}
              />
            )}

            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Agent Profile</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Bio</label>
                    <p className="mt-1 text-gray-700">{agentProfile?.profile?.bio}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium">Experience</label>
                      <p className="mt-1 text-gray-700">{agentProfile?.profile?.experience} years</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Base Rate</label>
                      <p className="mt-1 text-gray-700">KES {agentProfile?.pricing?.baseRate?.toLocaleString()}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Languages</label>
                    <p className="mt-1 text-gray-700">{agentProfile?.profile?.languages?.join(', ')}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Specializations</label>
                    <p className="mt-1 text-gray-700">{agentProfile?.profile?.specializations?.join(', ')}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard; 