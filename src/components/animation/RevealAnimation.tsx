'use client';
import { cn } from '@/utils/cn';
import Springer from '@/utils/springer';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { ReactElement, Ref, cloneElement, useRef } from 'react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealAnimationProps {
  children: ReactElement<{
    className?: string;
    ref?: Ref<HTMLElement>;
    'data-ns-animate'?: boolean;
    suppressHydrationWarning?: boolean;
  }>;
  duration?: number;
  delay?: number;
  offset?: number;
  instant?: boolean;
  start?: string;
  end?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  useSpring?: boolean;
  rotation?: number;
  animationType?: 'from' | 'to';
  className?: string;
}

const RevealAnimation = ({
  children,
  duration = 0.6,
  delay = 0,
  offset = 60,
  instant = false,
  start = 'top 90%',
  end = 'top 50%',
  direction = 'down',
  useSpring = false,
  rotation = 0,
  animationType = 'from',
  className = '',
}: RevealAnimationProps) => {
  const elementRef = useRef<HTMLElement>(null);
  const hasAnimatedRef = useRef<boolean>(false);

  useGSAP(
    () => {
      const element = elementRef.current;
      if (!element) {
        return;
      }

      // If already animated, ensure it stays visible
      if (hasAnimatedRef.current) {
        gsap.set(element, { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', clearProps: 'transform,filter,opacity' });
        return;
      }

      // Calculate spring or standard easing
      const ease = useSpring ? Springer.default(0.2, 0.8) : 'power2.out';

      // Check if element is already within viewport on initial render
      const rect = element.getBoundingClientRect();
      const isAlreadyInViewport = rect.top < (window.innerHeight || 800) && rect.bottom > 0;
      const shouldAnimateInstantly = instant || isAlreadyInViewport;

      // Determine initial offset values based on direction
      let fromX = 0;
      let fromY = 0;

      switch (direction) {
        case 'left':
          fromX = -offset;
          break;
        case 'right':
          fromX = offset;
          break;
        case 'down':
          fromY = offset;
          break;
        case 'up':
        default:
          fromY = -offset;
          break;
      }

      const fromVars: gsap.TweenVars = {
        opacity: 0,
        x: fromX,
        y: fromY,
        filter: 'blur(6px)',
      };

      if (rotation !== 0) {
        fromVars.rotation = rotation;
      }

      const toVars: gsap.TweenVars = {
        opacity: 1,
        x: 0,
        y: 0,
        filter: 'blur(0px)',
        duration,
        delay,
        ease,
        clearProps: 'transform,filter,opacity',
        onComplete: () => {
          hasAnimatedRef.current = true;
        },
      };

      if (rotation !== 0) {
        toVars.rotation = 0;
      }

      if (!shouldAnimateInstantly) {
        toVars.scrollTrigger = {
          trigger: element,
          start: start || 'top 90%',
          end: end || 'top 50%',
          once: true,
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
        };
      }

      gsap.fromTo(element, fromVars, toVars);
    },
    {
      scope: elementRef,
      dependencies: [duration, delay, offset, instant, start, end, direction, useSpring, rotation, animationType],
    },
  );

  // Fallback return if children is not valid React element
  if (!children || !React.isValidElement(children)) {
    return <>{children}</>;
  }

  // Clone the child element and add the ref, className, and suppressHydrationWarning
  return cloneElement(children, {
    ref: elementRef,
    className: cn(children?.props?.className, className),
    suppressHydrationWarning: true,
  });
};

export default RevealAnimation;



