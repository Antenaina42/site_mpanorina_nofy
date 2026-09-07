import { siteConfig } from '@/data/site';
import { contactInfo } from '@/data/contact';

export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'GeneralContractor',
        '@id': `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        legalName: 'MPANORINA NOFY SARL',
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo.jpg`,
        image: `${siteConfig.url}/logo.jpg`,
        description:
          'MPANORINA NOFY est l\'entreprise leader spécialisée dans la construction de bâtiments, le gros œuvre, les projets immobiliers et le génie civil à Madagascar. Excellence, durabilité et innovation.',
        telephone: contactInfo.phone,
        email: contactInfo.email,
        priceRange: '$$$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: contactInfo.fullAddress,
          addressLocality: 'Antananarivo',
          addressRegion: 'Analamanga',
          postalCode: '101',
          addressCountry: 'MG',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: -18.8792,
          longitude: 47.5079,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
            ],
            opens: '07:30',
            closes: '17:30',
          },
        ],
        areaServed: [
          {
            '@type': 'AdministrativeArea',
            name: 'Madagascar',
          },
          {
            '@type': 'City',
            name: 'Antananarivo',
          },
          {
            '@type': 'City',
            name: 'Toamasina',
          },
          {
            '@type': 'City',
            name: 'Mahajanga',
          },
          {
            '@type': 'City',
            name: 'Antsirabe',
          },
        ],
        sameAs: [
          contactInfo.socialMedia.facebook,
          contactInfo.socialMedia.instagram,
          contactInfo.socialMedia.linkedin,
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Services de Construction & BTP Madagascar',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Gros Œuvre & Fondations',
                description:
                  'Travaux de gros œuvre, fondations spéciales, structure béton armé et charpente à Madagascar.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Construction de Bâtiments Résidentiels & Commerciaux',
                description:
                  'Construction d\'immeubles, villas de luxe, bureaux et complexes commerciaux.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Rénovation & Restauration de Bâtiments',
                description:
                  'Modernisation, renforcement structural et rénovation lourde de bâtiments.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Génie Civil & Travaux Publics',
                description:
                  'Études techniques, gestion de chantier BTP et infrastructures.',
              },
            },
          ],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: {
          '@id': `${siteConfig.url}/#organization`,
        },
        inLanguage: 'fr-MG',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
