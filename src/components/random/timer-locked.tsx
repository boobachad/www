import { useState, useEffect } from 'react';

interface TimerProps {
  duration: number;
  onComplete: () => void;
}

const Timer: React.FC<TimerProps> = ({ duration, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        const newTime = prevTime - 1;

        const newProgress = (newTime / duration) * 100;
        setProgress(newProgress);

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, duration, onComplete]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <div className="text-center mb-2 text-lg font-medium text-red-600">
        Account locked for: {formattedTime}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className="bg-red-500 h-full transition-all duration-1000 ease-linear rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Timer;