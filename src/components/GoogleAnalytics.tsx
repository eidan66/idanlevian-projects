import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !window.gtag) return;
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: location.pathname + location.search,
    });
  }, [location]);

  return null;
} 