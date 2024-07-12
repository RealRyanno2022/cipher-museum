import React, { useState } from 'react';
import AlgorithmSelection from './components/AlgorithmSelection';
import InputOutputDisplay from './components/InputOutputDisplay';
import DonationButton from './components/DonationButton';
import algorithmHistoryJson from './components/algorithms_history.json'; // Ensure this path is correct
import HistoryDropdown from './components/HistoryDropdown';

interface HistoryItem {
  id: number;
  prompt: string;
  result: string;
  algorithm: string;
}

const App: React.FC = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [algorithmHistory, setAlgorithmHistory] = useState<HistoryItem[]>(algorithmHistoryJson);

  const handleInputChange = (input: string) => {
    setInput(input);
    switch (selectedAlgorithm) {
      case 'Caesar Cipher':
        // Add Caesar Cipher logic
        setOutput(`Caesar: ${input}`); // Replace with actual encryption logic
        break;
      case 'AES':
        // Add AES logic
        setOutput(`AES: ${input}`); // Replace with actual encryption logic
        break;
      // Add cases for other algorithms
      default:
        setOutput(input);
    }
  };

  const handleAlgorithmChange = (algorithm: string) => {
    setSelectedAlgorithm(algorithm);
  };

  const setupResult = (result: string) => {
    const newHistory: HistoryItem = {
      id: algorithmHistory.length + 1,
      prompt: input,
      result: result,
      algorithm: selectedAlgorithm,
    };
    setAlgorithmHistory([...algorithmHistory, newHistory]);
  };

  const filteredHistory = algorithmHistory.filter(item => item.algorithm === selectedAlgorithm);

 return (
  <div className="container mx-auto flex flex-col items-center min-h-screen">
    <header className="text-center col-span-2">
      <h1 className="text-4xl font-bold">Cipher Museum</h1>
    </header>
    <div className="flex w-full">
      <div className="flex flex-col p-6 shadow-md rounded-lg max-w-md mx-auto">
        <AlgorithmSelection selectedAlgorithm={selectedAlgorithm} setSelectedAlgorithm={handleAlgorithmChange} />
        <InputOutputDisplay input={input} output={output} handleInputChange={handleInputChange} />
        <DonationButton />
      </div>
      <div className="flex flex-col p-6 shadow-md rounded-lg max-w-md ml-4">
        <HistoryDropdown
          items={selectedAlgorithm ? filteredHistory : history}
          onDelete={(id) => console.log('Delete', id)}
          onSelect={(id) => console.log('Select', id)}
        />
      </div>
    </div>
    <footer className="text-center col-span-2">
      <p className="text-sm">&copy; 2024 Encryption App</p>
    </footer>
  </div>
);

};

export default App;

