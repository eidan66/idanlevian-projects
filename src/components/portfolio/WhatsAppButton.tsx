import { useAppContext } from '@/components/Providers';
import { Button } from "@/components/ui/button";
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const { t } = useAppContext() as { t: (key: string) => string };

  const whatsappText = t('whatsappMessage');
  const whatsappUrl = `https://wa.me/972505877179?text=${encodeURIComponent(whatsappText)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Button
        onClick={() => window.open(whatsappUrl, '_blank')}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        size="lg"
      >
        <MessageCircle className="w-6 h-6 mr-2" />
        <span className="hidden sm:inline">
          {t('whatsappText')}
        </span>
      </Button>
    </div>
  );
}