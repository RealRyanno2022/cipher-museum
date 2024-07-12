import React from 'react';

interface InputOutputDisplayProps {
  input: string;
  output: string;
}

const InputOutputDisplay: React.FC<InputOutputDisplayProps> = ({ input, output }) => {
  return (
    <div className="my-4">
      <div className="mb-2">
        <label htmlFor="input" className="block text-sm font-medium text-gray-700">Input</label>
        <textarea id="input" name="input" rows={4} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={input} readOnly></textarea>
      </div>
      <div>
        <label htmlFor="output" className="block text-sm font-medium text-gray-700">Output</label>
        <textarea id="output" name="output" rows={4} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={output} readOnly></textarea>
      </div>
    </div>
  );
};

export default InputOutputDisplay;

