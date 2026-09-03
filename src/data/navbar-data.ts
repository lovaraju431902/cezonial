import { MobileMenuGroup } from '@/components/shared/mobile-menu/MobileMenu';
import { FooterOneData } from '@/interface';

export const mobileMenuData: MobileMenuGroup[] = [
  {
    id: 'company',
    title: 'Company',
    submenu: [
      { id: 'about-us', label: 'About Us', href: '/about' },
      { id: 'our-process', label: 'Our Process', href: '/process' },
      { id: 'case-studies', label: 'Case Studies / Portfolio', href: '/case-study' },
      { id: 'pricing', label: 'Pricing Plans', href: '/pricing' },
      { id: 'contact', label: 'Contact Us', href: '/contact-us' },
    ],
  },
  {
    id: 'services',
    title: 'Services',
    submenu: [
      { id: 'mobile-app', label: 'Mobile App Development', href: '/services' },
      { id: 'web-app', label: 'Web App Development', href: '/services' },
      { id: 'custom-software', label: 'Custom Software Solutions', href: '/services' },
      { id: 'ui-ux', label: 'UI/UX Product Design', href: '/services' },
      { id: 'cloud-devops', label: 'Cloud & DevOps Architecture', href: '/services' },
    ],
  },
  {
    id: 'resources',
    title: 'Resources',
    submenu: [
      { id: 'portfolio', label: 'Case Studies', href: '/case-study' },
      { id: 'faq', label: 'FAQs', href: '/faq' },
      { id: 'contact-us', label: 'Book Consultation', href: '/contact-us' },
    ],
  },
];

export const footerData: FooterOneData[] = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Career', href: '/career' },
      { label: 'Case Studies', href: '/case-study' },
      { label: 'Contact Us', href: '/contact-us' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Documentation', href: '/documentation' },
      { label: 'Tutorial', href: '/tutorial' },
      { label: 'Community', href: '/community' },
    ],
  },
  {
    title: 'Legal Policies',
    links: [
      { label: 'Terms & Conditions', href: '/terms-conditions' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Refund Policy', href: '/refund-policy' },
      { label: 'GDPR Compliance', href: '/gdpr' },
      { label: 'Affiliate Policy', href: '/affiliate-policy' },
    ],
  },
];
