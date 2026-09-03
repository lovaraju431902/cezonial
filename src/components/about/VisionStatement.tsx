import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';

const VisionStatement = () => {
  return (
    <section className="pt-32 pb-14 sm:pt-36 md:pt-42 md:pb-16 lg:pb-[88px] xl:pt-[180px] xl:pb-[100px]">
      <div className="main-container space-y-14 md:space-y-[70px]">
        <div className="mx-auto max-w-[780px] space-y-3 text-center">
          <RevealAnimation delay={0.1} instant>
            <span className="badge badge-cyan mb-5">Passion meets purpose</span>
          </RevealAnimation>
          <RevealAnimation delay={0.2} instant>
            <h2>Cezonal Solutions is defining the future landscape of business.</h2>
          </RevealAnimation>
          <RevealAnimation delay={0.3} instant>
            <p>
              In a rapidly evolving digital world, Cezonal Solutions Pvt Ltd stands at the forefront of innovation,
              transforming how businesses operate, connect, and grow by delivering intelligent, scalable, and
              user-focused software &amp; app solutions.
            </p>
          </RevealAnimation>
        </div>

        {/* Real Team & Office Photos */}
        <article className="grid grid-cols-12 justify-center gap-6 lg:gap-8">
          {/* Team Celebration Photo */}
          <div className="col-span-12 lg:col-span-7">
            <RevealAnimation delay={0.4} instant>
              <figure className="group relative h-[360px] sm:h-[440px] lg:h-[500px] w-full overflow-hidden rounded-[24px] border border-stroke-3 dark:border-stroke-7 shadow-xl bg-background-2 dark:bg-background-8">
                <Image
                  src="/images/about/cezonal-team-celebration.jpg"
                  alt="Cezonal Solutions Team Celebration"
                  fill
                  priority
                  className="size-full object-cover object-top transition-transform duration-700 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6 sm:p-8">
                  <div>
                    <span className="badge badge-primary-light text-xs mb-2 inline-block">Our Team</span>
                    <h3 className="text-heading-5 text-white font-semibold">Cezonal Solutions Pvt Ltd Team</h3>
                    <p className="text-white/80 text-tagline-2">Collaborative innovation driving customer success.</p>
                  </div>
                </div>
              </figure>
            </RevealAnimation>
          </div>

          {/* Office Entrance Photo */}
          <div className="col-span-12 lg:col-span-5">
            <RevealAnimation delay={0.5} instant>
              <figure className="group relative h-[360px] sm:h-[440px] lg:h-[500px] w-full overflow-hidden rounded-[24px] border border-stroke-3 dark:border-stroke-7 shadow-xl bg-background-2 dark:bg-background-8">
                <Image
                  src="/images/about/cezonal-office-entrance.jpg"
                  alt="Cezonal Technologies Office Entrance"
                  fill
                  priority
                  className="size-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6 sm:p-8">
                  <div>
                    <span className="badge badge-cyan text-xs mb-2 inline-block">Our Headquarters</span>
                    <h3 className="text-heading-5 text-white font-semibold">Cezonal Technologies Office</h3>
                    <p className="text-white/80 text-tagline-2">Tanuku, Andhra Pradesh, India</p>
                  </div>
                </div>
              </figure>
            </RevealAnimation>
          </div>
        </article>
      </div>
    </section>
  );
};

VisionStatement.displayName = 'VisionStatement';
export default VisionStatement;
