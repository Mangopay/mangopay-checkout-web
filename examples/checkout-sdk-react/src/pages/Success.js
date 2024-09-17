import React from 'react';

const Success = () => {
  const handleGoBack = () => {
    window.location.href = '/';
  };

  return (
    <div className="success-page">
      <h1>Payment Successful!</h1>
      <p>Thank you for your payment. Your transaction was completed successfully.</p>
      <button className="button" onClick={handleGoBack}>
        Go Back to Home
      </button>
    </div>
  );
};

export default Success;
