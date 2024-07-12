import React, { useState, useEffect } from 'react';
import AlgorithmSelection from './components/AlgorithmSelection';
import InputOutputDisplay from './components/InputOutputDisplay';
import DonationButton from './components/DonationButton';
import algorithmsHistory from './components/algorithms_history.json'; // Make sure to import the JSON file
import HistoryDropdown from './components/HistoryDropdown';

const App: React.FC = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [algorithmHistory, setAlgorithmHistory] = useState('');

  const handleInputChange = (input: string) => {
    setInput(input);
    let result = '';
    switch (selectedAlgorithm) {
      case 'Vigenère Cipher':
        result = `Vigenère: ${input}`; // Replace with actual encryption logic
        break;
      case 'Caesar Cipher':
        result = `Caesar: ${input}`; // Replace with actual encryption logic
        break;
      // Add cases for other algorithms
      default:
        result = input;
    }
    setOutput(result);
    addToHistory(input, result);
  };

  const addToHistory = (input: string, result: string) => {
    const newHistory = [...algorithmHistory, { input, result }];
    setAlgorithmHistory(newHistory);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen bg-black-100">
      <header className="text-center">
        <h1 className="text-4xl font-bold">Cipher Museum</h1>
          </header>
      <main className="mt-4 flex justify-center w-full">
        <div className="bg-white p-6 shadow-md rounded-lg w-full max-w-lg">
          <AlgorithmSelection 
            selectedAlgorithm={selectedAlgorithm} 
            setSelectedAlgorithm={setSelectedAlgorithm} 
          />
          <InputOutputDisplay 
            input={input} 
            output={output} 
            onInputChange={handleInputChange} 
          />
	  <HistoryDropdown />
          <DonationButton />
        </div>
      </main>
      <footer className="text-center mt-8">
        <p className="text-sm">&copy; 2024 Encryption App</p>
      </footer>
    </div>
  );
};

export default App;

