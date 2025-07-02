import { useState } from 'react';
import { useAppContext } from '@/components/Providers';
import Footer from '../components/shared/Footer';
import ContactForm from '../components/about/ContactForm';
import { Code, Smartphone, Award, Coffee, Heart, Zap } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  project_type: string;
  message: string;
}

export default function About() {
  const { t } = useAppContext();
  const [showContactForm, setShowContactForm] = useState(false);

  // This handler is only for logging/demo, not for sending email
  const handleContactFormSubmit = async (data: ContactFormData): Promise<boolean> => {
    // You can add any additional logic here (e.g., analytics, saving to DB)
    console.log('ContactForm onSubmit called with:', data);
    return true; // Always return true to show the success message
  };

  const skills = [
    {
      icon: Code,
      title: t('webDev'),
      description: t('webDevDesc'),
      technologies: ['React', 'Next.js', 'Node.js', 'TypeScript']
    },
    {
      icon: Smartphone,
      title: t('mobileDev'), 
      description: t('mobileDevDesc'),
      technologies: ['React Native', 'Flutter', 'iOS', 'Android']
    },
    {
      icon: Zap,
      title: 'אינטגרציות API',
      description: 'חיבור מערכות, שירותים חיצוניים ו-AI לאוטומציה וחדשנות',
      technologies: ['REST', 'GraphQL', 'Webhooks', 'OpenAI', 'Firebase']
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Helmet>
        <title>Idan Levian | {t('aboutTitle')}</title>
        <meta name="description" content={t('aboutDescription')} />
        <link rel="canonical" href="https://idanlevian.com/projects/about" />
        <meta property="og:title" content={`Idan Levian | ${t('aboutTitle')}`} />
        <meta property="og:description" content={t('aboutDescription')} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://idanlevian.com/projects/about" />
        <meta property="og:image" content="https://idanlevian.com/images/profilePic.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Idan Levian | ${t('aboutTitle')}`} />
        <meta name="twitter:description" content={t('aboutDescription')} />
        <meta name="twitter:image" content="https://idanlevian.com/images/profilePic.jpg" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Idan Levian",
            "jobTitle": "Full Stack Developer",
            "url": "https://idanlevian.com/",
            "image": "https://idanlevian.com/images/profilePic.jpg",
            "sameAs": [
              "https://github.com/eidan66",
              "https://www.linkedin.com/in/idanlevian/"
            ]
          }
        `}</script>
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://idanlevian.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "About",
                "item": "https://idanlevian.com/projects/about"
              }
            ]
          }
        `}</script>
      </Helmet>
      {/* Hero Section */}
      <header role="banner">
        {/* Navigation and branding would go here if present */}
      </header>
      <main role="main">
        <section className="relative overflow-hidden bg-slate-900 py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="fade-in">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  {t('aboutTitle')}
                </h1>
                
                <p className="text-xl text-slate-300 mb-6">
                  {t('aboutSubtitle')}
                </p>
                
                <p className="text-lg text-slate-300 leading-relaxed mb-8">
                  {t('aboutDescription')}
                </p>

                <div className="flex items-center gap-6 text-slate-300">
                  <div className="flex items-center gap-2">
                    <Coffee className="w-5 h-5 text-amber-500" />
                    <span>{t('about.experience')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    <span>{t('about.projects')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span>{t('about.passion')}</span>
                  </div>
                </div>
              </div>

              {/* Profile Image */}
              <div className="fade-in lg:order-first" style={{ animationDelay: '200ms' }}>
                <div className="relative">
                  <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-slate-700 to-slate-600 rounded-3xl overflow-hidden shadow-2xl">
                    {/* Profile image */}
                    <img 
                      src={`${import.meta.env.BASE_URL}images/profilePic.jpg`} 
                      alt="Idan Levian profile" 
                      loading="lazy"
                      className="w-full h-full object-cover rounded-3xl" 
                    />
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500/10 rounded-full blur-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-16 lg:py-24 bg-slate-800/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 fade-in">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {t('myExpertise')}
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                {t('about.skillsSubtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-slate-800 rounded-2xl p-8 shadow-lg hover-lift border border-slate-700 fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                    <skill.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">
                    {skill.title}
                  </h3>
                  
                  <p className="text-slate-300 mb-6">
                    {skill.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {skill.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      {/* Contact Form Modal */}
      {showContactForm && (
        (console.log('ContactForm rendered'),
        <ContactForm
          onClose={() => setShowContactForm(false)}
          onSubmit={handleContactFormSubmit}
        />)
      )}
      {/* Footer */}
      <footer role="contentinfo">
        <Footer onContactClick={() => setShowContactForm(true)} />
      </footer>
    </div>
  );
}