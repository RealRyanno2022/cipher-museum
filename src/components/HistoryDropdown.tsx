import React from 'react';

interface HistoryItem {
  id: number;
  prompt: string;
  result: string;
}

interface HistoryDropdownProps {
  title: string;
  history: HistoryItem[];
  onDelete: (id: number) => void;
  onSelect: (id: number) => void;
}

const HistoryDropdown: React.FC<HistoryDropdownProps> = ({ title, history = [], onDelete, onSelect }) => {
  const loremIpsum = 'Cipher Museum App. Choose an algorithm above and type in some input to see what it would look like when you run the cipher on it! Explore the history of various important cipher algorithms here.';

  return (
    <div className="my-4 w-3/2 px-16">
      <h2 className="text-green-500 text-2xl font-bold mb-4" style={{ fontFamily: 'Orbitron, monospace' }}>
        {title}
      </h2>
      <p className="mt-1 block w-full py-2 px-3 border border-green-500 bg-black rounded-md shadow-sm text-green-500 font-bold mb-2 leading-loose" style={{ fontFamily: 'Orbitron, monospace', height: '400px', overflow: 'auto' }}>
        {loremIpsum}
      </p>
    </div>
  );
};

export default HistoryDropdown;

