import React from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
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
