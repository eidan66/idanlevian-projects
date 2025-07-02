import { useAppContext } from '@/components/Providers';
import { Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

function AppLayout({ children, currentPageName }: { children: React.ReactNode; currentPageName: string }) {
  const { language, setLanguage, t } = useAppContext() as { language: string; setLanguage: (lang: string) => void; t: (key: string) => string };

  return (
    <div className="min-h-screen bg-slate-900 text-white transition-all duration-300">
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only absolute top-2 left-2 bg-white text-blue-700 px-4 py-2 rounded z-50 shadow-lg">Skip to main content</a>
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <Link to="/projects" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/d22e8fc17_Group14.png" 
                  alt="Logo" 
                  className="h-12 w-auto"
                />
              </Link>

              {/* Navigation Links */}
              <nav className="hidden md:flex items-center gap-4">
                <Link 
                  to="/projects"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPageName === 'Projects' 
                      ? 'bg-blue-900/30 text-blue-300' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {t('projects')}
                </Link>
                <Link 
                  to="/projects/about"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPageName === 'About' 
                      ? 'bg-blue-900/30 text-blue-300' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {t('aboutMe')}
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost" 
                size="icon"
                onClick={() => setLanguage(language === 'he' ? 'en' : 'he')}
                className="hover:bg-slate-800"
              >
                <Globe className="h-5 w-5 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main id="main-content">
        {children}
      </main>
    </div>
  );
}

export default function Layout({ children, currentPageName }: { children: React.ReactNode; currentPageName: string }) {
  return (
    <AppLayout currentPageName={currentPageName}>{children}</AppLayout>
  );
}