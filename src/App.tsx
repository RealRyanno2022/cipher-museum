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
    <div className="container mx-auto p-4 flex flex-col lg:grid lg:grid-cols-2 gap-8 min-h-screen">
      <header className="text-center col-span-2">
        <h1 className="text-4xl font-bold">Cipher Museum</h1>
      </header>
      <main className="flex flex-col lg:justify-center lg:items-start">
        <div className="mb-4 p-6 shadow-md rounded-lg w-full max-w-lg">
          <AlgorithmSelection selectedAlgorithm={selectedAlgorithm} setSelectedAlgorithm={handleAlgorithmChange} />
          <InputOutputDisplay input={input} output={output} handleInputChange={handleInputChange} />
          <DonationButton />
        </div>
      </main>
      <aside className="flex flex-col lg:justify-center lg:items-end">
        <HistoryDropdown 
          title={selectedAlgorithm || 'History'}
          history={filteredHistory} 
          onDelete={(id) => console.log('Delete', id)} 
          onSelect={(id) => console.log('Select', id)}
        />
      </aside>
      <footer className="text-center col-span-2">
        <p className="text-sm">&copy; 2024 Encryption App</p>
      </footer>
    </div>
  );
};

export default App;

