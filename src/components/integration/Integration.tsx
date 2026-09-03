import { ArrowIcon } from '@/icons';
import bookmyshowLogo from '@public/images/integrations/bookmyshow.svg';
import instamartLogo from '@public/images/integrations/instamart.png';
import rapidoLogo from '@public/images/integrations/rapido.png';
import swiggyLogo from '@public/images/integrations/swiggy.png';
import zeptoLogo from '@public/images/integrations/zepto.png';
import zomatoLogo from '@public/images/integrations/zomato.svg';
import integrationBg from '@public/images/ns-img-24.png';
import { StaticImageData } from 'next/image';
import Image from 'next/image';
import Link from 'next/link';
import RevealAnimation from '../animation/RevealAnimation';
import LinkButton from '../ui/button/LinkButton';

interface Integration {
  id: string;
  logo: StaticImageData | string;
  title: string;
  description: string;
  href: string;
}

const integrations: Integration[] = [
  {
    id: 'swiggy',
    logo: swiggyLogo,
    title: 'Swiggy',
    description: 'Food & Quick Commerce',
    href: '/services',
  },
  {
    id: 'zepto',
    logo: zeptoLogo,
    title: 'Zepto',
    description: '10-Min Grocery Delivery',
    href: '/services',
  },
  {
    id: 'rapido',
    logo: rapidoLogo,
    title: 'Rapido',
    description: 'Bike Taxi & Auto Booking',
    href: '/services',
  },
  {
    id: 'instamart',
    logo: instamartLogo,
    title: 'Instamart',
    description: 'Instant Delivery Platform',
    href: '/services',
  },
  {
    id: 'zomato',
    logo: zomatoLogo,
    title: 'Zomato',
    description: 'Food Delivery & Dining',
    href: '/services',
  },
  {
    id: 'bookmyshow',
    logo: bookmyshowLogo,
    title: 'BookMyShow',
    description: 'Movies & Event Ticketing',
    href: '/services',
  },
];

const Integration = () => {
  return (
    <section className="pt-[120px] pb-24 md:pb-32 lg:pb-40 xl:pt-[160px] xl:pb-48 2xl:pb-[200px]">
      <RevealAnimation delay={0.1}>
        <div className="bg-secondary relative z-0 mx-auto w-[95%] overflow-hidden rounded-4xl px-4 py-10 md:px-10 md:py-16 2xl:max-w-[1440px] 2xl:px-[100px] 2xl:py-[100px]">
          <div className="absolute inset-0 -z-10 h-full w-full">
            <Image src={integrationBg} alt=" about bg" className="h-full w-full object-cover" />
          </div>
          <div className="mx-auto max-w-[850px]">
            <div className="mb-14 flex flex-col items-center gap-y-3 text-center md:mb-[70px]">
              <RevealAnimation delay={0.1}>
                <span className="badge badge-blur text-ns-cyan mb-5">Integrations</span>
              </RevealAnimation>
              <RevealAnimation delay={0.2}>
                <h2 className="text-accent mx-auto max-w-[750px]">Link up with your favorite platforms.</h2>
              </RevealAnimation>
              <RevealAnimation delay={0.3}>
                <p className="text-accent/60 max-w-[510px]">
                  Seamlessly connect and integrate your applications with leading consumer, delivery, and ticketing platforms.
                </p>
              </RevealAnimation>
            </div>
            <div className="integration-container mb-10 grid grid-cols-1 gap-8 sm:gap-4 md:mb-14 md:grid-cols-2 md:gap-8">
              {integrations.map((integration, index) => (
                <RevealAnimation key={integration.title} delay={0.1 * index + 0.1} instant={index <= 2}>
                  <div className="group" key={integration.id}>
                    <Link
                      href={integration.href}
                      className="group-hover:shadow-1 flex justify-between rounded-[20px] bg-white/14 p-4 transition-all duration-500 ease-in-out group-hover:scale-[102%] md:p-4 lg:p-8">
                      <div className="flex items-center gap-4">
                        <div className="size-14 shrink-0 grow-0 overflow-hidden rounded-2xl bg-white shadow-sm transition-transform duration-500 group-hover:scale-[105%] group-hover:rotate-6">
                          <Image src={integration.logo} alt={`${integration.title} Logo`} width={56} height={56} className="size-full object-cover" />
                        </div>
                        <div className="transform transition-transform duration-500 group-hover:translate-x-1.5">
                          <h5 className="text-accent">{integration.title}</h5>
                          <p className="text-accent/60">{integration.description}</p>
                        </div>
                      </div>
                      <div className="bg-ns-green group-hover:bg-ns-green/90 group-hover:shadow-1 relative flex size-14 items-center justify-center overflow-hidden rounded-full transition-all duration-[600ms] ease-in-out">
                        <ArrowIcon className="absolute size-6 -translate-x-11 stroke-black opacity-0 transition-all duration-[600ms] ease-in-out group-hover:translate-x-0 group-hover:opacity-100" />
                        <ArrowIcon className="absolute size-6 translate-x-0 stroke-black opacity-100 transition-all duration-[600ms] ease-in-out group-hover:translate-x-10 group-hover:opacity-0" />
                      </div>
                    </Link>
                  </div>
                </RevealAnimation>
              ))}
            </div>
            <RevealAnimation delay={0.7}>
              <div className="text-center">
                <LinkButton
                  href="/services"
                  className="btn btn-white btn-xl hover:btn-primary dark:btn-transparent block w-[90%] md:inline-block md:w-auto">
                  See in Action
                </LinkButton>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </RevealAnimation>
    </section>
  );
};

Integration.displayName = 'Integration';
export default Integration;
