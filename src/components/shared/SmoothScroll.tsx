'use client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis, useLenis } from 'lenis/react';
import { usePathname, useSearchParams } from 'next/navigation';
import { ReactNode, useEffect, useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  gsap.ticker.lagSmoothing(0);
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

  // Scroll to top on route change
  useEffect(() => {
    if (!isInitialRender.current && previousPathnameRef.current !== pathname) {
      lenis?.scrollTo(0, { immediate: true });
    }
    previousPathnameRef.current = pathname;
    isInitialRender.current = false;
  }, [pathname, searchParams, lenis]);

  // Synchronize Lenis with GSAP Ticker & ScrollTrigger
  useEffect(() => {
    if (!lenis) {
      return;
    }

    // Connect Lenis scroll events to GSAP ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on('scroll', handleScroll);

    // Sync GSAP's RAF ticker with Lenis
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerUpdate);

    // Refresh ScrollTrigger when DOM/layout, fonts, and images are ready
    const refreshScrollTrigger = () => {
      ScrollTrigger.refresh();
    };

    // Immediate and delayed refreshes for initial mount and route transition
    const rAF = requestAnimationFrame(() => {
      refreshScrollTrigger();
    });

    const timeout1 = setTimeout(refreshScrollTrigger, 150);
    const timeout2 = setTimeout(refreshScrollTrigger, 500);

    // Refresh once fonts are loaded
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(refreshScrollTrigger).catch(() => {});
    }

    // Refresh on window resize
    window.addEventListener('resize', refreshScrollTrigger, { passive: true });

    // Handle .lenis-scroll-to anchor clicks
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
      cancelAnimationFrame(rAF);
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      lenis.off('scroll', handleScroll);
      gsap.ticker.remove(tickerUpdate);
      window.removeEventListener('resize', refreshScrollTrigger);
      elements.forEach((ele) => {
        ele.removeEventListener('click', clickHandler);
      });
    };
  }, [lenis, pathname]);

  return (
    <ReactLenis root autoRaf={false} options={{ duration: 1.1, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
};

export default SmoothScrollProvider;


