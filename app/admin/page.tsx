'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Building2,
  PlusCircle,
  TrendingUp,
  FolderKanban,
  Calendar,
  MapPin,
  ExternalLink,
  Edit,
  Database,
  ArrowRight,
} from 'lucide-react';
import { type Project } from '@/data/projects';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        if (data.success) {
          setStats(data.stats);
        }
      } catch (err) {
        console.error('Erreur chargement stats:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted">Chargement des données du tableau de bord...</p>
        </div>
      </div>
    );
  }

  const categories = stats?.categoriesCount ? Object.entries(stats.categoriesCount) : [];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 rounded-2xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-gold-300 mb-2 block">
            Tableau de Bord
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 font-display">
            Bienvenue dans le Backoffice MPANORINA NOFY
          </h1>
          <p className="text-white/80 text-sm max-w-xl">
            Gérez vos réalisations de chantiers, mettez à jour les fiches de vos projets et alimentez directement votre base de données MySQL.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/projets/nouveau"
            className="bg-gold-500 hover:bg-gold-400 text-dark font-bold text-sm px-5 py-3 rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            Ajouter un projet
          </Link>
          <Link
            href="/admin/projets"
            className="bg-white/10 hover:bg-white/20 text-white font-medium text-sm px-5 py-3 rounded-xl transition-all flex items-center gap-2 backdrop-blur-sm"
          >
            <Building2 className="w-4 h-4" />
            Voir la liste
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-muted uppercase font-semibold tracking-wider">Total Projets</span>
            <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-dark font-display">{stats?.totalProjects || 0}</div>
          <p className="text-xs text-muted mt-2">Réalisations publiées</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-muted uppercase font-semibold tracking-wider">Catégories</span>
            <div className="w-10 h-10 rounded-lg bg-gold-50 text-gold-600 flex items-center justify-center">
              <FolderKanban className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-dark font-display">{categories.length}</div>
          <p className="text-xs text-muted mt-2">Types de travaux couverts</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-muted uppercase font-semibold tracking-wider">Base MySQL</span>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
          </div>
          <div className="text-xl font-bold text-dark flex items-center gap-2">
            {stats?.isDbConnected ? (
              <span className="text-emerald-600">Connectée</span>
            ) : (
              <span className="text-amber-500">Fallback Local</span>
            )}
          </div>
          <p className="text-xs text-muted mt-2">
            {stats?.isDbConnected ? 'Base "mpanorina_nofy" active' : 'Données synchronisées en mémoire'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-muted uppercase font-semibold tracking-wider">Statut Site</span>
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-xl font-bold text-emerald-600">En Production</div>
          <p className="text-xs text-muted mt-2">Mise à jour en temps réel</p>
        </div>
      </div>

      {/* Split Section: Categories Breakdown & Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Projects Table */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-border-light shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border-light flex items-center justify-between">
            <div>
              <h2 className="font-bold text-lg text-dark">Dernières Réalisations</h2>
              <p className="text-xs text-muted">Aperçu rapide des 5 derniers projets</p>
            </div>
            <Link
              href="/admin/projets"
              className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
            >
              Voir tout ({stats?.totalProjects || 0})
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-border-light flex-1">
            {stats?.recentProjects?.map((project: Project) => (
              <div
                key={project.id}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-light-gray/50 transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border border-border-light">
                    <Image
                      src={project.mainImage}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm text-dark truncate">{project.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted mt-1">
                      <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded font-medium">
                        {project.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gold-500" />
                        {project.location}
                      </span>
                      <span className="flex items-center gap-1 hidden sm:flex">
                        <Calendar className="w-3 h-3" />
                        {project.year}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    href={`/realisations/${project.slug}`}
                    target="_blank"
                    className="p-2 text-muted hover:text-teal-600 rounded-lg hover:bg-light-gray transition-colors"
                    title="Voir sur le site public"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  <Link
                    href={`/admin/projets/${project.id}`}
                    className="p-2 text-muted hover:text-teal-600 rounded-lg hover:bg-light-gray transition-colors"
                    title="Modifier le projet"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Breakdown */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl border border-border-light shadow-sm p-6">
            <h2 className="font-bold text-lg text-dark mb-1">Répartition par Catégorie</h2>
            <p className="text-xs text-muted mb-6">Projets enregistrés par type</p>

            <div className="space-y-4">
              {categories.map(([cat, count]: [string, any]) => {
                const total = stats?.totalProjects || 1;
                const percent = Math.round((count / total) * 100);

                return (
                  <div key={cat} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-dark">{cat}</span>
                      <span className="text-muted font-mono">{count} projet(s) ({percent}%)</span>
                    </div>
                    <div className="w-full h-2 bg-light-gray rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-500 rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Help Card */}
          <div className="bg-gradient-to-br from-gold-500/10 to-teal-500/10 border border-gold-500/20 rounded-xl p-6">
            <h3 className="font-bold text-sm text-dark mb-2">Base de données MySQL</h3>
            <p className="text-xs text-muted leading-relaxed mb-4">
              Pour connecter WAMP MySQL en direct, assurez-vous que le service MySQL de WAMP est démarré. Un fichier <code>database.sql</code> est également disponible à la racine du projet.
            </p>
            <Link
              href="/admin/projets/nouveau"
              className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1"
            >
              Ajouter une nouvelle réalisation →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
