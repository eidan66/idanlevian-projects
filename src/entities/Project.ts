export type LocalizedText = {
  en: string;
  he: string;
};

export type ProjectType = {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  imageUrl: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  category: 'web-development' | 'landing-pages' | 'mobile-apps';
};

const projectData: ProjectType[] = [
  {
    id: '4',
    name: {
      en: 'Budget Application',
      he: 'אפליקציית ניהול תקציב',
    },
    description: {
      en: 'A responsive budget management app for tracking income, expenses, and financial goals with monthly overviews.',
      he: 'אפליקציה רספונסיבית לניהול תקציב הכוללת מעקב אחר הכנסות, הוצאות ומטרות כלכליות עם תצוגת חודשית.',
    },
    imageUrl: `${import.meta.env.BASE_URL}images/budgetApplication/budgetApplication.png`,
    techStack: ['React', 'TypeScript', 'Styled-Components', 'Material-UI', 'Storybook', 'ApexCharts.js', 'Leaflet'],
    liveUrl: 'https://eidan66.github.io/Budget-Application/', 
    githubUrl: 'https://github.com/eidan66/Budget-Application',
    featured: false,
    category: 'web-development',
  },
  {
    id: '5',
    name: {
      en: 'Digital Conference',
      he: 'כנס דיגיטלי',
    },
    description: {
      en: 'A modern landing page for digital tech conferences, featuring animated speaker sections, event schedules, and ticketing CTA.',
      he: 'דף נחיתה מודרני לכנסי טכנולוגיה דיגיטליים, כולל הצגת מרצים, לוחות זמנים, וקריאה ברורה לרכישת כרטיסים.',
    },
    imageUrl: `${import.meta.env.BASE_URL}images/digitalConf/digitalConf.png`,
    techStack: ['React', 'TypeScript', 'Tailwindcss'],
    liveUrl: 'https://digital-conf-luih.vercel.app/',
    githubUrl: 'https://github.com/eidan66/DigitalConf',
    featured: true,
    category: 'landing-pages',
  },
  {
    id: '6',
    name: {
      en: 'ProductiFlow',
      he: 'ProductiFlow',
    },
    description: {
      en: 'A task management SaaS landing page with smart features, testimonials, pricing tables and full auth flow.',
      he: 'דף נחיתה למוצר SaaS לניהול משימות כולל הצגת תכונות חכמות, המלצות, תמחור וזרימת התחברות מלאה.',
    },
    imageUrl: `${import.meta.env.BASE_URL}images/productiFlow/productiFlow.png`,
    techStack: ['React', 'TypeScript', 'Tailwindcss'],
    liveUrl: 'https://producti-flow.vercel.app/',
    githubUrl: 'https://github.com/eidan66/ProductiFlow',
    featured: true,
    category: 'landing-pages',
  },
  {
    id: '7',
    name: {
      en: 'Flash Gadgets',
      he: 'גאדג׳טים חכמים',
    },
    description: {
      en: 'Landing page for a product e-commerce campaign. Highlights a featured gadget with smooth interactions and product specs.',
      he: 'דף נחיתה למסע פרסום של חנות אונליין לגאדג׳טים. כולל הדגשה של מוצר מוביל ואינטראקציות מרשימות.',
    },
    imageUrl: `${import.meta.env.BASE_URL}images/flashGadgets/flashGadgets.png`,
    techStack: ['React', 'TypeScript', 'Tailwindcss'],
    githubUrl: 'https://github.com/eidan66/FlashGadgets',
    liveUrl: 'https://flash-gadgets.vercel.app/',
    featured: true,
    category: 'landing-pages',
  },
  {
    id: '8',
    name: {
      en: 'ConsultBiz',
      he: 'ייעוץ עסקי',
    },
    description: {
      en: 'A focused landing page for a business consultant. Built for credibility, lead generation, and personalized contact.',
      he: 'דף נחיתה ממוקד ליועץ עסקי, בנוי לסמכות, איסוף לידים ויצירת קשר אישי.',
    },
    imageUrl: `${import.meta.env.BASE_URL}images/consultBiz/consultBiz.png`,
    techStack: ['React', 'TypeScript', 'Tailwindcss'],
    githubUrl: 'https://github.com/eidan66/ConsultBiz',
    liveUrl: 'https://consult-biz.vercel.app/',
    featured: true,
    category: 'landing-pages',
  },
  {
    id: '1',
    name: {
      en: 'Wedding Album',
      he: 'אלבום חתונה',
    },
    description: {
      en: 'A mobile-first app for wedding guests to upload and share live photos.',
      he: 'אפליקציה מותאמת לניידים לאורחי חתונה לשיתוף תמונות בלייב.',
    },
    imageUrl: `${import.meta.env.BASE_URL}images/weddingAlbum/weddingAlbum.png`,
    techStack: ['React', 'TypeScript', 'Styled-Components','Amazon S3'],
    liveUrl: 'https://idanlevian.com/wedding-album',
    githubUrl: 'https://github.com/eidan66/wedding-album',
    featured: true,
    category: 'web-development',
  },
  {
    id: '2',
    name: {
      en: 'Algosensus',
      he: 'Algosensus',
    },
    description: {
      en: 'AlgoSensus leverages advanced technologies in AI, machine learning, and IoT to transform the world of medical diagnostics and balance assessment.',
      he: 'AlgoSensus עושה שימוש בטכנולוגיות מתקדמות של בינה מלאכותית, למידת מכונה ואינטרנט של הדברים כדי לשנות את עולם האבחון הרפואי והערכת היציבה.',
    },
    imageUrl: `${import.meta.env.BASE_URL}images/algosensus/algosensus.png`,
    techStack: ['React', 'TypeScript', 'Tailwindcss'],
    liveUrl: 'https://algosensus.com/',
    featured: false,
    category: 'landing-pages',
  },
  {
    id: '3',
    name: {
      en: 'Portfolio Website',
      he: 'אתר אישי',
    },
    description: {
      en: 'Personal portfolio site showcasing frontend skills and projects.',
      he: 'אתר תיק עבודות אישי המציג מיומנויות ופרויקטים בתחום הפיתוח frontend.',
    },
    imageUrl: `${import.meta.env.BASE_URL}images/personalWebsite/portfolio.png`,
    techStack: ['React', 'Vite','TypeScript', 'Styled-Components'],
    liveUrl: 'https://idanlevian.com',
    featured: true,
    category: 'web-development',
  },
  {
    id: '9',
    name: {
      en: 'Photo Spark',
      he: 'פוטו ספארק',
    },
    description: {
      en: 'A modern web application for photographers to showcase, share, and manage their photo portfolios online.',
      he: 'אפליקציית ווב מודרנית לצלמים להצגת, שיתוף וניהול תיקי עבודות צילום אונליין.',
    },
    imageUrl: `${import.meta.env.BASE_URL}images/photoSpark/photoSpark.png`,
    techStack: ['React', 'TypeScript', 'Tailwindcss'],
    liveUrl: 'https://photo-spark.vercel.app/',
    featured: true,
    category: 'landing-pages',
  },
];

export const Project = {
  async list(sortBy: string = ''): Promise<ProjectType[]> {
    const result = [...projectData];

    if (sortBy === '-created_date') {
      // Simulate sorting (newest first — based on array order)
      result.reverse();
    }

    return new Promise(resolve => {
      setTimeout(() => resolve(result), 300); // Simulate async delay
    });
  }
};