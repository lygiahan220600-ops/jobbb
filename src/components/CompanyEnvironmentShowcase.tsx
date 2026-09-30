import React, { useState, useEffect } from 'react';
import {
  Building2,
  Coffee,
  Users2,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Sliders,
  ZoomIn,
  ZoomOut,
  ImageIcon
} from 'lucide-react';
import { CompanyPhoto, CompanyPhotoTag, Language } from '../types/job';
import { TRANSLATIONS } from '../utils/i18n';

interface CompanyEnvironmentShowcaseProps {
  photos?: CompanyPhoto[];
  companyName: string;
  lang?: Language;
}

export const CompanyEnvironmentShowcase: React.FC<CompanyEnvironmentShowcaseProps> = ({
  photos = [],
  companyName,
  lang = 'vi',
}) => {
  const t = TRANSLATIONS[lang];
  const [selectedTag, setSelectedTag] = useState<CompanyPhotoTag | 'all'>('all');
  const [viewMode, setViewMode] = useState<'slider' | 'grid'>('slider');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Filter photos by selected tag
  const filteredPhotos = selectedTag === 'all'
    ? photos
    : photos.filter((p) => p.tag === selectedTag);

  // Close lightbox on escape key, and arrow key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') {
        setLightboxIndex(null);
        setZoomLevel(1);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1));
        setZoomLevel(1);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0));
        setZoomLevel(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredPhotos.length]);

  if (!photos || photos.length === 0) {
    return null;
  }

  const getTagBadge = (tag: CompanyPhotoTag) => {
    switch (tag) {
      case 'office':
        return {
          label: lang === 'ko' ? '사무실' : lang === 'en' ? 'Office' : 'Phòng làm việc',
          icon: <Building2 className="w-3.5 h-3.5" />,
          color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        };
      case 'pantry':
        return {
          label: lang === 'ko' ? '휴게실 / 팬트리' : lang === 'en' ? 'Pantry Lounge' : 'Khu vực giải trí (Pantry)',
          icon: <Coffee className="w-3.5 h-3.5" />,
          color: 'bg-amber-50 text-amber-800 border-amber-200',
        };
      case 'team_building':
        return {
          label: lang === 'ko' ? '팀 빌딩 활동' : lang === 'en' ? 'Team Building' : 'Hoạt động tập thể',
          icon: <Users2 className="w-3.5 h-3.5" />,
          color: 'bg-sky-50 text-sky-800 border-sky-200',
        };
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex > 0 ? lightboxIndex - 1 : filteredPhotos.length - 1);
      setZoomLevel(1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex < filteredPhotos.length - 1 ? lightboxIndex + 1 : 0);
      setZoomLevel(1);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EDE6D6] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[#385A45]" />
            <h3 className="text-sm font-bold text-[#1B2C24]">
              {t.companyPhotosTitle}
            </h3>
            <span className="text-[11px] font-mono text-neutral-500">
              ({filteredPhotos.length} {t.photoCount.toLowerCase()})
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-0.5">
            {t.companyPhotosSubtitle} - {companyName}
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center bg-[#F5F1E8] p-1 rounded-lg border border-[#DED3BD]">
            <button
              type="button"
              onClick={() => setViewMode('slider')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                viewMode === 'slider'
                  ? 'bg-white text-[#1B2C24] shadow-xs'
                  : 'text-neutral-600 hover:text-[#1B2C24]'
              }`}
              title={t.viewSlider}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{t.viewSlider}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-[#1B2C24] shadow-xs'
                  : 'text-neutral-600 hover:text-[#1B2C24]'
              }`}
              title={t.viewGrid}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{t.viewGrid}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tag Filter Segmented Buttons */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <button
          type="button"
          onClick={() => setSelectedTag('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            selectedTag === 'all'
              ? 'bg-[#2D4738] text-white shadow-xs'
              : 'bg-[#F5F1E8] hover:bg-[#EDE6D6] text-[#1B2C24]'
          }`}
        >
          {t.tagAll} ({photos.length})
        </button>
        <button
          type="button"
          onClick={() => setSelectedTag('office')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            selectedTag === 'office'
              ? 'bg-[#2D4738] text-white shadow-xs'
              : 'bg-[#F5F1E8] hover:bg-[#EDE6D6] text-[#1B2C24]'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>{t.tagOffice}</span>
          <span className="text-[10px] opacity-80">
            ({photos.filter((p) => p.tag === 'office').length})
          </span>
        </button>
        <button
          type="button"
          onClick={() => setSelectedTag('pantry')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            selectedTag === 'pantry'
              ? 'bg-[#2D4738] text-white shadow-xs'
              : 'bg-[#F5F1E8] hover:bg-[#EDE6D6] text-[#1B2C24]'
          }`}
        >
          <Coffee className="w-3.5 h-3.5" />
          <span>{t.tagPantry}</span>
          <span className="text-[10px] opacity-80">
            ({photos.filter((p) => p.tag === 'pantry').length})
          </span>
        </button>
        <button
          type="button"
          onClick={() => setSelectedTag('team_building')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            selectedTag === 'team_building'
              ? 'bg-[#2D4738] text-white shadow-xs'
              : 'bg-[#F5F1E8] hover:bg-[#EDE6D6] text-[#1B2C24]'
          }`}
        >
          <Users2 className="w-3.5 h-3.5" />
          <span>{t.tagTeamBuilding}</span>
          <span className="text-[10px] opacity-80">
            ({photos.filter((p) => p.tag === 'team_building').length})
          </span>
        </button>
      </div>

      {/* Main Content: Slider or Grid */}
      {viewMode === 'slider' ? (
        <div className="relative group">
          <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x scrollbar-thin snap-mandatory">
            {filteredPhotos.map((photo, idx) => {
              const badge = getTagBadge(photo.tag);
              return (
                <div
                  key={photo.id || idx}
                  onClick={() => {
                    setLightboxIndex(idx);
                    setZoomLevel(1);
                  }}
                  className="snap-start shrink-0 w-72 sm:w-80 group/card relative rounded-xl overflow-hidden border border-[#EDE6D6] bg-white cursor-pointer hover:shadow-md hover:border-[#385A45] transition-all"
                >
                  <div className="relative aspect-video overflow-hidden bg-neutral-100">
                    <img
                      src={photo.url}
                      alt={photo.caption[lang] || photo.caption.vi}
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover/card:opacity-90 transition-opacity" />
                    
                    {/* Tag badge overlay */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${badge.color} backdrop-blur-xs`}>
                        {badge.icon}
                        <span>{badge.label}</span>
                      </span>
                    </div>

                    {/* Lightbox zoom hint */}
                    <div className="absolute top-2.5 right-2.5 opacity-0 group-hover/card:opacity-100 transition-opacity bg-black/60 text-white p-1 rounded-md">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>

                    {/* Caption */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5">
                      <p className="text-white text-xs font-semibold line-clamp-1 drop-shadow-sm">
                        {photo.caption[lang] || photo.caption.vi}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredPhotos.map((photo, idx) => {
            const badge = getTagBadge(photo.tag);
            return (
              <div
                key={photo.id || idx}
                onClick={() => {
                  setLightboxIndex(idx);
                  setZoomLevel(1);
                }}
                className="group/grid relative rounded-xl overflow-hidden border border-[#EDE6D6] bg-white cursor-pointer hover:shadow-md hover:border-[#385A45] transition-all"
              >
                <div className="relative aspect-video overflow-hidden bg-neutral-100">
                  <img
                    src={photo.url}
                    alt={photo.caption[lang] || photo.caption.vi}
                    className="w-full h-full object-cover group-hover/grid:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-75 group-hover/grid:opacity-90 transition-opacity" />

                  <div className="absolute top-2.5 left-2.5">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${badge.color} backdrop-blur-xs`}>
                      {badge.icon}
                      <span>{badge.label}</span>
                    </span>
                  </div>

                  <div className="absolute top-2.5 right-2.5 opacity-0 group-hover/grid:opacity-100 transition-opacity bg-black/60 text-white p-1 rounded-md">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <p className="text-white text-xs font-semibold line-clamp-2 drop-shadow-sm">
                      {photo.caption[lang] || photo.caption.vi}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
        <div
          className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => {
            setLightboxIndex(null);
            setZoomLevel(1);
          }}
        >
          {/* Top Bar */}
          <div
            className="flex items-center justify-between text-white z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${getTagBadge(filteredPhotos[lightboxIndex].tag).color}`}>
                {getTagBadge(filteredPhotos[lightboxIndex].tag).icon}
                <span>{getTagBadge(filteredPhotos[lightboxIndex].tag).label}</span>
              </span>
              <span className="text-xs text-neutral-300 font-mono tabular-nums">
                {lightboxIndex + 1} / {filteredPhotos.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2.5))}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Zoom in"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.75))}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Zoom out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setLightboxIndex(null);
                  setZoomLevel(1);
                }}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title={t.closeLightbox}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Central Image with Zoom & Navigation */}
          <div
            className="relative flex-1 flex items-center justify-center overflow-hidden my-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev button */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all hover:scale-110 active:scale-95"
              title={t.prevPhoto}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image viewport */}
            <div className="max-w-4xl max-h-[75vh] flex items-center justify-center overflow-hidden rounded-lg">
              <img
                src={filteredPhotos[lightboxIndex].url}
                alt={filteredPhotos[lightboxIndex].caption[lang] || filteredPhotos[lightboxIndex].caption.vi}
                className="max-w-full max-h-[75vh] object-contain transition-transform duration-200 select-none shadow-2xl rounded-lg"
                style={{ transform: `scale(${zoomLevel})` }}
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Next button */}
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all hover:scale-110 active:scale-95"
              title={t.nextPhoto}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption */}
          <div
            className="text-center max-w-2xl mx-auto z-10 px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-white text-sm font-medium">
              {filteredPhotos[lightboxIndex].caption[lang] || filteredPhotos[lightboxIndex].caption.vi}
            </p>
            <p className="text-xs text-neutral-400 mt-1 font-mono">
              {companyName} · {t.zoomPhoto}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
