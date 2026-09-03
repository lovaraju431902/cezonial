import LinkButton from '@/components/ui/button/LinkButton';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: '404 - Page Not Found || Cezonal Solutions',
};

const NotFound = () => {
  return (
    <main className="bg-background-2 dark:bg-background-5 min-h-[85vh] flex items-center justify-center">
      <section className="pt-36 pb-20 md:pt-44 md:pb-28 lg:pt-52 lg:pb-36 w-full">
        <div className="main-container">
          <div className="bg-white dark:bg-background-6 relative mx-auto flex max-w-[850px] flex-col items-center justify-center overflow-hidden rounded-[32px] border border-stroke-3 dark:border-stroke-7 p-8 text-center shadow-2xl md:p-16 lg:p-20">
            {/* Subtle glow accents */}
            <div className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-primary-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 size-96 rounded-full bg-secondary/10 dark:bg-accent/5 blur-3xl" />

            {/* Badge */}
            <span className="badge badge-cyan mb-6">Error 404</span>

            {/* Big 404 Heading */}
            <h1 className="bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600 bg-clip-text text-transparent text-[84px] font-extrabold leading-none tracking-tight sm:text-[120px] md:text-[160px] lg:text-[180px]">
              404
            </h1>

            {/* Message */}
            <div className="space-y-3 mt-4 mb-8 max-w-[540px]">
              <h2 className="text-heading-3 text-secondary dark:text-accent font-bold">
                Oops! Lost in the digital space?
              </h2>
              <p className="text-secondary/70 dark:text-accent/70 text-tagline-1">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <LinkButton href="/" className="btn btn-lg btn-primary hover:btn-secondary dark:hover:btn-accent shadow-md">
                Back to Homepage
              </LinkButton>
              <Link
                href="/contact-us"
                className="btn btn-lg btn-outline border-stroke-3 dark:border-stroke-7 text-secondary dark:text-accent hover:bg-background-2 dark:hover:bg-background-7 transition-all duration-200">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
