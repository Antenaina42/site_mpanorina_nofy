// LAYOUT ADMIN -- Server Component
// noindex permanent -- independant du toggle SEO global

import AdminLayoutClient from './AdminLayoutClient';

export const metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  title: 'Administration -- MPANORINA NOFY',
};

export default function AdminLayout({ children }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}