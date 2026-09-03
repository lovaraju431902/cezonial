import type { Metadata } from 'next';

export const DEFAULT_URL = 'https://cezonialsolutions.netlify.app/';
export const DEFAULT_TITLE = 'Cezonal Solutions Pvt Ltd - Mobile & Web App Development';
export const DEFAULT_DESCRIPTION =
  'Cezonal Solutions Pvt Ltd is a premier software development agency delivering high-performance mobile apps, web applications, and custom enterprise software solutions.';
export const DEFAULT_IMAGE_URL = 'https://cezonialsolutions.netlify.app/opengraph-image';

const defaultMetadata: Metadata = {
  metadataBase: new URL(DEFAULT_URL),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  icons: {
    icon: [
      { url: '/images/shared/logo.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/images/shared/logo.svg',
    apple: '/images/shared/logo.svg',
  },
  openGraph: {
    type: 'website',
    siteName: 'Cezonal Solutions Pvt Ltd',
    url: DEFAULT_URL,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: DEFAULT_IMAGE_URL, width: 1200, height: 630, alt: 'Cezonal Solutions Pvt Ltd' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_IMAGE_URL],
  },
};

const generateMetadata = (title?: string, description?: string, canonicaUrl?: string, imageUrl?: string): Metadata => {
  return {
    ...defaultMetadata,
    title: title ?? defaultMetadata.title,
    description: description ?? defaultMetadata.description,
    alternates: {
      canonical: canonicaUrl,
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title: title ?? defaultMetadata.openGraph?.title,
      description: description ?? defaultMetadata.openGraph?.description,
      url: canonicaUrl ?? defaultMetadata.openGraph?.url,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : defaultMetadata.openGraph?.images,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: title ?? defaultMetadata.twitter?.title,
      description: description ?? defaultMetadata.twitter?.description,
      images: imageUrl ? [imageUrl] : defaultMetadata.twitter?.images,
    },
  };
};

export { defaultMetadata, generateMetadata };
