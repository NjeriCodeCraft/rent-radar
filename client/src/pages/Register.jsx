import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm your password'),
});

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-lg shadow p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-primary-700 mb-6 text-center">Create Your Account</h2>
        <Formik
          initialValues={{ name: '', email: '', phone: '', password: '', confirmPassword: '' }}
          validationSchema={RegisterSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setError(null);
            setLoading(true);
            try {
              const res = await axios.post('/api/auth/register', {
                name: values.name,
                email: values.email,
                phone: values.phone,
                password: values.password,
              });
              localStorage.setItem('token', res.data.token);
              setLoading(false);
              navigate('/app');
            } catch (err) {
              setError(err.response?.data?.message || 'Registration failed');
              setLoading(false);
            }
            setSubmitting(false);
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-4">
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
                {errors.phone && touched.phone && <div className="text-xs text-red-500">{errors.phone}</div>}
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <Field name="password" type="password" className="mt-1 block w-full rounded border-gray-300" />
                {errors.password && touched.password && <div className="text-xs text-red-500">{errors.password}</div>}
              </div>
              <div>
                <label className="block text-sm font-medium">Confirm Password</label>
                <Field name="confirmPassword" type="password" className="mt-1 block w-full rounded border-gray-300" />
                {errors.confirmPassword && touched.confirmPassword && <div className="text-xs text-red-500">{errors.confirmPassword}</div>}
              </div>
              {error && <div className="text-red-600 text-sm text-center">{error}</div>}
              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded shadow"
                disabled={isSubmitting || loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
              <div className="text-center text-sm mt-2">
                Already have an account?{' '}
                <Link to="/login" className="text-primary-600 hover:underline">Login</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register; 