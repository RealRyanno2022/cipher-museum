import React from 'react';

const DonationButton: React.FC = () => {
  const handleClick = () => {
    // Implement Stripe API integration here
    alert('Redirect to Stripe for donation.');
  };

  return (
    <div className="my-4 text-center">
      <button onClick={handleClick} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Donate
      </button>
    </div>
  );
};

export default DonationButton;

