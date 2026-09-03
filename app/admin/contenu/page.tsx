'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Save,
  Upload,
  Link as LinkIcon,
  Home,
  Info,
  Layers,
  Phone,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles,
  Globe,
} from 'lucide-react';
import { defaultSiteContent } from '@/lib/defaultContent';
import SeoIndexingCard from '@/components/admin/SeoIndexingCard';

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'services' | 'contact' | 'stats' | 'seo'>('home');
  const [content, setContent] = useState<any>(defaultSiteContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentUploadTargetRef = useRef<{ section: string; path: string[] } | null>(null);

  // Load content from API
  const loadContent = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/content');
      const data = await res.json();
      if (data.success && data.content) {
        setContent(data.content);
      }
    } catch (err) {
      console.error('Erreur chargement contenu:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  // Save current active tab content
  const handleSaveTab = async (sectionKey: string) => {
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: sectionKey,
          data: content[sectionKey],
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ text: `Modifications de la section "${sectionKey}" enregistrées avec succès !`, type: 'success' });
      } else {
        setMessage({ text: data.error || 'Erreur lors de l’enregistrement.', type: 'error' });
      }
    } catch (err: any) {
      setMessage({ text: err.message || 'Erreur réseau.', type: 'error' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 4000);
    }
  };

  // Trigger file upload from computer
  const triggerUpload = (section: string, path: string[]) => {
    currentUploadTargetRef.current = { section, path };
    setUploadingField(path.join('.'));
    fileInputRef.current?.click();
  };

  // Handle uploaded file
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUploadTargetRef.current) return;

    const { section, path } = currentUploadTargetRef.current;
    const body = new FormData();
    body.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body,
      });
      const data = await res.json();
      if (data.success && data.url) {
        // Update nested state
        setContent((prev: any) => {
          const updated = JSON.parse(JSON.stringify(prev));
          let curr = updated[section];
          for (let i = 0; i < path.length - 1; i++) {
            curr = curr[path[i]];
          }
          curr[path[path.length - 1]] = data.url;
          return updated;
        });
        setMessage({ text: 'Photo téléversée avec succès.', type: 'success' });
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setUploadingField(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Generic value update handler
  const updateNestedValue = (section: string, path: string[], value: any) => {
    setContent((prev: any) => {
      const updated = JSON.parse(JSON.stringify(prev));
      let curr = updated[section];
      for (let i = 0; i < path.length - 1; i++) {
        curr = curr[path[i]];
      }
      curr[path[path.length - 1]] = value;
      return updated;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted">Chargement du gestionnaire de contenu...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'home', label: 'Page d’Accueil', icon: Home },
    { id: 'about', label: 'Page À Propos', icon: Info },
    { id: 'services', label: 'Page Services', icon: Layers },
    { id: 'contact', label: 'Contact & Réseaux', icon: Phone },
    { id: 'stats', label: 'Chiffres Clés', icon: BarChart3 },
    { id: 'seo', label: 'Indexation Google (SEO)', icon: Globe },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Hidden Global File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark font-display">Gestionnaire de Contenu (CMS)</h1>
          <p className="text-sm text-muted">
            Modifiez tous les textes, photos et sections du site selon les pages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadContent}
            className="p-2.5 rounded-lg border border-border-light bg-white hover:bg-light-gray text-muted hover:text-dark transition-colors"
            title="Recharger les données"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleSaveTab(activeTab)}
            disabled={saving}
            className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-md disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Enregistrement...' : 'Enregistrer cette page'}
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {message && (
        <div
          className={`p-4 rounded-xl text-sm font-medium flex items-center gap-3 shadow-sm ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-white rounded-xl border border-border-light shadow-sm">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-teal-500 text-white shadow-sm'
                  : 'text-muted hover:text-dark hover:bg-light-gray'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Home Page Editor */}
      {activeTab === 'home' && (
        <div className="space-y-8 bg-white p-6 md:p-8 rounded-2xl border border-border-light shadow-sm">
          {/* Hero Section */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-dark uppercase tracking-wider text-teal-700 border-b border-border-light pb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-500" /> 1. Bannière Principale (Hero)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-dark mb-1">Titre Principal</label>
                <input
                  type="text"
                  value={content.home?.hero?.title || ''}
                  onChange={(e) => updateNestedValue('home', ['hero', 'title'], e.target.value)}
                  className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-dark mb-1">Sous-titre</label>
                <input
                  type="text"
                  value={content.home?.hero?.subtitle || ''}
                  onChange={(e) => updateNestedValue('home', ['hero', 'subtitle'], e.target.value)}
                  className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            {/* Hero Image */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-dark">Image de Fond Hero</label>
                <button
                  type="button"
                  onClick={() => triggerUpload('home', ['hero', 'bgImage'])}
                  className="text-xs text-teal-600 font-bold flex items-center gap-1.5 hover:underline"
                >
                  <Upload className="w-3.5 h-3.5" /> Uploader depuis l&apos;ordinateur
                </button>
              </div>
              <input
                type="text"
                value={content.home?.hero?.bgImage || ''}
                onChange={(e) => updateNestedValue('home', ['hero', 'bgImage'], e.target.value)}
                className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500 mb-2"
              />
              {content.home?.hero?.bgImage && (
                <div className="relative w-full h-40 rounded-xl overflow-hidden border border-border-light bg-light-gray">
                  <Image src={content.home.hero.bgImage} alt="Hero preview" fill className="object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* Intro Section */}
          <div className="space-y-4 pt-6 border-t border-border-light">
            <h2 className="text-base font-bold text-dark uppercase tracking-wider text-teal-700 border-b border-border-light pb-2">
              2. Section Présentation (« BÂTIR AUJOURD&apos;HUI. IMAGINER DEMAIN. »)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-dark mb-1">Titre Ligne 1</label>
                <input
                  type="text"
                  value={content.home?.intro?.title1 || ''}
                  onChange={(e) => updateNestedValue('home', ['intro', 'title1'], e.target.value)}
                  className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-dark mb-1">Titre Ligne 2</label>
                <input
                  type="text"
                  value={content.home?.intro?.title2 || ''}
                  onChange={(e) => updateNestedValue('home', ['intro', 'title2'], e.target.value)}
                  className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500 font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-dark mb-1">Texte de Présentation</label>
              <textarea
                rows={4}
                value={content.home?.intro?.text || ''}
                onChange={(e) => updateNestedValue('home', ['intro', 'text'], e.target.value)}
                className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500 resize-none leading-relaxed"
              />
            </div>

            {/* Intro Image */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-dark">Photo d&apos;Illustration Présentation</label>
                <button
                  type="button"
                  onClick={() => triggerUpload('home', ['intro', 'image'])}
                  className="text-xs text-teal-600 font-bold flex items-center gap-1.5 hover:underline"
                >
                  <Upload className="w-3.5 h-3.5" /> Uploader depuis l&apos;ordinateur
                </button>
              </div>
              <input
                type="text"
                value={content.home?.intro?.image || ''}
                onChange={(e) => updateNestedValue('home', ['intro', 'image'], e.target.value)}
                className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500 mb-2"
              />
              {content.home?.intro?.image && (
                <div className="relative w-full h-44 rounded-xl overflow-hidden border border-border-light bg-light-gray">
                  <Image src={content.home.intro.image} alt="Intro preview" fill className="object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* Video / Vision Banner */}
          <div className="space-y-4 pt-6 border-t border-border-light">
            <h2 className="text-base font-bold text-dark uppercase tracking-wider text-teal-700 border-b border-border-light pb-2">
              3. Bannière Vision Grand Format
            </h2>

            <div>
              <label className="block text-xs font-bold text-dark mb-1">Titre de la Vision</label>
              <input
                type="text"
                value={content.home?.video?.title || ''}
                onChange={(e) => updateNestedValue('home', ['video', 'title'], e.target.value)}
                className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500 font-semibold"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-dark">Image de Fond Vision</label>
                <button
                  type="button"
                  onClick={() => triggerUpload('home', ['video', 'bgImage'])}
                  className="text-xs text-teal-600 font-bold flex items-center gap-1.5 hover:underline"
                >
                  <Upload className="w-3.5 h-3.5" /> Uploader depuis l&apos;ordinateur
                </button>
              </div>
              <input
                type="text"
                value={content.home?.video?.bgImage || ''}
                onChange={(e) => updateNestedValue('home', ['video', 'bgImage'], e.target.value)}
                className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500 mb-2"
              />
              {content.home?.video?.bgImage && (
                <div className="relative w-full h-40 rounded-xl overflow-hidden border border-border-light bg-light-gray">
                  <Image src={content.home.video.bgImage} alt="Video preview" fill className="object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* CTA Final */}
          <div className="space-y-4 pt-6 border-t border-border-light">
            <h2 className="text-base font-bold text-dark uppercase tracking-wider text-teal-700 border-b border-border-light pb-2">
              4. Section Appel à l&apos;Action (CTA Devis)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-dark mb-1">Titre d&apos;Appel</label>
                <input
                  type="text"
                  value={content.home?.cta?.title || ''}
                  onChange={(e) => updateNestedValue('home', ['cta', 'title'], e.target.value)}
                  className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-dark mb-1">Sous-titre</label>
                <input
                  type="text"
                  value={content.home?.cta?.subtitle || ''}
                  onChange={(e) => updateNestedValue('home', ['cta', 'subtitle'], e.target.value)}
                  className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-dark">Image de Fond CTA</label>
                <button
                  type="button"
                  onClick={() => triggerUpload('home', ['cta', 'bgImage'])}
                  className="text-xs text-teal-600 font-bold flex items-center gap-1.5 hover:underline"
                >
                  <Upload className="w-3.5 h-3.5" /> Uploader depuis l&apos;ordinateur
                </button>
              </div>
              <input
                type="text"
                value={content.home?.cta?.bgImage || ''}
                onChange={(e) => updateNestedValue('home', ['cta', 'bgImage'], e.target.value)}
                className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500 mb-2"
              />
              {content.home?.cta?.bgImage && (
                <div className="relative w-full h-40 rounded-xl overflow-hidden border border-border-light bg-light-gray">
                  <Image src={content.home.cta.bgImage} alt="CTA preview" fill className="object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: About Page Editor */}
      {activeTab === 'about' && (
        <div className="space-y-8 bg-white p-6 md:p-8 rounded-2xl border border-border-light shadow-sm">
          {/* About Hero */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-dark uppercase tracking-wider text-teal-700 border-b border-border-light pb-2">
              1. En-tête Page À Propos
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-dark mb-1">Titre</label>
                <input
                  type="text"
                  value={content.about?.hero?.title || ''}
                  onChange={(e) => updateNestedValue('about', ['hero', 'title'], e.target.value)}
                  className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-dark mb-1">Sous-titre / Catégorie</label>
                <input
                  type="text"
                  value={content.about?.hero?.subtitle || ''}
                  onChange={(e) => updateNestedValue('about', ['hero', 'subtitle'], e.target.value)}
                  className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-dark">Image de Fond En-tête</label>
                <button
                  type="button"
                  onClick={() => triggerUpload('about', ['hero', 'bgImage'])}
                  className="text-xs text-teal-600 font-bold flex items-center gap-1.5 hover:underline"
                >
                  <Upload className="w-3.5 h-3.5" /> Uploader depuis l&apos;ordinateur
                </button>
              </div>
              <input
                type="text"
                value={content.about?.hero?.bgImage || ''}
                onChange={(e) => updateNestedValue('about', ['hero', 'bgImage'], e.target.value)}
                className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500 mb-2"
              />
              {content.about?.hero?.bgImage && (
                <div className="relative w-full h-40 rounded-xl overflow-hidden border border-border-light bg-light-gray">
                  <Image src={content.about.hero.bgImage} alt="About hero preview" fill className="object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* About Story */}
          <div className="space-y-4 pt-6 border-t border-border-light">
            <h2 className="text-base font-bold text-dark uppercase tracking-wider text-teal-700 border-b border-border-light pb-2">
              2. Histoire de l&apos;Entreprise
            </h2>

            <div>
              <label className="block text-xs font-bold text-dark mb-1">Titre de l&apos;Histoire</label>
              <input
                type="text"
                value={content.about?.story?.title || ''}
                onChange={(e) => updateNestedValue('about', ['story', 'title'], e.target.value)}
                className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500 font-semibold"
              />
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-dark mb-1">Paragraphe 1</label>
                <textarea
                  rows={2}
                  value={content.about?.story?.p1 || ''}
                  onChange={(e) => updateNestedValue('about', ['story', 'p1'], e.target.value)}
                  className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-dark mb-1">Paragraphe 2</label>
                <textarea
                  rows={2}
                  value={content.about?.story?.p2 || ''}
                  onChange={(e) => updateNestedValue('about', ['story', 'p2'], e.target.value)}
                  className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-dark mb-1">Paragraphe 3</label>
                <textarea
                  rows={2}
                  value={content.about?.story?.p3 || ''}
                  onChange={(e) => updateNestedValue('about', ['story', 'p3'], e.target.value)}
                  className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            {/* Story Image */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-dark">Photo Histoire</label>
                <button
                  type="button"
                  onClick={() => triggerUpload('about', ['story', 'image'])}
                  className="text-xs text-teal-600 font-bold flex items-center gap-1.5 hover:underline"
                >
                  <Upload className="w-3.5 h-3.5" /> Uploader depuis l&apos;ordinateur
                </button>
              </div>
              <input
                type="text"
                value={content.about?.story?.image || ''}
                onChange={(e) => updateNestedValue('about', ['story', 'image'], e.target.value)}
                className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500 mb-2"
              />
              {content.about?.story?.image && (
                <div className="relative w-full h-44 rounded-xl overflow-hidden border border-border-light bg-light-gray">
                  <Image src={content.about.story.image} alt="Story preview" fill className="object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* Vision & Mission */}
          <div className="space-y-4 pt-6 border-t border-border-light">
            <h2 className="text-base font-bold text-dark uppercase tracking-wider text-teal-700 border-b border-border-light pb-2">
              3. Vision &amp; Mission
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-dark mb-1">Titre Vision</label>
                <input
                  type="text"
                  value={content.about?.vision?.visionTitle || ''}
                  onChange={(e) => updateNestedValue('about', ['vision', 'visionTitle'], e.target.value)}
                  className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500 font-semibold mb-2"
                />
                <label className="block text-xs font-bold text-dark mb-1">Texte Vision</label>
                <textarea
                  rows={3}
                  value={content.about?.vision?.visionText || ''}
                  onChange={(e) => updateNestedValue('about', ['vision', 'visionText'], e.target.value)}
                  className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-dark mb-1">Titre Mission</label>
                <input
                  type="text"
                  value={content.about?.vision?.missionTitle || ''}
                  onChange={(e) => updateNestedValue('about', ['vision', 'missionTitle'], e.target.value)}
                  className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500 font-semibold mb-2"
                />
                <label className="block text-xs font-bold text-dark mb-1">Texte Mission</label>
                <textarea
                  rows={3}
                  value={content.about?.vision?.missionText || ''}
                  onChange={(e) => updateNestedValue('about', ['vision', 'missionText'], e.target.value)}
                  className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Services Page Editor */}
      {activeTab === 'services' && (
        <div className="space-y-8 bg-white p-6 md:p-8 rounded-2xl border border-border-light shadow-sm">
          <div className="space-y-4">
            <h2 className="text-base font-bold text-dark uppercase tracking-wider text-teal-700 border-b border-border-light pb-2">
              1. En-tête Page Services
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-dark mb-1">Titre</label>
                <input
                  type="text"
                  value={content.services?.hero?.title || ''}
                  onChange={(e) => updateNestedValue('services', ['hero', 'title'], e.target.value)}
                  className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-dark mb-1">Sous-titre</label>
                <input
                  type="text"
                  value={content.services?.hero?.subtitle || ''}
                  onChange={(e) => updateNestedValue('services', ['hero', 'subtitle'], e.target.value)}
                  className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-dark">Image de Fond Services</label>
                <button
                  type="button"
                  onClick={() => triggerUpload('services', ['hero', 'bgImage'])}
                  className="text-xs text-teal-600 font-bold flex items-center gap-1.5 hover:underline"
                >
                  <Upload className="w-3.5 h-3.5" /> Uploader depuis l&apos;ordinateur
                </button>
              </div>
              <input
                type="text"
                value={content.services?.hero?.bgImage || ''}
                onChange={(e) => updateNestedValue('services', ['hero', 'bgImage'], e.target.value)}
                className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500 mb-2"
              />
              {content.services?.hero?.bgImage && (
                <div className="relative w-full h-40 rounded-xl overflow-hidden border border-border-light bg-light-gray">
                  <Image src={content.services.hero.bgImage} alt="Services hero preview" fill className="object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* Individual Services */}
          <div className="space-y-6 pt-6 border-t border-border-light">
            <h2 className="text-base font-bold text-dark uppercase tracking-wider text-teal-700 border-b border-border-light pb-2">
              2. Détails des 5 Services
            </h2>

            {content.services?.items?.map((service: any, index: number) => (
              <div key={service.id || index} className="p-5 bg-light-gray/40 rounded-xl border border-border-light space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-teal-700 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-teal-500 text-white flex items-center justify-center text-xs font-mono">
                      {service.number}
                    </span>
                    {service.title}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-dark mb-1">Titre du service</label>
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) => updateNestedValue('services', ['items', String(index), 'title'], e.target.value)}
                      className="w-full px-4 py-2 text-sm bg-white border border-border-light rounded-lg focus:outline-none focus:border-teal-500 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-dark mb-1">Description courte</label>
                    <input
                      type="text"
                      value={service.description}
                      onChange={(e) => updateNestedValue('services', ['items', String(index), 'description'], e.target.value)}
                      className="w-full px-4 py-2 text-sm bg-white border border-border-light rounded-lg focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-dark mb-1">Description complète</label>
                  <textarea
                    rows={2}
                    value={service.longDescription}
                    onChange={(e) => updateNestedValue('services', ['items', String(index), 'longDescription'], e.target.value)}
                    className="w-full px-4 py-2 text-sm bg-white border border-border-light rounded-lg focus:outline-none focus:border-teal-500 resize-none"
                  />
                </div>

                {/* Service Image */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-dark">Photo du Service</label>
                    <button
                      type="button"
                      onClick={() => triggerUpload('services', ['items', String(index), 'image'])}
                      className="text-xs text-teal-600 font-bold flex items-center gap-1.5 hover:underline"
                    >
                      <Upload className="w-3.5 h-3.5" /> Uploader depuis l&apos;ordinateur
                    </button>
                  </div>
                  <input
                    type="text"
                    value={service.image}
                    onChange={(e) => updateNestedValue('services', ['items', String(index), 'image'], e.target.value)}
                    className="w-full px-4 py-2 text-sm bg-white border border-border-light rounded-lg focus:outline-none focus:border-teal-500 mb-2"
                  />
                  {service.image && (
                    <div className="relative w-full h-36 rounded-lg overflow-hidden border border-border-light bg-light-gray">
                      <Image src={service.image} alt={service.title} fill className="object-cover" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Contact & Socials Editor */}
      {activeTab === 'contact' && (
        <div className="space-y-8 bg-white p-6 md:p-8 rounded-2xl border border-border-light shadow-sm">
          <div className="space-y-4">
            <h2 className="text-base font-bold text-dark uppercase tracking-wider text-teal-700 border-b border-border-light pb-2">
              1. Coordonnées de Contact
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-dark mb-1">Numéro de Téléphone (Appel)</label>
                <input
                  type="text"
                  value={content.contact?.phone || ''}
                  onChange={(e) => updateNestedValue('contact', ['phone'], e.target.value)}
                  placeholder="+261 34 00 000 00"
                  className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-dark mb-1">Numéro WhatsApp (sans le +)</label>
                <input
                  type="text"
                  value={content.contact?.whatsapp || ''}
                  onChange={(e) => updateNestedValue('contact', ['whatsapp'], e.target.value)}
                  placeholder="261340000000"
                  className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-dark mb-1">Adresse Email</label>
                <input
                  type="email"
                  value={content.contact?.email || ''}
                  onChange={(e) => updateNestedValue('contact', ['email'], e.target.value)}
                  placeholder="contact@mpanorina-nofy.mg"
                  className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-dark mb-1">Horaires d&apos;ouverture</label>
                <input
                  type="text"
                  value={content.contact?.hours || ''}
                  onChange={(e) => updateNestedValue('contact', ['hours'], e.target.value)}
                  placeholder="Lun - Ven : 8h00 - 17h00"
                  className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-dark mb-1">Adresse Physique Complète</label>
              <input
                type="text"
                value={content.contact?.fullAddress || ''}
                onChange={(e) => updateNestedValue('contact', ['fullAddress'], e.target.value)}
                placeholder="Antananarivo, Madagascar"
                className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4 pt-6 border-t border-border-light">
            <h2 className="text-base font-bold text-dark uppercase tracking-wider text-teal-700 border-b border-border-light pb-2">
              2. Liens des Réseaux Sociaux
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-dark mb-1">Page Facebook (URL)</label>
                <input
                  type="url"
                  value={content.contact?.facebook || ''}
                  onChange={(e) => updateNestedValue('contact', ['facebook'], e.target.value)}
                  placeholder="https://facebook.com/..."
                  className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-dark mb-1">Page Instagram (URL)</label>
                <input
                  type="url"
                  value={content.contact?.instagram || ''}
                  onChange={(e) => updateNestedValue('contact', ['instagram'], e.target.value)}
                  placeholder="https://instagram.com/..."
                  className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-dark mb-1">Page LinkedIn (URL)</label>
                <input
                  type="url"
                  value={content.contact?.linkedin || ''}
                  onChange={(e) => updateNestedValue('contact', ['linkedin'], e.target.value)}
                  placeholder="https://linkedin.com/..."
                  className="w-full px-4 py-2 text-sm bg-[#F9FAFB] border border-border-light rounded-lg focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Key Stats Editor */}
      {activeTab === 'stats' && (
        <div className="space-y-6 bg-white p-6 md:p-8 rounded-2xl border border-border-light shadow-sm">
          <h2 className="text-base font-bold text-dark uppercase tracking-wider text-teal-700 border-b border-border-light pb-2">
            Compteurs &amp; Statistiques Clés
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.stats?.items?.map((stat: any, index: number) => (
              <div key={index} className="p-4 bg-light-gray/40 rounded-xl border border-border-light space-y-3">
                <span className="text-xs font-bold uppercase text-teal-700">Compteur #{index + 1}</span>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-dark mb-1">Préfixe</label>
                    <input
                      type="text"
                      value={stat.prefix || ''}
                      onChange={(e) => updateNestedValue('stats', ['items', String(index), 'prefix'], e.target.value)}
                      placeholder="+"
                      className="w-full px-3 py-1.5 text-sm bg-white border border-border-light rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-dark mb-1">Valeur</label>
                    <input
                      type="number"
                      value={stat.value || 0}
                      onChange={(e) => updateNestedValue('stats', ['items', String(index), 'value'], Number(e.target.value))}
                      className="w-full px-3 py-1.5 text-sm bg-white border border-border-light rounded-lg font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-dark mb-1">Suffixe</label>
                    <input
                      type="text"
                      value={stat.suffix || ''}
                      onChange={(e) => updateNestedValue('stats', ['items', String(index), 'suffix'], e.target.value)}
                      placeholder="%"
                      className="w-full px-3 py-1.5 text-sm bg-white border border-border-light rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-dark mb-1">Libellé descriptif</label>
                  <input
                    type="text"
                    value={stat.label || ''}
                    onChange={(e) => updateNestedValue('stats', ['items', String(index), 'label'], e.target.value)}
                    className="w-full px-3 py-1.5 text-sm bg-white border border-border-light rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: SEO & Google Indexing */}
      {activeTab === 'seo' && (
        <div className="space-y-6">
          <SeoIndexingCard />
        </div>
      )}

      {/* Floating Save Button at bottom */}
      <div className="sticky bottom-6 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-border-light shadow-xl flex items-center justify-between gap-4 z-10">
        <span className="text-xs text-muted font-medium">
          Section active : <strong className="text-dark uppercase">{activeTab}</strong>
        </span>

        <button
          onClick={() => handleSaveTab(activeTab)}
          disabled={saving}
          className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-bold px-8 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-md disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
        </button>
      </div>
    </div>
  );
}
