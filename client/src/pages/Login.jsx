import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const LoginSchema = Yup.object().shape({
  emailOrPhone: Yup.string().required('Email or phone is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-lg shadow p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-primary-700 mb-6 text-center">Login to Your Account</h2>
        <Formik
          initialValues={{ emailOrPhone: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setError(null);
            setLoading(true);
            try {
              const res = await axios.post('/api/auth/login', {
                emailOrPhone: values.emailOrPhone,
                password: values.password,
              });
              localStorage.setItem('token', res.data.token);
              setLoading(false);
              navigate('/app');
            } catch (err) {
              setError(err.response?.data?.message || 'Login failed');
              setLoading(false);
            }
            setSubmitting(false);
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Email or Phone</label>
                <Field name="emailOrPhone" className="mt-1 block w-full rounded border-gray-300" />
                {errors.emailOrPhone && touched.emailOrPhone && <div className="text-xs text-red-500">{errors.emailOrPhone}</div>}
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <Field name="password" type="password" className="mt-1 block w-full rounded border-gray-300" />
                {errors.password && touched.password && <div className="text-xs text-red-500">{errors.password}</div>}
              </div>
              {error && <div className="text-red-600 text-sm text-center">{error}</div>}
              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded shadow"
                disabled={isSubmitting || loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
              <div className="text-center text-sm mt-2">
                Don&apos;t have an account?{' '}
                <Link to="/register" className="text-primary-600 hover:underline">Register</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login; 