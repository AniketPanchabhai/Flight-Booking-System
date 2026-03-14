import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { flightService } from '../services/api';

export default function Flights() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    departureCity: '',
    arrivalCity: '',
    departureDate: '',
    sortBy: '',
  });
  const [cities, setCities] = useState([]);
  const [departureSuggestions, setDepartureSuggestions] = useState([]);
  const [arrivalSuggestions, setArrivalSuggestions] = useState([]);
  const [showDepartureSuggestions, setShowDepartureSuggestions] = useState(false);
  const [showArrivalSuggestions, setShowArrivalSuggestions] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchFlights();
      fetchCities();
    }
  }, [isAuthenticated, filters]);

  const fetchCities = async () => {
    try {
      const response = await flightService.getCities();
      setCities(response.data.cities);
    } catch (err) {
      console.error('Failed to fetch cities:', err);
    }
  };

  const fetchFlights = async () => {
    setLoading(true);
    try {
      const response = await flightService.getAllFlights(filters);
      setFlights(response.data.flights);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch flights');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));

    if (name === 'departureCity') {
      handleDepartureInput(value);
    } else if (name === 'arrivalCity') {
      handleArrivalInput(value);
    }
  };

  const handleDepartureInput = (value) => {
    if (value.length > 0) {
      const filtered = cities.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setDepartureSuggestions(filtered);
      setShowDepartureSuggestions(true);
    } else {
      setDepartureSuggestions([]);
      setShowDepartureSuggestions(false);
    }
  };

  const handleArrivalInput = (value) => {
    if (value.length > 0) {
      const filtered = cities.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setArrivalSuggestions(filtered);
      setShowArrivalSuggestions(true);
    } else {
      setArrivalSuggestions([]);
      setShowArrivalSuggestions(false);
    }
  };

  const selectDepartureSuggestion = (city) => {
    setFilters(prev => ({ ...prev, departureCity: city }));
    setShowDepartureSuggestions(false);
  };

  const selectArrivalSuggestion = (city) => {
    setFilters(prev => ({ ...prev, arrivalCity: city }));
    setShowArrivalSuggestions(false);
  };

  const handleBook = (flightId) => {
    // Navigate to booking form for the selected flight
    navigate(`/booking/${flightId}`);
  };

  if (!isAuthenticated) {
    return (
      <div className="container mt-3">
        <div className="alert alert-info">
          Please login to view and book flights.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-3">
      <h1>Search Flights</h1>

      {error && <div className="alert alert-error">{error}</div>}

      {/* Filters */}
      <div className="card">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div className="form-group mb-1">
            <label htmlFor="departureCity">From</label>
            <div style={{ position: 'relative' }}>
              <input
                id="departureCity"
                type="text"
                name="departureCity"
                placeholder="e.g., New York"
                value={filters.departureCity}
                onChange={handleFilterChange}
                onFocus={() => filters.departureCity && handleDepartureInput(filters.departureCity)}
                onBlur={() => setTimeout(() => setShowDepartureSuggestions(false), 200)}
                autoComplete="off"
              />
              {showDepartureSuggestions && departureSuggestions.length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  zIndex: 1000,
                  maxHeight: '200px',
                  overflowY: 'auto'
                }}>
                  {departureSuggestions.map((city, index) => (
                    <div
                      key={index}
                      style={{
                        padding: '8px 12px',
                        cursor: 'pointer',
                        borderBottom: index < departureSuggestions.length - 1 ? '1px solid #eee' : 'none'
                      }}
                      onClick={() => selectDepartureSuggestion(city)}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-group mb-1">
            <label htmlFor="arrivalCity">To</label>
            <div style={{ position: 'relative' }}>
              <input
                id="arrivalCity"
                type="text"
                name="arrivalCity"
                placeholder="e.g., Los Angeles"
                value={filters.arrivalCity}
                onChange={handleFilterChange}
                onFocus={() => filters.arrivalCity && handleArrivalInput(filters.arrivalCity)}
                onBlur={() => setTimeout(() => setShowArrivalSuggestions(false), 200)}
                autoComplete="off"
              />
              {showArrivalSuggestions && arrivalSuggestions.length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  zIndex: 1000,
                  maxHeight: '200px',
                  overflowY: 'auto'
                }}>
                  {arrivalSuggestions.map((city, index) => (
                    <div
                      key={index}
                      style={{
                        padding: '8px 12px',
                        cursor: 'pointer',
                        borderBottom: index < arrivalSuggestions.length - 1 ? '1px solid #eee' : 'none'
                      }}
                      onClick={() => selectArrivalSuggestion(city)}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-group mb-1">
            <label htmlFor="departureDate">Date</label>
            <input
              id="departureDate"
              type="date"
              name="departureDate"
              value={filters.departureDate}
              onChange={handleFilterChange}
            />
          </div>

          <div className="form-group mb-1">
            <label htmlFor="sortBy">Sort By</label>
            <select
              id="sortBy"
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
            >
              <option value="">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="duration">Duration</option>
            </select>
          </div>
        </div>
      </div>

      {/* Flights List */}
      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          Loading flights...
        </div>
      ) : flights.length > 0 ? (
        <div>
          <p className="mb-3"><strong>{flights.length} flights found</strong></p>
          {flights.map(flight => (
            <div key={flight._id} className="flight-card">
              <div className="flight-info">
                <div>
                  <div className="flight-detail-label">From</div>
                  <div className="flight-detail-value">{flight.departureCity}</div>
                </div>
                <div>
                  <div className="flight-detail-label">To</div>
                  <div className="flight-detail-value">{flight.arrivalCity}</div>
                </div>
                <div>
                  <div className="flight-detail-label">Departure</div>
                  <div className="flight-detail-value">{new Date(flight.departureTime).toLocaleString()}</div>
                </div>
                <div>
                  <div className="flight-detail-label">Arrival</div>
                  <div className="flight-detail-value">{new Date(flight.arrivalTime).toLocaleString()}</div>
                </div>
                <div>
                  <div className="flight-detail-label">Duration</div>
                  <div className="flight-detail-value">{flight.duration}</div>
                </div>
                <div>
                  <div className="flight-detail-label">Available Seats</div>
                  <div className="flight-detail-value">{flight.availableSeats}/{flight.totalSeats}</div>
                </div>
                <div>
                  <div className="flight-detail-label">Airline</div>
                  <div className="flight-detail-value">{flight.airline}</div>
                </div>
                <div>
                  <div className="flight-detail-label">Aircraft</div>
                  <div className="flight-detail-value">{flight.aircraft}</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="flight-price">₹{flight.pricePerSeat.toLocaleString()}</div>
                <button
                  className="btn btn-primary"
                  onClick={() => handleBook(flight._id)}
                  disabled={flight.availableSeats === 0}
                >
                  {flight.availableSeats > 0 ? 'Book Now' : 'Sold Out'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info">No flights found. Try adjusting your search.</div>
      )}
    </div>
  );
}
