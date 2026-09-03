'use client';

import { cn } from '@/utils/cn';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { createContext, useContext, useRef, useState } from 'react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Accordion Context Types
export interface AccordionContextType {
  activeItem: string | null;
  setActiveItem: (item: string | null) => void;
  allowMultiple: boolean;
  disabled: boolean;
}

export interface AccordionProps {
  children: React.ReactNode;
  className?: string;
  defaultValue?: string;
  allowMultiple?: boolean;
  disabled?: boolean;
  enableScrollAnimation?: boolean;
  animationDelay?: number;
}

// Create Accordion Context
const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

// Hook to use Accordion Context
export const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (context === undefined) {
    throw new Error('useAccordion must be used within an Accordion component');
  }
  return context;
};

const Accordion: React.FC<AccordionProps> = ({
  children,
  className,
  defaultValue,
  allowMultiple = false,
  disabled = false,
  enableScrollAnimation = true,
  animationDelay = 0.1,
}) => {
  const [activeItem, setActiveItem] = useState<string | null>(defaultValue || null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef<boolean>(false);

  // Initialize scroll animations for accordion items
  useGSAP(() => {
    if (!enableScrollAnimation || !accordionRef.current) {
      return;
    }

    if (hasAnimatedRef.current) {
      return;
    }

    const items = accordionRef.current.querySelectorAll('.accordion-item');

    items.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const isAlreadyInViewport = rect.top < (window.innerHeight || 800) && rect.bottom > 0;

      const fromVars: gsap.TweenVars = {
        opacity: 0,
        y: 30,
        filter: 'blur(6px)',
      };

      const toVars: gsap.TweenVars = {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.5,
        delay: index * animationDelay,
        ease: 'power2.out',
        clearProps: 'filter,transform,opacity',
        onComplete: () => {
          if (index === items.length - 1) {
            hasAnimatedRef.current = true;
          }
        },
      };

      if (!isAlreadyInViewport) {
        toVars.scrollTrigger = {
          trigger: item,
          start: 'top 90%',
          end: 'top 50%',
          scrub: false,
          once: true,
          invalidateOnRefresh: true,
        };
      }

      gsap.fromTo(item, fromVars, toVars);
    });
  }, [enableScrollAnimation, animationDelay]);

  const handleItemToggle = (itemValue: string | null) => {
    if (disabled) {
      return;
    }

    if (allowMultiple) {
      // For multiple mode, we'd need a different state structure
      // This implementation focuses on single accordion mode
      setActiveItem(activeItem === itemValue ? null : itemValue);
    } else {
      setActiveItem(activeItem === itemValue ? null : itemValue);
    }
  };

  return (
    <AccordionContext.Provider
      value={{
        activeItem,
        setActiveItem: handleItemToggle,
        allowMultiple,
        disabled,
      }}>
      <div ref={accordionRef} className={cn(className)} role="region" aria-label="Accordion">
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

Accordion.displayName = 'Accordion';

export default Accordion;
