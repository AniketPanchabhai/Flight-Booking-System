import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { flightService, bookingService } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Booking() {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [numPassengers, setNumPassengers] = useState(1);
  const [passengers, setPassengers] = useState([{ name: '' }]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await flightService.getFlightById(flightId);
        setFlight(res.data.flight);
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load flight');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [flightId, isAuthenticated]);

  useEffect(() => {
    setPassengers(Array.from({ length: numPassengers }, (_, i) => passengers[i] || { name: '' }));
  }, [numPassengers]);

  const handlePassengerChange = (index, value) => {
    setPassengers(prev => {
      const copy = [...prev];
      copy[index] = { name: value };
      return copy;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!flight) return;
    setSubmitting(true);
    try {
      const totalPrice = flight.pricePerSeat * numPassengers;
      const payload = {
        flightId: flight._id,
        numberOfPassengers: numPassengers,
        passengers,
        totalPrice,
      };
      await bookingService.createBooking(payload);
      navigate('/bookings');
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mt-3">
        <div className="alert alert-info">Please login to book flights.</div>
      </div>
    );
  }

  return (
    <div className="container mt-3">
      <h1>Book Flight</h1>
      {error && <div className="alert alert-error">{error}</div>}
      {loading ? (
        <div className="loading">Loading flight...</div>
      ) : !flight ? (
        <div className="alert alert-error">Flight not found.</div>
      ) : (
        <div className="card">
          <h2 className="card-header">{flight.airline} — {flight.departureCity} → {flight.arrivalCity}</h2>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Departure:</strong> {new Date(flight.departureTime).toLocaleString()}
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Price per seat:</strong> ₹{flight.pricePerSeat.toLocaleString()}
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '0.75rem' }}>
              <label>Number of Passengers</label>
              <select value={numPassengers} onChange={(e) => setNumPassengers(Number(e.target.value))}>
                {Array.from({ length: Math.min(flight.availableSeats, 6) }, (_, i) => i + 1).map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <strong>Passenger Details</strong>
              {passengers.map((p, idx) => (
                <div key={idx} style={{ marginTop: '0.5rem' }}>
                  <input
                    type="text"
                    placeholder={`Passenger ${idx + 1} name`}
                    value={p.name}
                    onChange={(e) => handlePassengerChange(idx, e.target.value)}
                    required
                  />
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <strong>Total:</strong> ₹{(flight.pricePerSeat * numPassengers).toLocaleString()}
            </div>

            <button className="btn btn-primary" type="submit" disabled={submitting}>
              {submitting ? 'Booking...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
