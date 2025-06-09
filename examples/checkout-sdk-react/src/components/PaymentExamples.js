import { useState } from 'react';
import Swal from 'sweetalert2';

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Copied to clipboard',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      background: '#2b2e4a',
      color: '#e0e0e0',
    });
  } catch {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Unable to copy to clipboard.',
      background: '#3f3351',
      color: '#e0e0e0',
    });
  }
};

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

            <div className="example-row">
              <span className="example-code">sb-bbhi04060835@personal.example.com</span>
              <button className="copy-btn" onClick={() => copyToClipboard('sb-bbhi04060835@personal.example.com')}>
                Copy
              </button>
            </div>

            <div className="example-row">
              <span className="example-code">m87EEhL*Nx1Pe0%7</span>
              <button className="copy-btn" onClick={() => copyToClipboard('m87EEhL*Nx1Pe0%7')}>
                Copy
              </button>
            </div>
          </div>

          <div className="example-item">
            <div className="example-label">3DS Card:</div>
            <div className="example-row">
              <span className="example-code">4970 1051 8181 8183</span>
              <button className="copy-btn" onClick={() => copyToClipboard('4970 1051 8181 8183')}>
                Copy
              </button>
            </div>
          </div>

          <div className="example-item">
            <div className="example-label">Non-3DS Card:</div>
            <div className="example-row">
              <span className="example-code">4970 1071 1111 1119</span>
              <button className="copy-btn" onClick={() => copyToClipboard('4970 1071 1111 1119')}>
                Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentExamples;
