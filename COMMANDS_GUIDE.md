# 🚀 Complete Command Guide for FlightBooker

## 📍 Current Location
```
b:\Git Hub Copilot MERN\flights-booking-system\
```

---

## ⚙️ STEP 1: MongoDB Atlas Setup (5 minutes)

### Via Browser:
```
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up / Login
3. Create a new database cluster
4. Click "Build a Database" → Choose "Shared" (Free)
5. Select your preferred region
6. Create Database User (save username & password)
7. Network Access → Add IP Address 0.0.0.0/0 (development)
8. Click "Connect" → Copy connection string
9. Replace <password> with your database password
```

**Your Connection String Will Look Like:**
```
mongodb+srv://username:password@cluster0.mongodb.net/flights_booking
```

---

## 🔥 STEP 2: Backend Setup & Commands

### Open Terminal → Navigate to Backend
```bash
cd "b:\Git Hub Copilot MERN\flights-booking-system\backend"
```

### Install Dependencies
```bash
npm install
```

**What it does:** Installs all packages from package.json
- express (web framework)
- mongoose (MongoDB ODM)
- jsonwebtoken (JWT auth)
- bcryptjs (password hashing)
- cors (cross-origin)
- dotenv (environment variables)
- nodemon (auto-reload)

### Create .env File
```bash
# Windows Command Prompt
copy .env.example .env

# Windows PowerShell
Copy-Item .env.example .env
```

### Edit .env File
Open `backend/.env` in VS Code and fill in:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.mongodb.net/flights_booking

# JWT Configuration
JWT_SECRET=your_super_secret_key_12345_change_this
JWT_EXPIRE=7d

# Server Configuration
PORT=5000
NODE_ENV=development
```

### Start Backend Development Server
```bash
npm run dev
```

**Output Should Show:**
```
🚀 Server running on port 5000
📍 Environment: development
🔗 API Health Check: http://localhost:5000/api/health
```

### Test Backend is Running
Open browser and go to:
```
http://localhost:5000/api/health
```

**Should return:**
```json
{
  "message": "Server is running"
}
```

✅ **Backend is ready!**

---

## 🎨 STEP 3: Frontend Setup & Commands

### Open New Terminal → Navigate to Frontend
```bash
cd "b:\Git Hub Copilot MERN\flights-booking-system\frontend"
```

### Install Dependencies
```bash
npm install
```

**What it installs:**
- react (UI library)
- react-router-dom (routing)
- axios (HTTP client)
- vite (build tool)

### Start Frontend Development Server
```bash
npm run dev
```

**Output Should Show:**
```
VITE v5.0.0 ready in 123 ms

➜  Local:   http://localhost:5173/
```

### Access the Application
Open browser and go to:
```
http://localhost:5173
```

✅ **Frontend is running!**

---

## 📝 STEP 4: Test the Application

### 4.1 Create Test Account (Signup)

```
1. Click "Create Account" on home page
2. Fill in:
   - First Name: John
   - Last Name: Doe
   - Email: john@test.com
   - Password: password123
   - Confirm Password: password123
   - Account Type: Prime (to see offers)
3. Click "Signup"
```

### 4.2 Login
```
1. Click "Login"
2. Enter email: john@test.com
3. Enter password: password123
4. Click "Login"
```

### 4.3 Add Test Flight (Admin Function)

Use Postman or cURL. First, create admin account in MongoDB:

**Option 1: Using MongoDB Atlas UI**
```
1. Go to MongoDB Atlas
2. Click "Collections" on your cluster
3. Create new database: "flights_booking"
4. Create collection: "users"
5. Add document with admin role manually
```

**Option 2: Using cURL**

Create Admin Account:
```bash
curl -X POST http://localhost:5000/api/auth/signup ^
  -H "Content-Type: application/json" ^
  -d "{\"firstName\":\"Admin\",\"lastName\":\"User\",\"email\":\"admin@test.com\",\"password\":\"password123\",\"confirmPassword\":\"password123\",\"role\":\"admin\"}"
```

Then manually update the user document in MongoDB to have role: "admin"

Login as Admin:
```bash
curl -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@test.com\",\"password\":\"password123\"}"
```

**Response will contain:** `"token": "eyJhbGci..."`

Copy the token and use in next command:

Add Sample Flight:
```bash
curl -X POST http://localhost:5000/api/flights ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN_HERE" ^
  -d "{\"flightNumber\":\"AI101\",\"airline\":\"Air India\",\"departureCity\":\"New York\",\"arrivalCity\":\"Los Angeles\",\"departureTime\":\"2024-03-15T08:00:00Z\",\"arrivalTime\":\"2024-03-15T12:30:00Z\",\"totalSeats\":180,\"pricePerSeat\":250,\"aircraft\":\"Boeing 737\",\"stops\":0}"
```

### 4.4 Create Test Offer (Admin)

```bash
curl -X POST http://localhost:5000/api/offers ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN_HERE" ^
  -d "{\"title\":\"New Year Sale\",\"description\":\"20% off all flights\",\"discountPercentage\":20,\"maxDiscountAmount\":500,\"applicableUserRoles\":[\"prime\"],\"validFrom\":\"2024-01-01T00:00:00Z\",\"validUntil\":\"2024-12-31T23:59:59Z\"}"
```

### 4.5 View Flights in App

```
1. Login with your account
2. Click "Flights" in navbar
3. You should see the flight you created
4. Filter by city/date if needed
```

### 4.6 Verify RBAC (Offers)

**With Prime Account:**
```
1. Login as prime user
2. You should see "Special Offers" in navbar
3. Click to view exclusive prime offers
```

**With Normal Account:**
```
1. Login as normal user
2. "Special Offers" should NOT appear in navbar
3. This is RBAC working!
```

---

## 🧪 STEP 5: Common Development Commands

### Backend Commands
```bash
# Start development server (with auto-reload)
npm run dev

# Start production server
npm start

# Install new package
npm install package-name

# Remove package
npm uninstall package-name
```

### Frontend Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install new package
npm install package-name
```

---

## 🔍 STEP 6: Useful URLs for Testing

### Frontend
```
http://localhost:5173              # Home page
http://localhost:5173/login        # Login page
http://localhost:5173/signup       # Signup page
http://localhost:5173/flights      # Browse flights
http://localhost:5173/bookings     # View bookings
http://localhost:5173/offers       # Special offers (prime only)
http://localhost:5173/profile      # User profile
```

### Backend API
```
http://localhost:5000/api/health   # Health check
http://localhost:5000/api/auth/signup
http://localhost:5000/api/auth/login
http://localhost:5000/api/flights
http://localhost:5000/api/bookings
http://localhost:5000/api/offers
```

---

## 🔧 STEP 7: Troubleshooting

### MongoDB Connection Error
```
Error: "connect ENOTFOUND"

Solution:
1. Check MongoDB URI in .env
2. Check IP whitelist in MongoDB Atlas
3. Restart MongoDB Atlas cluster
```

### Port Already in Use
```bash
# For Windows - Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# For port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### JWT Token Error
```
Error: "Invalid or expired token"

Solution:
1. Clear browser localStorage
2. Login again to get new token
3. Check JWT_SECRET in .env
```

### Styles Not Loading
```
Solution:
1. Clear browser cache (Ctrl+Shift+Delete)
2. Restart frontend dev server
3. Hard refresh page (Ctrl+Shift+R)
```

---

## 📂 STEP 8: File Locations

### Backend Files
```
b:\Git Hub Copilot MERN\flights-booking-system\backend\
├── server.js                    # Main entry point
├── .env                         # Configuration (create this)
├── package.json                # Dependencies
├── config\database.js          # MongoDB config
├── models\                     # Database schemas
├── controllers\                # Business logic
├── routes\                     # API endpoints
├── middleware\                 # Auth & error handling
└── utils\jwt.js               # JWT utilities
```

### Frontend Files
```
b:\Git Hub Copilot MERN\flights-booking-system\frontend\
├── src\
│   ├── App.jsx                 # Main app
│   ├── main.jsx                # Entry point
│   ├── components\             # React components
│   ├── pages\                  # Page components
│   ├── context\AuthContext.jsx # Auth state
│   ├── services\api.js         # API client
│   └── styles\index.css        # Styles
├── index.html                  # HTML template
├── vite.config.js              # Vite config
└── package.json                # Dependencies
```

---

## 🚀 STEP 9: Quick Reference Card

| Task | Command | Port |
|------|---------|------|
| Backend Start | `npm run dev` | 5000 |
| Frontend Start | `npm run dev` | 5173 |
| Install packages | `npm install` | - |
| Health check | Visit http://localhost:5000/api/health | - |
| Frontend URL | Visit http://localhost:5173 | - |

---

## 📚 STEP 10: Documentation to Read

| Document | Purpose |
|----------|---------|
| README.md | Project overview |
| QUICK_START.md | 5-minute setup |
| SETUP_GUIDE.md | Detailed guide |
| API_DOCS.md | All endpoints |
| IMPLEMENTATION_SUMMARY.md | What was built |

---

## ✅ Verification Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Connection string obtained
- [ ] Backend .env file created
- [ ] `npm install` completed in backend
- [ ] Backend running on port 5000
- [ ] Health check endpoint working
- [ ] `npm install` completed in frontend
- [ ] Frontend running on port 5173
- [ ] Test user signup working
- [ ] Test user login working
- [ ] Test flight visible
- [ ] Prime user sees offers
- [ ] Normal user doesn't see offers
- [ ] RBAC working correctly

---

## 💡 Pro Tips

1. **Keep terminals open** for both backend and frontend
2. **Use VS Code's terminal** to run commands
3. **Check browser console** (F12) for frontend errors
4. **Use MongoDB Atlas UI** to verify data
5. **Check network tab** (F12) to see API calls
6. **Restart servers** if code doesn't update
7. **Clear localStorage** if authentication fails
8. **Use Postman** for testing API endpoints
9. **Read error messages** carefully
10. **Refer to documentation** for all features

---

## 🎯 Next Steps After Setup

1. ✅ Complete the setup following these commands
2. ✅ Read QUICK_START.md for overview
3. ✅ Read API_DOCS.md for all endpoints
4. ✅ Test all features
5. ✅ Read IMPLEMENTATION_SUMMARY.md
6. ✅ Customize for your needs
7. ✅ Deploy to production (see SETUP_GUIDE.md)

---

**All Set! You're ready to build! ✈️🚀**
