'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  PlusCircle,
  Search,
  Filter,
  Trash2,
  Edit,
  ExternalLink,
  MapPin,
  Calendar,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { type Project, projectCategories } from '@/data/projects';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects);
      }
    } catch (err) {
      console.error('Erreur chargement projets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        setMessage({ text: 'Projet supprimé avec succès de la base de données.', type: 'success' });
      } else {
        setMessage({ text: data.error || 'Erreur lors de la suppression.', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'Erreur réseau lors de la suppression.', type: 'error' });
    } finally {
      setDeleting(false);
      setDeleteId(null);
      setTimeout(() => setMessage(null), 4000);
    }
  };

  // Filter projects based on search query and category
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'Tous' || project.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark font-display">Gestion des Projets</h1>
          <p className="text-sm text-muted">
            Consultez, modifiez ou ajoutez des réalisations de chantiers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchProjects}
            className="p-2.5 rounded-lg border border-border-light bg-white hover:bg-light-gray text-muted hover:text-dark transition-colors"
            title="Rafraîchir"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <Link
            href="/admin/projets/nouveau"
            className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            Nouveau Projet
          </Link>
        </div>
      </div>

      {/* Notification Toast */}
      {message && (
        <div
          className={`p-4 rounded-xl text-sm font-medium flex items-center gap-3 ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{message.text}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-border-light shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher par titre, ville, mot-clé..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500 transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
          <Filter className="w-4 h-4 text-muted hidden sm:block mr-1" />
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-teal-500 text-white shadow-sm'
                  : 'bg-light-gray text-muted hover:text-dark hover:bg-border-light'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-xl border border-border-light shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 text-center">
            <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-muted">Chargement des projets...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="p-16 text-center">
            <p className="text-base font-semibold text-dark mb-1">Aucun projet trouvé</p>
            <p className="text-xs text-muted mb-6">
              Essayez de modifier vos filtres ou ajoutez une nouvelle réalisation.
            </p>
            <Link
              href="/admin/projets/nouveau"
              className="inline-flex items-center gap-2 bg-teal-500 text-white text-xs font-semibold px-4 py-2 rounded-lg"
            >
              <PlusCircle className="w-4 h-4" />
              Ajouter un projet
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F9FAFB] border-b border-border-light text-[11px] font-bold text-muted uppercase tracking-wider">
                  <th className="py-3.5 px-6">Projet</th>
                  <th className="py-3.5 px-4">Catégorie</th>
                  <th className="py-3.5 px-4">Localisation & Année</th>
                  <th className="py-3.5 px-4">Spécifications</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light text-sm">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-light-gray/40 transition-colors">
                    {/* Project Title & Image */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border border-border-light">
                          <Image
                            src={project.mainImage}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-dark">{project.title}</div>
                          <div className="text-xs text-muted truncate max-w-xs mt-0.5">
                            {project.description}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4">
                      <span className="inline-block bg-teal-50 text-teal-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                        {project.category}
                      </span>
                    </td>

                    {/* Location & Year */}
                    <td className="py-4 px-4 text-xs text-muted">
                      <div className="flex items-center gap-1.5 font-medium text-dark">
                        <MapPin className="w-3.5 h-3.5 text-gold-500" />
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{project.year}</span>
                      </div>
                    </td>

                    {/* Specifications */}
                    <td className="py-4 px-4 text-xs text-muted">
                      <div>{project.details?.surface || '—'}</div>
                      <div className="text-[11px] text-muted/80">{project.details?.duration || '—'}</div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
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
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteId(project.id)}
                          className="p-2 text-muted hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-border-light space-y-4">
            <h3 className="text-lg font-bold text-dark">Confirmer la suppression</h3>
            <p className="text-sm text-muted leading-relaxed">
              Êtes-vous sûr de vouloir supprimer définitivement ce projet ? Cette action retirera le projet de la base de données et du site public.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                disabled={deleting}
                className="px-4 py-2 rounded-lg text-sm font-medium text-muted hover:bg-light-gray transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={deleting}
                className="px-5 py-2 rounded-lg text-sm font-bold bg-rose-600 hover:bg-rose-700 text-white transition-colors shadow-sm disabled:opacity-50"
              >
                {deleting ? 'Suppression...' : 'Supprimer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
