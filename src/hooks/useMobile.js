import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMobileState } from '../store/uiSlice';

export function useMobile() {
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);
  const [orientation, setOrientation] = useState('portrait');

  useEffect(() => {
    const checkMobile = () => {
      const mobile = 'ontouchstart' in window || window.innerWidth <= 768;
      const orient = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
      
      setIsMobile(mobile);
      setOrientation(orient);
      
      dispatch(setMobileState({ isMobile: mobile, orientation: orient }));
    };

    checkMobile();
    
    const handleResize = () => checkMobile();
    const handleOrientationChange = () => {
      setTimeout(checkMobile, 100); // 延迟检测，等待orientation change完成
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [dispatch]);

  return { isMobile, orientation };
}

// 长按检测Hook
export function useLongPress(onLongPress, delay = 500) {
  const [isPressed, setIsPressed] = useState(false);

  const start = () => {
    setIsPressed(true);
  };

  const stop = () => {
    setIsPressed(false);
  };

  const longPressEvents = {
    onMouseDown: () => {
      const timeout = setTimeout(() => {
        onLongPress();
      }, delay);
      
      const cleanup = () => {
        clearTimeout(timeout);
        document.removeEventListener('mouseup', cleanup);
      };
      
      document.addEventListener('mouseup', cleanup);
      start();
    },
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: () => {
      const timeout = setTimeout(() => {
        onLongPress();
      }, delay);
      
      const cleanup = () => {
        clearTimeout(timeout);
        document.removeEventListener('touchend', cleanup);
        document.removeEventListener('touchcancel', cleanup);
      };
      
      document.addEventListener('touchend', cleanup);
      document.addEventListener('touchcancel', cleanup);
      start();
    },
    onTouchEnd: stop,
  };

  return longPressEvents;
}