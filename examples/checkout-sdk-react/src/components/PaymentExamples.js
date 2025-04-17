import { useState } from 'react';

const PaymentExamples = () => {
  const [showExamples, setShowExamples] = useState(false);

  return (
    <div className="payment-examples">
      <button className={`button ${showExamples ? 'active' : ''}`} onClick={() => setShowExamples(!showExamples)}>
        {showExamples ? 'Hide' : 'Show'} Example Payment Methods
      </button>

      {showExamples && (
        <div className="examples-content">
          <div className="example-item">
            <div className="example-label">PayPal (sandbox):</div>
            <div>
              <span className="example-key">Email:</span> <code>sb-bbhi04060835@personal.example.com</code>
            </div>
            <div>
              <span className="example-key">Password:</span> <code>m87EEhL*Nx1Pe0%7</code>
            </div>
          </div>

          <div className="example-item">
            <div className="example-label">3DS Card:</div>
            <code>4970 1051 8181 8183</code>
          </div>

          <div className="example-item">
            <div className="example-label">Non-3DS Card:</div>
            <code>4970 1071 1111 1119</code>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentExamples;
