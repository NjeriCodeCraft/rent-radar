const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');

// Middleware: protect route
function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'No token' });
  const token = auth.split(' ')[1];
  try {
    const jwt = require('jsonwebtoken');
    const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// GET all listings
router.get('/', async (req, res) => {
  try {
    const { 
      city, 
      minPrice, 
      maxPrice, 
      bedrooms, 
      propertyType, 
      limit = 20, 
      page = 1 
    } = req.query;

    // Build filter object
    const filter = { isAvailable: true };
    
    if (city) {
      filter['address.city'] = { $regex: city, $options: 'i' };
    }
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    if (bedrooms) {
      filter.bedrooms = { $gte: Number(bedrooms) };
    }
    
    if (propertyType) {
      filter.propertyType = propertyType;
    }

    const skip = (Number(page) - 1) * Number(limit);
    
    const listings = await Listing.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip(skip);

    const total = await Listing.countDocuments(filter);

    res.json({
      listings,
      pagination: {
        current: Number(page),
        total: Math.ceil(total / Number(limit)),
        hasNext: skip + listings.length < total,
        hasPrev: Number(page) > 1
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET single listing by ID
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST create new listing (requires auth)
router.post('/', authMiddleware, async (req, res) => {
  try {
    // Check if user is an agent
    if (req.user.role !== 'agent') {
      return res.status(403).json({ message: 'Only agents can create listings' });
    }

    const listingData = {
      ...req.body,
      contactInfo: {
        ...req.body.contactInfo,
        agentId: req.user.id
      }
    };

    const listing = new Listing(listingData);
    await listing.save();
    res.status(201).json(listing);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
});

// PUT update listing (requires auth, only own listings)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Check if user owns this listing
    if (listing.contactInfo?.agentId?.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only edit your own listings' });
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json(updatedListing);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
});

// DELETE listing (requires auth, only own listings)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Check if user owns this listing
    if (listing.contactInfo?.agentId?.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only delete your own listings' });
    }

    await Listing.findByIdAndDelete(req.params.id);
    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET listings by city
router.get('/city/:city', async (req, res) => {
  try {
    const listings = await Listing.find({
      'address.city': { $regex: req.params.city, $options: 'i' },
      isAvailable: true
    }).sort({ createdAt: -1 });
    
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 