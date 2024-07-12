import React from 'react';

interface HistoryDropdownProps {
  history: { id: number, prompt: string, result: string }[];
  onDelete: (id: number) => void;
  onSelect: (id: number) => void;
}

const HistoryDropdown: React.FC<HistoryDropdownProps> = ({ history, onDelete, onSelect }) => {
  return (
    <div className="my-4">
      <label htmlFor="history" className="block text-sm font-medium text-gray-700">History</label>
      <select
        id="history"
        name="history"
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onChange={(e) => onSelect(parseInt(e.target.value))}
      >
        <option value="">Select a History Entry</option>
        {history.map(item => (
          <option key={item.id} value={item.id}>
            {item.prompt} - {item.result}
          </option>
        ))}
      </select>
      <button
        onClick={() => onDelete(history.length > 0 ? history[history.length - 1].id : 0)}
        className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Delete Last Entry
      </button>
    </div>
  );
};

export default HistoryDropdown;

