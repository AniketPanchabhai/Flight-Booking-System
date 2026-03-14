import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setShowProfileMenu(false);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const getInitial = () => {
    return user?.firstName?.charAt(0)?.toUpperCase() || 'U';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileMenu]);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            ✈️ FlightBooker
          </Link>
          
          <ul className="nav-links">
            <li>
              <button onClick={toggleTheme} className="theme-toggle" title={isDark ? 'Light Mode' : 'Dark Mode'}>
                {isDark ? '☀' : '🌙'}
              </button>
            </li>
            <li><Link to="/">Home</Link></li>
            {isAuthenticated ? (
              <>
                <li><Link to="/flights">Flights</Link></li>
                <li><Link to="/bookings">My Bookings</Link></li>
                {user?.role === 'prime' && (
                  <li><Link to="/offers">Special Offers</Link></li>
                )}
                <li><Link to="/profile">Profile</Link></li>
                <li style={{ position: 'relative' }} ref={profileMenuRef}>
                  <button
                    onClick={toggleProfileMenu}
                    className="profile-icon"
                    title="Profile Menu"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: user?.role === 'prime' ? '#28a745' : '#007bff',
                      color: 'white',
                      border: '2px solid white',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}
                  >
                    {getInitial()}
                  </button>
                  {showProfileMenu && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '50px',
                        right: '0',
                        backgroundColor: 'var(--card-bg)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        minWidth: '200px',
                        zIndex: 1000
                      }}
                    >
                      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                          {user?.firstName} {user?.lastName}
                        </div>
                        <div style={{
                          fontSize: '14px',
                          color: user?.role === 'prime' ? '#28a745' : '#007bff',
                          fontWeight: '500'
                        }}>
                          {user?.role === 'prime' ? '✨ Prime Member' : 'Standard Member'}
                        </div>
                      </div>
                      <div style={{ padding: '8px 0' }}>
                        <Link
                          to="/profile"
                          style={{
                            display: 'block',
                            padding: '8px 16px',
                            textDecoration: 'none',
                            color: 'var(--text-color)',
                            fontSize: '14px'
                          }}
                          onClick={() => setShowProfileMenu(false)}
                        >
                          👤 View Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          style={{
                            width: '100%',
                            padding: '8px 16px',
                            background: 'none',
                            border: 'none',
                            textAlign: 'left',
                            cursor: 'pointer',
                            color: '#dc3545',
                            fontSize: '14px'
                          }}
                        >
                          🚪 Logout
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
