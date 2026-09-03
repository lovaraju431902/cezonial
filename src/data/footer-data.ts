import { FooterData } from '@/interface';

export const footerLinks: FooterData[] = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Process', href: '/process' },
      { label: 'Case Studies / Portfolio', href: '/case-study' },
      { label: 'Pricing Plans', href: '/pricing' },
      { label: 'Contact Us', href: '/contact-us' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Mobile App Development', href: '/services' },
      { label: 'Web App Development', href: '/services' },
      { label: 'Custom Enterprise Software', href: '/services' },
      { label: 'UI/UX Product Design', href: '/services' },
      { label: 'Cloud & DevOps Solutions', href: '/services' },
    ],
  },
  {
    title: 'Resources & Legal',
    links: [
      { label: 'Frequently Asked Questions', href: '/faq' },
      { label: 'Tech Stack & Integrations', href: '/integration' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms-conditions' },
    ],
  },
];
