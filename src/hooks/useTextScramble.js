import { useState, useEffect, useCallback } from 'react';

const CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/**
 * useTextScramble - Decodes text character by character with random intermediate characters.
 * Creates a "hacker decoding" visual effect.
 * 
 * @param {string} targetText - The final text to reveal
 * @param {object} options - Configuration options
 * @param {number} options.speed - Ms per character reveal (default: 30)
 * @param {number} options.scrambleDuration - Ms of scrambling before settling (default: 60)
 * @param {boolean} options.trigger - When true, starts the animation
 * @returns {{ displayText: string, isComplete: boolean, restart: () => void }}
 */
export function useTextScramble(targetText, { speed = 30, scrambleDuration = 60, trigger = true } = {}) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [iteration, setIteration] = useState(0);

  const restart = useCallback(() => {
    setDisplayText('');
    setIsComplete(false);
    setIteration(0);
  }, []);

  useEffect(() => {
    if (!trigger || !targetText) return;

    setIsComplete(false);

    let currentIndex = 0;
    let scrambleCount = 0;

    const interval = setInterval(() => {
      if (currentIndex > targetText.length) {
        setIsComplete(true);
        clearInterval(interval);
        return;
      }

      const revealed = targetText.slice(0, currentIndex);
      const remaining = targetText.slice(currentIndex);
      const scrambled = remaining
        .split('')
        .map((char) => (char === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]))
        .join('');

      setDisplayText(revealed + scrambled);

      scrambleCount++;
      if (scrambleCount >= Math.ceil(scrambleDuration / speed)) {
        currentIndex++;
        scrambleCount = 0;
      }

      setIteration(prev => prev + 1);
    }, speed);

    return () => clearInterval(interval);
  }, [targetText, speed, scrambleDuration, trigger]);

  return { displayText: displayText || targetText, isComplete, restart };
}

export default useTextScramble;
