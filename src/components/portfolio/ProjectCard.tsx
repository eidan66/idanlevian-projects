import { useAppContext } from '@/components/Providers';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Eye } from 'lucide-react';

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

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  delay?: number;
}

export default function ProjectCard({ project, onClick, delay = 0 }: ProjectCardProps) {
  const { t, language } = useAppContext() as { t: (key: string) => string; language: string };

  const title = language === 'he' ? project.title_he : project.title_en;
  const description = language === 'he' ? project.description_he : project.description_en;

  return (
    <div 
      className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover-lift border border-slate-200 dark:border-slate-700 cursor-pointer fade-in flex flex-col h-full"
      onClick={onClick}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Project Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 flex-shrink-0">
        {project.thumbnail_url ? (
          <img 
            src={project.thumbnail_url}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-500">
            <Eye className="w-16 h-16" />
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Button 
            variant="secondary" 
            size="sm"
            className="bg-white/90 hover:bg-white text-slate-900 rounded-lg"
          >
            <Eye className="w-4 h-4 mr-2" />
            {t('details')}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 min-h-[3.5rem]">
          {title}
        </h3>
        
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3 flex-1">
          {description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4 min-h-[2rem]">
          {(project.technologies?.slice(0, 3) || []).map((tech, index) => (
            <Badge
              key={index}
              variant="outline"
              className="text-xs bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700"
            >
              {tech}
            </Badge>
          ))}
          {project.technologies && project.technologies.length > 3 && (
            <Badge variant="outline" className="text-xs text-slate-500">
              +{project.technologies.length - 3}
            </Badge>
          )}
        </div>

        {/* Quick Actions - Always at bottom */}
        <div className="flex gap-2 mt-auto">
          {project.live_url && (
            <Button 
              variant="outline" 
              size="sm"
              className="flex-1 text-xs btn-outline-custom"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.live_url, '_blank');
              }}
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              {t('viewLive')}
            </Button>
          )}
          
          {project.repo_url && (
            <Button 
              variant="outline" 
              size="sm"
              className="flex-1 text-xs btn-outline-custom"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.repo_url, '_blank');
              }}
            >
              <Github className="w-3 h-3 mr-1" />
              {t('viewCode')}
            </Button>
          )}
          
          {/* Placeholder button if no links available to maintain consistent height */}
          {!project.live_url && !project.repo_url && (
            <Button 
              variant="outline" 
              size="sm"
              className="flex-1 text-xs btn-outline-custom opacity-50 cursor-not-allowed"
              disabled
            >
              <Eye className="w-3 h-3 mr-1" />
              {t('details')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}