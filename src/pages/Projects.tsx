import { useState, useEffect } from 'react';
import { Project } from '@/entities/Project';
import type { ProjectType } from '@/entities/Project';
import HeroSection from '@/components/portfolio/HeroSection';
import ProjectsGallery from '@/components/portfolio/ProjectsGallery';
import ProjectModal from '@/components/portfolio/ProjectModal';
import WhatsAppButton from '@/components/portfolio/WhatsAppButton';
import { Helmet } from 'react-helmet-async';
import { useAppContext } from '@/components/Providers';

// UI Project type for portfolio components
export type ProjectCategory = 'landing-pages' | 'mobile-apps' | 'web-development';
export interface UIProject {
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

function mapProjectTypeToUIProject(p: ProjectType): UIProject {
  // You may want to improve this mapping based on your real data
  return {
    title_he: p.name.he,
    title_en: p.name.en,
    category: p.category,
    description_he: p.description.he,
    description_en: p.description.en,
    thumbnail_url: p.imageUrl,
    image_urls: p.imageUrl ? [p.imageUrl] : [],
    technologies: p.techStack,
    live_url: p.liveUrl,
    repo_url: p.githubUrl,
    featured: p.featured,
  };
}

export default function Projects() {
  const [projects, setProjects] = useState<UIProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<UIProject | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t, language } = useAppContext() as { t: (key: string) => string; language: string };

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const projectsData = await Project.list('-created_date');
      setProjects(projectsData.map(mapProjectTypeToUIProject));
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Idan Levian Portfolio | {t('projects.title')}</title>
        <meta name="description" content={t('projects.description')} />
        <link rel="canonical" href="https://idanlevian.com/projects" />
        <meta property="og:title" content={`Idan Levian Portfolio | ${t('projects.title')}`} />
        <meta property="og:description" content={t('projects.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://idanlevian.com/projects" />
        <meta property="og:image" content="https://idanlevian.com/images/profilePic.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Idan Levian Portfolio | ${t('projects.title')}`} />
        <meta name="twitter:description" content={t('projects.description')} />
        <meta name="twitter:image" content="https://idanlevian.com/images/profilePic.jpg" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://idanlevian.com/projects",
            "name": "Idan Levian Portfolio | Projects",
            "description": "${t('projects.description')}",
            "inLanguage": "${language}"
          }
        `}</script>
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://idanlevian.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Projects",
                "item": "https://idanlevian.com/projects"
              }
            ]
          }
        `}</script>
      </Helmet>
      <div className="min-h-screen bg-slate-900 text-white">
        <HeroSection onLeadFormOpen={() => window.dispatchEvent(new Event('open-lead-form'))} />
        
        <ProjectsGallery 
          projects={projects}
          isLoading={isLoading}
          onProjectSelect={setSelectedProject}
        />

        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}

        <WhatsAppButton />
      </div>
    </>
  );
}