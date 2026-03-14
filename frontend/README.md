# Frontend - React with Vite

Fast React frontend for FlightBooker application.

## Setup

```bash
npm install
npm run dev
```

The app will run on `http://localhost:5173`

## Folder Structure

```
src/
├── components/       # Reusable components
│   ├── Navbar.jsx
│   └── ProtectedRoute.jsx
├── pages/           # Page components
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Flights.jsx
│   ├── Bookings.jsx
│   ├── Offers.jsx
│   └── Profile.jsx
├── context/         # React Context API
│   └── AuthContext.jsx
├── services/        # API calls
│   └── api.js
├── styles/          # CSS files
│   └── index.css
├── App.jsx         # Main App component
└── main.jsx        # Entry point
```

## Features

- User authentication (Login/Signup)
- Flight search and browsing
- Flight booking
- RBAC (Prime users see offers, normal users don't)
- User profile management
- Booking history
- Responsive design
