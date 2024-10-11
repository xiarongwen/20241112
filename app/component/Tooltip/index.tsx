// src/components/Tooltip.tsx  
import React, { useState, useEffect, useRef } from 'react';  
import './index.scss';  
  
interface TooltipProps {  
  text: string;  
  children: React.ReactNode;  
  position?: 'top' | 'bottom' | 'left' | 'right';  
}  
  
const Tooltip: React.FC<TooltipProps> = ({ text, children, position = 'top' }) => {  
  const [visible, setVisible] = useState(false);  
  const timerRef = useRef<number | any>(null);  
  
  const handleMouseEnter = () => {  
    setVisible(true);  
  };  
  
  const handleMouseLeave = () => {  
    if (timerRef.current) {  
      clearTimeout(timerRef.current);  
    }  
    timerRef.current = setTimeout(() => {  
      setVisible(false);  
    }, 100);  
  };  
  
  useEffect(() => {  
    return () => {  
      if (timerRef.current) {  
        clearTimeout(timerRef.current);  
      }  
    };  
  }, []);  
  
  return (  
    <div  
      onMouseEnter={handleMouseEnter}  
      onMouseLeave={handleMouseLeave}  
      className="tooltip-container"  
    >  
      {children}  
      {visible && (  
        <div  
          className={`${visible ? "show-tooltip" : ''} tooltip tooltip-${position}`}  
        >  
          {text}  
        </div>  
      )}  
    </div>  
  );  
};  
  
export default Tooltip;