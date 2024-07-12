// src/components/DonationButton.tsx
import React from 'react';

const DonationButton: React.FC = () => {
  const paymentLink = import.meta.env.VITE_STRIPE_PAYMENT_LINK;

  return (
    <div className="my-4 text-center">
      <a href={paymentLink} className="stripe-button">
        Donate with Stripe
      </a>
    </div>
  );
};

export default DonationButton;

