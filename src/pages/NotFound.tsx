import { Link } from 'react-router-dom';
import { useAppContext } from '@/components/Providers';

export default function NotFound() {
  const { t } = useAppContext() as { t: (key: string) => string };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-8">
      <div className="mb-8">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="60" fill="#6366F1" fillOpacity="0.1" />
          <ellipse cx="60" cy="80" rx="32" ry="12" fill="#6366F1" fillOpacity="0.2" />
          <circle cx="60" cy="54" r="28" fill="#6366F1" fillOpacity="0.2" />
          <text x="50%" y="60%" textAnchor="middle" fill="#6366F1" fontSize="40" fontWeight="bold" dy=".3em">404</text>
        </svg>
      </div>
      <h1 className="text-4xl font-bold mb-4">{t('notFound.title') || 'Page Not Found'}</h1>
      <p className="text-lg text-slate-300 mb-8 text-center max-w-md">{t('notFound.message') || 'Sorry, the page you are looking for does not exist or has been moved.'}</p>
      <Link to="/projects" className="btn-primary px-6 py-3 rounded-lg text-lg font-medium">
        {t('notFound.backHome') || 'Back to Home'}
      </Link>
    </div>
  );
} 