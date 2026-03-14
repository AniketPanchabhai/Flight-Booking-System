# 🚀 FlightBooker - MERN Stack Application

## Quick Start (5 Minutes)

### Prerequisites
- Node.js v16+ 
- MongoDB Atlas account (free at https://mongodb.com/cloud/atlas)

---

## ⚡ Quick Setup

### 1️⃣ MongoDB Setup
```
1. Create cluster on MongoDB Atlas
2. Get connection string: mongodb+srv://user:pass@cluster.mongodb.net/flights_booking
3. Keep it safe for next step
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install

# Create .env file with:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=change_me_to_something_secret
PORT=5000
NODE_ENV=development

npm run dev
```

✅ Backend running on `http://localhost:5000`

### 3️⃣ Frontend Setup (New Terminal)
```bash
cd frontend
npm install
npm run dev
```

✅ Frontend running on `http://localhost:5173`

---

## 📋 Complete Folder Structure

```
flights-booking-system/
│
├── backend/
│   ├── config/
│   │   └── database.js              # MongoDB connection config
│   │
│   ├── models/                      # Database schemas
│   │   ├── User.js                 # User with bcrypt hashing
│   │   ├── Flight.js               # Flight details
│   │   ├── Booking.js              # Booking records
│   │   └── Offer.js                # Offers with RBAC
│   │
│   ├── routes/                      # API route definitions
│   │   ├── authRoutes.js           # /api/auth/*
│   │   ├── flightRoutes.js         # /api/flights/*
│   │   ├── bookingRoutes.js        # /api/bookings/*
│   │   └── offerRoutes.js          # /api/offers/*
│   │
│   ├── controllers/                 # Business logic
│   │   ├── authController.js       # Auth logic (signup/login)
│   │   ├── flightController.js     # Flight CRUD logic
│   │   ├── bookingController.js    # Booking logic
│   │   └── offerController.js      # Offer logic + RBAC
│   │
│   ├── middleware/
│   │   ├── auth.js                 # JWT verify + RBAC middleware
│   │   └── errorHandler.js         # Error handling
│   │
│   ├── utils/
│   │   └── jwt.js                  # JWT token utilities
│   │
│   ├── server.js                    # Express app entry point
│   ├── package.json
│   ├── .env (create from .env.example)
│   ├── .env.example
│   ├── API_DOCS.md                 # Complete API documentation
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Navigation bar
│   │   │   └── ProtectedRoute.jsx  # Private route wrapper
│   │   │
│   │   ├── pages/                  # Page components
│   │   │   ├── Home.jsx            # Landing page
│   │   │   ├── Login.jsx           # Login form
│   │   │   ├── Signup.jsx          # Signup form with roles
│   │   │   ├── Flights.jsx         # Flight search/browse
│   │   │   ├── Bookings.jsx        # User's bookings
│   │   │   ├── Offers.jsx          # Prime offers (RBAC)
│   │   │   └── Profile.jsx         # User profile
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Auth state + token management
│   │   │
│   │   ├── services/
│   │   │   └── api.js             # API client with axios
│   │   │
│   │   ├── styles/
│   │   │   └── index.css          # Global styles
│   │   │
│   │   ├── App.jsx                 # Main app with routing
│   │   └── main.jsx                # React DOM entry
│   │
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
│
├── README.md                         # Project overview
└── SETUP_GUIDE.md                   # Detailed setup guide
```

---

## 🔑 Key Features Implemented

### ✅ Authentication System
```javascript
// Signup/Login with JWT tokens
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
PUT  /api/auth/profile
```

### ✅ Flight Management
```javascript
// Browse & manage flights
GET    /api/flights              // Search with filters
GET    /api/flights/:id          // Flight details
POST   /api/flights              // Admin: Create (RBAC)
PUT    /api/flights/:id          // Admin: Update (RBAC)
DELETE /api/flights/:id          // Admin: Delete (RBAC)
```

### ✅ Booking System
```javascript
// Book & manage flights
POST   /api/bookings             // Create booking
GET    /api/bookings/user/bookings  // My bookings
GET    /api/bookings/:id         // Booking details
PUT    /api/bookings/:id/cancel  // Cancel booking
GET    /api/bookings             // Admin: All bookings (RBAC)
```

### ✅ Offers with RBAC
```javascript
// Special offers for Prime users
GET    /api/offers               // Offers (RBAC applied)
GET    /api/offers/:id
POST   /api/offers               // Admin: Create (RBAC)
PUT    /api/offers/:id           // Admin: Update (RBAC)
DELETE /api/offers/:id           // Admin: Delete (RBAC)

// Rule: Prime users see prime offers, Normal users see nothing
```

---

## 👥 User Roles & Access

### **Normal User**
- Browse flights
- Book flights
- View own bookings
- Update profile
- ❌ No access to offers
- ❌ No admin features

### **Prime User** 
- All Normal features +
- ✅ View special offers
- ✅ Get discounts on bookings
- ✅ Extra perks
- ❌ No admin features

### **Admin**
- ✅ All features
- ✅ Manage flights
- ✅ Create offers
- ✅ View all bookings
- ✅ User management

---

## 📊 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed with bcrypt),
  role: String (normal/prime/admin),
  phoneNumber: String,
  dateOfBirth: Date,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Flights Collection
```javascript
{
  _id: ObjectId,
  flightNumber: String (unique),
  airline: String,
  departureCity: String,
  arrivalCity: String,
  departureTime: Date,
  arrivalTime: Date,
  duration: String,        // "2h 30m"
  totalSeats: Number,
  availableSeats: Number,
  pricePerSeat: Number,
  aircraft: String,
  stops: Number,
  status: String,          // scheduled/delayed/cancelled
  createdAt: Date
}
```

### Bookings Collection
```javascript
{
  _id: ObjectId,
  bookingReference: String (unique),
  userId: ObjectId (ref: User),
  flightId: ObjectId (ref: Flight),
  numberOfPassengers: Number,
  passengers: [{
    name: String,
    email: String,
    dateOfBirth: Date,
    seatNumber: String
  }],
  totalPrice: Number,
  discountApplied: Number,
  offerId: ObjectId (ref: Offer),
  status: String,          // pending/confirmed/cancelled
  paymentStatus: String,   // unpaid/paid/refunded
  bookingDate: Date
}
```

### Offers Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  discountPercentage: Number,
  maxDiscountAmount: Number,
  applicableUserRoles: [String],  // [prime], [normal], [both]
  validFrom: Date,
  validUntil: Date,
  maxUsagePerUser: Number,
  usedCount: Number,
  isActive: Boolean,
  createdAt: Date
}
```

---

## 🔐 Authentication Flow

```
1. User Signup
   ├─ Validate input
   ├─ Hash password with bcrypt
   ├─ Save to MongoDB
   ├─ Generate JWT token
   └─ Return token + user data

2. User Login
   ├─ Find user by email
   ├─ Compare password with bcrypt
   ├─ Generate JWT token
   └─ Return token + user data

3. Protected Routes
   ├─ Extract token from Authorization header
   ├─ Verify token signature
   ├─ Check token expiration
   ├─ Fetch user from database
   └─ Attach user to request
```

---

## 🎯 RBAC Implementation

### Middleware Flow
```
Request → Extract Token → Verify JWT → Fetch User Role → Check Permission → Continue/Reject
```

### Usage in Routes
```javascript
// Public route
router.get('/flights', getAllFlights);

// Protected route (any authenticated user)
router.post('/bookings', authMiddleware, createBooking);

// Admin only
router.post('/flights', authMiddleware, authorize('admin'), createFlight);

// Multiple roles
router.delete('/flights/:id', authMiddleware, authorize('admin', 'superadmin'), deleteFlight);
```

### Offers RBAC
```javascript
// In controller logic
if (user.role === 'prime') {
  // Show prime offers + normal offers
} else if (user.role === 'normal') {
  // Show only normal offers
} else {
  // Show nothing
}
```

---

## 🧪 Testing Endpoints

### Using cURL

**Signup:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@test.com",
    "password": "pass123",
    "confirmPassword": "pass123",
    "role": "prime"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@test.com",
    "password": "pass123"
  }'
```

**Get Flights with Token:**
```bash
curl -X GET http://localhost:5000/api/flights \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

---

## 🚀 Deployment

### Backend (Heroku/Railway/Render)
```bash
1. Push code to GitHub
2. Connect to deployment platform
3. Set environment variables
4. Deploy
```

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| README.md | Project overview |
| SETUP_GUIDE.md | Detailed setup instructions |
| API_DOCS.md | Complete API documentation |
| backend/README.md | Backend specific docs |
| frontend/README.md | Frontend specific docs |

---

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| MongoDB Connection Error | Check MongoDB Atlas connection string and IP whitelist |
| JWT Token Invalid | Clear localStorage and login again |
| Port Already in Use | Change PORT in .env or kill process using the port |
| CORS Error | Ensure backend CORS allows frontend origin |
| Styles Not Showing | Clear browser cache or restart dev server |

---

## 📞 Next Steps

1. ✅ Follow SETUP_GUIDE.md for detailed setup
2. ✅ Test endpoints using API_DOCS.md
3. ✅ Create test users and flights
4. ✅ Test RBAC with different user roles
5. ✅ Deploy to production

---

## 🎓 Learning Resources

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [React Docs](https://react.dev/)
- [JWT Explanation](https://jwt.io/introduction)

---

**Built with ❤️ using MERN Stack**

**Happy Flying! ✈️🚀**
