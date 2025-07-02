import { useAppContext } from '@/components/Providers';
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  const { t } = useAppContext() as { t: (key: string) => string };

  const whatsappText = t('whatsappMessage');
  const whatsappUrl = `https://wa.me/972505877179?text=${encodeURIComponent(whatsappText)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Button
        onClick={() => window.open(whatsappUrl, '_blank')}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 min-w-[48px]"
        size="lg"
      >
        <FaWhatsapp className="w-6 h-6" />
        <span className="font-semibold text-base">WhatsApp</span>
      </Button>
    </div>
  );
}