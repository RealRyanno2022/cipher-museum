import React, { useState, useEffect, useRef } from 'react';

interface InputOutputDisplayProps {
  input: string;
  output: string;
  onInputChange: (input: string) => void;
  className?: string;
}

const InputOutputDisplay: React.FC<InputOutputDisplayProps> = ({ input, output, onInputChange, className }) => {
  const [scrambledOutput, setScrambledOutput] = useState(output);
  const outputRef = useRef(output);
  const scramblingRef = useRef(false);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    outputRef.current = output;
    scramblingRef.current = true;

    const dummyChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=<>?';

    const scramble = () => {
      if (scramblingRef.current) {
        const randomChar = dummyChars[Math.floor(Math.random() * dummyChars.length)];
        setScrambledOutput((prev) => prev.slice(0, -1) + randomChar);
        animationFrameIdRef.current = requestAnimationFrame(scramble);
      }
    };

    const startScrambling = () => {
      if (scramblingRef.current) {
        setScrambledOutput((prev) => prev.slice(0, -1) + dummyChars[Math.floor(Math.random() * dummyChars.length)]);
        animationFrameIdRef.current = requestAnimationFrame(scramble);
      }
    };

    const timeout = setTimeout(() => {
      scramblingRef.current = false;
      cancelAnimationFrame(animationFrameIdRef.current!);
      setScrambledOutput(outputRef.current);
    }, 200);

    startScrambling();

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrameIdRef.current!);
    };
  }, [output]);

  return (
    <div className="my-4 bg-black">
      <div>
        <label 
          className="block text-green-500 text-sm font-bold mb-2" 
          htmlFor="input" 
          style={{ fontFamily: 'Orbitron, monospace' }}
        >
          Input
        </label>
        <input
          id="input"
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-green-500 font-bold leading-tight focus:outline-none focus:shadow-outline ${className}`}
          style={{ fontFamily: 'monospace' }}
        />
        <label 
          className="block text-green-500 text-sm font-bold mb-2 mt-4" 
          htmlFor="output" 
          style={{ fontFamily: 'Orbitron, monospace' }}
        >
          Output
        </label>
        <input
          id="output"
          type="text"
          value={scrambledOutput}
          readOnly
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-green-500 font-bold leading-tight focus:outline-none focus:shadow-outline ${className}`}
          style={{ fontFamily: 'monospace' }}
        />
      </div>
    </div>
  );
};

export default InputOutputDisplay;
