import React, { useState } from 'react';
import { useAppContext } from '@/components/Providers';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Send, CheckCircle } from 'lucide-react';
import emailjs from 'emailjs-com';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  project_type: string;
  message: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  project_type?: string;
  message?: string;
  [key: string]: string | undefined;
}

interface ContactFormProps {
  onClose: () => void;
  onSubmit: (data: ContactFormData) => Promise<boolean>;
}

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || process.env.EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || process.env.EMAILJS_TEMPLATE_ID;
const EMAILJS_USER_ID = import.meta.env.VITE_EMAILJS_USER_ID || process.env.EMAILJS_USER_ID;

export default function ContactForm({ onClose, onSubmit }: ContactFormProps) {
  const { t } = useAppContext() as { t: (key: string) => string };
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    project_type: '',
    message: ''
  });


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<ContactFormErrors>({});

  const projectTypes = [
    { value: 'landing-page', label: t('landingPage') },
    { value: 'mobile-app', label: t('mobileApp') },
    { value: 'web-app', label: t('webApp') },
    { value: 'consulting', label: t('consulting') },
    { value: 'other', label: t('other') }
  ];

  const validateForm = () => {
    const newErrors: ContactFormErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'שם הוא שדה חובה';
    if (!formData.email.trim()) newErrors.email = 'אימייל הוא שדה חובה';
    if (!formData.email.includes('@')) newErrors.email = 'אימייל לא תקין';
    if (!formData.project_type) newErrors.project_type = 'יש לבחור סוג פרויקט';
    if (!formData.message.trim()) newErrors.message = 'הודעה היא שדה חובה';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  console.log('idan - ContactForm formData:', formData)
    
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Debug logs for EmailJS integration
      console.log('EMAILJS_SERVICE_ID:', EMAILJS_SERVICE_ID);
      console.log('EMAILJS_TEMPLATE_ID:', EMAILJS_TEMPLATE_ID);
      console.log('EMAILJS_USER_ID:', EMAILJS_USER_ID);
      console.log('EmailJS payload:', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        project_type: formData.project_type,
        message: formData.message,
      });
      // Send email via EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          project_type: formData.project_type,
          message: formData.message,
        },
        EMAILJS_USER_ID
      );
      console.log('EmailJS send call completed');
      const success = await onSubmit(formData);
      if (success) {
        setShowSuccess(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting form or sending email:', error);
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            תודה רבה!
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            {t('thankYou')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {t('contactMe')}
          </h2>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            className="hover:bg-slate-100 dark:hover:bg-slate-700"
            aria-label={t('close')}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t('name')} *
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`mt-1 ${errors.name ? 'border-red-500' : ''}`}
              placeholder="השם המלא שלך"
              aria-invalid={!!errors.name}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1" aria-live="polite">{errors.name}</p>}
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t('email')} *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
              placeholder="your@email.com"
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1" aria-live="polite">{errors.email}</p>}
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t('phone')}
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="mt-1"
              placeholder="050-123-4567"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t('projectType')} *
            </Label>
            <Select 
              value={formData.project_type} 
              onValueChange={(value) => handleChange('project_type', value)}
              aria-invalid={!!errors.project_type}
            >
              <SelectTrigger className={`mt-1 ${errors.project_type ? 'border-red-500' : ''}`}>
                <SelectValue placeholder={t('selectProjectType')} />
              </SelectTrigger>
              <SelectContent>
                {projectTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.project_type && <p className="text-red-500 text-xs mt-1" aria-live="polite">{errors.project_type}</p>}
          </div>

          <div>
            <Label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t('message')} *
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              className={`mt-1 min-h-[100px] ${errors.message ? 'border-red-500' : ''}`}
              placeholder="ספר לי על הפרויקט שלך..."
              aria-invalid={!!errors.message}
            />
            {errors.message && <p className="text-red-500 text-xs mt-1" aria-live="polite">{errors.message}</p>}
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full btn-primary py-3 text-lg font-medium"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                שולח...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                {t('send')}
              </div>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}