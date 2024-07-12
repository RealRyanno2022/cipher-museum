import React from 'react';

interface AlgorithmSelectionProps {
  selectedAlgorithm: string;
  setSelectedAlgorithm: (algorithm: string) => void;
}

const AlgorithmSelection: React.FC<AlgorithmSelectionProps> = ({ selectedAlgorithm, setSelectedAlgorithm }) => {
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAlgorithm(e.target.value);
  };

  return (
    <div className="my-4">
      <label
        htmlFor="algorithm"
        className="block text-green-500 text-sm font-bold mb-2"
        style={{ fontFamily: 'Orbitron, monospace' }}
      >
        Choose an Algorithm
      </label>
      <select
        id="algorithm"
        name="algorithm"
        value={selectedAlgorithm}
        onChange={handleSelectionChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-green-500 font-bold focus:outline-none focus:shadow-outline"
        style={{ fontFamily: 'monospace' }}
      >
        <option value="Vigenère Cipher">Vigenère Cipher</option>
        <option value="Caesar Cipher">Caesar Cipher</option>
        <option value="Enigma Cipher">Enigma Cipher</option>
        <option value="Louis XIV's Great Cipher">Louis XIV's Great Cipher</option>
        <option value="AES">AES</option>
        <option value="RSA">RSA</option>
        <option value="ECC">ECC</option>
        <option value="Evervault PCI-DSS">Evervault PCI-DSS</option>
      </select>
    </div>
  );
};

export default AlgorithmSelection;

