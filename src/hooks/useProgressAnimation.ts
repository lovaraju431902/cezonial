'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useState } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseProgressAnimationOptions {
  duration?: number;
  delay?: number;
  ease?: string;
  triggerOnScroll?: boolean;
}

export const useProgressAnimation = (targetValue: number, options: UseProgressAnimationOptions = {}) => {
  const { duration = 2, delay = 0, ease = 'power2.out', triggerOnScroll = true } = options;

  const [value, setValue] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  const hasAnimatedRef = useRef(false);

  useGSAP(
    () => {
      const element = elementRef.current;
      if (!element) {
        return;
      }

      if (hasAnimatedRef.current) {
        setValue(targetValue);
        return;
      }

      const counter = { val: 0 };

      if (triggerOnScroll) {
        // Animate on scroll trigger
        gsap.to(counter, {
          val: targetValue,
          duration,
          delay,
          ease,
          scrollTrigger: {
            trigger: element,
            start: 'top 90%',
            end: 'bottom 10%',
            once: true,
            toggleActions: 'play none none none',
            invalidateOnRefresh: true,
          },
          onUpdate: () => {
            setValue(Math.floor(counter.val));
          },
          onComplete: () => {
            setValue(targetValue);
            hasAnimatedRef.current = true;
          },
        });
      } else {
        // Animate immediately
        gsap.to(counter, {
          val: targetValue,
          duration,
          delay,
          ease,
          onUpdate: () => {
            setValue(Math.floor(counter.val));
          },
          onComplete: () => {
            setValue(targetValue);
            hasAnimatedRef.current = true;
          },
        });
      }
    },
    {
      scope: elementRef,
      dependencies: [targetValue, duration, delay, ease, triggerOnScroll],
    },
  );

  return { value, ref: elementRef };
};
