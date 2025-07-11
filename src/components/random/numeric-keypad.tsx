import React from 'react';

interface NumericKeypadProps {
  onKeyPress: (key: string) => void;
}

const NumericKeypad: React.FC<NumericKeypadProps> = ({ onKeyPress }) => {
  const keys = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    'clear', '0', 'enter'
  ];

  return (
    <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
      {keys.map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => onKeyPress(key)}
          className={`
            py-3 px-4 rounded-lg text-center font-medium transition-all duration-150 focus:outline-hidden
            ${key === 'clear' || key === 'enter'
              ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              : 'bg-blue-100 hover:bg-blue-200 text-blue-800'} 
            transform hover:scale-105 active:scale-95 
          `}
        >
          {key === 'clear' ? 'Clear' : key === 'enter' ? 'Enter' : key}
        </button>
      ))}
    </div>
  );
};

export default NumericKeypad;
