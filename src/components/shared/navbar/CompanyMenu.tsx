'use client';
import { AboutIcon, BlogIcon, FeatureIcon, ServiceIcon } from '@/icons/menu-icon';
import { cn } from '@/utils/cn';
import headquartersImg from '@public/images/about/cezonal-office-entrance.jpg';
import Image from 'next/image';
import Link from 'next/link';
import type { ComponentType } from 'react';
import CompanyMenuLink from './CompanyMenuLink';

type CompanyLink = {
  title: string;
  description: string;
  href: string;
  icon: ComponentType;
};

const companyLinks: CompanyLink[] = [
  {
    title: 'About Us',
    description: 'Learn about our mission, vision, and core team',
    href: '/about',
    icon: AboutIcon,
  },
  {
    title: 'Our Services',
    description: 'Custom mobile and web application development',
    href: '/services',
    icon: ServiceIcon,
  },
  {
    title: 'Our Process',
    description: 'From discovery to app store & cloud deployment',
    href: '/process',
    icon: FeatureIcon,
  },
  {
    title: 'Contact Us',
    description: 'Get in touch for consultations and project quotes',
    href: '/contact-us',
    icon: BlogIcon,
  },
];

const CompanyMenu = ({
  menuDropdownId,
  setMenuDropdownId,
}: {
  menuDropdownId: string | null;
  setMenuDropdownId: (id: string | null) => void;
}) => {
  const handleClose = () => setMenuDropdownId(null);

  return (
    <div>
      <div
        className={cn(
          'dropdown-menu-bridge pointer-events-none absolute top-full left-1/2 z-40 h-3 w-full min-w-[692px] -translate-x-1/2 bg-transparent',
          menuDropdownId === 'company-mega-menu' ? '!pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
      />
      <div
        id="company-mega-menu"
        className={cn(
          'dropdown-menu dark:bg-background-6 border-stroke-1 dark:border-background-7 pointer-events-none absolute top-full left-1/2 z-50 mt-2 flex w-full -translate-x-1/2 items-start gap-y-6 rounded-[20px] border bg-white p-4 opacity-0 transition-all duration-300 md:w-[692px] md:gap-x-8',
          menuDropdownId === 'company-mega-menu'
            ? '!pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-2.5 opacity-0',
        )}>
        <ul className="w-full space-y-2 md:max-w-[284px]">
          {companyLinks.map((link) => (
            <CompanyMenuLink key={link.title} {...link} onClose={handleClose} />
          ))}
        </ul>
        <figure className="flex-1 space-y-3">
          <p className="text-tagline-2 text-secondary/60 dark:text-accent/60 font-medium">Why Cezonal</p>
          <Link href="/about" onClick={handleClose} className="block">
            <figure className="group relative min-h-[272px] w-full max-w-full overflow-hidden rounded-[14px]">
              <Image
                src={headquartersImg}
                alt="Cezonal Technologies Headquarters"
                className="h-full w-full rounded-[14px] object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-[14px]" />
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <p className="text-tagline-1 font-semibold text-white">Cezonal Solutions Pvt Ltd</p>
                <p className="text-tagline-3 w-full font-normal text-white/80">
                  Building next-generation digital products, high-performance apps, and enterprise software.
                </p>
              </div>
            </figure>
          </Link>
        </figure>
      </div>
    </div>
  );
};

CompanyMenu.displayName = 'CompanyMenu';
export default CompanyMenu;
