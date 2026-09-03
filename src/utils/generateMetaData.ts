import type { Metadata } from 'next';

export const DEFAULT_URL = 'https://cezonialsolutions.netlify.app/';
export const DEFAULT_TITLE = 'Cezonal Solutions Pvt Ltd - Mobile & Web App Development';
export const DEFAULT_DESCRIPTION =
  'Premier software development agency delivering high-performance mobile apps, custom web applications, and enterprise software solutions.';
export const DEFAULT_IMAGE_URL = 'https://cezonialsolutions.netlify.app/images/og-image.png';

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
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Cezonal Solutions Pvt Ltd',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ['/images/og-image.png'],
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
      images: imageUrl
        ? [{ url: imageUrl, width: 1200, height: 630, type: 'image/png', alt: title ?? 'Cezonal Solutions' }]
        : defaultMetadata.openGraph?.images,
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
