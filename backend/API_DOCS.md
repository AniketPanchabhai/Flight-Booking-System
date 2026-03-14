# FlightBooker Backend - API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_token>
```

---

## 📝 Authentication Endpoints

### 1. Signup
**POST** `/auth/signup`

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "role": "normal"  // or "prime"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "normal"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 2. Login
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "normal"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 3. Logout
**POST** `/auth/logout` (Protected)

**Response (200):**
```json
{
  "message": "Logout successful"
}
```

---

### 4. Get Current User
**GET** `/auth/me` (Protected)

**Response (200):**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "normal",
    "phoneNumber": "1234567890",
    "dateOfBirth": "1990-01-15"
  }
}
```

---

### 5. Update Profile
**PUT** `/auth/profile` (Protected)

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "phoneNumber": "9876543210",
  "dateOfBirth": "1990-01-15"
}
```

**Response (200):**
```json
{
  "message": "Profile updated successfully",
  "user": { ... }
}
```

---

## ✈️ Flight Endpoints

### 1. Get All Flights
**GET** `/flights?departureCity=New%20York&arrivalCity=Los%20Angeles&departureDate=2024-01-15&sortBy=price-low`

**Query Parameters:**
- `departureCity` (optional): Filter by departure city
- `arrivalCity` (optional): Filter by arrival city
- `departureDate` (optional): Filter by departure date (YYYY-MM-DD)
- `sortBy` (optional): Sort by `price-low`, `price-high`, `duration`, or default (departure time)

**Response (200):**
```json
{
  "message": "Flights retrieved successfully",
  "count": 5,
  "flights": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "flightNumber": "AI101",
      "airline": "Air India",
      "departureCity": "New York",
      "arrivalCity": "Los Angeles",
      "departureTime": "2024-01-15T08:00:00Z",
      "arrivalTime": "2024-01-15T12:30:00Z",
      "duration": "4h 30m",
      "totalSeats": 180,
      "availableSeats": 45,
      "pricePerSeat": 250,
      "aircraft": "Boeing 737",
      "stops": 0,
      "status": "scheduled"
    }
  ]
}
```

---

### 2. Get Flight By ID
**GET** `/flights/:id`

**Response (200):**
```json
{
  "message": "Flight details retrieved successfully",
  "flight": { ... }
}
```

---

### 3. Create Flight (Admin Only)
**POST** `/flights` (Protected - Admin)

**Request Body:**
```json
{
  "flightNumber": "AI101",
  "airline": "Air India",
  "departureCity": "New York",
  "arrivalCity": "Los Angeles",
  "departureTime": "2024-01-15T08:00:00Z",
  "arrivalTime": "2024-01-15T12:30:00Z",
  "totalSeats": 180,
  "pricePerSeat": 250,
  "aircraft": "Boeing 737",
  "stops": 0
}
```

**Response (201):**
```json
{
  "message": "Flight created successfully",
  "flight": { ... }
}
```

---

### 4. Update Flight (Admin Only)
**PUT** `/flights/:id` (Protected - Admin)

**Request Body:** Same as Create Flight

---

### 5. Delete Flight (Admin Only)
**DELETE** `/flights/:id` (Protected - Admin)

---

## 📅 Booking Endpoints

### 1. Create Booking
**POST** `/bookings` (Protected)

**Request Body:**
```json
{
  "flightId": "507f1f77bcf86cd799439011",
  "numberOfPassengers": 2,
  "passengers": [
    {
      "name": "John Doe",
      "email": "john@example.com",
      "dateOfBirth": "1990-01-15",
      "seatNumber": "A1"
    },
    {
      "name": "Jane Doe",
      "email": "jane@example.com",
      "dateOfBirth": "1992-03-20",
      "seatNumber": "A2"
    }
  ],
  "offerId": "507f1f77bcf86cd799439012" // optional
}
```

**Response (201):**
```json
{
  "message": "Booking created successfully",
  "booking": {
    "_id": "507f1f77bcf86cd799439013",
    "bookingReference": "BK1705329600000ABC123XYZ",
    "userId": "507f1f77bcf86cd799439011",
    "flightId": "507f1f77bcf86cd799439011",
    "numberOfPassengers": 2,
    "totalPrice": 450,
    "discountApplied": 50,
    "status": "confirmed",
    "paymentStatus": "paid"
  }
}
```

---

### 2. Get User Bookings
**GET** `/bookings/user/bookings` (Protected)

**Response (200):**
```json
{
  "message": "Bookings retrieved successfully",
  "count": 3,
  "bookings": [ ... ]
}
```

---

### 3. Get Booking By ID
**GET** `/bookings/:id` (Protected)

---

### 4. Cancel Booking
**PUT** `/bookings/:id/cancel` (Protected)

**Response (200):**
```json
{
  "message": "Booking cancelled successfully",
  "booking": { ... }
}
```

---

### 5. Get All Bookings (Admin Only)
**GET** `/bookings` (Protected - Admin)

---

## 🎁 Offers Endpoints

### 1. Get Offers (RBAC Applied)
**GET** `/offers` (Protected)

**Response (200):**
```json
{
  "message": "Offers retrieved successfully",
  "userRole": "prime",
  "count": 5,
  "offers": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "New Year Special",
      "description": "Flat 20% discount on all flights",
      "discountPercentage": 20,
      "maxDiscountAmount": 500,
      "applicableUserRoles": ["prime"],
      "validFrom": "2024-01-01T00:00:00Z",
      "validUntil": "2024-01-31T23:59:59Z",
      "maxUsagePerUser": 1,
      "isActive": true,
      "usedCount": 15
    }
  ]
}
```

> **Note:** Prime users see prime offers + normal offers. Normal users only see normal offers.

---

### 2. Get Offer By ID
**GET** `/offers/:id` (Protected)

---

### 3. Create Offer (Admin Only)
**POST** `/offers` (Protected - Admin)

**Request Body:**
```json
{
  "title": "New Year Special",
  "description": "Flat 20% discount on all flights",
  "discountPercentage": 20,
  "maxDiscountAmount": 500,
  "applicableUserRoles": ["prime"],
  "applicableRoutes": [
    {
      "departureCity": "New York",
      "arrivalCity": "Los Angeles"
    }
  ],
  "validFrom": "2024-01-01T00:00:00Z",
  "validUntil": "2024-01-31T23:59:59Z",
  "maxUsagePerUser": 1
}
```

---

### 4. Update Offer (Admin Only)
**PUT** `/offers/:id` (Protected - Admin)

---

### 5. Delete Offer (Admin Only)
**DELETE** `/offers/:id` (Protected - Admin)

---

### 6. Get All Offers (Admin Only)
**GET** `/offers/admin/all` (Protected - Admin)

---

## 🔐 RBAC (Role-Based Access Control)

| Feature | Normal User | Prime User | Admin |
|---------|---|---|---|
| View Flights | ✅ | ✅ | ✅ |
| Book Flights | ✅ | ✅ | ✅ |
| View Own Bookings | ✅ | ✅ | ✅ |
| View Offers | ❌ | ✅ | ✅ |
| Create/Manage Flights | ❌ | ❌ | ✅ |
| Create/Manage Offers | ❌ | ❌ | ✅ |
| View All Bookings | ❌ | ❌ | ✅ |

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Validation failed",
  "errors": ["Email is required", "Password must be at least 6 characters"]
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "message": "Access denied. Required role: admin. Your role: normal"
}
```

### 404 Not Found
```json
{
  "message": "Flight not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

---

## Testing Endpoints with Postman/cURL

### Example cURL Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Example cURL Get Flights:
```bash
curl -X GET "http://localhost:5000/api/flights?departureCity=New%20York" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

**Happy API Testing! 🚀**
