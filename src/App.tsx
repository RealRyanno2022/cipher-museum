import React, { useState, useEffect } from 'react';
import InputDataDisplay from './components/InputDataDisplay';
import OutputDisplay from './components/OutputDisplay';
import HistoryDisplay from './components/HistoryDisplay';
import AlgorithmSelection from './components/AlgorithmSelection';
import axios from 'axios';

interface HistoryItem {
  input: string;
  output: string;
  algorithm: string;
}

const initialState = {
  algorithm: '',
  input: '',
  history: [] as HistoryItem[],
};

const App: React.FC = () => {
  const [state, setState] = useState(initialState);
  const [zoomLevel, setZoomLevel] = useState(1); // Initial zoom level set to 1

  useEffect(() => {
    const handleResize = () => {
      const zoomLevel = window.innerWidth / window.outerWidth;
      setZoomLevel(zoomLevel);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    fetchAlgorithmData();
  }, []);

  const fetchAlgorithmData = async () => {
    try {
      const response = await axios.get('/api/getAlgorithmData');
      setState(prevState => ({ ...prevState, algorithm: response.data.algorithm }));
    } catch (error) {
      console.error('Error fetching algorithm data:', error);
      alert('An error occurred while fetching the algorithm data.');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(prevState => ({ ...prevState, input: event.target.value }));
  };

  const handleProcessInput = async () => {
    const { algorithm, input } = state;
    try {
      const response = await axios.post('/api/process', { algorithm, input });
      const historyItem: HistoryItem = response.data;
      setState(prevState => ({
        ...prevState,
        history: [...prevState.history, historyItem],
      }));
    } catch (error) {
      console.error('Error processing data:', error);
      alert('An error occurred while processing the input.');
    }
  };

  const updateAlgorithmSelection = async (algorithm: string) => {
    try {
      const response = await axios.post('/api/selectAlgorithm', { algorithm });
      setState(prevState => ({ ...prevState, algorithm: response.data.algorithm }));
    } catch (error) {
      console.error('Error selecting algorithm:', error);
      alert('An error occurred while selecting the algorithm.');
    }
  };

  return (
    <div
      className="container mx-auto flex flex-col items-center min-h-screen fixed top-0 left-0 right-0 bottom-0"
      style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold">Cipher Museum Hub</h1>
        <InputDataDisplay input={state.input} onInputChange={handleInputChange} />
        <button onClick={handleProcessInput}>Process Input</button>
        <OutputDisplay output={state.history.map(item => item.output).join(', ')} />
        <HistoryDisplay history={state.history} />
        <AlgorithmSelection selectedAlgorithm={state.algorithm} onSelectAlgorithm={updateAlgorithmSelection} />
      </div>
    </div>
  );
};

export default App;

