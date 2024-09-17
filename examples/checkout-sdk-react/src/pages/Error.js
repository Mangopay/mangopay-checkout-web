import React from 'react';

const Error = () => {
  const handleGoBack = () => {
    window.location.href = '/';
  };

  return (
    <div className="error-page">
      <h1>Payment Failed!</h1>
      <p>Unfortunately, there was an issue processing your payment. Please try again.</p>
      <button className="button" onClick={handleGoBack}>
        Go Back to Home
      </button>
    </div>
  );
};

export default Error;
