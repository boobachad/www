import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw } from 'lucide-react';
import { PinInput } from '@/components/base/pin-input';

interface LiveAgeCalculatorProps {
  defaultBirthDate?: Date;
}

const LiveAgeCalculator: React.FC<LiveAgeCalculatorProps> = ({ defaultBirthDate }) => {
  const [birthDateInput, setBirthDateInput] = useState<string>('');
  const [birthDate, setBirthDate] = useState<Date | null>(defaultBirthDate || null);
  const [liveAge, setLiveAge] = useState<string>('0.000000000');
  const [isDefaultDate, setIsDefaultDate] = useState<boolean>(!!defaultBirthDate);
  const [showPinInput, setShowPinInput] = useState<boolean>(false);
  const [pinError, setPinError] = useState<string>('');
  const timerRef = useRef<number | null>(null);
  const pinInputRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    if (showPinInput && pinInputRef.current) {
      // Focus the first input inside the pin input group
      const firstInput = pinInputRef.current.querySelector('input');
      if (firstInput) (firstInput as HTMLInputElement).focus();
    }
  }, [showPinInput]);

  const handleBirthDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBirthDateInput(value)

    if (value) {
      const parsedDate = new Date(value);
      if (!isNaN(parsedDate.getTime())) {
        setBirthDate(parsedDate);
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
    setShowPinInput(true);
    setPinError('');
  };

  const handlePinComplete = (value: string) => {
    if (value.length !== 8) {
      setPinError('Please enter 8 digits (DDMMYYYY).');
      return;
    }
    const day = parseInt(value.slice(0, 2), 10);
    const month = parseInt(value.slice(2, 4), 10) - 1; // JS months are 0-based
    const year = parseInt(value.slice(4, 8), 10);
    const parsedDate = new Date(year, month, day);
    if (
      isNaN(parsedDate.getTime()) ||
      parsedDate.getDate() !== day ||
      parsedDate.getMonth() !== month ||
      parsedDate.getFullYear() !== year
    ) {
      setPinError('Haan Kya hai ye?');
      setLiveAge('INVALID DATE');
      return;
    }
    setBirthDate(parsedDate);
    setShowPinInput(false);
    setIsDefaultDate(false);
    setPinError('');
  };

  return (
    <div className="bg-[#111] text-foreground p-8 rounded-2xl shadow-2xl max-w-xl w-full mx-auto text-center border font-mono relative flex flex-col items-center transition-all duration-300">
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

      {showPinInput ? (
        <div className="mb-6 flex flex-col items-center">
          <label className="block text-sm font-medium text-muted-foreground mb-3">
            Enter your birth date (DDMMYYYY):
          </label>
          <div className="w-full flex justify-center" ref={pinInputRef}>
            <PinInput digits={8} size="sm">
              <PinInput.Group onComplete={handlePinComplete}>
                <PinInput.Slot index={0} />
                <PinInput.Slot index={1} />
                <PinInput.Separator />
                <PinInput.Slot index={2} />
                <PinInput.Slot index={3} />
                <PinInput.Separator />
                <PinInput.Slot index={4} />
                <PinInput.Slot index={5} />
                <PinInput.Slot index={6} />
                <PinInput.Slot index={7} />
              </PinInput.Group>
            </PinInput>
          </div>
          {pinError && <p className="text-destructive text-sm mt-3">{pinError}</p>}
        </div>
      ) : !birthDate ? (
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
            <p className="text-destructive text-sm mt-3">Haan Kya hai ye?</p>
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
