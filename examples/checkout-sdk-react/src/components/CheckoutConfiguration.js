import React from 'react';

const CheckoutConfiguration = ({ respectPaymentMethodsOrder, onToggle }) => {
  return (
    <div className="payment-examples">
      <div className="configuration-header">
        <h3 style={{ margin: '0 0 8px 0', color: '#a3bffa', fontSize: '16px', fontWeight: '600' }}>
          Configuration
        </h3>
        <p style={{ margin: '0 0 12px 0', color: '#d1d1e9', fontSize: '13px', lineHeight: '1.3' }}>
          Adjust checkout behavior and settings
        </p>
      </div>
      
      <label 
        style={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          cursor: 'pointer',
          padding: '12px 16px',
          background: '#1e1e2f',
          borderRadius: '8px',
          border: '1px solid #3b3e5e',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => e.target.style.background = '#252843'}
        onMouseLeave={(e) => e.target.style.background = '#1e1e2f'}
      >
        <input
          type="checkbox"
          checked={respectPaymentMethodsOrder}
          onChange={(e) => onToggle(e.target.checked)}
          style={{ 
            marginRight: '12px',
            marginTop: '2px',
            width: '18px',
            height: '18px',
            cursor: 'pointer',
            accentColor: '#5a67d8'
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ 
            color: '#e0e0e0', 
            fontSize: '15px', 
            fontWeight: '500',
            marginBottom: '4px'
          }}>
            Respect Payment Methods Order
          </div>
          <div style={{ 
            color: '#c3c7d1', 
            fontSize: '12px', 
            lineHeight: '1.3',
            wordWrap: 'break-word',
            overflowWrap: 'break-word'
          }}>
            <div style={{ marginBottom: '2px' }}>
              <strong style={{ color: '#a3bffa' }}>Enabled:</strong> Methods appear as defined (PayPal → Apple Pay → Google Pay → Card)
            </div>
            <div>
              <strong style={{ color: '#a3bffa' }}>Disabled:</strong> SDK default order (Card first)
            </div>
          </div>
        </div>
      </label>
    </div>
  );
};

export default CheckoutConfiguration;