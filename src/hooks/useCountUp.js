import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { COUNT_UP_MS } from '../lib/constants';

export function useCountUp(target, duration = COUNT_UP_MS) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? target : 0);
  const fromRef = useRef(0);

  useEffect(() => {
    if (reduce) {
      fromRef.current = target;
      setValue(target);
      return undefined;
    }
    const from = fromRef.current;
    const start = performance.now();
    let frame;
    const tick = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const next = from + (target - from) * eased;
      fromRef.current = next;
      setValue(next);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, reduce]);

  return value;
}
