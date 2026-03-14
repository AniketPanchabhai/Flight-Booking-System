# 🚀 Running the Seed Script

The seed script automatically adds 10 sample flights and 4 sample offers to your MongoDB database.

## Quick Start

### Step 1: Make sure your backend is running
```bash
cd backend
npm run start
```

### Step 2: In a new terminal, run the seed script
```bash
cd backend
node seed.js
```

## Expected Output

```
Connecting to MongoDB...
✅ Connected to MongoDB
Clearing existing flights and offers...
✅ Cleared existing data
Inserting sample flights...
✅ Added 10 flights
Inserting sample offers...
✅ Added 4 offers

📊 Summary:
   - Flights: 10
   - Offers: 4

✨ Database seeded successfully!
```

## Verify the Data Was Added

1. Start your frontend:
   ```bash
   cd frontend
   npm run dev
   ```

2. Sign up or login to your account
3. Go to `/flights` page
4. You should see 10 flights with:
   - Airline names
   - Departure/Arrival cities
   - Flight durations
   - Prices
   - Book buttons

5. Go to `/offers` page (if you're a Prime member)
6. You should see 4 exclusive offers

## Sample Data Included

### 10 Flights:
1. **New York → Los Angeles** ($199) - United Airlines
2. **London → Paris** ($89) - British Airways
3. **Tokyo → Singapore** ($450) - Singapore Airlines
4. **Dubai → New York** ($799) - Qatar Airways
5. **Berlin → Madrid** ($145) - Lufthansa
6. **Paris → Tokyo** ($899) - Air France
7. **Dubai → London** ($320) - Emirates
8. **Hong Kong → Sydney** ($520) - Cathay Pacific
9. **Istanbul → Bangkok** ($380) - Turkish Airlines
10. **Tokyo → San Francisco** ($650) - Japan Airlines

### 4 Exclusive Offers (Prime Members Only):
1. **Holiday Season Special** - 30% off (Code: HOLIDAY30)
2. **Early Bird Discount** - 20% off (Code: EARLYBIRD20)
3. **Round Trip Offer** - 25% off (Code: ROUNDTRIP25)
4. **Flex Booking** - 15% off (Code: FLEX15)

## Troubleshooting

**Problem:** Cannot find module 'dotenv'
- **Solution:** Make sure you ran `npm install` in the backend directory

**Problem:** MongoDB connection error
- **Solution:** 
  1. Check your `.env` file has correct `MONGODB_URI`
  2. Make sure MongoDB Atlas IP whitelist includes your current IP
  3. Verify your MongoDB Atlas credentials

**Problem:** Still no flights showing in app
- **Solution:**
  1. Refresh the browser (Ctrl+F5 or Cmd+Shift+R)
  2. Check browser console for errors (F12)
  3. Make sure you're logged in
  4. Verify backend is running on port 5000

## Add More Flights

Edit `backend/seed.js` and add more objects to the `sampleFlights` array. Then run:
```bash
node seed.js
```

The script will clear and re-seed with all flights.
