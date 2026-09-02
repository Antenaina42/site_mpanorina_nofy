'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Save,
  Sparkles,
  AlertCircle,
  Plus,
  Trash2,
  Upload,
  Link as LinkIcon,
  CheckCircle2,
} from 'lucide-react';
import { projectCategories } from '@/data/projects';

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [mainImageMode, setMainImageMode] = useState<'upload' | 'url'>('upload');
  const [error, setError] = useState<string | null>(null);

  const mainFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Construction',
    year: '',
    location: '',
    surface: '',
    duration: '',
    type: '',
    mainImage: '',
    images: [''],
    description: '',
    longDescription: '',
  });

  useEffect(() => {
    async function loadProject() {
      try {
        const res = await fetch(`/api/projects/${params.id}`);
        const data = await res.json();
        if (data.success && data.project) {
          const p = data.project;
          setFormData({
            title: p.title || '',
            slug: p.slug || '',
            category: p.category || 'Construction',
            year: p.year || '',
            location: p.location || '',
            surface: p.details?.surface || '',
            duration: p.details?.duration || '',
            type: p.details?.type || '',
            mainImage: p.mainImage || '',
            images: Array.isArray(p.images) && p.images.length > 0 ? p.images : [p.mainImage || ''],
            description: p.description || '',
            longDescription: p.longDescription || '',
          });
        } else {
          setError(data.error || 'Projet introuvable');
        }
      } catch (err: any) {
        setError(err.message || 'Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [params.id]);

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setFormData({ ...formData, slug });
  };

  // Upload main image from computer
  const handleMainFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingMain(true);
    setError(null);

    const body = new FormData();
    body.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setFormData((prev) => ({
          ...prev,
          mainImage: data.url,
        }));
      } else {
        setError(data.error || 'Erreur lors de l’upload.');
      }
    } catch (err: any) {
      setError(err.message || 'Erreur réseau');
    } finally {
      setUploadingMain(false);
    }
  };

  // Upload multiple images to gallery from computer
  const handleGalleryFilesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingGallery(true);
    setError(null);

    const body = new FormData();
    Array.from(files).forEach((file) => body.append('file', file));

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body,
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.urls)) {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images.filter((img) => img.trim() !== ''), ...data.urls],
        }));
      } else {
        setError(data.error || 'Erreur lors de l’upload des photos.');
      }
    } catch (err: any) {
      setError(err.message || 'Erreur réseau');
    } finally {
      setUploadingGallery(false);
    }
  };

  const handleAddImage = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const handleImageChange = (index: number, value: string) => {
    const updated = [...formData.images];
    updated[index] = value;
    setFormData({ ...formData, images: updated });
  };

  const handleRemoveImage = (index: number) => {
    const updated = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/projects/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          images: formData.images.filter((img) => img.trim() !== ''),
        }),
      });

      const data = await res.json();
      if (data.success) {
        router.push('/admin/projets');
      } else {
        setError(data.error || 'Erreur lors de la modification');
      }
    } catch (err: any) {
      setError(err.message || 'Erreur réseau');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted">Chargement du projet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/projets"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux projets
        </Link>

        <span className="text-xs font-mono uppercase bg-gold-50 text-gold-700 px-3 py-1 rounded-full font-semibold">
          Édition ID #{params.id}
        </span>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-sm font-medium text-rose-800 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 border border-border-light shadow-sm space-y-8">
        <div>
          <h1 className="text-xl font-bold text-dark font-display">Modifier la réalisation</h1>
          <p className="text-xs text-muted mt-1">
            Modifiez les informations ci-dessous. Les changements seront répercutés immédiatement sur la base MySQL et le site.
          </p>
        </div>

        {/* General Info */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-dark uppercase tracking-wider text-teal-700 border-b border-border-light pb-2">
            1. Informations Générales
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-dark mb-1.5">Titre du Projet *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-dark">Identifiant URL (Slug) *</label>
                <button
                  type="button"
                  onClick={generateSlug}
                  className="text-[11px] text-teal-600 font-semibold flex items-center gap-1 hover:underline"
                >
                  <Sparkles className="w-3 h-3" /> Auto
                </button>
              </div>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2.5 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500 font-mono text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-dark mb-1.5">Catégorie *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500"
              >
                {projectCategories.filter((c) => c !== 'Tous').map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-dark mb-1.5">Année de réalisation *</label>
              <input
                type="text"
                required
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full px-4 py-2.5 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-dark mb-1.5">Localisation *</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2.5 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>
        </div>

        {/* Technical Specs */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-dark uppercase tracking-wider text-teal-700 border-b border-border-light pb-2">
            2. Détails Techniques &amp; Caractéristiques
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-dark mb-1.5">Surface (m²)</label>
              <input
                type="text"
                value={formData.surface}
                onChange={(e) => setFormData({ ...formData, surface: e.target.value })}
                className="w-full px-4 py-2.5 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-dark mb-1.5">Durée des travaux</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-2.5 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-dark mb-1.5">Type de structure</label>
              <input
                type="text"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2.5 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>
        </div>

        {/* Media & Photos with UPLOAD & LINK options */}
        <div className="space-y-6">
          <h2 className="text-sm font-bold text-dark uppercase tracking-wider text-teal-700 border-b border-border-light pb-2">
            3. Visuels &amp; Photos de Chantier (Upload ou Lien)
          </h2>

          {/* Main Image Source Switcher */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-dark">Image Principale (Couverture) *</label>
              <div className="flex items-center gap-1 bg-[#F0F2F5] p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setMainImageMode('upload')}
                  className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    mainImageMode === 'upload' ? 'bg-white shadow text-teal-700 font-bold' : 'text-muted hover:text-dark'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" /> Depuis l&apos;ordinateur
                </button>
                <button
                  type="button"
                  onClick={() => setMainImageMode('url')}
                  className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    mainImageMode === 'url' ? 'bg-white shadow text-teal-700 font-bold' : 'text-muted hover:text-dark'
                  }`}
                >
                  <LinkIcon className="w-3.5 h-3.5" /> Lien URL
                </button>
              </div>
            </div>

            {mainImageMode === 'upload' ? (
              <div>
                <input
                  type="file"
                  ref={mainFileInputRef}
                  onChange={handleMainFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <div
                  onClick={() => mainFileInputRef.current?.click()}
                  className="border-2 border-dashed border-border-light hover:border-teal-500 rounded-xl p-6 text-center cursor-pointer bg-[#F9FAFB] hover:bg-teal-50/20 transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-3">
                    <Upload className={`w-6 h-6 ${uploadingMain ? 'animate-bounce' : ''}`} />
                  </div>
                  <p className="text-sm font-semibold text-dark mb-1">
                    {uploadingMain ? 'Téléversement en cours...' : 'Cliquez pour choisir une photo sur votre ordinateur'}
                  </p>
                  <p className="text-xs text-muted">Formats acceptés : JPG, PNG, WEBP (Max 15 Mo)</p>
                </div>
              </div>
            ) : (
              <div>
                <input
                  type="url"
                  required
                  value={formData.mainImage}
                  onChange={(e) => setFormData({ ...formData, mainImage: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500"
                />
              </div>
            )}

            {/* Preview */}
            {formData.mainImage && (
              <div className="relative w-full h-52 rounded-xl overflow-hidden border border-border-light shadow-sm bg-light-gray mt-3">
                <Image
                  src={formData.mainImage}
                  alt="Aperçu image principale"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Photo active
                </div>
              </div>
            )}
          </div>

          {/* Additional Gallery Photos with Batch Upload */}
          <div className="space-y-3 pt-4 border-t border-border-light">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-xs font-bold text-dark">
                Galerie de photos supplémentaires ({formData.images.filter((i) => i.trim()).length} photos)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  multiple
                  ref={galleryFileInputRef}
                  onChange={handleGalleryFilesUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => galleryFileInputRef.current?.click()}
                  className="text-xs bg-teal-50 text-teal-700 hover:bg-teal-100 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Upload className={`w-3.5 h-3.5 ${uploadingGallery ? 'animate-spin' : ''}`} />
                  {uploadingGallery ? 'Upload...' : 'Uploader des photos (PC)'}
                </button>
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="text-xs bg-light-gray text-dark hover:bg-border-light font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Ajouter un lien URL
                </button>
              </div>
            </div>

            {/* Gallery Thumbnails Grid */}
            {formData.images.filter((img) => img.trim()).length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                {formData.images.map((img, index) => {
                  if (!img.trim()) return null;
                  return (
                    <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border-light group shadow-sm bg-light-gray">
                      <Image src={img} alt={`Galerie ${index + 1}`} fill className="object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1.5 right-1.5 bg-rose-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Supprimer cette photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* List of URL inputs */}
            <div className="space-y-2">
              {formData.images.map((img, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-7 text-xs font-mono text-muted text-right">#{index + 1}</div>
                  <input
                    type="text"
                    value={img}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder="Lien URL ou chemin du fichier uploadé (/uploads/...)"
                    className="flex-1 px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="p-2 text-muted hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Retirer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Text descriptions */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-dark uppercase tracking-wider text-teal-700 border-b border-border-light pb-2">
            4. Descriptions &amp; Storytelling
          </h2>

          <div>
            <label className="block text-xs font-bold text-dark mb-1.5">Description Courte (Aperçu carte) *</label>
            <textarea
              required
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-dark mb-1.5">Description Complète (Page détaillée)</label>
            <textarea
              rows={4}
              value={formData.longDescription}
              onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
              className="w-full px-4 py-2.5 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500 resize-none"
            />
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-light">
          <Link
            href="/admin/projets"
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-muted hover:bg-light-gray transition-colors"
          >
            Annuler
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-md disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {submitting ? 'Mise à jour...' : 'Mettre à jour le Projet'}
          </button>
        </div>
      </form>
    </div>
  );
}
