import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { ProjectType } from '@/entities/Project';
import { useTranslation } from 'react-i18next';

interface ProjectCardProps {
  project: ProjectType;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { t, i18n } = useTranslation();
  const rawLang = i18n.language;
  const lang: 'en' | 'he' = rawLang.startsWith('he') ? 'he' : 'en';

  if (!project) {
    return null;
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const hoverEffect = {
    scale: 1.03,
    boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
    transition: { duration: 0.3 }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={hoverEffect}
      className="bg-slate-800/70 backdrop-blur-md rounded-xl overflow-hidden shadow-lg border border-slate-700/50 flex flex-col h-full"
    >
      {project.imageUrl && (
        <div className="w-full h-48 md:h-56 overflow-hidden">
          <img 
            src={project.imageUrl} 
            alt={project.name[lang]} 
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-semibold text-sky-400 mb-2">{project.name[lang]}</h3>
        <p className="text-slate-300 text-sm mb-4 flex-grow">{project.description[lang]}</p>
        
        <div className="mb-4">
          <h4 className="text-xs text-slate-400 uppercase font-semibold mb-2">
            {t('projects.technologies')}
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack?.map((tech, idx) => (
              <Badge key={idx} variant="secondary" className="bg-slate-700 text-sky-300 border-sky-500/30">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <div className={`p-6 mt-auto flex items-center gap-3 border-t border-slate-700/50 ${project.liveUrl && project.githubUrl ? 'justify-end' : 'justify-center'}`}>
          {project.liveUrl && (
            <Button 
              variant="outline" 
              size="sm" 
              asChild
              className="border-sky-500/70 text-sky-400 hover:bg-sky-500/10 hover:text-sky-300"
            >
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                <ExternalLink className="w-4 h-4 mr-2" />
                {t('projects.liveDemo')}
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button 
              variant="ghost" 
              size="sm"
              asChild
              className="text-slate-400 hover:text-sky-400 hover:bg-slate-700/50"
            >
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                <Github className="w-4 h-4 mr-2" />
                {t('projects.source')}
              </a>
            </Button>
          )}
        </div>
    </motion.div>
  );
}