import { useAppContext } from '@/components/Providers';
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FooterProps {
  onContactClick: () => void;
}

export default function Footer({ onContactClick }: FooterProps) {
  const { t } = useAppContext() as { t: (key: string) => string };

  const whatsappUrl = `https://wa.me/972505877179?text=${encodeURIComponent('היי! הגעתי דרך האתר שלך, אשמח לדבר איתך בנוגע לפרויקט.')}`;

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t('footerTitle')}
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              {t('footerSubtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={onContactClick}
                className="btn-primary px-8 py-3 text-lg font-medium rounded-xl"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                {t('contactMe')}
              </Button>
              
              <Button
                onClick={() => window.open(whatsappUrl, '_blank')}
                variant="outline"
                className="px-8 py-3 text-lg font-medium rounded-xl border-slate-600 text-white hover:bg-slate-800"
              >
                {t('whatsappText')}
                <ExternalLink className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-right">
            <div>
              <h3 className="font-semibold text-lg mb-4">{t('footer.contactMethods')}</h3>
              <div className="space-y-2 text-slate-300">
                <p>📧 idanlv66@gmail.com</p>
                <p>📱 050-587-7179</p>
                <p>📍 {t('footer.location')}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">{t('footer.services')}</h3>
              <div className="space-y-2 text-slate-300">
                <p>{t('footer.webDevelopment')}</p>
                <p>{t('footer.mobileApps')}</p>
                <p>{t('footer.techConsulting')}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">{t('footer.quickLinks')}</h3>
              <div className="space-y-2 text-slate-300">
                <Link 
                  to="/projects" 
                  className="block hover:text-white cursor-pointer transition-colors"
                >
                  {t('footer.myProjects')}
                </Link>
                <Link 
                  to="about" 
                  className="block hover:text-white cursor-pointer transition-colors"
                >
                  {t('footer.aboutMe')}
                </Link>
                <button 
                  onClick={onContactClick}
                  className="block hover:text-white cursor-pointer transition-colors text-right"
                >
                  {t('footer.contact')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              {t('footerCopyright')}
            </p>
            
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <span>{t('footer.builtWithLove')}</span>
              <Heart className="w-4 h-4 text-red-500" />
              <a href="https://idanlevian.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-400">Idan Levian</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}