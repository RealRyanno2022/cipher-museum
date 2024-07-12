import React from 'react';

interface HistoryDropdownProps {
  title: string;
  history: { id: number; prompt: string; result: string }[];
  onDelete: (id: number) => void;
  onSelect: (id: number) => void;
}

const HistoryDropdown: React.FC<HistoryDropdownProps> = ({ title, history = [], onDelete, onSelect }) => {
  const loremIpsum = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
    dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
    proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing 
    elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
    dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim 
    id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore 
    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis 
    aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  `;

  return (
    <div className="my-4 lg:ml-8">
      <h2
        className="text-green-500 text-2xl font-bold mb-4"
        style={{ fontFamily: 'Orbitron, monospace' }}
      >
        {title}
      </h2>
      <p
        className="mt-1 block w-full py-2 px-3 border border-green-500 bg-black rounded-md shadow-sm text-green-500 font-bold mb-2 leading-loose"
        style={{ fontFamily: 'Orbitron, monospace', height: '400px', overflow: 'auto' }}
      >
        {loremIpsum}
      </p>
    </div>
  );
};

export default HistoryDropdown;

