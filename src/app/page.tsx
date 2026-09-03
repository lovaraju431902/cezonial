import CTA from '@/components/home/CTA';
import Hero from '@/components/home/Hero';
import Integration from '@/components/home/Integration';
import Process from '@/components/home/Process';
import WhatWeOffer from '@/components/home/WhatWeOffer';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Cezonal Solutions Pvt Ltd - Mobile & Web App Development',
};

const page = () => {
  return (
    <main className="bg-background-2 dark:bg-background-5">
      <Hero />
      <WhatWeOffer />
      <Process />
      <WhyChooseUs />
      <Integration />
      <CTA />
    </main>
  );
};

export default page;
