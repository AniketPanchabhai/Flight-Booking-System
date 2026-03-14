# 📖 FlightBooker MERN Stack - Complete Documentation Index

**Project Location:** `b:\Git Hub Copilot MERN\flights-booking-system\`

---

## 📚 Documentation Files (Read in This Order)

### 1. 🚀 **START HERE** - [QUICK_START.md](./QUICK_START.md)
**Duration:** 5 minutes | **What:** Quick overview and folder structure
- Project overview
- Complete folder structure with descriptions
- Key features implemented
- User roles and access levels
- Database schema overview
- Authentication flow
- RBAC implementation

### 2. ⚡ **SETUP** - [COMMANDS_GUIDE.md](./COMMANDS_GUIDE.md)
**Duration:** 15 minutes | **What:** Step-by-step commands to run
- MongoDB Atlas setup instructions
- Backend setup commands
- Frontend setup commands
- Testing the application
- Common development commands
- Useful URLs for testing
- Troubleshooting
- File locations
- Verification checklist

### 3. 🔧 **DETAILED SETUP** - [SETUP_GUIDE.md](./SETUP_GUIDE.md)
**Duration:** 30 minutes | **What:** Comprehensive setup and deployment guide
- Prerequisites
- Step-by-step backend setup
- Step-by-step frontend setup
- Testing procedures
- Features checklist
- Common commands reference
- API endpoints summary
- Debugging tips
- Deployment instructions

### 4. 📡 **API REFERENCE** - [backend/API_DOCS.md](./backend/API_DOCS.md)
**Duration:** 20 minutes | **What:** Complete API documentation with examples
- Base URL and authentication
- All authentication endpoints (5)
- All flight endpoints (5)
- All booking endpoints (5)
- All offer endpoints (6)
- RBAC matrix
- Error response examples
- cURL examples for testing
- Postman testing instructions

### 5. 📋 **IMPLEMENTATION** - [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)
**Duration:** 15 minutes | **What:** What has been built and features
- Complete overview of what was built
- Backend features
- Frontend features
- Project structure breakdown
- Key implementation details
- Database schema details
- Security features
- Technologies used
- Code statistics
- Production checklist

---

## 🗂️ Quick File Reference

### Backend Files
```
backend/
├── server.js                      # Express app entry point
├── package.json                  # Dependencies list
├── .env.example                  # Environment template (copy to .env)
├── API_DOCS.md                   # Complete API documentation
│
├── config/
│   └── database.js              # MongoDB connection config
│
├── models/
│   ├── User.js                  # User schema with auth (bcrypt)
│   ├── Flight.js                # Flight schema
│   ├── Booking.js               # Booking schema
│   └── Offer.js                 # Offer schema (RBAC)
│
├── controllers/
│   ├── authController.js        # Login/Signup logic
│   ├── flightController.js      # Flight CRUD logic
│   ├── bookingController.js     # Booking logic
│   └── offerController.js       # Offer logic with RBAC
│
├── routes/
│   ├── authRoutes.js            # Auth endpoints
│   ├── flightRoutes.js          # Flight endpoints
│   ├── bookingRoutes.js         # Booking endpoints
│   └── offerRoutes.js           # Offer endpoints
│
├── middleware/
│   ├── auth.js                  # JWT & RBAC middleware
│   └── errorHandler.js          # Error handling
│
└── utils/
    └── jwt.js                   # JWT utilities
```

### Frontend Files
```
frontend/
├── index.html                    # HTML entry point
├── vite.config.js                # Vite configuration
├── package.json                 # Dependencies list
├── .gitignore                   # Git ignore rules
│
└── src/
    ├── App.jsx                  # Main app component with routes
    ├── main.jsx                 # React DOM entry
    │
    ├── components/
    │   ├── Navbar.jsx           # Navigation with role-based menu
    │   └── ProtectedRoute.jsx   # Private route wrapper
    │
    ├── pages/
    │   ├── Home.jsx             # Landing page
    │   ├── Login.jsx            # Login form
    │   ├── Signup.jsx           # Signup form with role selection
    │   ├── Flights.jsx          # Flight search and browsing
    │   ├── Bookings.jsx         # User's bookings
    │   ├── Offers.jsx           # Prime offers (RBAC applied)
    │   └── Profile.jsx          # User profile
    │
    ├── context/
    │   └── AuthContext.jsx      # Authentication state (tokens, user)
    │
    ├── services/
    │   └── api.js               # API client with all endpoints
    │
    └── styles/
        └── index.css            # Global responsive styles
```

---

## 🎯 Common Tasks

### Want to... | Go to...
--- | ---
Get started quickly | [QUICK_START.md](./QUICK_START.md)
Run the application | [COMMANDS_GUIDE.md](./COMMANDS_GUIDE.md)
Detailed setup | [SETUP_GUIDE.md](./SETUP_GUIDE.md)
Understand APIs | [backend/API_DOCS.md](./backend/API_DOCS.md)
See what was built | [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)
Understand backend | [backend/README.md](./backend/README.md)
Understand frontend | [frontend/README.md](./frontend/README.md)
Project overview | [README.md](./README.md)

---

## 📊 Quick Stats

| Aspect | Details |
|--------|---------|
| **Backend** | Express.js + MongoDB |
| **Frontend** | React 18 + Vite |
| **Database Models** | 4 (User, Flight, Booking, Offer) |
| **API Endpoints** | 20+ |
| **Pages** | 7 |
| **Components** | 2 reusable |
| **Authentication** | JWT + Bcrypt |
| **RBAC Roles** | 3 (Normal, Prime, Admin) |
| **Code Lines** | ~3500+ |
| **Documentation** | ~5000+ lines |

---

## 🔄 Reading Flow Recommendation

### For Quick Setup (15 min)
1. Read [QUICK_START.md](./QUICK_START.md)
2. Follow [COMMANDS_GUIDE.md](./COMMANDS_GUIDE.md)
3. Test the app

### For Full Understanding (1 hour)
1. Read [README.md](./README.md)
2. Read [QUICK_START.md](./QUICK_START.md)
3. Follow [SETUP_GUIDE.md](./SETUP_GUIDE.md)
4. Read [backend/API_DOCS.md](./backend/API_DOCS.md)
5. Read [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)

### For Development (2 hours)
1. Complete "For Full Understanding" above
2. Read backend code with comments
3. Read frontend code with comments
4. Test all API endpoints
5. Modify and experiment

### For Deployment (30 min)
1. Read [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Deployment section
2. Configure production environment variables
3. Build frontend: `npm run build`
4. Deploy backend to cloud
5. Deploy frontend to Vercel/Netlify

---

## 🚀 Step-by-Step Quick Start

### Step 1: Setup MongoDB
```
1. Go to https://mongodb.com/cloud/atlas
2. Create cluster and get connection string
3. Save for next step
```

### Step 2: Start Backend
```bash
cd backend
npm install
# Edit .env with MongoDB URI
npm run dev
# Check: http://localhost:5000/api/health
```

### Step 3: Start Frontend
```bash
cd frontend
npm install
npm run dev
# Visit: http://localhost:5173
```

### Step 4: Test
```
1. Signup with test account
2. Login
3. Browse flights (admin creates sample flights)
4. Check RBAC: Prime users see offers, normal users don't
```

---

## 🔐 Key Features

✅ **JWT Authentication** - Secure login/signup
✅ **Password Hashing** - Bcrypt encryption
✅ **Role-Based Access Control** - 3 roles with different permissions
✅ **Flight Management** - Search, filter, book
✅ **Booking System** - Create, view, cancel
✅ **Offers System** - Prime users get exclusive deals
✅ **User Profile** - Update personal information
✅ **Responsive Design** - Works on desktop, tablet, mobile
✅ **Error Handling** - Comprehensive error management
✅ **Protected Routes** - Frontend route protection

---

## 🧪 Testing Checklist

- [ ] Signup as Normal user
- [ ] Signup as Prime user
- [ ] Login with credentials
- [ ] Browse flights
- [ ] Add flight as admin
- [ ] Create offer as admin
- [ ] Check Normal user doesn't see offers (RBAC)
- [ ] Check Prime user sees offers (RBAC)
- [ ] Book a flight
- [ ] View bookings
- [ ] Cancel booking
- [ ] Update profile
- [ ] Logout

---

## 📈 Architecture Overview

```
┌─────────────────┐
│   Browser App   │ (React + Vite)
│   Port: 5173    │
└────────┬────────┘
         │
         │ HTTP/JSON
         │ (Axios)
         ▼
┌─────────────────────────────┐
│   Express.js API Server     │
│   Port: 5000                │
├─────────────────────────────┤
│ ✓ JWT Authentication        │
│ ✓ RBAC Middleware          │
│ ✓ 20+ API Endpoints        │
│ ✓ Error Handling           │
└─────────┬───────────────────┘
          │
          │ Mongoose ODM
          │
          ▼
┌─────────────────────────────┐
│   MongoDB Atlas             │
│   (Cloud Database)          │
├─────────────────────────────┤
│ ✓ Users Collection          │
│ ✓ Flights Collection        │
│ ✓ Bookings Collection       │
│ ✓ Offers Collection         │
└─────────────────────────────┘
```

---

## 💾 Environment Variables

### Backend .env
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/flights_booking
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

---

## 🎓 Key Concepts

### JWT Flow
```
User Logs In → JWT Token Generated → Stored in Frontend 
→ Sent with Every Request → Server Verifies → User Authenticated
```

### RBAC Flow
```
Request → Extract User Role → Check Permissions 
→ Allow/Deny Based on Role
```

### Booking Flow
```
Select Flight → Add Passengers → Apply Offer (if available)
→ Calculate Price → Create Booking → Reduce Available Seats
```

---

## 📞 Need Help?

1. **Setup Issues?** → Read [COMMANDS_GUIDE.md](./COMMANDS_GUIDE.md)
2. **API Questions?** → Read [backend/API_DOCS.md](./backend/API_DOCS.md)
3. **How it works?** → Read [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)
4. **Troubleshooting?** → Read [SETUP_GUIDE.md](./SETUP_GUIDE.md) Debugging section
5. **Deployment?** → Read [SETUP_GUIDE.md](./SETUP_GUIDE.md) Deployment section

---

## 🎯 Success Criteria

✅ Backend running on port 5000
✅ Frontend running on port 5173  
✅ Can signup/login successfully
✅ Can see flights
✅ Prime users see offers, Normal users don't
✅ Can book flights
✅ Can view bookings
✅ Can cancel bookings
✅ All API endpoints working
✅ No console errors

---

## 🚀 Ready to Build?

**Start here:** [QUICK_START.md](./QUICK_START.md)

Then follow: [COMMANDS_GUIDE.md](./COMMANDS_GUIDE.md)

Reference: [backend/API_DOCS.md](./backend/API_DOCS.md)

---

**Built with ❤️ using MERN Stack**

**Happy Flying! ✈️🚀**

*Last Updated: February 2026*
