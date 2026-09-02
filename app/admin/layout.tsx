'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  PlusCircle,
  ExternalLink,
  Database,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
  Layers,
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isDbConnected, setIsDbConnected] = useState<boolean | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    async function checkDb() {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        if (data.success) {
          setIsDbConnected(data.stats.isDbConnected);
        }
      } catch (err) {
        setIsDbConnected(false);
      }
    }
    checkDb();
  }, [pathname]);

  const navLinks = [
    {
      label: 'Tableau de bord',
      href: '/admin',
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: 'Modifier le Contenu (CMS)',
      href: '/admin/contenu',
      icon: Layers,
      exact: false,
    },
    {
      label: 'Gestion des Projets',
      href: '/admin/projets',
      icon: Building2,
      exact: false,
    },
    {
      label: 'Ajouter un Projet',
      href: '/admin/projets/nouveau',
      icon: PlusCircle,
      exact: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F6F8] flex text-dark font-sans">
      {/* Sidebar for Desktop */}
      <aside className="w-64 bg-[#0F3A4D] text-white flex-shrink-0 hidden md:flex flex-col justify-between shadow-xl z-20">
        <div>
          {/* Logo & Brand */}
          <div className="p-6 border-b border-white/10 flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white p-1 flex-shrink-0">
              <Image
                src="/logo.jpg"
                alt="MPANORINA NOFY"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="font-bold text-sm tracking-wide text-white">MPANORINA NOFY</h1>
              <span className="text-[10px] text-gold-400 font-mono tracking-widest uppercase">
                Backoffice Admin
              </span>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="p-4 space-y-1.5">
            {navLinks.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href) && item.href !== '/admin';
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-teal-500 text-white shadow-md font-semibold'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar info */}
        <div className="p-4 border-t border-white/10 space-y-3">
          {/* DB Status indicator */}
          <div className="bg-[#0A2D3D] p-3 rounded-lg flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-gold-400" />
              <span>Base MySQL</span>
            </div>
            {isDbConnected === true ? (
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> En ligne
              </span>
            ) : isDbConnected === false ? (
              <span className="flex items-center gap-1 text-amber-400 font-medium" title="Mode fallback actif (WAMP/MySQL hors ligne)">
                <AlertCircle className="w-3.5 h-3.5" /> Fallback
              </span>
            ) : (
              <span className="text-white/50 text-[10px]">Test...</span>
            )}
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium text-white/80 hover:bg-white/10 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-teal-400" />
              Voir le site web
            </span>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded">Visiteur</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-border-light px-6 py-4 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 rounded-lg text-dark hover:bg-light-gray"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-lg font-bold text-dark">Espace d&apos;Administration</h2>
              <p className="text-xs text-muted hidden sm:block">
                Gestion des projets &amp; réalisations de chantier
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/admin/projets/nouveau"
              className="bg-teal-500 hover:bg-teal-600 text-white text-xs md:text-sm font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Nouveau Projet</span>
            </Link>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div
              className="fixed inset-0 bg-dark/60"
              onClick={() => setIsSidebarOpen(false)}
            />
            <div className="relative w-64 bg-[#0F3A4D] text-white flex flex-col justify-between p-4 z-10 shadow-2xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-gold-400" />
                    <span className="font-bold text-sm">MPANORINA NOFY</span>
                  </div>
                  <button onClick={() => setIsSidebarOpen(false)} className="p-1 text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-2">
                  {navLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-white/90 hover:bg-white/10"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  <Link
                    href="/"
                    target="_blank"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gold-400 hover:bg-white/10 mt-4"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Voir le site web</span>
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
