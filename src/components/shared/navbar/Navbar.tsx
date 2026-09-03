// Cezonal Solutions Navbar
'use client';

import RevealAnimation from '@/components/animation/RevealAnimation';
import { MobileMenuProvider } from '@/context/MobileMenuContext';
import { mobileMenuData } from '@/data/navbar-data';
import { useNavbarScroll } from '@/hooks/useScrollHeader';
import { cn } from '@/utils/cn';
import logoDark from '@public/images/shared/logo-dark.svg';
import logoIcon from '@public/images/shared/logo.svg';
import mainLogoDark from '@public/images/shared/main-logo-dark.svg';
import mainLogo from '@public/images/shared/main-logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import MobileMenu from '../mobile-menu/MobileMenu';
import MobileMenuButton from '../mobile-menu/MobileMenuButton';
import CompanyMenu from './CompanyMenu';
import ServicesMenu from './ServicesMenu';

const dropdownNavItems = [
  { label: 'Company', dataMenu: 'company-mega-menu', MenuComponent: CompanyMenu },
  { label: 'Services', dataMenu: 'services-dropdown-menu', MenuComponent: ServicesMenu },
];

const Navbar = () => {
  const [menuDropdownId, setMenuDropdownId] = useState<string | null>(null);

  const { isScrolled } = useNavbarScroll(150);

  const handleMenuHover = (dropdownId?: string | null) => {
    setMenuDropdownId(dropdownId || null);
  };

  return (
    <MobileMenuProvider>
      <header
        onMouseLeave={() => handleMenuHover(null)}
        className={cn(
          'lp:!max-w-[1290px] fixed top-5 left-1/2 z-50 mx-auto w-full max-w-[350px] -translate-x-1/2 transition-all duration-500 min-[425px]:max-w-[375px] min-[500px]:max-w-[450px] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]',
          isScrolled && 'top-2',
        )}>
        <RevealAnimation direction="up" offset={100} delay={0.1} instant>
          <div
            className={cn(
              'border-stroke-2 dark:border-stroke-6 bg-accent dark:bg-background-9 mx-auto flex items-center justify-between rounded-full border px-4 py-2.5 xl:py-1.5 shadow-sm',
            )}>
            <div className="flex items-center justify-center">
              <Link href="/" className="inline-flex items-center gap-2">
                <span className="sr-only">Cezonal Solutions Pvt Ltd</span>
                <figure className="hidden sm:block sm:max-w-[210px]">
                  <Image src={mainLogo} alt="Cezonal Solutions" className="block h-auto w-full dark:hidden" priority />
                  <Image src={mainLogoDark} alt="Cezonal Solutions" className="hidden h-auto w-full dark:block" priority />
                </figure>
                <figure className="block max-w-[38px] sm:hidden">
                  <Image src={logoIcon} alt="Cezonal Solutions" className="block h-auto w-full dark:hidden" priority />
                  <Image src={logoDark} alt="Cezonal Solutions" className="hidden h-auto w-full dark:block" priority />
                </figure>
              </Link>
            </div>
            <nav className="hidden items-center xl:flex">
              <ul className="flex items-center gap-1">
                {dropdownNavItems.map(({ label, dataMenu, MenuComponent }) => (
                  <li
                    key={label}
                    className="group/item relative cursor-pointer py-2"
                    data-menu={dataMenu}
                    onMouseEnter={() => handleMenuHover(dataMenu)}>
                    <button
                      type="button"
                      className="hover:border-stroke-2 dark:hover:border-stroke-7 text-tagline-1 text-secondary/70 hover:text-secondary dark:text-accent/70 dark:hover:text-accent flex cursor-pointer items-center gap-1 rounded-full border border-transparent px-3.5 py-1.5 font-medium transition-all duration-200">
                      <span>{label}</span>
                      <span className="block origin-center translate-y-px transition-all duration-300 group-hover/item:rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                      </span>
                    </button>
                    <MenuComponent menuDropdownId={menuDropdownId} setMenuDropdownId={setMenuDropdownId} />
                  </li>
                ))}
                <li className="relative cursor-pointer py-2">
                  <Link
                    href="/case-study"
                    className="hover:border-stroke-2 dark:hover:border-stroke-7 text-tagline-1 text-secondary/70 hover:text-secondary dark:text-accent/70 dark:hover:text-accent flex items-center gap-1 rounded-full border border-transparent px-3.5 py-1.5 font-medium transition-all duration-200">
                    <span>Portfolio</span>
                  </Link>
                </li>
                <li className="relative cursor-pointer py-2">
                  <Link
                    href="/process"
                    className="hover:border-stroke-2 dark:hover:border-stroke-7 text-tagline-1 text-secondary/70 hover:text-secondary dark:text-accent/70 dark:hover:text-accent flex items-center gap-1 rounded-full border border-transparent px-3.5 py-1.5 font-medium transition-all duration-200">
                    <span>Process</span>
                  </Link>
                </li>
                {/* <li className="relative cursor-pointer py-2">
                  <Link
                    href="/pricing"
                    className="hover:border-stroke-2 dark:hover:border-stroke-7 text-tagline-1 text-secondary/70 hover:text-secondary dark:text-accent/70 dark:hover:text-accent flex items-center gap-1 rounded-full border border-transparent px-3.5 py-1.5 font-medium transition-all duration-200">
                    <span>Pricing</span>
                  </Link>
                </li> */}
                <li className="relative cursor-pointer py-2">
                  <Link
                    href="/contact-us"
                    className="hover:border-stroke-2 dark:hover:border-stroke-7 text-tagline-1 text-secondary/70 hover:text-secondary dark:text-accent/70 dark:hover:text-accent flex items-center gap-1 rounded-full border border-transparent px-3.5 py-1.5 font-medium transition-all duration-200">
                    <span>Contact</span>
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="hidden items-center justify-center xl:flex">
              <Link href="/contact-us" className="btn btn-md btn-primary hover:btn-white-dark dark:hover:btn-white rounded-full">
                <span>Book a Call</span>
              </Link>
            </div>
            <MobileMenuButton />
          </div>
        </RevealAnimation>
      </header>
      <MobileMenu menuData={mobileMenuData} />
    </MobileMenuProvider>
  );
};

Navbar.displayName = 'Navbar';
export default Navbar;

