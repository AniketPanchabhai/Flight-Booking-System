import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { offerService } from '../services/api';

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchOffers();
    }
  }, [isAuthenticated]);

  const fetchOffers = async () => {
    setLoading(true);
    try {
      const response = await offerService.getOffers();
      setOffers(response.data.offers);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch offers');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mt-3">
        <div className="alert alert-info">Please login to view offers.</div>
      </div>
    );
  }

  if (user?.role !== 'prime') {
    return (
      <div className="container mt-3">
        <div className="alert alert-error">
          ✨ Special offers are available only for Prime members. Upgrade your account to enjoy exclusive deals!
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-3">
      <div className="page-header">
        <h1>✨ Exclusive Prime Member Offers</h1>
        <p>Save big on your next flight with our special discounts</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          Loading offers...
        </div>
      ) : offers.length > 0 ? (
        <div className="grid">
          {offers.map(offer => (
            <div key={offer._id} className="card">
              <h3 className="card-header">{offer.title}</h3>
              <p style={{ marginBottom: '1.5rem', color: 'var(--text-color)', fontSize: '0.95rem' }}>{offer.description}</p>

              <div style={{
                padding: '1.5rem',
                background: 'linear-gradient(135deg, #fff9f0 0%, #e8f4f8 100%)',
                borderRadius: '8px',
                marginBottom: '1.5rem',
                textAlign: 'center',
                border: '2px solid var(--primary-color)'
              }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                  {offer.discountPercentage}%
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-color)' }}>OFF</div>
                {offer.maxDiscountAmount && (
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-color)', marginTop: '0.5rem' }}>
                    Max: ₹{offer.maxDiscountAmount.toLocaleString()}
                  </div>
                )}
              </div>

              <div style={{ marginBottom: '1.5rem', fontSize: '0.875rem', color: 'var(--text-color)' }}>
                <div style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                  <strong>Valid From:</strong>
                  <span>{new Date(offer.validFrom).toLocaleDateString()}</span>
                </div>
                <div style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                  <strong>Valid Until:</strong>
                  <span>{new Date(offer.validUntil).toLocaleDateString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>Times Used:</strong>
                  <span>{offer.usedCount} / {offer.maxUsagePerUser}</span>
                </div>
              </div>

              <button className="btn btn-success" style={{ width: '100%' }}>
                🎉 Apply This Offer
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info">No active offers at the moment. Check back soon!</div>
      )}
    </div>
  );
}
