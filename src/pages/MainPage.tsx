import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputOutputDisplay from '../components/InputOutputDisplay';
import AlgorithmSelection from '../components/AlgorithmSelection';
import useLodashState from '../hooks/useLodashState';
import axios from 'axios';

const MainPage: React.FC = () => {
  const { getState, setState: setLodashState, subscribe } = useLodashState({
    input: '',
    output: '',
    history: [],
    selectedAlgorithm: null
  });

  const [zoomLevel, setZoomLevel] = useState(1);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLodashState('input', event.target.value);
  };

  const handleOutputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLodashState('output', event.target.value);
  };

  const handleProcess = async () => {
    try {
      const response = await axios.post('/api/process', {
        input: getState().input,
        algorithm: getState().selectedAlgorithm
      });
      setLodashState('output', response.data.output);
      setLodashState('history', [...getState().history, { input: getState().input, output: response.data.output }]);
    } catch (error) {
      console.error('Error processing data:', error);
    }
  };

  const handleSelectAlgorithm = async (algorithm: string) => {
    try {
      const response = await axios.post('/api/selectAlgorithm', { algorithm });
      setLodashState('selectedAlgorithm', response.data.algorithm);
    } catch (error) {
      console.error('Error selecting algorithm:', error);
    }
  };

  return (
    <div>
      <div style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}>
        <InputOutputDisplay
          input={getState().input}
          output={getState().output}
          onInputChange={handleInputChange}
          onOutputChange={handleOutputChange}
        />
        <AlgorithmSelection
          selectedAlgorithm={getState().selectedAlgorithm}
          onSelectAlgorithm={handleSelectAlgorithm}
        />

        <Link to="/history">
          <button className="mt-4 bg-green-500 text-white font-bold py-2 px-4 rounded">
            View History
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;

