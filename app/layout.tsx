import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Preloader from '@/components/ui/Preloader';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import JsonLd from '@/components/seo/JsonLd';
import { siteConfig } from '@/data/site';
import { getSectionContentFromDb } from '@/lib/db';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  let isIndexed = true;

  try {
    const seoData = await getSectionContentFromDb('seo');
    if (seoData && (seoData.isIndexed === false || seoData.isIndexed === 'false' || seoData.isIndexed === 0)) {
      isIndexed = false;
    }
  } catch (e) {
    isIndexed = true;
  }

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} — Entreprise de Construction & Gros Œuvre à Madagascar`,
      template: `%s | ${siteConfig.name} Madagascar`,
    },
    description:
      'MPANORINA NOFY est l\'entreprise de référence pour la construction de bâtiments, les travaux de gros œuvre, le génie civil et la rénovation à Madagascar (Antananarivo). Demandez votre devis gratuit.',
    keywords: [
      'construction Madagascar',
      'gros oeuvre Madagascar',
      'MPANORINA NOFY',
      'mpanorina nofy',
      'entreprise BTP Madagascar',
      'bâtiment Madagascar',
      'construction Antananarivo',
      'entreprise de construction Madagascar',
      'société de BTP Madagascar',
      'devis construction Madagascar',
      'travaux gros oeuvre Madagascar',
      'constructeur villa Madagascar',
      'immeuble Antananarivo',
      'génie civil Madagascar',
      'rénovation bâtiment Madagascar',
      'gros œuvre bâtiment Madagascar',
      'architecte et BTP Antananarivo',
    ],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: {
      canonical: siteConfig.url,
    },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: `${siteConfig.name} — Entreprise de Construction & Gros Œuvre à Madagascar`,
      description:
        'Leader de la construction et du gros œuvre à Madagascar. De la vision aux fondations, des fondations à la réalité. Découvrez nos réalisations et demandez un devis.',
      images: [
        {
          url: '/logo.jpg',
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} Construction Madagascar`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${siteConfig.name} — Entreprise de Construction & Gros Œuvre à Madagascar`,
      description:
        'Entreprise de référence en construction de bâtiment et gros œuvre à Madagascar (Antananarivo). Devise et étude de projet.',
      images: ['/logo.jpg'],
    },
    other: {
      'geo.region': 'MG-T',
      'geo.placename': 'Antananarivo, Madagascar',
      'geo.position': '-18.8792;47.5079',
      ICBM: '-18.8792, 47.5079',
    },
    robots: isIndexed
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        }
      : {
          index: false,
          follow: false,
          noarchive: true,
          nosnippet: true,
          noimageindex: true,
        },
    icons: {
      icon: '/logo.jpg',
      apple: '/logo.jpg',
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-light text-dark">
        <JsonLd />
        <Preloader />
        <SmoothScrollProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
        <WhatsAppButton />
      </body>
    </html>
  );
}
