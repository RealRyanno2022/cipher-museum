import React from 'react';


const DonationButton: React.FC = () => {
  return (
    <button

      style={{
        fontFamily: 'Orbitron, monospace',

        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '200px',
        height: '100px',
      }}
    >
      Donate with Stripe!
    </button>
  );
};

export default DonationButton;

