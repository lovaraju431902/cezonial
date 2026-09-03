'use client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis, useLenis } from 'lenis/react';
import { usePathname, useSearchParams } from 'next/navigation';
import { ReactNode, useEffect, useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollingProps {
  children: ReactNode;
}

const SmoothScrollProvider = ({ children }: Readonly<SmoothScrollingProps>) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousPathnameRef = useRef<string>(pathname);
  const isInitialRender = useRef(true);

  const lenis = useLenis();

  useEffect(() => {
    // Only scroll to top if pathname actually changed (navigation), not on initial render or reload
    if (!isInitialRender.current && previousPathnameRef.current !== pathname) {
      lenis?.scrollTo(0, { immediate: true });
    }

    // Update refs
    previousPathnameRef.current = pathname;
    isInitialRender.current = false;
  }, [pathname, searchParams, lenis]);

  useEffect(() => {
    if (!lenis) {
      return;
    }

    // Connect Lenis scroll events to GSAP ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on('scroll', handleScroll);

    // Refresh ScrollTrigger so all section triggers have accurate positions
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    const handleClick = (ele: Element) => {
      lenis.scrollTo(ele.getAttribute('href') ?? '', {
        offset: -100,
      });
    };

    const elements = document.querySelectorAll('.lenis-scroll-to');
    const clickHandler = (e: Event) => handleClick(e.target as Element);

    elements.forEach((ele) => {
      ele.addEventListener('click', clickHandler);
    });

    return () => {
      lenis.off('scroll', handleScroll);
      clearTimeout(timeout);
      elements.forEach((ele) => {
        ele.removeEventListener('click', clickHandler);
      });
    };
  }, [lenis, pathname]);

  return (
    <ReactLenis root options={{ duration: 1.1 }}>
      {children}
    </ReactLenis>
  );
};

export default SmoothScrollProvider;

