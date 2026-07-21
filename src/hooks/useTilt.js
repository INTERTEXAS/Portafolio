import { useRef, useState, useCallback } from 'react';

/**
 * useTilt - Creates a 3D perspective tilt effect on a card/element based on cursor position.
 * 
 * @param {object} options
 * @param {number} options.maxTilt - Maximum tilt angle in degrees (default: 8)
 * @param {number} options.scale - Scale on hover (default: 1.02)
 * @param {number} options.perspective - CSS perspective value in px (default: 1000)
 * @returns {{ ref, tiltStyle, handleMouseMove, handleMouseLeave, handleMouseEnter }}
 */
export function useTilt({ maxTilt = 8, scale = 1.02, perspective = 1000 } = {}) {
  const ref = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTiltStyle({
      transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: 'transform 0.15s ease-out',
    });
  }, [maxTilt, scale, perspective]);

  const handleMouseLeave = useCallback(() => {
    setTiltStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)',
    });
  }, [perspective]);

  const handleMouseEnter = useCallback(() => {
    // Intentionally blank — smooth entry handled by handleMouseMove
  }, []);

  return { ref, tiltStyle, handleMouseMove, handleMouseLeave, handleMouseEnter };
}

export default useTilt;
