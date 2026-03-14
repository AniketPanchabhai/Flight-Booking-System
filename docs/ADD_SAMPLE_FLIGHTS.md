# Adding Sample Flights

Since the database starts empty, you need to add sample flights before you can see them in the application. Here are 3 methods:

## Method 1: Using cURL Commands (Easiest)

Run these commands in your terminal to add sample flights:

```bash
# Flight 1: New York to Los Angeles
curl -X POST http://localhost:5000/api/flights \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "airline": "United Airlines",
    "departureCity": "New York",
    "departureCountry": "USA",
    "arrivalCity": "Los Angeles",
    "arrivalCountry": "USA",
    "departureTime": "2024-12-15T08:00:00Z",
    "arrivalTime": "2024-12-15T11:30:00Z",
    "duration": "5h 30m",
    "seats": 250,
    "price": 199
  }'

# Flight 2: London to Paris
curl -X POST http://localhost:5000/api/flights \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "airline": "British Airways",
    "departureCity": "London",
    "departureCountry": "UK",
    "arrivalCity": "Paris",
    "arrivalCountry": "France",
    "departureTime": "2024-12-15T10:00:00Z",
    "arrivalTime": "2024-12-15T12:15:00Z",
    "duration": "2h 15m",
    "seats": 180,
    "price": 89
  }'

# Flight 3: Tokyo to Singapore
curl -X POST http://localhost:5000/api/flights \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "airline": "Singapore Airlines",
    "departureCity": "Tokyo",
    "departureCountry": "Japan",
    "arrivalCity": "Singapore",
    "arrivalCountry": "Singapore",
    "departureTime": "2024-12-16T15:00:00Z",
    "arrivalTime": "2024-12-17T00:30:00Z",
    "duration": "6h 30m",
    "seats": 320,
    "price": 450
  }'
```

### Steps to Get Your Token:

1. **Sign up** on the application
2. **Copy your JWT token** from localStorage:
   - Open DevTools (F12)
   - Go to Application > Local Storage
   - Find the `token` value
   - Copy it completely

3. **Replace `YOUR_TOKEN`** in the cURL commands above with your actual token

---

## Method 2: Using Postman

1. Get your token (follow steps 1-3 above)
2. Open Postman
3. Create a **POST** request to: `http://localhost:5000/api/flights`
4. Go to **Headers** and add:
   - `Content-Type: application/json`
   - `Authorization: Bearer YOUR_TOKEN`
5. Go to **Body** > **raw** and paste:

```json
{
  "airline": "United Airlines",
  "departureCity": "New York",
  "departureCountry": "USA",
  "arrivalCity": "Los Angeles",
  "arrivalCountry": "USA",
  "departureTime": "2024-12-15T08:00:00Z",
  "arrivalTime": "2024-12-15T11:30:00Z",
  "duration": "5h 30m",
  "seats": 250,
  "price": 199
}
```

6. Click **Send**
7. Repeat for other flights

---

## Method 3: Creating an Admin Endpoint (Recommended for Production)

Add this route to `backend/routes/flightRoutes.js`:

```javascript
// Seed sample flights (admin only - for development)
router.post('/seed', authorize(['admin']), async (req, res) => {
  try {
    const sampleFlights = [
      {
        airline: "United Airlines",
        departureCity: "New York",
        departureCountry: "USA",
        arrivalCity: "Los Angeles",
        arrivalCountry: "USA",
        departureTime: new Date("2024-12-15T08:00:00Z"),
        arrivalTime: new Date("2024-12-15T11:30:00Z"),
        duration: "5h 30m",
        seats: 250,
        price: 199
      },
      {
        airline: "British Airways",
        departureCity: "London",
        departureCountry: "UK",
        arrivalCity: "Paris",
        arrivalCountry: "France",
        departureTime: new Date("2024-12-15T10:00:00Z"),
        arrivalTime: new Date("2024-12-15T12:15:00Z"),
        duration: "2h 15m",
        seats: 180,
        price: 89
      },
      {
        airline: "Singapore Airlines",
        departureCity: "Tokyo",
        departureCountry: "Japan",
        arrivalCity: "Singapore",
        arrivalCountry: "Singapore",
        departureTime: new Date("2024-12-16T15:00:00Z"),
        arrivalTime: new Date("2024-12-17T00:30:00Z"),
        duration: "6h 30m",
        seats: 320,
        price: 450
      }
    ];

    const result = await Flight.insertMany(sampleFlights);
    res.json({ message: 'Sample flights added successfully', count: result.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

Then make your first user an **admin** in MongoDB:

```javascript
// In MongoDB directly:
db.users.updateOne(
  { email: "youremail@example.com" },
  { $set: { role: "admin" } }
);
```

Call the endpoint: `POST http://localhost:5000/api/flights/seed`

---

## Verifying Flights Were Added

1. Go to `http://localhost:5173/flights`
2. You should see the sample flights with:
   - Airline name
   - Departure/Arrival cities
   - Flight duration
   - Price
   - Book button

---

## Sample Flights Data

Here are 10 more flights you can add:

```json
[
  {
    "airline": "Qatar Airways",
    "departureCity": "Dubai",
    "departureCountry": "UAE",
    "arrivalCity": "New York",
    "arrivalCountry": "USA",
    "departureTime": "2024-12-17T22:00:00Z",
    "arrivalTime": "2024-12-18T08:00:00Z",
    "duration": "14h 30m",
    "seats": 350,
    "price": 799
  },
  {
    "airline": "Lufthansa",
    "departureCity": "Berlin",
    "departureCountry": "Germany",
    "arrivalCity": "Madrid",
    "arrivalCountry": "Spain",
    "departureTime": "2024-12-15T14:00:00Z",
    "arrivalTime": "2024-12-15T16:30:00Z",
    "duration": "2h 30m",
    "seats": 200,
    "price": 145
  },
  {
    "airline": "Air France",
    "departureCity": "Paris",
    "departureCountry": "France",
    "arrivalCity": "Tokyo",
    "arrivalCountry": "Japan",
    "departureTime": "2024-12-18T12:00:00Z",
    "arrivalTime": "2024-12-19T06:00:00Z",
    "duration": "11h 30m",
    "seats": 280,
    "price": 899
  }
]
```

---

## Troubleshooting

**Problem:** 401 Unauthorized error
- **Solution:** Your token expired or is invalid. Sign up again and get a new token.

**Problem:** Flights still not showing
- **Solution:** 
  1. Check browser DevTools Console for errors
  2. Verify backend is running: `http://localhost:5000/api/flights` should return a JSON array
  3. Refresh the page in the browser

**Problem:** No valid JWT token error
- **Solution:** The authorization header format must be exactly: `Authorization: Bearer TOKEN_HERE`
