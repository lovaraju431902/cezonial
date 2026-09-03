// crypto marketing mobile menu
'use client';
import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useMobileMenuContext } from '@/context/MobileMenuContext';
import { cn } from '@/utils/cn';
import mainLogoDark from '@public/images/shared/main-logo-dark.svg';
import mainLogo from '@public/images/shared/main-logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import MenuCloseButton from './MenuCloseButton';
import MobileMenuItem from './MobileMenuItem';

export interface MobileMenuItem {
  id: string;
  label: string;
  href: string;
}

export interface MobileMenuGroup {
  id: string;
  title: string;
  submenu: MobileMenuItem[];
}

const MobileMenu = ({ menuData }: { menuData: MobileMenuGroup[] }) => {
  const { isOpen, closeMenu } = useMobileMenuContext();
  const pathname = usePathname();

  // Automatically close mobile menu whenever the route changes
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        onClick={closeMenu}
        aria-hidden="true"
        className={cn(
          'fixed inset-0 z-[9998] bg-black/50 backdrop-blur-xs transition-opacity duration-300 xl:hidden',
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      <aside
        className={cn(
          'dark:bg-background-8 scroll-bar fixed top-0 right-0 z-[9999] h-screen w-full translate-x-full bg-white transition-all duration-300 sm:w-1/2 sm:rounded-l-3xl xl:hidden',
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
        )}>
        <div className="space-y-4 p-5 sm:p-8 lg:p-9">
          <div className="flex items-center justify-between">
            <Link href="/" onClick={closeMenu}>
              <span className="sr-only">Home</span>
              <figure className="max-w-[160px] sm:max-w-[190px]">
                <Image src={mainLogo} alt="Cezonal Solutions" className="block h-auto w-full dark:hidden" />
                <Image src={mainLogoDark} alt="Cezonal Solutions" className="hidden h-auto w-full dark:block" />
              </figure>
            </Link>
            {/* close btn  */}
            <MenuCloseButton />
          </div>

          {/* menu items list  */}
          <div className="scroll-bar mt-6 h-[85vh] w-full overflow-x-hidden pb-10">
            <p className="text-secondary dark:text-accent text-tagline-1 before:bg-stroke-4 dark:before:bg-stroke-6 relative mb-2 block font-normal before:absolute before:top-1/2 before:-right-16 before:h-px before:w-full before:-translate-y-1/2 before:content-['']">
              Menu
            </p>
            <ul className="space-y-2">
              {menuData.map((item) => (
                <MobileMenuItem key={item.id} id={item.id} title={item.title} hasSubmenu={item.submenu.length > 0}>
                  {/* submenu items list  */}
                  <ul>
                    {item?.submenu?.map((subItem) => (
                      <li key={subItem.id}>
                        <Link
                          href={subItem.href}
                          onClick={closeMenu}
                          className="text-tagline-1 text-secondary dark:text-accent ml-4 block py-2.5 text-left font-normal transition-all duration-200 hover:text-primary-500 dark:hover:text-primary-400">
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </MobileMenuItem>
              ))}
            </ul>

            <div className="mt-8 pt-4">
              <Link
                href="/contact-us"
                onClick={closeMenu}
                className="btn btn-md btn-primary hover:btn-white-dark dark:hover:btn-white w-full rounded-full text-center">
                <span>Book a Call</span>
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

MobileMenu.displayName = 'MobileMenu';
export default MobileMenu;
