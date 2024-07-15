import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputOutputDisplay from '../components/InputOutputDisplay';
import AlgorithmSelection from '../components/AlgorithmSelection';

const MainPage = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);

  const handleInputChange = (event) => {
    let newValue = event.target.value.toUpperCase();
    if (newValue.length > 200) {
      newValue = newValue.slice(0, 200);
    }
    if (/^[A-Z]*$/.test(newValue)) {
      setInput(newValue);
    } else {
      alert("Use English alphabet characters only to ensure best performance!");
      const filteredValue = newValue.replace(/[^A-Z]/g, '');
      setInput(filteredValue);
    }
  };

  const handleEncrypt = async () => {
    if (/[^A-Z]*/.test(input)) {
      alert("Use English alphabet characters only to ensure best performance!");
      return;
    }
    try {
      const response = await axios.post('/api/process', {
        input,
        algorithm: selectedAlgorithm,
      });
      if (response.data.output) {
        setOutput(response.data.output);
      } else {
        throw new Error("No output received");
      }
    } catch (error) {
      console.error('Error processing data', error);
      if (error.response && error.response.status === 400) {
        setOutput("Please use alphabetic characters!");
      } else {
        setOutput("There's been an error! It's on our end. Don't worry, we'll fix it.");
      }
    }
  };

  const handleSelectAlgorithm = async (algorithm) => {
    try {
      const response = await axios.post('/api/selectAlgorithm', { algorithm });
      setSelectedAlgorithm(response.data.algorithm);
    } catch (error) {
      console.error('Error selecting algorithm', error);
    }
  };

  return (
    <div>
      <InputOutputDisplay
        input={input}
        output={output}
        onInputChange={handleInputChange}
        onOutputChange={(e) => setOutput(e.target.value)}
        onEncrypt={handleEncrypt}
      />
      <AlgorithmSelection
        selectedAlgorithm={selectedAlgorithm}
        onSelectAlgorithm={handleSelectAlgorithm}
      />
    </div>
  );
};

export default MainPage;

