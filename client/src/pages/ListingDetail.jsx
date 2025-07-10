import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getListingById } from '../services/listings';
import { Formik, Form, Field } from 'formik';

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

const ContactForm = ({ listing }) => {
  const [sent, setSent] = useState(false);
  return (
    <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">Contact Landlord/Agent</h3>
      {sent ? (
        <div className="text-green-600 font-semibold">Your message has been sent!</div>
      ) : (
        <Formik
          initialValues={{ name: '', email: '', phone: '', message: '' }}
          validate={values => {
            const errors = {};
            if (!values.name) errors.name = 'Required';
            if (!values.email) errors.email = 'Required';
            if (!values.message) errors.message = 'Required';
            return errors;
          }}
          onSubmit={(values, { resetForm }) => {
            // For now, just show success
            setSent(true);
            setTimeout(() => setSent(false), 4000);
            resetForm();
          }}
        >
          {({ errors, touched }) => (
            <Form className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <Field name="name" className="mt-1 block w-full rounded border-gray-300" />
                {errors.name && touched.name && <div className="text-xs text-red-500">{errors.name}</div>}
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <Field name="email" type="email" className="mt-1 block w-full rounded border-gray-300" />
                {errors.email && touched.email && <div className="text-xs text-red-500">{errors.email}</div>}
              </div>
              <div>
                <label className="block text-sm font-medium">Phone</label>
                <Field name="phone" className="mt-1 block w-full rounded border-gray-300" />
              </div>
              <div>
                <label className="block text-sm font-medium">Message</label>
                <Field as="textarea" name="message" rows={3} className="mt-1 block w-full rounded border-gray-300" />
                {errors.message && touched.message && <div className="text-xs text-red-500">{errors.message}</div>}
              </div>
              <button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded shadow">
                Send Message
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

const ListingDetail = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getListingById(id)
      .then(setListing)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!listing) return <div className="text-center py-10">Listing not found.</div>;

  // Google Maps Embed URL
  let mapUrl = null;
  const coords = listing.address?.location?.coordinates;
  if (coords && coords.length === 2) {
    mapUrl = `https://www.google.com/maps?q=${coords[1]},${coords[0]}&z=16&output=embed`;
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Link to="/" className="text-primary-600 hover:underline mb-4 inline-block">← Back to Search</Link>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          {listing.images && listing.images.length > 0 && (
            <div className="flex gap-2 overflow-x-auto">
              {listing.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img.url}
                  alt={listing.title}
                  className="h-48 w-64 object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>
        <h1 className="text-2xl font-bold text-primary-700 mb-2">{listing.title}</h1>
        <div className="text-lg text-primary-600 font-semibold mb-2">KES {listing.price?.toLocaleString()}</div>
        <div className="text-gray-600 mb-2">
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
        <div className="mb-4 text-gray-700">
          <strong>Description:</strong>
          <div>{listing.description}</div>
        </div>
        <div className="mb-4">
          <strong>Contact:</strong>
          <div>Name: {listing.contactInfo?.name}</div>
          <div>Phone: <a href={`tel:${listing.contactInfo?.phone}`} className="text-primary-600 hover:underline">{listing.contactInfo?.phone}</a></div>
          {listing.contactInfo?.email && <div>Email: <a href={`mailto:${listing.contactInfo.email}`} className="text-primary-600 hover:underline">{listing.contactInfo.email}</a></div>}
        </div>
        {mapUrl && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Location Map</h3>
            <div className="rounded overflow-hidden border">
              <iframe
                title="Property Location"
                src={mapUrl}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        )}
        <ContactForm listing={listing} />
      </div>
    </div>
  );
};

export default ListingDetail; 