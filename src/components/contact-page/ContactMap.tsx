'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import RevealAnimation from '../animation/RevealAnimation';

const Map = dynamic(() => import('../shared/Map'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-background-2 dark:bg-background-8 animate-pulse">
      <p className="text-tagline-2 text-secondary/60 dark:text-accent/60">Loading map...</p>
    </div>
  ),
});

const GOOGLE_MAPS_URL =
  'https://www.google.com/maps?q=Cezonal+Solutions,+opposite+VN+Palace,+Venkatarayapuram,+Tanuku,+Sajjapuram,+Andhra+Pradesh+534122&ftid=0x3a37b7ac4526dff5:0x2a595c8af660ebcb';

const ContactMap = () => {
  return (
    <section className="md:pt-[80px] lg:pt-[100px] pb-[100px] md:pb-[150px] lg:pb-[200px]" aria-label="Location Map">
      <div className="main-container">
        <RevealAnimation>
          <div className="relative rounded-[24px] bg-white dark:bg-background-6 p-3 shadow-xl border border-stroke-3 dark:border-stroke-7">
            <div className="relative w-full h-[320px] overflow-hidden rounded-2xl lg:h-[500px]">
              <Map />
              {/* Floating Google Maps Link Badge */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto z-[1000] flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white/95 dark:bg-background-8/95 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-stroke-3 dark:border-stroke-7 max-w-lg">
                <div className="space-y-1">
                  <p className="text-tagline-2 font-semibold text-secondary dark:text-accent">
                    Cezonal Solutions Pvt Ltd
                  </p>
                  <p className="text-tagline-3 text-secondary/70 dark:text-accent/70 line-clamp-2">
                    Velpur Rd, opp. V MAX THEATRES, Venkatarayapuram, Tanuku, AP 534122
                  </p>
                </div>
                <Link
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-primary whitespace-nowrap self-stretch sm:self-auto text-center">
                  Open in Google Maps
                </Link>
              </div>
            </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default ContactMap;
