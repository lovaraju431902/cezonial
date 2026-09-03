'use client';

import bookmyshow from '@public/images/integrations/bookmyshow.svg';
import instamart from '@public/images/integrations/instamart.png';
import rapido from '@public/images/integrations/rapido.png';
import swiggy from '@public/images/integrations/swiggy.png';
import zepto from '@public/images/integrations/zepto.png';
import zomato from '@public/images/integrations/zomato.svg';
import gradient4 from '@public/images/ns-img-496.png';
import Image from 'next/image';
import Link from 'next/link';
import RevealAnimation from '../animation/RevealAnimation';

const integrations = [
  {
    name: 'Swiggy',
    description: 'Food & Quick Commerce',
    icon: swiggy,
  },
  {
    name: 'Zepto',
    description: '10-Min Grocery Delivery',
    icon: zepto,
  },
  {
    name: 'Rapido',
    description: 'Bike Taxi & Auto Booking',
    icon: rapido,
  },
  {
    name: 'Instamart',
    description: 'Instant Delivery Platform',
    icon: instamart,
  },
  {
    name: 'Zomato',
    description: 'Food Delivery & Dining',
    icon: zomato,
  },
  {
    name: 'BookMyShow',
    description: 'Movies & Event Ticketing',
    icon: bookmyshow,
  },
];

const Integration = () => {
  return (
    <section className="pt-14 pb-14 md:pt-16 md:pb-16 lg:pt-[88px] lg:pb-[88px] xl:pt-[100px] xl:pb-[100px]">
      <div className="main-container">
        <div className="relative z-10 overflow-hidden rounded-[25px] bg-gradient-to-b from-[#B3C3DA] to-[#93A5BE] py-16 md:py-[100px]">
          <div className="mb-[70px] space-y-5 text-center">
            <RevealAnimation delay={0.2}>
              <span className="badge badge-gray">Integrations</span>
            </RevealAnimation>
            <div className="space-y-3">
              <RevealAnimation delay={0.3}>
                <h2 className="dark:text-secondary">Tech stack &amp; tools.</h2>
              </RevealAnimation>
              <RevealAnimation delay={0.4}>
                <p className="dark:text-secondary mx-auto w-full max-w-[510px]">
                  Seamless integrations with leading industry platforms &amp; APIs
                </p>
              </RevealAnimation>
            </div>
          </div>
          <div>
            <div className="mx-auto grid max-w-[852px] grid-cols-1 gap-y-6 px-2 sm:gap-8 sm:px-4 md:grid-cols-2">
              {integrations.map((integration, index) => (
                <RevealAnimation delay={0.5 + index * 0.1} key={integration.name}>
                  <div className="group">
                    <Link
                      href="/services"
                      className="dark:bg-secondary/60 mx-2 flex scale-100 cursor-pointer items-center justify-between gap-4 rounded-2xl bg-white p-4 transition-transform duration-500 hover:scale-[102%] hover:transition-transform hover:duration-500 sm:mx-0 sm:p-8">
                      <div className="flex items-center gap-4">
                        <figure className="size-14 shrink-0 grow-0 overflow-hidden rounded-2xl shadow-sm transition-transform duration-500 group-hover:scale-[105%] group-hover:rotate-6">
                          <Image
                            src={integration.icon}
                            alt={integration.name}
                            className="size-full object-cover"
                            width={56}
                            height={56}
                          />
                        </figure>
                        <div className="shrink-0 grow-0 transform transition-transform duration-500 group-hover:translate-x-1.5">
                          <h5>{integration.name}</h5>
                          <p>{integration.description}</p>
                        </div>
                      </div>
                      <div className="bg-background-4 dark:bg-background-7 group-hover:bg-secondary dark:group-hover:bg-accent/40 group-hover:shadow-1 ease-[cubic-bezier(0.9, 0, 0.8, 1)] relative flex size-14 items-center justify-center overflow-hidden rounded-full transition-all duration-[600ms]">
                        <span className="sr-only">Arrow Icon</span>
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          className="absolute -translate-x-11 opacity-0 transition-all duration-[600ms] ease-in-out group-hover:translate-x-0 group-hover:opacity-100"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M3.75 12H20.25"
                            className="stroke-white dark:stroke-black"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M13.5 5.25L20.25 12L13.5 18.75"
                            className="stroke-white dark:stroke-black"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          className="absolute translate-x-0 opacity-100 transition-all duration-[600ms] ease-in-out group-hover:translate-x-10 group-hover:opacity-0"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M3.75 12H20.25"
                            className="stroke-black dark:stroke-white"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M13.5 5.25L20.25 12L13.5 18.75"
                            className="stroke-black dark:stroke-white"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </Link>
                  </div>
                </RevealAnimation>
              ))}
            </div>
          </div>
          <RevealAnimation delay={1.1} direction="right" offset={240}>
            <figure className="pointer-events-none absolute -right-[30%] -bottom-[50%] -z-10 h-full max-h-[862px] w-full max-w-[1440px] rotate-[353deg] opacity-70 select-none">
              <Image
                src={gradient4}
                alt="integrations bg"
                className="size-full rotate-x-[180deg] object-cover object-center"
              />
            </figure>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default Integration;
