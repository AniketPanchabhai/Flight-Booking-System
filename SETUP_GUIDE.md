# Complete Setup & Deployment Guide

## 📦 Project Structure

```
flights-booking-system/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── models/
│   │   ├── User.js             # User schema with auth
│   │   ├── Flight.js           # Flight schema
│   │   ├── Booking.js          # Booking schema
│   │   └── Offer.js            # Offer schema with RBAC
│   ├── routes/
│   │   ├── authRoutes.js       # Auth endpoints
│   │   ├── flightRoutes.js     # Flight CRUD
│   │   ├── bookingRoutes.js    # Booking endpoints
│   │   └── offerRoutes.js      # Offer endpoints (RBAC)
│   ├── controllers/
│   │   ├── authController.js   # Auth logic
│   │   ├── flightController.js # Flight logic
│   │   ├── bookingController.js# Booking logic
│   │   └── offerController.js  # Offer logic with RBAC
│   ├── middleware/
│   │   ├── auth.js             # JWT & RBAC middleware
│   │   └── errorHandler.js     # Error handling
│   ├── utils/
│   │   └── jwt.js              # JWT utilities
│   ├── server.js               # Express app entry
│   ├── package.json
│   ├── .env.example
│   └── API_DOCS.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Flights.jsx
│   │   │   ├── Bookings.jsx
│   │   │   ├── Offers.jsx
│   │   │   └── Profile.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Auth state management
│   │   ├── services/
│   │   │   └── api.js          # API client & endpoints
│   │   ├── styles/
│   │   │   └── index.css       # Global styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
├── README.md
└── SETUP_GUIDE.md (this file)
```

---

## 🚀 Step-by-Step Setup

### Prerequisites
- Node.js v16+ installed
- MongoDB Atlas account (free at https://www.mongodb.com/cloud/atlas)
- Git installed
- VS Code or any text editor

### Step 1: Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up/Login to your account
3. Click "Create" → Select "Build a Database"
4. Choose "Shared" (Free tier)
5. Choose region and click "Create Cluster"
6. Create database user (remember username & password)
7. Go to "Network Access" → Allow from any IP (0.0.0.0/0) for development
8. Click "Connect" → Copy connection string
9. Replace `<password>` with your database user password

**Connection String Format:**
```
mongodb+srv://username:password@cluster.mongodb.net/flights_booking
```

---

### Step 2: Setup Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
# Copy from .env.example and fill in your values
copy .env.example .env
```

**Edit `.backend/.env`:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/flights_booking
JWT_SECRET=your_super_secret_key_change_in_production_12345
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

**Start Backend Server:**
```bash
npm run dev
```

✅ Server should run on `http://localhost:5000`
✅ Check health: `http://localhost:5000/api/health`

---

### Step 3: Setup Frontend

**Open a new terminal:**

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Frontend should run on `http://localhost:5173`

---

## 📝 Testing the Application

### 1. User Signup
1. Go to `http://localhost:5173`
2. Click "Create Account"
3. Fill in details and select account type (Normal or Prime)
4. Click "Signup"

**Test Accounts:**
- Normal User: normal@test.com / password123
- Prime User: prime@test.com / password123

### 2. Add Sample Flights
Use Postman or cURL to add flights as admin:

```bash
# Login as admin first (create admin account with role: 'admin' in database)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "password123"
  }'

# Use returned token
# Add a flight
curl -X POST http://localhost:5000/api/flights \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "flightNumber": "AI101",
    "airline": "Air India",
    "departureCity": "New York",
    "arrivalCity": "Los Angeles",
    "departureTime": "2024-02-25T08:00:00Z",
    "arrivalTime": "2024-02-25T12:30:00Z",
    "totalSeats": 180,
    "pricePerSeat": 250,
    "aircraft": "Boeing 737",
    "stops": 0
  }'
```

### 3. Create Sample Offer (Prime Users Only)

```bash
curl -X POST http://localhost:5000/api/offers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -d '{
    "title": "New Year Special",
    "description": "Flat 20% discount on all flights",
    "discountPercentage": 20,
    "maxDiscountAmount": 500,
    "applicableUserRoles": ["prime"],
    "validFrom": "2024-02-01T00:00:00Z",
    "validUntil": "2024-12-31T23:59:59Z",
    "maxUsagePerUser": 1
  }'
```

### 4. Book Flights
1. Login with a user account
2. Go to "Flights" tab
3. Browse available flights
4. Click "Book Now"
5. (Implementation for booking form needed in frontend)

### 5. Verify RBAC
- **Normal User**: Should NOT see "Special Offers" tab
- **Prime User**: Should see "Special Offers" tab with exclusive deals
- **Admin**: Should see all management options

---

## 🔑 Features Checklist

- ✅ **User Authentication**
  - Signup with email/password
  - Login with JWT token
  - Logout functionality
  - Password hashing with bcrypt

- ✅ **Flight Management**
  - Browse all flights
  - Filter by city, date
  - Sort by price, duration
  - Admin CRUD operations

- ✅ **Booking System**
  - Create bookings
  - View booking history
  - Cancel bookings
  - Automatic seat management

- ✅ **Role-Based Access Control (RBAC)**
  - Normal Users: Standard access
  - Prime Users: Access to special offers + everything
  - Admin: Full system access

- ✅ **Offers Management**
  - Create offers (Admin)
  - Apply offers during booking
  - Offer validity checking
  - Usage tracking

- ✅ **Frontend**
  - Responsive design
  - React Router for navigation
  - Context API for state management
  - Protected routes
  - Form validation

---

## 🛠️ Common Commands

### Backend Commands
```bash
# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Start production server
npm start
```

### Frontend Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📱 API Endpoints Summary

| Method | Endpoint | Protected | Role |
|--------|----------|-----------|------|
| POST | /api/auth/signup | ❌ | - |
| POST | /api/auth/login | ❌ | - |
| POST | /api/auth/logout | ✅ | Any |
| GET | /api/flights | ❌ | - |
| POST | /api/flights | ✅ | Admin |
| POST | /api/bookings | ✅ | Any |
| GET | /api/bookings/user/bookings | ✅ | Any |
| GET | /api/offers | ✅ | Any |
| POST | /api/offers | ✅ | Admin |

See [API_DOCS.md](./API_DOCS.md) for complete API documentation.

---

## 🔍 Debugging Tips

### MongoDB Connection Issues
- Check MongoDB Atlas IP whitelist
- Verify connection string is correct
- Ensure database user has correct permissions

### JWT Token Issues
- Make sure JWT_SECRET is set in .env
- Clear browser localStorage if token expires
- Check token expiration time

### CORS Issues
- Ensure frontend and backend URLs are correct
- Backend CORS should allow frontend origin
- Check proxy settings in vite.config.js

### Port Already in Use
```bash
# Find and kill process using port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# For port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

---

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)
1. Create account on Heroku/Railway
2. Push code to GitHub
3. Connect repository
4. Set environment variables
5. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Build frontend: `npm run build`
2. Deploy `dist` folder to Vercel/Netlify
3. Set API endpoint to backend URL

---

## 📚 Technologies Used

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- Bcryptjs

**Frontend:**
- React 18
- React Router v6
- Vite
- Axios
- Context API

---

## 📞 Support

For issues or questions:
1. Check error messages carefully
2. Review API_DOCS.md
3. Check console logs (browser dev tools)
4. Verify all environment variables are set

---

**Happy Coding! ✈️🚀**

Last Updated: February 2026
