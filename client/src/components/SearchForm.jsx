import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const amenitiesList = [
  { name: 'water', label: 'Good Water' },
  { name: 'electricity', label: 'Good Power' },
  { name: 'wifi', label: 'WiFi' },
  { name: 'security', label: 'Security' },
  { name: 'parking', label: 'Parking' },
  { name: 'kitchen', label: 'Kitchen' },
  { name: 'balcony', label: 'Balcony' },
  { name: 'furnished', label: 'Furnished' },
];

const propertyTypes = [
  'apartment',
  'house',
  'condo',
  'townhouse',
  'studio',
  'bedsitter',
];

const SearchSchema = Yup.object().shape({
  location: Yup.string().required('Location is required'),
  minPrice: Yup.number().min(0, 'Min price must be positive').nullable(),
  maxPrice: Yup.number().min(0, 'Max price must be positive').nullable(),
  bedrooms: Yup.number().min(0, 'Bedrooms must be positive').nullable(),
  bathrooms: Yup.number().min(0, 'Bathrooms must be positive').nullable(),
});

const initialValues = {
  location: '',
  minPrice: '',
  maxPrice: '',
  propertyType: '',
  bedrooms: '',
  bathrooms: '',
  amenities: [],
};

const SearchForm = ({ onSearch }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-3xl mx-auto mt-8">
      <Formik
        initialValues={initialValues}
        validationSchema={SearchSchema}
        onSubmit={(values) => {
          if (onSearch) onSearch(values);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location / Landmark
              </label>
              <Field
                name="location"
                type="text"
                placeholder="e.g. Juja, near bus stop"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
              {errors.location && touched.location && (
                <div className="text-red-500 text-xs mt-1">{errors.location}</div>
              )}
            </div>

            <div className="flex space-x-2">
              <div className="w-1/2">
                <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
                  Min Price (KES)
                </label>
                <Field
                  name="minPrice"
                  type="number"
                  min="0"
                  placeholder="e.g. 5000"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
                {errors.minPrice && touched.minPrice && (
                  <div className="text-red-500 text-xs mt-1">{errors.minPrice}</div>
                )}
              </div>
              <div className="w-1/2">
                <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
                  Max Price (KES)
                </label>
                <Field
                  name="maxPrice"
                  type="number"
                  min="0"
                  placeholder="e.g. 7000"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
                {errors.maxPrice && touched.maxPrice && (
                  <div className="text-red-500 text-xs mt-1">{errors.maxPrice}</div>
                )}
              </div>
            </div>

            <div className="flex space-x-2">
              <div className="w-1/2">
                <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">
                  Property Type
                </label>
                <Field
                  as="select"
                  name="propertyType"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="">Any</option>
                  {propertyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </Field>
              </div>
              <div className="w-1/4">
                <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
                  Bedrooms
                </label>
                <Field
                  name="bedrooms"
                  type="number"
                  min="0"
                  placeholder="Any"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div className="w-1/4">
                <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">
                  Bathrooms
                </label>
                <Field
                  name="bathrooms"
                  type="number"
                  min="0"
                  placeholder="Any"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
              <div className="flex flex-wrap gap-3">
                {amenitiesList.map((amenity) => (
                  <label key={amenity.name} className="inline-flex items-center">
                    <Field
                      type="checkbox"
                      name="amenities"
                      value={amenity.name}
                      className="rounded border-gray-300 text-primary-600 shadow-sm focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{amenity.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-md shadow"
              >
                Search
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchForm; 