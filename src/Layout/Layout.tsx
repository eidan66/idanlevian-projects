import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Footer } from '@/components/Footer/Footer';
import { Navbar } from '@/components/Navbar/Navbar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const {i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div dir={lang === 'he' ? 'rtl' : 'ltr'} className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
    <Navbar/> 
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}