import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion, useIsTouchDevice } from '../../hooks/useAnimations';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
}

export const MagneticButton = ({ children, className = '', href, onClick, target, rel }: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isTouch = useIsTouchDevice();
  const reducedMotion = usePrefersReducedMotion();

  const handleMouse = (e: React.MouseEvent) => {
    if (isTouch || reducedMotion) return;
    
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Slight pull toward mouse
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const Component = href ? motion.a : motion.button;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      <Component
        href={href as string}
        onClick={onClick}
        target={target}
        rel={rel}
        className={className}
      >
        {children}
      </Component>
    </motion.div>
  );
};
