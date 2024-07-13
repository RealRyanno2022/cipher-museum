import React, { useState, useEffect } from 'react';
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
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [zoomLevel, setZoom] = useState(1);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>(algorithmHistoryJson);
  const [filteredHistory, setFilteredHistory] = useState(history);

  useEffect(() => {
    const handleZoom = () => {
      const zoomLevel = window.devicePixelRatio;
      setZoom(zoomLevel);
    };

    window.addEventListener('resize', handleZoom);
    handleZoom();

    return () => {
      window.removeEventListener('resize', handleZoom);
    };
  }, []);

  const handleInputChange = (input: string) => {
    setInput(input);
    switch (selectedAlgorithm) {
      case 'Caesar Cipher':
        setOutput(`Caesar: ${input}`); // Replace with actual encryption logic
        break;
      case 'AES':
        setOutput(`AES: ${input}`); // Replace with actual encryption logic
        break;
      default:
        setOutput(input);
    }
  };

  const handleAlgorithmChange = (algorithm: string) => {
    setSelectedAlgorithm(algorithm);
  };

  const saveInputResult = (result: string) => {
    const newHistory: HistoryItem = {
      id: history.length + 1,
      prompt: input,
      result: result,
      algorithm: selectedAlgorithm,
    };
    setHistory([...history, newHistory]);
  };

  useEffect(() => {
    setFilteredHistory(history.filter(item => item.algorithm === selectedAlgorithm));
  }, [history, selectedAlgorithm]);

  return (
    <div className="container mx-auto flex flex-col items-center min-h-screen fixed top-0 left-0 right-0 bottom-0" style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}>
      <header className="text-center w-full">
        <h1 className="text-4xl font-bold">Cipher Museum</h1>
      </header>
      <div className="flex w-full justify-center gap-4 my-8">
        <div className="flex-col p-6 shadow-md rounded-lg max-w-md">
          <AlgorithmSelection selectedAlgorithm={selectedAlgorithm} onAlgorithmChange={handleAlgorithmChange} />
        </div>
      </div>
      <InputOutputDisplay input={input} output={output} onInputChange={handleInputChange} />
      <div>
        <DonationButton />
      </div>
      <div className="flex flex-col p-6 shadow-md rounded-lg max-w-md" style={{ minWidth: '300px' }}>
        <HistoryDropdown items={selectedAlgorithm ? filteredHistory : history} onSelect={(id) => console.log('Select', id)} onDelete={(id) => console.log('Delete', id)} />
      </div> 
    </div>
  );
};

export default App;
