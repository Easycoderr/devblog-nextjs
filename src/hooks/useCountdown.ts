import { useEffect, useState } from "react";

function useCountdown(initialTime: number = 60): {
  timeLeft: number;
  startTimer: () => void;
} {
  const [timeLeft, setTimeLeft] = useState(0);
  const startTimer = () => {
    setTimeLeft(initialTime);
  };

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((time) => {
        return time - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);
  return { timeLeft, startTimer };
}

export default useCountdown;
