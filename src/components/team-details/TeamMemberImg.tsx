import { IContactInformation, ISocialLinks, ITeamMember } from '@/interface';
import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';
import ContactInformation from './ContactInformation';

const TeamMemberImg = ({ data }: { data: Partial<ITeamMember> }) => {
  const { contactInformation, social, name, role, userImg } = data;

  return (
    <RevealAnimation delay={0.2}>
      <div className="relative col-span-12 overflow-hidden rounded-[24px] border border-stroke-3 dark:border-stroke-7 bg-white dark:bg-background-8 shadow-xl md:col-span-5">
        {/* Team Member Illustration Image (No gradient overlay) */}
        <figure className="relative w-full overflow-hidden bg-background-2 dark:bg-background-9 flex items-center justify-center">
          <Image
            src={(userImg as string) || '/images/team/keerthi.png'}
            alt={`${name || 'Team member'} profile`}
            width={600}
            height={700}
            priority
            className="w-full h-auto object-cover transition-transform duration-500 hover:scale-[1.02]"
          />
        </figure>

        {/* Contact Information & Socials */}
        <ContactInformation
          name={name}
          role={role}
          contactInformation={contactInformation as IContactInformation}
          social={social as ISocialLinks}
        />
      </div>
    </RevealAnimation>
  );
};

export default TeamMemberImg;
