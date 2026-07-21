import { useRef, useState, useCallback } from 'react';

/**
 * useMagnetic - Creates a magnetic pull effect where the element subtly follows the cursor.
 * 
 * @param {number} strength - The magnetic strength (default: 0.3)
 * @returns {{ ref, handleMouseMove, handleMouseLeave, magneticStyle }}
 */
export function useMagnetic(strength = 0.3) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    setPosition({ x: deltaX, y: deltaY });
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  const magneticStyle = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: position.x === 0 && position.y === 0
      ? 'transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)'
      : 'transform 0.15s ease-out'
  };

  return { ref, handleMouseMove, handleMouseLeave, magneticStyle };
}

export default useMagnetic;
