import { useState } from 'react';
import { useAppContext } from '@/components/Providers';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Send, CheckCircle, Users, Shield, Zap } from 'lucide-react';
import Confetti from 'react-confetti';

type ProjectType = 'landing-page' | 'mobile-app' | 'web-app' | 'consulting' | 'other';
type BudgetRange = '1k-5k' | '5k-15k' | '15k-30k' | '30k-50k' | '50k+';
type Timeline = 'urgent' | '1-month' | '2-3-months' | 'flexible';
type LeadStatus = 'new' | 'contacted' | 'quoted' | 'closed-won' | 'closed-lost';

export interface LeadFormData {
  name: string;
  email: string;
  phone?: string;
  project_type: ProjectType;
  message: string;
  budget_range?: BudgetRange;
  timeline?: Timeline;
  status?: LeadStatus;
}

interface LeadFormErrors {
  name?: string;
  email?: string;
  project_type?: string;
  message?: string;
  [key: string]: string | undefined;
}

interface LeadFormModalProps {
  onClose: () => void;
  onSubmit: (data: LeadFormData) => Promise<boolean>;
}

export default function LeadFormModal({ onClose, onSubmit }: LeadFormModalProps) {
  const { t, direction } = useAppContext() as { t: (key: string) => string; direction: 'ltr' | 'rtl' };
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    phone: '',
    project_type: 'landing-page',
    message: '',
    budget_range: undefined,
    timeline: undefined,
    status: 'new',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<LeadFormErrors>({});

  const projectTypes: { value: ProjectType; label: string }[] = [
    { value: 'landing-page', label: t('landingPage') },
    { value: 'mobile-app', label: t('mobileApp') },
    { value: 'web-app', label: t('webApp') },
    { value: 'consulting', label: t('consulting') },
    { value: 'other', label: t('other') }
  ];

  const budgetRanges: { value: BudgetRange; label: string }[] = [
    { value: '1k-5k', label: t('leadForm.budget.1k5k') },
    { value: '5k-15k', label: t('leadForm.budget.5k15k') },
    { value: '15k-30k', label: t('leadForm.budget.15k30k') },
    { value: '30k-50k', label: t('leadForm.budget.30k50k') },
    { value: '50k+', label: t('leadForm.budget.50kplus') }
  ];

  const timelines: { value: Timeline; label: string }[] = [
    { value: 'urgent', label: t('leadForm.timeline.urgent') },
    { value: '1-month', label: t('leadForm.timeline.1month') },
    { value: '2-3-months', label: t('leadForm.timeline.2to3months') },
    { value: 'flexible', label: t('leadForm.timeline.flexible') }
  ];

  const validateForm = () => {
    const newErrors: LeadFormErrors = {};
    if (!formData.name.trim()) newErrors.name = t('leadForm.nameRequired');
    if (!formData.phone) newErrors.phone = t('leadForm.phoneRequired');
    if (!formData.email.trim()) newErrors.email = t('leadForm.emailRequired');
    else if (!formData.email.includes('@')) newErrors.email = t('leadForm.emailInvalid');
    if (!formData.project_type) newErrors.project_type = t('leadForm.projectTypeRequired');
    if (!formData.message.trim()) newErrors.message = t('leadForm.messageRequired');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const success = await onSubmit(formData);
      if (success) {
        setShowSuccess(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof LeadFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Helper to check if form is valid
  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.phone &&
      formData.email.trim() &&
      formData.email.includes('@') &&
      formData.project_type &&
      formData.message.trim() &&
      !isSubmitting
    );
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        {/* Confetti Animation */}
        <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={300} recycle={false} />
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl font-sans">
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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto" dir={direction} role="main">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl font-sans">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white w-full text-center">
            {t('workTogether')}
          </h2>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            className="hover:bg-slate-100 dark:hover:bg-slate-700 absolute top-6 end-6"
            aria-label={t('close')}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Value Props */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch text-center">
            <div className="flex-1 p-4 flex flex-col items-center justify-center">
              <Users className="w-8 h-8 text-blue-500 mb-2" />
              <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
                {t('leadForm.valueProp.support')}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {t('leadForm.valueProp.supportDescription')}
              </p>
            </div>
            <div className="flex-1 p-4 flex flex-col items-center justify-center">
              <Shield className="w-8 h-8 text-green-500 mb-2" />
              <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
                {t('leadForm.valueProp.pricing')}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {t('leadForm.valueProp.pricingDescription')}
              </p>
            </div>
            <div className="flex-1 p-4 flex flex-col items-center justify-center">
              <Zap className="w-8 h-8 text-purple-500 mb-2" />
              <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
                {t('leadForm.valueProp.response')}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {t('leadForm.valueProp.responseDescription')}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
                placeholder={t('leadForm.placeholder.name')}
                aria-invalid={!!errors.name}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1" aria-live="polite">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {t('phone')} *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={`mt-1 ${errors.phone ? 'border-red-500' : ''}`}
                placeholder={t('leadForm.placeholder.phone')}
                aria-invalid={!!errors.phone}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1" aria-live="polite">{errors.phone}</p>}
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
                placeholder={t('leadForm.placeholder.email')}
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1" aria-live="polite">{errors.email}</p>}
            </div>
          </div>

          {/* Project Type, Budget, Timeline in one row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {t('projectType')} *
              </Label>
              <Select 
                value={formData.project_type} 
                onValueChange={(value) => handleChange('project_type', value as ProjectType)}
                aria-invalid={!!errors.project_type}
              >
                <SelectTrigger 
                  className={`w-full mt-1 h-10 ${errors.project_type ? 'border-red-500' : ''} ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                  dir={direction}
                >
                  <SelectValue placeholder={t('selectProjectType')} />
                </SelectTrigger>
                <SelectContent dir={direction} className={`w-full ${direction === 'rtl' ? 'text-right' : 'text-left'} bg-white dark:bg-slate-800`}>
                  {projectTypes.map(type => (
                    <SelectItem key={type.value} value={type.value} className={`${direction === 'rtl' ? 'text-right' : 'text-left'} hover:bg-slate-100 dark:hover:bg-slate-700`}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.project_type && <p className="text-red-500 text-xs mt-1" aria-live="polite">{errors.project_type}</p>}
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {t('leadForm.placeholder.budget')}
              </Label>
              <Select 
                value={formData.budget_range} 
                onValueChange={(value) => handleChange('budget_range', value as BudgetRange)}
              >
                <SelectTrigger 
                  className={`w-full mt-1 h-10 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                  dir={direction}
                >
                  <SelectValue placeholder={t('leadForm.placeholder.budget')} />
                </SelectTrigger>
                <SelectContent dir={direction} className={`w-full ${direction === 'rtl' ? 'text-right' : 'text-left'} bg-white dark:bg-slate-800`}>
                  {budgetRanges.map(budget => (
                    <SelectItem key={budget.value} value={budget.value} className={`${direction === 'rtl' ? 'text-right' : 'text-left'} hover:bg-slate-100 dark:hover:bg-slate-700`}>
                      {budget.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {t('leadForm.placeholder.timeline')}
              </Label>
              <Select 
                value={formData.timeline} 
                onValueChange={(value) => handleChange('timeline', value as Timeline)}
              >
                <SelectTrigger 
                  className={`w-full mt-1 h-10 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                  dir={direction}
                >
                  <SelectValue placeholder={t('leadForm.placeholder.timeline')} />
                </SelectTrigger>
                <SelectContent dir={direction} className={`w-full ${direction === 'rtl' ? 'text-right' : 'text-left'} bg-white dark:bg-slate-800`}>
                  {timelines.map(timeline => (
                    <SelectItem key={timeline.value} value={timeline.value} className={`${direction === 'rtl' ? 'text-right' : 'text-left'} hover:bg-slate-100 dark:hover:bg-slate-700`}>
                      {timeline.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
              placeholder={t('leadForm.placeholder.message')}
              aria-invalid={!!errors.message}
            />
            {errors.message && <p className="text-red-500 text-xs mt-1" aria-live="polite">{errors.message}</p>}
          </div>

          <Button 
            type="submit" 
            disabled={!isFormValid()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium rounded-md transition-colors mt-2"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {t('send')}...
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
