import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import ListingDetail from './pages/ListingDetail';
import Register from './pages/Register';
import Login from './pages/Login';
import AgentRegister from './pages/AgentRegister';
import AgentDashboard from './pages/AgentDashboard';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<App />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/listing/:id" element={<ListingDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/agent/register" element={<AgentRegister />} />
          <Route path="/agent/dashboard" element={<AgentDashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
