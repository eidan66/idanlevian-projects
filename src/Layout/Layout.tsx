import { useAppContext } from '@/components/Providers';
import { Globe, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LeadFormModal, { type LeadFormData } from '@/components/portfolio/LeadFormModal';
import emailjs from 'emailjs-com';
import Footer from '@/components/shared/Footer';
import { AnimatePresence, motion } from 'framer-motion';

function AppLayout({ children, currentPageName }: { children: React.ReactNode; currentPageName: string }) {
  const { language, setLanguage, t } = useAppContext() as { language: string; setLanguage: (lang: string) => void; t: (key: string) => string };

  // Lead form modal logic
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const openModal = () => setShowLeadForm(true);
    window.addEventListener('open-lead-form', openModal);
    return () => window.removeEventListener('open-lead-form', openModal);
  }, []);

  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || process.env.EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || process.env.EMAILJS_TEMPLATE_ID;
  const EMAILJS_USER_ID = import.meta.env.VITE_EMAILJS_USER_ID || process.env.EMAILJS_USER_ID;

  const handleLeadSubmit = async (data: LeadFormData): Promise<boolean> => {
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: data.name || '-',
          email: data.email || '-',
          phone: data.phone || '-',
          project_type: data.project_type || '-',
          message: data.message || '-',
          budget_range: data.budget_range || '-',
          timeline: data.timeline || '-',
          status: data.status || '-',
        },
        EMAILJS_USER_ID
      );
      setShowLeadForm(false);
      return true;
    } catch (error) {
      console.error('Error submitting lead:', error);
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white transition-all duration-300">
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only absolute top-2 left-2 bg-white text-blue-700 px-4 py-2 rounded z-50 shadow-lg">Skip to main content</a>
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700">
        <div className="container flex flex-row w-full justify-between px-4 sm:px-6 lg:px-4">
          {/* Responsive header: mobile and desktop */}
          <div className="flex items-center justify-between w-full h-20 relative">
            {/* Logo always at start (left for LTR, right for RTL) */}
            <Link to="/projects" className="flex flex-col items-start justify-center gap-0 hover:opacity-80 transition-opacity">
              <span className="flex items-center gap-2">
                <span className="text-blue-500 text-3xl font-bold">{'<'}</span>
                <span className="text-white text-3xl font-bold">IdanLevian</span>
                <span className="text-blue-500 text-3xl font-bold">{'/>'}</span>
              </span>
              <span className="text-white text-lg font-semibold leading-tight mt-1">Web & Mobile Developer</span>
            </Link>
            {/* Desktop nav links */}
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
            {/* Desktop: Language Switcher */}
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="ghost" 
                size="icon"
                onClick={() => setLanguage(language === 'he' ? 'en' : 'he')}
                className="hover:bg-slate-800 flex items-center gap-2"
              >
                <Globe className="h-5 w-5 text-white" />
                <span className="text-white text-sm font-medium">{language === 'he' ? 'EN' : 'HE'}</span>
              </Button>
            </div>
            {/* Hamburger icon always at end (right for LTR, left for RTL) */}
            <div className="md:hidden flex items-center">
              <button
                className="p-2 rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ zIndex: 51 }}
                onClick={() => setMobileNavOpen((open) => !open)}
                aria-label={mobileNavOpen ? t('close') : t('openMenu')}
              >
                {mobileNavOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            key="mobile-menu-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-50 bg-black/70"
            onClick={() => setMobileNavOpen(false)}
          >
            <motion.nav
              key="mobile-menu-nav"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.35 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-slate-900 flex flex-col p-6 pt-8 shadow-2xl"
              onClick={e => e.stopPropagation()}
              style={{ minHeight: '100vh' }}
            >
              {/* Logo centered at the top, not in a flex row with X */}
              <div className="flex justify-center items-center mb-8 mt-2">
                <Link to="/projects" onClick={() => setMobileNavOpen(false)}>
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/d22e8fc17_Group14.png" 
                    alt="Logo" 
                    className="h-12 w-auto"
                  />
                </Link>
              </div>
              <div className="flex flex-1 flex-col gap-6 items-center justify-center mt-8">
                <Link
                  to="/projects"
                  className={`w-full text-center px-3 py-3 rounded-lg text-lg font-medium transition-colors ${
                    currentPageName === 'Projects' 
                      ? 'bg-blue-900/30 text-blue-300' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                  onClick={() => setMobileNavOpen(false)}
                >
                  {t('projects')}
                </Link>
                <Link
                  to="/projects/about"
                  className={`w-full text-center px-3 py-3 rounded-lg text-lg font-medium transition-colors ${
                    currentPageName === 'About' 
                      ? 'bg-blue-900/30 text-blue-300' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                  onClick={() => setMobileNavOpen(false)}
                >
                  {t('aboutMe')}
                </Link>
              </div>
              {/* Mobile: Language Switcher */}
              <div className="mt-auto pt-12 flex justify-center">
                <Button
                  variant="ghost" 
                  size="icon"
                  onClick={() => setLanguage(language === 'he' ? 'en' : 'he')}
                  className="hover:bg-slate-800 flex items-center gap-2"
                >
                  <Globe className="h-5 w-5 text-white" />
                  <span className="text-white text-base font-medium">{language === 'he' ? 'EN' : 'HE'}</span>
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        )}
        </AnimatePresence>
      </header>
      <main id="main-content">
        {children}
      </main>
      {/* Global Lead Form Modal */}
      {showLeadForm && (
        <LeadFormModal
          onClose={() => setShowLeadForm(false)}
          onSubmit={handleLeadSubmit}
        />
      )}
      <Footer onContactClick={() => setShowLeadForm(true)} />
    </div>
  );
}

export default function Layout({ children, currentPageName }: { children: React.ReactNode; currentPageName: string }) {
  return (
    <AppLayout currentPageName={currentPageName}>{children}</AppLayout>
  );
}