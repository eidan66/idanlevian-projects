import { useAppContext } from '@/components/Providers';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onLeadFormOpen: () => void;
}

export default function HeroSection({ onLeadFormOpen }: HeroSectionProps) {
  const { t, language } = useAppContext() as { t: (key: string) => string; language: string };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative">
        <div className="max-w-4xl mx-auto text-center fade-in">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="h-6 w-6 text-blue-500 animate-pulse" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
              Idan Levian Portfolio
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            {t('myProjects')}
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t('projectsSubtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={onLeadFormOpen}
              className="btn-primary px-8 py-3 text-lg font-medium rounded-xl"
            >
              {t('workTogether')}
              <ArrowLeft className={`w-5 h-5 ${language === 'he' ? 'mr-2' : 'ml-2'}`} />
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
    </section>
  );
}
