import { useState, useEffect } from 'react';
import { Project } from '@/entities/Project';
import type { ProjectType } from '@/entities/Project';
import ProjectCard from '@/components/projects/ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ListFilter, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ProjectsPage() {
  const { t, i18n } = useTranslation();
  const rawLang = i18n.language;
  const lang: 'en' | 'he' = rawLang.startsWith('he') ? 'he' : 'en';

  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState('all');
  const [allTechs, setAllTechs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const fetchedProjects = await Project.list('-created_date');
      setProjects(fetchedProjects);
      setFilteredProjects(fetchedProjects);

      // Extract all unique technologies
      const techs = new Set<string>();
      fetchedProjects.forEach(p => p.techStack?.forEach(t => techs.add(t)));
      setAllTechs(['all', ...Array.from(techs).sort()]);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    let tempProjects = [...projects];

    if (searchTerm) {
      tempProjects = tempProjects.filter(p =>
        p.name[lang].toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description[lang].toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTech !== 'all') {
      tempProjects = tempProjects.filter(p => p.techStack?.includes(selectedTech));
    }
    
    setFilteredProjects(tempProjects);
  }, [searchTerm, selectedTech, projects, lang]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div dir={lang === 'he' ? 'rtl' : 'ltr'} className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-100 p-4 md:p-8">
      <header className="text-center mb-12 md:mb-16 pt-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-400 pb-2"
        >
          {t('projects.title')}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-slate-400 mt-2 max-w-2xl mx-auto"
        >
          {t('projects.description')}
        </motion.p>
      </header>

      <div className="max-w-6xl mx-auto mb-8 px-4">
        <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50 shadow-md">
          <div className="relative flex-grow">
            <Input 
              type="text"
              placeholder={t('projects.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-700 border-slate-600 text-slate-200 placeholder-slate-400 focus:ring-sky-500 focus:border-sky-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          </div>
          <div className="relative">
             <Select value={selectedTech} onValueChange={setSelectedTech}>
                <SelectTrigger className="w-full md:w-[200px] bg-slate-700 border-slate-600 text-slate-200 data-[placeholder]:text-slate-400 focus:ring-sky-500 focus:border-sky-500">
                  <ListFilter className="inline-block w-4 h-4 mr-2 text-slate-400" />
                  <SelectValue placeholder={t('projects.filter')} />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600 text-slate-200">
                  {allTechs.map(tech => (
                    <SelectItem key={tech} value={tech} className="focus:bg-sky-600/30">
                      {tech === 'all' ? t('projects.all') : tech}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-12 h-12 text-sky-500 animate-spin" />
          <p className="ml-4 text-xl text-slate-300">{t('projects.loading')}</p>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <ProjectCard key={project.id || index} project={project} index={index} />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <p className="text-2xl text-slate-500">{t('projects.notFound')}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}