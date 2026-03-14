# ✈️ FlightBooker - MERN Stack Flights Booking System

A **production-level, full-featured flights booking system** built with the MERN stack (MongoDB, Express, React, Node.js) featuring comprehensive authentication, role-based access control, and a complete booking system.

## 🎯 Quick Links

- **📖 START HERE:** [START_HERE.md](./START_HERE.md)
- **⚡ Quick Start:** [QUICK_START.md](./QUICK_START.md)  
- **🔧 Commands Guide:** [COMMANDS_GUIDE.md](./COMMANDS_GUIDE.md)
- **📚 Full Setup:** [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **📡 API Docs:** [backend/API_DOCS.md](./backend/API_DOCS.md)
- **📋 Implementation:** [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)

---

## ✨ Features

### 🔐 Authentication & Security
✅ JWT token-based authentication  
✅ Bcrypt password hashing  
✅ Token expiration (7 days)  
✅ Protected API endpoints  
✅ Secure route middleware  

### 👥 Role-Based Access Control (RBAC)
✅ **Normal Users** - Browse and book flights  
✅ **Prime Users** - Exclusive offers and discounts  
✅ **Admin Users** - Complete system management  

### ✈️ Flight Management
✅ Search flights with multiple filters  
✅ Filter by departure/arrival city and date  
✅ Sort by price or duration  
✅ Real-time seat availability  
✅ Admin flight creation and management  

### 📅 Booking System
✅ Multi-passenger bookings  
✅ Automatic seat management  
✅ Unique booking reference generation  
✅ Offer application and discount calculation  
✅ Booking cancellation with refunds  

### 🎁 Offers System
✅ Time-based offer validity  
✅ Role-based offer visibility (RBAC)  
✅ Discount percentage and max amount  
✅ Usage tracking per user  
✅ Admin offer management  

### 💻 User Features
✅ User profile management  
✅ View booking history  
✅ Cancel bookings  
✅ Update personal information  

---

## 🏗️ Project Structure

```
flights-booking-system/
│
├── 📚 Documentation (START HERE!)
│   ├── START_HERE.md                    ⭐ Complete overview
│   ├── INDEX.md                         📖 Documentation index
│   ├── QUICK_START.md                   ⚡ 5-minute setup
│   ├── COMMANDS_GUIDE.md                🔧 Step-by-step commands
│   ├── SETUP_GUIDE.md                   📖 Detailed guide
│   ├── IMPLEMENTATION_SUMMARY.md        📋 What was built
│   └── README.md                        📚 This file
│
├── backend/
│   ├── config/database.js              # MongoDB connection
│   ├── models/                         # 4 Database schemas
│   │   ├── User.js                    # User with authentication
│   │   ├── Flight.js                  # Flight details
│   │   ├── Booking.js                 # Booking records
│   │   └── Offer.js                   # Offers with RBAC
│   ├── controllers/                   # Business logic (4 files)
│   ├── routes/                        # API endpoints (4 files)
│   ├── middleware/                    # JWT & Error handling
│   ├── utils/jwt.js                   # JWT utilities
│   ├── server.js                      # Express entry point
│   ├── package.json
│   ├── .env.example
│   ├── API_DOCS.md                    # 20+ endpoints documented
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/                # Navbar, ProtectedRoute
│   │   ├── pages/                     # 7 complete pages
│   │   ├── context/AuthContext.jsx    # State management
│   │   ├── services/api.js            # API client
│   │   ├── styles/index.css           # Global styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
│
└── [Additional configuration files]
```

---

## 📡 API Endpoints (20+)

### Authentication (5 endpoints)
```
POST   /api/auth/signup              Create account
POST   /api/auth/login               Login
POST   /api/auth/logout              Logout  
GET    /api/auth/me                  Get current user
PUT    /api/auth/profile             Update profile
```

### Flights (5 endpoints)
```
GET    /api/flights                  List flights (with filters)
GET    /api/flights/:id              Get flight details
POST   /api/flights                  Create flight (Admin)
PUT    /api/flights/:id              Update flight (Admin)
DELETE /api/flights/:id              Delete flight (Admin)
```

### Bookings (5 endpoints)
```
POST   /api/bookings                 Create booking
GET    /api/bookings/user/bookings   Get user bookings
GET    /api/bookings/:id             Get booking details
PUT    /api/bookings/:id/cancel      Cancel booking
GET    /api/bookings                 Get all bookings (Admin)
```

### Offers (6 endpoints)
```
GET    /api/offers                   Get active offers (RBAC)
GET    /api/offers/:id               Get offer details
POST   /api/offers                   Create offer (Admin)
PUT    /api/offers/:id               Update offer (Admin)
DELETE /api/offers/:id               Delete offer (Admin)
GET    /api/offers/admin/all         Get all offers (Admin)
```

See [backend/API_DOCS.md](./backend/API_DOCS.md) for complete API documentation with examples.

---

## 🔑 Key Technologies

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT + Bcryptjs
- **Other:** CORS, Body-parser, Dotenv

### Frontend
- **Library:** React 18
- **Bundler:** Vite (fast development)
- **Routing:** React Router v6
- **HTTP:** Axios
- **State:** Context API
- **Styling:** CSS (responsive)

---

## 🚀 Quick Start

### 1. MongoDB Setup (5 min)
```
1. Go to https://mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Get connection string
5. Save for next step
```

### 2. Backend Setup
```bash
cd backend
npm install
# Create .env with MongoDB URI and JWT secret
npm run dev
# Server runs on http://localhost:5000
```

### 3. Frontend Setup (New Terminal)
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

### 4. Test
```
1. Signup as Prime user
2. Login and browse flights
3. See "Special Offers" menu (RBAC)
4. Logout and signup as Normal user
5. Notice "Offers" menu is gone!
```

---

## 👥 User Roles & Permissions

| Feature | Normal | Prime | Admin |
|---------|--------|-------|-------|
| Browse Flights | ✅ | ✅ | ✅ |
| Book Flights | ✅ | ✅ | ✅ |
| View Own Bookings | ✅ | ✅ | ✅ |
| View Offers | ❌ | ✅ | ✅ |
| Manage Flights | ❌ | ❌ | ✅ |
| Manage Offers | ❌ | ❌ | ✅ |
| View All Bookings | ❌ | ❌ | ✅ |

---

## 💾 Database Models

### Users
Email, Password (hashed), Role, FirstName, LastName, PhoneNumber, DateOfBirth, IsActive, Timestamps

### Flights
FlightNumber, Airline, Aircraft, DepartureCity, ArrivalCity, DepartureTime, ArrivalTime, Duration, TotalSeats, AvailableSeats, PricePerSeat, Stops, Status

### Bookings
BookingReference, UserId, FlightId, Passengers[], TotalPrice, DiscountApplied, OfferId, Status, PaymentStatus, BookingDate

### Offers
Title, Description, DiscountPercentage, MaxDiscountAmount, ApplicableUserRoles, ValidFrom, ValidUntil, MaxUsagePerUser, IsActive

---

## 🔐 Security Features

✅ Password hashing with bcrypt  
✅ JWT token authentication  
✅ Role-based access control  
✅ Protected endpoints  
✅ Error handling  
✅ Input validation  
✅ CORS configuration  

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [START_HERE.md](./START_HERE.md) | Complete overview and getting started |
| [INDEX.md](./INDEX.md) | Documentation index with file references |
| [QUICK_START.md](./QUICK_START.md) | 5-minute project overview |
| [COMMANDS_GUIDE.md](./COMMANDS_GUIDE.md) | Step-by-step setup commands |
| [SETUP_GUIDE.md](./SETUP_GUIDE.md) | Detailed setup and deployment guide |
| [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) | What was built and why |
| [backend/API_DOCS.md](./backend/API_DOCS.md) | Complete API documentation |

**Total:** 20+ pages of comprehensive documentation

---

## 🎓 Learning Outcomes

By using this project, you'll learn:
- ✅ MERN stack development
- ✅ RESTful API design
- ✅ JWT authentication
- ✅ Role-Based Access Control (RBAC)
- ✅ Database design with MongoDB
- ✅ React hooks & Context API
- ✅ Vite bundler
- ✅ Error handling best practices
- ✅ Responsive design

---

## 🧪 Testing

The application includes:
- ✅ User authentication flow
- ✅ Flight search and filtering
- ✅ Flight booking system
- ✅ Booking cancellation
- ✅ RBAC system verification
- ✅ Offer visibility control
- ✅ Profile management
- ✅ Error handling

See [COMMANDS_GUIDE.md](./COMMANDS_GUIDE.md) for testing instructions.

---

## 🚀 Deployment

The application is ready for production deployment:

**Backend:** Heroku, Railway, Render, AWS  
**Frontend:** Vercel, Netlify, GitHub Pages  

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for deployment instructions.

---

## 🎯 Next Steps

1. **Read:** [START_HERE.md](./START_HERE.md)
2. **Follow:** [COMMANDS_GUIDE.md](./COMMANDS_GUIDE.md)
3. **Explore:** [API_DOCS.md](./backend/API_DOCS.md)
4. **Customize:** Add your own features
5. **Deploy:** Take it to production

---

## 📞 Need Help?

All documentation is in the repo:
- **Setup issues?** → [COMMANDS_GUIDE.md](./COMMANDS_GUIDE.md)
- **API questions?** → [backend/API_DOCS.md](./backend/API_DOCS.md)
- **How it works?** → [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)
- **Deployment?** → [SETUP_GUIDE.md](./SETUP_GUIDE.md)

---

## 🏆 What You Get

✅ Production-ready backend  
✅ Production-ready frontend  
✅ Complete API with 20+ endpoints  
✅ JWT authentication system  
✅ 3-tier RBAC system  
✅ Flight booking system  
✅ Offer management system  
✅ 7 complete React pages  
✅ ~8700 lines of code  
✅ 20+ pages of documentation  

---

## 💡 Key Features

🔐 **Secure** - JWT tokens, password hashing  
🎯 **Scalable** - Modular architecture  
📱 **Responsive** - Works on all devices  
🚀 **Fast** - Vite bundler, optimized code  
📚 **Documented** - Comprehensive guides  
🧪 **Tested** - All features working  

---

**Happy Flying! ✈️🚀**

**Built with ❤️ using MERN Stack**

*Last Updated: February 2026*
