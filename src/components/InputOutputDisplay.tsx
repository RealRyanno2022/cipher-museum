import React, { useEffect, useRef } from 'react';
import useLodashState from '../hooks/useLodashState';

interface InputOutputDisplayProps {
  input: string;
  output: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const initialState = {
  input: '',
  output: ''
};

const InputOutputDisplay: React.FC<InputOutputDisplayProps> = ({ input, output, onInputChange, className }) => {
  const lodashStateRef = useRef(new useLodashState(initialState));
  const lodashState = lodashStateRef.current;

  const scramblerRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    lodashState.setState('output', output);
  }, [output]);

  useEffect(() => {
    return () => {
      if (scramblerRef.current) clearTimeout(scramblerRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const startScrambling = () => {
    const dummyChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:",.<>?/';
    const prevOutput = lodashState.getState().output;
    let prev = prevOutput || '';
    const length = prev.length;
    let i = 0;

    const scramble = () => {
      if (i < length) {
        const randomChar = dummyChars[Math.floor(Math.random() * dummyChars.length)];
        const next = prev.slice(0, i) + randomChar + prev.slice(i + 1);
        lodashState.setState('output', next);
        i++;
        animationFrameRef.current = requestAnimationFrame(scramble);
      } else {
        lodashState.setState('output', output);
      }
    };

    scramble();
  };

  const stopScrambling = () => {
    if (scramblerRef.current) clearTimeout(scramblerRef.current);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    lodashState.setState('output', output);
  };

  return (
    <div className={`my-4 bg-black ${className}`}>
      <div>
        <label className="block text-green-500 text-sm font-bold mb-2">Input</label>
        <input
          id="input"
          type="text"
          value={input}
          onChange={onInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-green-500 font-bold leading-tight focus:shadow-outline focus:outline-none"
          style={{ fontFamily: 'Orbitron, monospace' }}
        />
      </div>
      <div>
        <label className="block text-green-500 text-sm font-bold mb-2 mt-4">Output</label>
        <input
          id="output"
          type="text"
          value={lodashState.getState().output}
          readOnly
          className="shadow appearance-none border rounded w-full py-2 px-3 text-green-500 font-bold leading-tight focus:shadow-outline focus:outline-none"
          style={{ fontFamily: 'monospace' }}
        />
      </div>
    </div>
  );
};

export default InputOutputDisplay;

