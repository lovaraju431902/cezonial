import CTA from '@/components/home/CTA';
import Features from '@/components/home/Features';
import Hero from '@/components/home/Hero';
import Integration from '@/components/home/Integration';
import Pricing from '@/components/home/Pricing';
import Process from '@/components/home/Process';
import WhatWeOffer from '@/components/home/WhatWeOffer';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import { ICaseStudy } from '@/interface';
import { defaultMetadata } from '@/utils/generateMetaData';
import getMarkDownData from '@/utils/getMarkDownData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'App Development - NextSaaS',
};

const page = () => {
  const featuredProjects = getMarkDownData<ICaseStudy & { [key: string]: unknown }>('src/data/case-study')
    .filter((project) => project.showHomePage === true)
    .slice(0, 3);

  return (
    <main className="bg-background-2 dark:bg-background-5">
      <Hero />
      <WhatWeOffer />
      <Process />
      <WhyChooseUs />
      <Features projects={featuredProjects} />
      <Integration />
      <Pricing />
      <CTA />
    </main>
  );
};

export default page;
