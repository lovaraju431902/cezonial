'use client';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import type { ComponentType } from 'react';

type ServiceLink = {
  title: string;
  description: string;
  href: string;
  iconName: string;
};

const serviceLinks: ServiceLink[] = [
  {
    title: 'Mobile App Development',
    description: 'High-performance native & cross-platform iOS & Android apps',
    href: '/services',
    iconName: 'ns-shape-34',
  },
  {
    title: 'Web App Development',
    description: 'Scalable, modern full-stack web applications & portals',
    href: '/services',
    iconName: 'ns-shape-38',
  },
  {
    title: 'Custom Software Solutions',
    description: 'Enterprise-grade tailored software built for your business',
    href: '/services',
    iconName: 'ns-shape-42',
  },
  {
    title: 'UI/UX Product Design',
    description: 'Intuitive user research, wireframing, and sleek UI design',
    href: '/services',
    iconName: 'ns-shape-35',
  },
  {
    title: 'Cloud & DevOps Architecture',
    description: 'Secure, scalable cloud deployments & CI/CD infrastructure',
    href: '/services',
    iconName: 'ns-shape-48',
  },
];

const ServicesMenu = ({
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
          'dropdown-menu-bridge pointer-events-none absolute top-full left-1/2 z-40 h-3 w-full min-w-[380px] -translate-x-1/2 bg-transparent opacity-0 transition-all duration-300',
          menuDropdownId === 'services-dropdown-menu'
            ? '!pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        )}
      />
      <div
        id="services-dropdown-menu"
        className={cn(
          'dropdown-menu dark:bg-background-6 shadow-14 border-stroke-1 dark:border-background-7 pointer-events-none absolute top-full left-1/2 z-50 mt-2 w-[420px] -translate-x-1/2 rounded-[20px] border bg-white p-3 opacity-0 transition-all duration-300',
          menuDropdownId === 'services-dropdown-menu'
            ? '!pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-2.5 opacity-0',
        )}>
        <p className="text-tagline-3 text-secondary/60 dark:text-accent/60 px-3 pt-2 pb-1 font-semibold uppercase tracking-wider">
          What We Build
        </p>
        <ul className="space-y-1">
          {serviceLinks.map((service) => (
            <li key={service.title}>
              <Link
                href={service.href}
                onClick={handleClose}
                className="hover:bg-background-2 dark:hover:bg-background-7 flex items-center gap-3.5 rounded-xl p-3 transition-colors duration-200">
                <div className="bg-background-3 dark:bg-background-8 text-secondary dark:text-accent flex size-10 shrink-0 items-center justify-center rounded-lg">
                  <span className={`${service.iconName} text-xl`} />
                </div>
                <div>
                  <h6 className="text-tagline-1 text-secondary dark:text-accent font-medium">{service.title}</h6>
                  <p className="text-tagline-3 text-secondary/60 dark:text-accent/60 font-normal">{service.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

ServicesMenu.displayName = 'ServicesMenu';
export default ServicesMenu;
