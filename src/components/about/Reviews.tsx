'use client';

import React from 'react';
import RevealAnimation from '@/components/animation/RevealAnimation';
import LinkButton from '@/components/ui/button/LinkButton';
import reviews from '@/data/json/testimonials/testimonials.json';
import gradient9 from '@public/images/ns-img-501.png';
import Image from 'next/image';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const GRADIENTS = [
  'bg-linear-[156deg,_#FFF_32.92%,_#FFB9A2_91%]',
  'bg-linear-[156deg,_#FFF_32.92%,_#83E7EE_91%]',
  'bg-linear-[156deg,_#FFF_32.92%,_#C6F56F_91%]',
  'bg-linear-[156deg,_#FFF_32.92%,_#FFD6A5_91%]',
];
const pickGradient = (i: number) => GRADIENTS[i % GRADIENTS.length];

type Review = {
  id?: string | number;
  name: string;
  title?: string;
  quote: string;
  avatar?: string;
  position?: string;
};

const Reviews = () => {
  return (
    <section className="py-14 md:py-[90px] lg:py-[100px]">
      <div className="main-container">
        <div className="space-y-8 md:space-y-[70px]">
          <div className="space-y-3 text-center">
            <RevealAnimation delay={0.2}>
              <span className="badge badge-cyan mb-5">Customer Success</span>
            </RevealAnimation>
            <RevealAnimation delay={0.1}>
              <h2>Real people. Real results.</h2>
            </RevealAnimation>
            <RevealAnimation delay={0.2}>
              <p className="mx-auto max-w-[540px] md:w-full">
                “Cezonal Solutions delivered our entire app on time — super fast execution, friendly team, and 100% reliable support.”
              </p>
            </RevealAnimation>
          </div>

          <RevealAnimation delay={0.4}>
            <div className="relative">
              <Swiper
                slidesPerView={1}
                spaceBetween={16}
                centeredSlides={true}
                loop={true}
                speed={1200}
                grabCursor={true}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 1.5,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                }}
                modules={[Autoplay]}
                navigation={false}
                pagination={false}
                scrollbar={false}
                className="swiper reviews-swiper">
                <div className="swiper-wrapper">
                  {reviews.map((review: Review, i: number) => {
                    return (
                      <SwiperSlide className="swiper-slide" key={review.id ?? `${review.name}-${i}`}>
                        <div className="dark:bg-background-6 relative z-0 flex flex-col gap-y-5 sm:gap-y-6 overflow-hidden rounded-[20px] bg-white p-6 sm:p-8 border border-stroke-3 dark:border-stroke-7 shadow-md">
                          <div className="gradient-overlay pointer-events-none absolute -top-[180px] -left-[180px] -z-10 h-full w-full opacity-0 transition-opacity duration-300 select-none max-md:h-[300px] max-md:w-[350px] md:-top-[190px] md:-left-[190px] lg:-top-[150px] lg:-left-[150px] xl:-top-[220px] xl:-left-[220px]">
                            <Image
                              src={gradient9}
                              alt="Decorative gradient background overlay"
                              className="-rotate-[90deg]"
                            />
                          </div>

                          <figure className="inline-block size-14 sm:size-16 rounded-full overflow-hidden shrink-0 border-2 border-primary-500/20 shadow-md">
                            <Image
                              src={review.avatar ?? '/images/testimonials/client-ramesh.jpg'}
                              alt={review.name ?? 'avatar'}
                              className="size-full object-cover"
                              width={64}
                              height={64}
                            />
                          </figure>

                          <p className="text-secondary/70 dark:text-accent/70 review-text text-sm sm:text-base line-clamp-4 sm:line-clamp-3 min-h-[60px] sm:min-h-[66px] italic leading-relaxed">{`"${review.quote}"`}</p>

                          <div>
                            <p className="text-secondary dark:text-accent review-name text-base sm:text-lg leading-[1.4] font-semibold">
                              {review.name}
                            </p>
                            {review.position && (
                              <p className="text-primary-500 dark:text-primary-400 text-tagline-3 sm:text-tagline-2 review-title font-medium mt-0.5">
                                {review.position}
                              </p>
                            )}
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </div>
              </Swiper>
            </div>
          </RevealAnimation>
        </div>
        <RevealAnimation delay={0.5}>
          <div className="mt-8 text-center sm:mt-10 lg:mt-14">
            <LinkButton
              href="/testimonial"
              className="btn btn-md btn-secondary dark:btn-transparent hover:btn-white w-full sm:w-auto">
              View all reviews
            </LinkButton>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default Reviews;
