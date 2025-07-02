import { useState } from 'react';
import { useAppContext } from '@/components/Providers';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';

type ProjectCategory = 'landing-pages' | 'mobile-apps' | 'web-development';

interface Project {
  title_he: string;
  title_en: string;
  category: ProjectCategory;
  description_he: string;
  description_en: string;
  thumbnail_url: string;
  image_urls?: string[];
  technologies?: string[];
  live_url?: string;
  repo_url?: string;
  featured?: boolean;
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t, language } = useAppContext() as { t: (key: string) => string; language: string };
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const title = language === 'he' ? project.title_he : project.title_en;
  const description = language === 'he' ? project.description_he : project.description_en;
  
  const images = project.image_urls && project.image_urls.length > 0 
    ? project.image_urls 
    : [project.thumbnail_url].filter(Boolean);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto" role="dialog" aria-modal="true">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl font-sans" dir={language === 'he' ? 'rtl' : 'ltr'}>
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {title}
          </h2>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            className="hover:bg-slate-100 dark:hover:bg-slate-700"
            aria-label={t('close')}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Image Gallery */}
        {images.length > 0 && (
          <div className="relative">
            <div className="aspect-video bg-slate-100 dark:bg-slate-700 relative overflow-hidden">
              <img 
                src={images[currentImageIndex]}
                alt={`${title} - תמונה ${currentImageIndex + 1}`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              
              {images.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
                    aria-label={t('previous')}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
                    aria-label={t('next')}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>

                  {/* Image indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex 
                            ? 'bg-white scale-125' 
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
              תיאור הפרויקט
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
              {t('technologies')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((tech, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            {project.live_url && (
              <Button 
                className="flex-1 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                onClick={() => window.open(project.live_url, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                {t('viewLive')}
              </Button>
            )}
            
            {project.repo_url && (
              <Button 
                className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
                onClick={() => window.open(project.repo_url, '_blank')}
              >
                <Github className="w-4 h-4 mr-2" />
                {t('viewCode')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
