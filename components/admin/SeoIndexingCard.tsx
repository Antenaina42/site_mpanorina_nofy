'use client';

import React, { useState, useEffect } from 'react';
import { Globe, Eye, EyeOff, CheckCircle2, AlertTriangle, RefreshCw, ShieldAlert, Sparkles } from 'lucide-react';

export default function SeoIndexingCard({ className = '' }: { className?: string }) {
  const [isIndexed, setIsIndexed] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const fetchSeoStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/seo');
      const data = await res.json();
      if (data.success) {
        setIsIndexed(data.isIndexed);
      }
    } catch (err) {
      console.error('Erreur récupération SEO:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeoStatus();
  }, []);

  const handleToggle = async (newState: boolean) => {
    setUpdating(true);
    setMessage(null);

    try {
      const res = await fetch('/api/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isIndexed: newState }),
      });

      const data = await res.json();
      if (data.success) {
        setIsIndexed(data.isIndexed);
        setMessage({
          text: data.message || (newState ? 'Indexation Google activée !' : 'Désindexation Google activée !'),
          type: 'success',
        });
      } else {
        setMessage({ text: data.error || 'Erreur lors de la mise à jour SEO.', type: 'error' });
      }
    } catch (err: any) {
      setMessage({ text: err.message || 'Erreur réseau.', type: 'error' });
    } finally {
      setUpdating(false);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  return (
    <div className={`bg-white rounded-2xl border border-border-light shadow-sm overflow-hidden p-6 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border-light">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
              isIndexed
                ? 'bg-emerald-50 text-emerald-600'
                : 'bg-rose-50 text-rose-600'
            }`}
          >
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-dark font-display flex items-center gap-2">
              Visibilité Moteurs de Recherche (Google / SEO)
            </h3>
            <p className="text-xs text-muted">
              Contrôlez si le site web doit apparaître ou non dans les résultats de recherche Google.
            </p>
          </div>
        </div>

        {/* Status Badge */}
        {!loading && (
          <div className="flex items-center gap-2">
            {isIndexed ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <Eye className="w-3.5 h-3.5" />
                Indexé (Visible sur Google)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
                <EyeOff className="w-3.5 h-3.5" />
                Désindexé (Masqué de Google)
              </span>
            )}
          </div>
        )}
      </div>

      {/* Message feedback */}
      {message && (
        <div
          className={`mt-4 p-3 rounded-xl text-xs font-medium flex items-center gap-2.5 ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Content description & Buttons */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-8 text-sm text-muted space-y-2">
          {isIndexed ? (
            <div className="space-y-1">
              <p className="text-dark font-medium text-xs sm:text-sm">
                ✅ <strong>État actuel :</strong> Le site est public et ouvert aux moteurs de recherche.
              </p>
              <p className="text-xs text-muted leading-relaxed">
                Les balises <code className="bg-light-gray px-1.5 py-0.5 rounded text-teal-700">robots: index, follow</code> et le fichier <code className="bg-light-gray px-1.5 py-0.5 rounded text-teal-700">robots.txt</code> autorisent Google à explorer et positionner vos pages.
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-rose-700 font-bold text-xs sm:text-sm flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                <strong>État actuel :</strong> Le site est désindexé (protégé contre l&apos;affichage Google).
              </p>
              <p className="text-xs text-muted leading-relaxed">
                Les balises <code className="bg-light-gray px-1.5 py-0.5 rounded text-rose-700">robots: noindex, nofollow</code> et la consigne <code className="bg-light-gray px-1.5 py-0.5 rounded text-rose-700">Disallow: /</code> interdisent à Google d&apos;afficher le site dans les résultats.
              </p>
            </div>
          )}
        </div>

        {/* Action Toggle Buttons */}
        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5">
          {isIndexed ? (
            <button
              onClick={() => handleToggle(false)}
              disabled={updating || loading}
              className="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              <EyeOff className="w-4 h-4" />
              {updating ? 'Traitement...' : 'Désindexer le site (Masquer de Google)'}
            </button>
          ) : (
            <button
              onClick={() => handleToggle(true)}
              disabled={updating || loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm disabled:opacity-50"
            >
              <Eye className="w-4 h-4" />
              {updating ? 'Traitement...' : 'Activer l&apos;Indexation (Afficher sur Google)'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
