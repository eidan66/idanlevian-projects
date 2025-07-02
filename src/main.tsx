import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './i18n';
import { AppProvider } from '@/components/Providers';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/shared/ErrorBoundary';
import PWAUpdateToast from './components/PWAUpdateToast';
import GoogleAnalytics from './components/GoogleAnalytics';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
if (GA_MEASUREMENT_ID) {
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}');
  `;
  document.head.appendChild(script2);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SpeedInsights />
    <Analytics />
    <ErrorBoundary>
      <PWAUpdateToast />
      <HelmetProvider>
        <BrowserRouter>
          <AppProvider>
            <GoogleAnalytics />
            <Routes>
              <Route path="/projects/*" element={<App />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppProvider>
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>
);