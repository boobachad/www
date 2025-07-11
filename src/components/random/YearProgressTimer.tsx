import React, { useState, useEffect } from 'react';

const YearProgressTimer: React.FC = () => {
  const [today, setToday] = useState<string>('');
  const [daysLeft, setDaysLeft] = useState<number>(0);
  const [yearProgress, setYearProgress] = useState<string>('0.000000000');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
      };
      setToday(now.toLocaleString(undefined, options));

      const currentYear = now.getFullYear();
      const startOfYear = new Date(currentYear, 0, 1);
      const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59, 999); 
      const totalDaysInYear = (endOfYear.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24) + 1; 

      const daysPassed = (now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24);

      setDaysLeft(Math.ceil(totalDaysInYear - daysPassed));

      const progress = (daysPassed / totalDaysInYear) * 100;
      setYearProgress(progress.toFixed(9));
    };

    const timer = setInterval(updateTimer, 50);

    updateTimer();

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-900 text-green-400 p-8 rounded-md shadow-md max-w-md mx-auto text-center border-4 border-green-500 font-mono">
      <h2 className="text-xl font-bold mb-4 tracking-tighter uppercase text-yellow-400">YEAR PROGRESS</h2>

      <div className="mb-6">
        <p className="text-sm text-gray-300 mb-2">{today}</p>
        <p className="text-lg font-semibold">DAYS LEFT: <span className="font-mono text-yellow-400">{daysLeft}</span></p>
      </div>

      <div className="text-4xl font-mono font-bold text-yellow-400 drop-shadow-lg">
         {yearProgress}%
      </div>

       <div className="w-full bg-gray-700 rounded-xs h-4 mt-6 border-2 border-green-500 overflow-hidden">
           <div
               className="bg-green-500 h-full transition-all duration-1000 ease-linear"
               style={{ width: `${parseFloat(yearProgress)}%` }}
           ></div>
       </div>
    </div>
  );
};

export default YearProgressTimer;
