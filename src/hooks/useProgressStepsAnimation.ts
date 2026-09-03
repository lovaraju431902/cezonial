'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseProgressStepsAnimationOptions {
  delay?: number;
  duration?: number;
  delayBetweenSteps?: number;
  ease?: string;
  triggerOnScroll?: boolean;
  scrollTriggerOptions?: {
    start?: string;
    end?: string;
    toggleActions?: string;
  };
}

export const useProgressStepsAnimation = (options: UseProgressStepsAnimationOptions = {}) => {
  const {
    delay = 0,
    duration = 2,
    delayBetweenSteps = 2,
    ease = 'power2.inOut',
    triggerOnScroll = true,
    scrollTriggerOptions = {
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none none',
    },
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) {
        return;
      }

      const progressLines = container.querySelectorAll('.progress-line');
      if (!progressLines || progressLines.length === 0) {
        return;
      }

      if (hasAnimatedRef.current) {
        gsap.set(progressLines, { width: '100%' });
        return;
      }

      // Set initial state
      gsap.set(progressLines, { width: '0%' });

      if (triggerOnScroll) {
        // Create timeline for sequential animation with scroll trigger
        const progressTimeline = gsap.timeline({
          delay,
          scrollTrigger: {
            trigger: container,
            start: scrollTriggerOptions.start || 'top 80%',
            end: scrollTriggerOptions.end || 'bottom 20%',
            once: true,
            toggleActions: 'play none none none',
            invalidateOnRefresh: true,
          },
          onComplete: () => {
            hasAnimatedRef.current = true;
          },
        });

        // Animate each progress line sequentially
        progressLines.forEach((line, index) => {
          progressTimeline.to(
            line,
            {
              width: '100%',
              duration,
              ease,
            },
            index * delayBetweenSteps,
          );
        });
      } else {
        // Animate immediately without scroll trigger
        const progressTimeline = gsap.timeline({
          delay,
          onComplete: () => {
            hasAnimatedRef.current = true;
          },
        });

        progressLines.forEach((line, index) => {
          progressTimeline.to(
            line,
            {
              width: '100%',
              duration,
              ease,
            },
            index * delayBetweenSteps,
          );
        });
      }
    },
    {
      scope: containerRef,
      dependencies: [delay, duration, delayBetweenSteps, ease, triggerOnScroll],
    },
  );

  return { ref: containerRef };
};
