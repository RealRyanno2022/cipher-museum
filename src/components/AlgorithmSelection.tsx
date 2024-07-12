import React from 'react';

const AlgorithmSelection: React.FC = () => {
  return (
    <div className="my-4">
      <label htmlFor="algorithm" className="block text-sm font-medium text-gray-700">
        Choose an Algorithm
      </label>
      <select id="algorithm" name="algorithm" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        <option>Vigenère Cipher</option>
        <option>Caesar Cipher</option>
        <option>Enigma Cipher</option>
        <option>Louis XIV's Great Cipher</option>
        <option>AES</option>
        <option>RSA</option>
        <option>ECC</option>
        <option>Evervault PCI-DSS</option>
      </select>
    </div>
  );
};

export default AlgorithmSelection;

