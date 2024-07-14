import React, { useEffect, useState } from 'react';
import '../hooks/useLodashState';

interface InputOutputDisplayProps {
  input: string;
  output: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onOutputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const initialState = {
  input: '',
  output: '',
  previousLength: 0
};

const InputOutputDisplay: React.FC<InputOutputDisplayProps> = ({
  input,
  output,
  onInputChange,
  onOutputChange,
}) => {
  const [backspaceCount, setBackspaceCount] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Backspace') {
        setBackspaceCount((prevCount) => prevCount + 1);
      } else {
        setBackspaceCount(0); // Reset the count if any other key is pressed
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (event.nativeEvent.inputType === 'deleteContentBackward') {
      setBackspaceCount(backspaceCount + 1);
    }
    onInputChange({ ...event, target: { ...event.target, value: newValue } });
  };

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <label htmlFor="input" className="block text-green-500 text-sm font-bold mb-2">Input</label>
        <input
          type="text"
          id="input"
          value={input}
          onChange={handleInputChange}
          className="appearance-none border rounded w-full py-2 px-3 text-green-500 font-bold leading-tight focus:shadow-outline focus:outline-none"
          style={{ fontFamily: 'monospace' }}
        />
      </div>
      <div>
        <label htmlFor="output" className="block text-green-500 text-sm font-bold mb-2">Output</label>
        <input
          type="text"
          id="output"
          value={output}
          onChange={onOutputChange}
          className="appearance-none border rounded w-full py-2 px-3 text-green-500 font-bold leading-tight focus:shadow-outline focus:outline-none"
          style={{ fontFamily: 'monospace' }}
        />
      </div>
    </div>
  );
};

export default InputOutputDisplay;


