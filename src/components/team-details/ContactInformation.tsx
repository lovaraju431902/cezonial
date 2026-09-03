import { IContactInformation, ISocialLinks } from '@/interface';
import Link from 'next/link';
import SocialLinkV2 from '../shared/SocialLinkV2';

interface ContactInformationProps {
  name?: string;
  role?: string;
  contactInformation: IContactInformation;
  social: ISocialLinks;
}

const ContactInformation = ({ name, role, contactInformation, social }: ContactInformationProps) => {
  return (
    <div className="p-6 sm:p-8 space-y-6 bg-background-1 dark:bg-background-8 border-t border-stroke-3 dark:border-stroke-7">
      {/* Header / Name & Role */}
      {(name || role) && (
        <div className="space-y-1">
          {name && <h3 className="text-heading-5 text-secondary dark:text-accent font-semibold">{name}</h3>}
          {role && <p className="text-tagline-2 text-primary-500 dark:text-primary-400 font-medium">{role}</p>}
        </div>
      )}

      {/* Contact Details with Icons */}
      <div className="space-y-3">
        <h4 className="text-tagline-1 text-secondary dark:text-accent font-semibold">Contact Information</h4>
        
        {contactInformation?.phoneNumber && (
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-primary-500/10 text-primary-500 dark:bg-primary-500/20 dark:text-primary-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <Link
              href={`tel:${contactInformation.phoneNumber}`}
              className="text-tagline-2 text-secondary/70 dark:text-accent/70 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200">
              {contactInformation.phoneNumber}
            </Link>
          </div>
        )}

        {contactInformation?.email && (
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-primary-500/10 text-primary-500 dark:bg-primary-500/20 dark:text-primary-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </div>
            <Link
              href={`mailto:${contactInformation.email}`}
              className="text-tagline-2 text-secondary/70 dark:text-accent/70 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200">
              {contactInformation.email}
            </Link>
          </div>
        )}
      </div>

      {/* Social Links (LinkedIn & GitHub only) */}
      <div className="pt-2 border-t border-stroke-3/60 dark:border-stroke-7/60">
        <SocialLinkV2 SocialLinks={social} />
      </div>
    </div>
  );
};

export default ContactInformation;
