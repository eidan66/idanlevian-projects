import { useState, useMemo } from 'react';
import { useAppContext } from '@/components/Providers';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from 'lucide-react';
import ProjectCard from './ProjectCard';
import ProjectSkeleton from './ProjectSkeleton';

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

interface ProjectsGalleryProps {
  projects: Project[];
  isLoading: boolean;
  onProjectSelect: (project: Project) => void;
}

export default function ProjectsGallery({ projects, isLoading, onProjectSelect }: ProjectsGalleryProps) {
  const { t, language } = useAppContext() as { t: (key: string) => string; language: string };
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all');

  const categories = [
    { id: 'all', label: t('all') },
    { id: 'landing-pages', label: t('landingPages') },
    { id: 'mobile-apps', label: t('mobileApps') },
    { id: 'web-development', label: t('webDevelopment') }
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const titleKey = language === 'he' ? 'title_he' : 'title_en';
      const descKey = language === 'he' ? 'description_he' : 'description_en';
      
      const matchesSearch = searchTerm === '' || 
        project[titleKey]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project[descKey]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies?.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [projects, searchTerm, selectedCategory, language]);

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-slate-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filter Bar */}
        <div className="max-w-4xl mx-auto mb-12 fade-in">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div className="flex gap-2 flex-wrap sm:flex-row flex-col w-full sm:w-auto">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id as ProjectCategory | 'all')}
                  className={`rounded-lg transition-all w-full sm:w-auto flex flex-row items-center gap-2 justify-start sm:justify-center ${
                    selectedCategory === category.id 
                      ? 'btn-primary' 
                      : 'btn-outline-custom'
                  }`}
                >
                  <Filter className="w-3 h-3" />
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid - Fixed height grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {isLoading ? (
            Array(6).fill(0).map((_, index) => (
              <ProjectSkeleton key={index} />
            ))
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title_en + project.category}
                project={project}
                onClick={() => onProjectSelect(project)}
                delay={index * 100}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">
                {t('projectsGallery.notFound.title')}
              </h3>
              <p className="text-slate-500 dark:text-slate-400">
                {t('projectsGallery.notFound.suggestion')}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}