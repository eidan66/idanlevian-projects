import { useEffect, useState } from 'react';

export default function PWAUpdateToast() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        setShow(true);
      });
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-4 animate-fade-in">
      <span>New version available!</span>
      <button
        className="bg-white text-blue-700 px-3 py-1 rounded font-semibold hover:bg-blue-100 transition"
        onClick={() => window.location.reload()}
      >
        Reload
      </button>
    </div>
  );
} 