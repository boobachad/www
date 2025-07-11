import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw } from 'lucide-react';

interface LiveAgeCalculatorProps {
  defaultBirthDate?: Date;
}

const LiveAgeCalculator: React.FC<LiveAgeCalculatorProps> = ({ defaultBirthDate }) => {
  const [birthDateInput, setBirthDateInput] = useState<string>('');
  const [birthDate, setBirthDate] = useState<Date | null>(defaultBirthDate || null);
  const [liveAge, setLiveAge] = useState<string>('0.000000000');
  const [isDefaultDate, setIsDefaultDate] = useState<boolean>(!!defaultBirthDate);
  const timerRef = useRef<number | null>(null);

  // init
  useEffect(() => {
    if (defaultBirthDate) {
      const dateString = defaultBirthDate.toISOString().split('T')[0];
      setBirthDateInput(dateString || '');
      setBirthDate(defaultBirthDate);
      setIsDefaultDate(true);
    }
  }, [defaultBirthDate]);

  useEffect(() => {
    if (birthDate) {
      const birthTime = birthDate.getTime();

      const calculateLiveAge = () => {
        const now = new Date().getTime();
        const ageInMilliseconds = now - birthTime;

        if (ageInMilliseconds < 0) {
          setLiveAge('INVALID DATE');
          return;
        }

        const msPerYear = 365.2425 * 24 * 60 * 60 * 1000;
        const ageInYears = ageInMilliseconds / msPerYear;

        setLiveAge(ageInYears.toFixed(9));
      };

      timerRef.current = window.setInterval(calculateLiveAge, 50);
      calculateLiveAge();
    } else {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setLiveAge('0.000000000');
    }
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [birthDate]);

  const handleBirthDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBirthDateInput(value)

    if (value) {
      const parsedDate = new Date(value);
      if (!isNaN(parsedDate.getTime())) {
        setBirthDate(parsedDate);
        // If user enters a date, it's not the default date anymore
        setIsDefaultDate(false);
      } else {
        setBirthDate(null);
        setLiveAge('INVALID DATE');
      }
    } else {
      setBirthDate(null);
    }
  };

  const handleReset = () => {
    setBirthDateInput('');
    setBirthDate(null);
    setLiveAge('0.000000000');
    setIsDefaultDate(false);
  };

  return (
    <div className="bg-background text-foreground p-8 rounded-lg shadow-lg max-w-md mx-auto text-center border border-border font-mono relative">
      <h2 className="text-xl font-bold mb-6 tracking-tight">Live Age Calculator</h2>

      {birthDate && (
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring text-sm"
          aria-label="Reset birth date"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      )}

      {!birthDate ? (
        <div className="mb-6">
          <label htmlFor="birthDate" className="block text-sm font-medium text-muted-foreground mb-3">
            Enter your birth date:
          </label>
          <input
            type="date"
            id="birthDate"
            value={birthDateInput}
            onChange={handleBirthDateInputChange}
            className="w-full px-4 py-3 rounded-md bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring font-mono"
            aria-label="Enter your birth date"
          />
          {birthDateInput && !birthDate && liveAge === 'INVALID DATE' && (
            <p className="text-destructive text-sm mt-3">Invalid date entered.</p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-lg text-muted-foreground">{isDefaultDate ? "i'm" : "you are"}</p>
          <p className="text-5xl font-mono font-bold text-foreground">{liveAge}</p>
          <p className="text-lg text-muted-foreground">years old</p>
        </div>
      )}
    </div>
  );
};

export default LiveAgeCalculator;
