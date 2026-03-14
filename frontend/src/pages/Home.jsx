import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <>
      {/* Animated Hero Section */}
      <div className="hero">
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.4,
          zIndex: 1
        }}></div>
        <div className="big-plane">✈️</div>
        <div className="hero-content">
          <h2>✈️ FlightBooker</h2>
          <p>Your trusted platform for flight bookings with exclusive offers for prime members</p>
        </div>
      </div>

      <div className="container">
        {/* Summer Packages Highlight */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '15px',
          padding: '3rem 2rem',
          marginBottom: '3rem',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3,
            zIndex: 1
          }}></div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
              🌞 Summer Packages 2026
            </h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
              Discover amazing destinations with exclusive deals for unforgettable summer adventures!
            </p>
            <button
              className="btn btn-primary btn-lg"
              style={{
                backgroundColor: 'rgba(255,255,255,0.9)',
                color: '#333',
                border: 'none',
                fontSize: '1.1rem',
                padding: '1rem 2rem'
              }}
              onClick={() => document.getElementById('summer-packages').scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Packages
            </button>
          </div>
        </div>
        <div className="text-center" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>

        {!isAuthenticated ? (
          <div>
            <Link to="/login" className="btn btn-primary" style={{ marginRight: '1rem' }}>
              Login
            </Link>
            <Link to="/signup" className="btn btn-secondary">
              Create Account
            </Link>
          </div>
        ) : (
          <div>
            <p style={{ marginBottom: '2rem' }}>
              Welcome, <strong>{user?.firstName} {user?.lastName}</strong>! 
              <span style={{
                marginLeft: '1rem',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                backgroundColor: user?.role === 'prime' ? '#fff3cd' : '#e7f3ff',
                color: user?.role === 'prime' ? '#856404' : '#004085'
              }}>
                {user?.role === 'prime' ? '✨ Prime Member' : 'Standard Member'}
              </span>
            </p>
            <Link to="/flights" className="btn btn-primary btn-lg" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
              Browse Flights
            </Link>
          </div>
        )}
      </div>

      <div className="grid" style={{ marginTop: '3rem' }}>
        <div className="card">
          <h3 className="card-header">🔒 Secure Booking</h3>
          <p>Book your flights with confidence. Our secure payment gateway ensures your data is protected.</p>
        </div>

        <div className="card">
          <h3 className="card-header">📱 Easy to Use</h3>
          <p>Simple and intuitive interface makes booking flights a breeze. Search, compare, and book in minutes.</p>
        </div>

        <div className="card">
          <h3 className="card-header">✨ Prime Benefits</h3>
          <p>Exclusive offers and discounts for Prime members. Get best deals on flights and special perks.</p>
        </div>

        <div className="card">
          <h3 className="card-header">📞 24/7 Support</h3>
          <p>Our customer support team is always ready to help you with any queries or concerns.</p>
        </div>
      </div>

      {/* Summer Packages Section */}
      <div id="summer-packages" style={{ marginTop: '4rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>Summer Packages 2026</h2>
        
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Family Package */}
          <div className="card" style={{ border: '2px solid #28a745', position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: '-10px',
              right: '20px',
              backgroundColor: '#28a745',
              color: 'white',
              padding: '5px 15px',
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: 'bold'
            }}>
              Family Special
            </div>
            <img 
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
              alt="Beach Family Vacation"
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
            />
            <div style={{ padding: '1rem' }}>
              <h3 style={{ color: '#28a745', marginBottom: '0.5rem' }}>Tropical Paradise Family Getaway</h3>
              <p style={{ marginBottom: '1rem', color: '#666' }}>
                Perfect for families! 7-day package to Bali including flights, resort stay, and family activities.
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ fontSize: '1.2rem', color: '#28a745' }}>₹85,000</strong>
                  <span style={{ textDecoration: 'line-through', color: '#999', marginLeft: '0.5rem' }}>₹1,05,000</span>
                </div>
                <span style={{ backgroundColor: '#28a745', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.9rem' }}>
                  Save 19%
                </span>
              </div>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', color: '#666', fontSize: '0.9rem' }}>
                <li>Return flights included</li>
                <li>5-star beach resort</li>
                <li>Family adventure activities</li>
                <li>Complimentary meals</li>
              </ul>
            </div>
          </div>

          {/* Couples Package */}
          <div className="card" style={{ border: '2px solid #e83e8c', position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: '-10px',
              right: '20px',
              backgroundColor: '#e83e8c',
              color: 'white',
              padding: '5px 15px',
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: 'bold'
            }}>
              Romantic Escape
            </div>
            <img 
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
              alt="Romantic Beach Sunset"
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
            />
            <div style={{ padding: '1rem' }}>
              <h3 style={{ color: '#e83e8c', marginBottom: '0.5rem' }}>Maldives Romantic Retreat</h3>
              <p style={{ marginBottom: '1rem', color: '#666' }}>
                Intimate 5-day escape to the Maldives with overwater bungalow and private dining experiences.
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ fontSize: '1.2rem', color: '#e83e8c' }}>₹1,25,000</strong>
                  <span style={{ textDecoration: 'line-through', color: '#999', marginLeft: '0.5rem' }}>₹1,55,000</span>
                </div>
                <span style={{ backgroundColor: '#e83e8c', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.9rem' }}>
                  Save 19%
                </span>
              </div>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', color: '#666', fontSize: '0.9rem' }}>
                <li>Seaplane transfer included</li>
                <li>Overwater villa accommodation</li>
                <li>Private sunset dinner</li>
                <li>Spa treatments for two</li>
              </ul>
            </div>
          </div>

          {/* Adventure Package */}
          <div className="card" style={{ border: '2px solid #fd7e14', position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: '-10px',
              right: '20px',
              backgroundColor: '#fd7e14',
              color: 'white',
              padding: '5px 15px',
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: 'bold'
            }}>
              Adventure Deal
            </div>
            <img 
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
              alt="Mountain Adventure"
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
            />
            <div style={{ padding: '1rem' }}>
              <h3 style={{ color: '#fd7e14', marginBottom: '0.5rem' }}>Swiss Alps Adventure</h3>
              <p style={{ marginBottom: '1rem', color: '#666' }}>
                Thrilling 6-day adventure in Switzerland with hiking, skiing, and scenic train journeys.
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ fontSize: '1.2rem', color: '#fd7e14' }}>₹95,000</strong>
                  <span style={{ textDecoration: 'line-through', color: '#999', marginLeft: '0.5rem' }}>₹1,20,000</span>
                </div>
                <span style={{ backgroundColor: '#fd7e14', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.9rem' }}>
                  Save 21%
                </span>
              </div>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', color: '#666', fontSize: '0.9rem' }}>
                <li>Return flights to Zurich</li>
                <li>Mountain resort stay</li>
                <li>Guided hiking tours</li>
                <li>Scenic train passes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
