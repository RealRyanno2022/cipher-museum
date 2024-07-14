import React, { useEffect, useReducer, useCallback, useRef } from 'react';
import useLodashState from './hooks/useLodashState';
import InputOutputDisplay from './components/InputOutputDisplay';
import HistoryDropdown from './components/HistoryDropdown';
import AlgorithmSelection from './components/AlgorithmSelection';
import axios from 'axios';
import { debounce } from 'lodash';

interface HistoryItem {
  input: string;
  output: string;
  algorithm: string;
}

const initialState = {
  algorithm: '',
  input: '',
  output: '',
  history: [] as HistoryItem[],
  zoomLevel: 1,
};

const App: React.FC = () => {
  const lodashStateRef = useRef(new useLodashState(initialState));
  const lodashState = lodashStateRef.current;
  const [, forceUpdate] = useReducer((x) => x + 1, 0); // Force update to re-render

  useEffect(() => {
    const handleResize = () => {
      lodashState.setState('zoomLevel', window.innerWidth / window.outerWidth);
      forceUpdate();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [lodashState]);

  useEffect(() => {
    fetchAlgorithmData();
  }, [lodashState]);

  const fetchAlgorithmData = async () => {
    try {
      const response = await axios.get('/api/getAlgorithmData');
      lodashState.setState('algorithm', response.data.algorithm);
      forceUpdate();
    } catch (error) {
      console.error('Error fetching algorithm data:', error);
      alert('An error occurred while fetching the algorithm data.');
    }
  };

  const debouncedInputChange = useCallback(
    debounce((value: string) => {
      lodashState.setState('input', value);
      forceUpdate();
    }, 50),
    [lodashState]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    debouncedInputChange(value);
  };

  const handleProcessInput = async () => {
    const { algorithm, input } = lodashState.getState();
    try {
      const response = await axios.post('/api/process', { algorithm, input });
      const historyItem: HistoryItem = response.data;
      lodashState.setState('input', '');
      lodashState.setState('output', historyItem.output);
      lodashState.setState('history', [...lodashState.getState().history, historyItem]);
      forceUpdate();
    } catch (error) {
      console.error('Error processing data:', error);
      alert('An error occurred while processing the input.');
    }
  };

  const updateAlgorithmSelection = async (algorithm: string) => {
    try {
      const response = await axios.post('/api/selectAlgorithm', { algorithm });
      lodashState.setState('algorithm', response.data.algorithm);
      forceUpdate();
    } catch (error) {
      console.error('Error selecting algorithm:', error);
      alert('An error occurred while selecting the algorithm.');
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center min-h-screen fixed top-0 left-0 right-0 bottom-0" style={{ transform: `scale(${lodashState.getState().zoomLevel})`, transformOrigin: 'center' }}>
      <div className="text-center w-full px-8">
        <h1 className="text-4xl font-bold">Cipher Museum Hub</h1>
        <InputOutputDisplay input={lodashState.getState().input} output={lodashState.getState().output} onInputChange={handleInputChange} />
        <button onClick={handleProcessInput}>Process Input</button>
        <HistoryDropdown title="History" history={lodashState.getState().history} onDelete={() => {}} onSelect={() => {}} />
        <AlgorithmSelection selectedAlgorithm={lodashState.getState().algorithm} onSelectAlgorithm={updateAlgorithmSelection} />
      </div>
    </div>
  );
};

export default App;

