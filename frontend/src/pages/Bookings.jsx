import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { bookingService } from '../services/api';
import jsPDF from 'jspdf';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await bookingService.getUserBookings();
      setBookings(response.data.bookings);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      try {
        await bookingService.cancelBooking(bookingId);
        fetchBookings();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to cancel booking');
      }
    }
  };

  const downloadTicket = (booking) => {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Background gradient-like header
    doc.setFillColor(5, 62, 120);
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setFillColor(13, 97, 196);
    doc.rect(0, 40, pageWidth, 20, 'F');

    // Header Text + Logo-ish icon
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('BOARDING PASS', 14, 26);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('FlightBooker', 14, 36);
    doc.setFontSize(10);
    doc.text('Safe travels, always!', 14, 44);

    // Ticket container
    const ticketMargin = 14;
    const ticketWidth = pageWidth - ticketMargin * 2;
    const ticketTop = 55;
    const ticketHeight = 190;

    doc.setFillColor(245, 247, 250);
    doc.roundedRect(ticketMargin, ticketTop, ticketWidth, ticketHeight, 6, 6, 'F');

    // Divider stripe (simulating detachable ticket stub)
    const stripeY = ticketTop + 100;
    doc.setFillColor(220, 230, 245);
    doc.rect(ticketMargin, stripeY, ticketWidth, 1.5, 'F');

    // Flight / booking info section
    doc.setTextColor(15, 23, 43);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`${booking.flightId?.airline}`, ticketMargin + 6, ticketTop + 14);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Booking Ref: ${booking.bookingReference}`, ticketMargin + 6, ticketTop + 22);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('FROM', ticketMargin + 6, ticketTop + 40);
    doc.text('TO', ticketMargin + 80, ticketTop + 40);
    doc.setFont('helvetica', 'normal');
    doc.text(`${booking.flightId?.departureCity}`, ticketMargin + 6, ticketTop + 50);
    doc.text(`${booking.flightId?.arrivalCity}`, ticketMargin + 80, ticketTop + 50);

    doc.setFont('helvetica', 'bold');
    doc.text('DEPART', ticketMargin + 6, ticketTop + 68);
    doc.text('ARRIVE', ticketMargin + 80, ticketTop + 68);
    doc.setFont('helvetica', 'normal');
    doc.text(`${new Date(booking.flightId?.departureTime).toLocaleString()}`, ticketMargin + 6, ticketTop + 78);
    doc.text(`${new Date(booking.flightId?.arrivalTime).toLocaleString()}`, ticketMargin + 80, ticketTop + 78);

    doc.setFont('helvetica', 'bold');
    doc.text('DURATION', ticketMargin + 6, ticketTop + 96);
    doc.setFont('helvetica', 'normal');
    doc.text(`${booking.flightId?.duration}`, ticketMargin + 6, ticketTop + 106);

    doc.setFont('helvetica', 'bold');
    doc.text('AIRCRAFT', ticketMargin + 80, ticketTop + 96);
    doc.setFont('helvetica', 'normal');
    doc.text(`${booking.flightId?.aircraft}`, ticketMargin + 80, ticketTop + 106);

    doc.setFont('helvetica', 'bold');
    doc.text('STATUS', ticketMargin + 6, ticketTop + 124);
    doc.setFont('helvetica', 'normal');
    doc.text(`${booking.status.toUpperCase()}`, ticketMargin + 6, ticketTop + 134);

    doc.setFont('helvetica', 'bold');
    doc.text('PAX', ticketMargin + 80, ticketTop + 124);
    doc.setFont('helvetica', 'normal');
    doc.text(`${booking.numberOfPassengers}`, ticketMargin + 80, ticketTop + 134);

    // Passenger list portion (stub-like)
    const stubX = ticketMargin;
    const stubY = stripeY + 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('PASSENGER(S):', stubX + 6, stubY);

    doc.setFont('helvetica', 'normal');
    let passengerY = stubY + 10;
    booking.passengers.forEach((passenger, index) => {
      const passengerText = `${index + 1}. ${passenger.name}${passenger.seatNumber ? ` (Seat ${passenger.seatNumber})` : ''}`;
      doc.text(passengerText, stubX + 6, passengerY);
      passengerY += 8;
    });

    // QR Code placeholder
    const qrSize = 40;
    const qrX = ticketMargin + ticketWidth - qrSize - 10;
    const qrY = ticketTop + 12;
    doc.setDrawColor(100);
    doc.rect(qrX, qrY, qrSize, qrSize);
    doc.setFontSize(7);
    doc.text('SCAN FOR', qrX + qrSize / 2, qrY + qrSize / 2 - 3, { align: 'center' });
    doc.text('FLIGHT INFO', qrX + qrSize / 2, qrY + qrSize / 2 + 4, { align: 'center' });

    // Footer notes
    doc.setFontSize(8);
    doc.setTextColor(90, 90, 90);
    doc.text('Please arrive at the airport at least 2 hours before departure.', ticketMargin + 6, ticketTop + ticketHeight - 22);
    doc.text('Carry a valid government-issued ID and boarding pass at all times.', ticketMargin + 6, ticketTop + ticketHeight - 14);
    doc.text('This ticket is subject to airline terms and conditions.', ticketMargin + 6, ticketTop + ticketHeight - 6);
    doc.setFontSize(6);
    doc.text('© 2026 FlightBooker. All rights reserved. For support, visit flightbooker.example/support', ticketMargin + 6, ticketTop + ticketHeight + 4);

    // Save the PDF
    doc.save(`ticket-${booking.bookingReference}.pdf`);
  };

  if (!isAuthenticated) {
    return (
      <div className="container mt-3">
        <div className="alert alert-info">Please login to view your bookings.</div>
      </div>
    );
  }

  return (
    <div className="container mt-3">
      <h1>My Bookings</h1>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          Loading bookings...
        </div>
      ) : bookings.length > 0 ? (
        <div>
          {bookings.map(booking => (
            <div key={booking._id} className="card">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '1rem' }}>
                <div>
                  <h3 className="card-header">{booking.flightId?.airline} - {booking.bookingReference}</h3>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <strong>From:</strong> {booking.flightId?.departureCity}
                  </div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <strong>To:</strong> {booking.flightId?.arrivalCity}
                  </div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <strong>Passengers:</strong> {booking.numberOfPassengers}
                  </div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <strong>Date:</strong> {new Date(booking.flightId?.departureTime).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <strong>Status:</strong>
                    <span style={{
                      marginLeft: '0.5rem',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '4px',
                      backgroundColor: booking.status === 'confirmed' ? '#d4edda' : '#f8d7da',
                      color: booking.status === 'confirmed' ? '#155724' : '#721c24'
                    }}>
                      {booking.status.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <strong>Total Price:</strong> ₹{booking.totalPrice.toLocaleString()}
                  </div>
                  {booking.discountApplied > 0 && (
                    <div style={{ marginBottom: '0.5rem', color: '#28a745' }}>
                      <strong>Discount Applied:</strong> ₹{booking.discountApplied.toLocaleString()}
                    </div>
                  )}
                  <div>
                    <strong>Payment Status:</strong> {booking.paymentStatus.toUpperCase()}
                  </div>
                </div>
              </div>

              {booking.passengers && booking.passengers.length > 0 && (
                <div style={{ marginBottom: '1rem', paddingTop: '1rem', borderTop: '1px solid #ddd' }}>
                  <strong>Passengers:</strong>
                  <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                    {booking.passengers.map((p, idx) => (
                      <li key={idx}>{p.name} (Seat: {p.seatNumber || 'N/A'})</li>
                    ))}
                  </ul>
                </div>
              )}

              {booking.status !== 'cancelled' && (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => downloadTicket(booking)}
                  >
                    Download Ticket
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleCancel(booking._id)}
                  >
                    Cancel Booking
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info">No bookings found. Start booking your flights!</div>
      )}
    </div>
  );
}
