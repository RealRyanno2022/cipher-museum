import React from 'react';

const HistoryPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="overflow-y-auto h-full w-full p-4" style={{ maxWidth: '800px' }}>
        <h1 className="text-green-500 text-2xl font-bold mb-4">History of Encryption</h1>
        <div className="bg-white shadow-md rounded-lg p-4">
          <p className="mb-4">
            Encryption is a method of securing data by converting it into a format that can only be read by someone who has the appropriate decryption key. This technique has been used for thousands of years, from the simple substitution ciphers used in ancient times to the complex algorithms that secure our data today.
          </p>
          <p className="mb-4">
            <strong>Ancient Times:</strong> The earliest known use of encryption was in ancient Egypt, where hieroglyphs were used to encode messages. The Greeks and Romans also used simple substitution ciphers. For example, Julius Caesar used a shift cipher, which is now known as the Caesar cipher.
          </p>
          <p className="mb-4">
            <strong>Middle Ages:</strong> During the Middle Ages, encryption techniques became more sophisticated. The Arab mathematician Al-Kindi developed frequency analysis, a technique used to break substitution ciphers. The Vigenère cipher, which uses a keyword to shift letters, was invented in the 16th century and was considered unbreakable for several hundred years.
          </p>
          <p className="mb-4">
            <strong>Modern Era:</strong> The advent of computers in the 20th century revolutionized encryption. The Enigma machine used by Germany during World War II was a significant advancement in encryption technology. The development of public-key cryptography in the 1970s, by Whitfield Diffie and Martin Hellman, introduced a new era of encryption that underpins secure communications on the internet today.
          </p>
          <p className="mb-4">
            <strong>Current Technologies:</strong> Today, encryption is used to secure everything from online banking transactions to personal communications. Algorithms such as AES (Advanced Encryption Standard) and RSA (Rivest-Shamir-Adleman) are widely used to protect sensitive data. Quantum computing poses a potential future threat to current encryption methods, leading to ongoing research into quantum-resistant algorithms.
          </p>
          <p>
            The history of encryption is a fascinating journey through time, highlighting the constant battle between those seeking to protect information and those attempting to uncover it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;

