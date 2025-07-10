# 🏠 RentRadar - Smart Rental Finder

A comprehensive rental platform that helps budget-conscious tenants find their perfect home with smart filtering, location-based search, and premium viewing services.

## 🎯 Problem It Solves

Finding affordable housing is challenging due to:
- Scattered listings across multiple platforms
- Unreliable landlords and vague information
- No proper filtering by budget and amenities
- Wasted trips to unsuitable properties
- Lack of trusted local guides

## ✨ Key Features

### Core Features
- **Smart Search**: Filter by location, budget, and amenities
- **Visual Listings**: Real photos with detailed property information
- **Location Services**: Google Maps integration for directions
- **Contact System**: Direct communication with landlords
- **User Authentication**: Secure user accounts and preferences

### Premium Features (Future)
- **Local Guides**: Book trusted agents to view properties
- **Payment Integration**: M-PESA and card payments
- **Agent Dashboard**: Manage viewing requests and payments
- **Reviews & Ratings**: Rate landlords and properties

## 🏗️ Tech Stack

### Frontend
- **React.js** + **Tailwind CSS** - Modern, responsive UI
- **Google Maps API** - Location services and directions
- **Formik + Yup** - Form handling and validation
- **Axios** - API communication

### Backend
- **Express.js** + **Node.js** - RESTful API
- **MongoDB** - Database with GeoJSON for location filtering
- **JWT** - Authentication
- **Multer/Cloudinary** - Image upload and storage

## 📁 Project Structure

```
rent-radar/
├── client/                 # Frontend (React + Tailwind)
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── SearchForm.jsx
│   │   │   ├── ListingCard.jsx
│   │   │   ├── Map.jsx
│   │   │   └── Auth/
│   │   ├── pages/          # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Search.jsx
│   │   │   ├── ListingDetail.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/       # API services
│   │   ├── utils/          # Helper functions
│   │   ├── context/        # React context
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── package.json
│   └── vite.config.js
├── server/                 # Backend (Express + MongoDB)
│   ├── models/             # Database models
│   │   ├── Listing.js
│   │   ├── User.js
│   │   ├── Agent.js
│   │   └── Booking.js
│   ├── routes/             # API routes
│   │   ├── listings.js
│   │   ├── auth.js
│   │   ├── agents.js
│   │   └── bookings.js
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Helper functions
│   ├── uploads/            # Image uploads
│   ├── .env
│   ├── index.js
│   └── package.json
└── README.md
```

## 🚀 Development Phases

### Phase 1: Basic Listing Platform
- [x] Project setup and structure
- [ ] Enhanced listing model with location data
- [ ] Search and filter functionality
- [ ] Basic listing display with images
- [ ] Contact forms

### Phase 2: Location & Maps
- [ ] Google Maps integration
- [ ] Location-based search
- [ ] Directions from user location
- [ ] Map view of listings

### Phase 3: User Authentication
- [ ] User registration/login
- [ ] JWT authentication
- [ ] User dashboard
- [ ] Saved favorites

### Phase 4: Agent System
- [ ] Agent registration and verification
- [ ] Premium booking system
- [ ] Payment integration (M-PESA)
- [ ] Agent dashboard

### Phase 5: Advanced Features
- [ ] Reviews and ratings
- [ ] SMS/Email notifications
- [ ] Admin dashboard
- [ ] Mobile app/PWA

## 🛠️ Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Google Maps API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rent-radar
   ```

2. **Install dependencies**
   ```bash
   # Frontend
   cd client && npm install
   
   # Backend
   cd ../server && npm install
   ```

3. **Environment setup**
   ```bash
   # In server directory, create .env file
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/rent-radar
   JWT_SECRET=your_jwt_secret
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

4. **Start development servers**
   ```bash
   # Backend
   cd server && npm run dev
   
   # Frontend (in new terminal)
   cd client && npm run dev
   ```

## 🎨 Features in Detail

### Smart Search
- Location-based filtering (city, neighborhood, landmarks)
- Budget range selection
- Amenities filtering (water, power, WiFi, security)
- Property type selection
- Number of bedrooms/bathrooms

### Visual Experience
- High-quality property photos
- Virtual tours (future)
- Street view integration
- Neighborhood photos

### Location Services
- Interactive maps showing all listings
- Route planning from current location
- Distance calculations
- Public transport information

### Premium Services
- Verified local guides
- Property viewing appointments
- Detailed property reports
- Negotiation assistance

## 💰 Revenue Model

1. **Freemium**: Basic search free, premium features paid
2. **Commission**: Percentage from successful rentals
3. **Agent Fees**: Commission from local guides
4. **Featured Listings**: Promoted listings for landlords
5. **Advertising**: Property management companies

## 🔮 Future Enhancements

- Mobile app development
- AI-powered recommendations
- Virtual reality property tours
- Blockchain-based rental agreements
- Integration with utility companies
- Community features and reviews

---

**Built with ❤️ for the Kenyan rental market** 