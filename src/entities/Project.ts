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
    imageUrl: '/images/budgetApplication/budgetApplication.png',
    techStack: ['React', 'TypeScript', 'Styled-Components', 'Material-UI', 'Storybook', 'ApexCharts.js', 'Leaflet'],
    liveUrl: 'https://eidan66.github.io/Budget-Application/', 
    githubUrl: 'https://github.com/eidan66/Budget-Application',
    featured: false
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
    imageUrl: '/images/weddingAlbum/weddingAlbum.jpg',
    techStack: ['React', 'TypeScript', 'Styled-Components','Amazon S3'],
    liveUrl: 'https://idanlevian.com/wedding-album',
    githubUrl: 'https://github.com/eidan66/wedding-album',
    featured: true,
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
    imageUrl: '/images/algosensus/algosensus.png',
    techStack: ['React', 'TypeScript', 'Tailwindcss'],
    liveUrl: 'https://algosensus.com/',
    featured: false,
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
    imageUrl: '/images/personalWebsite/portfolio.png',
    techStack: ['React', 'Vite','TypeScript', 'Styled-Components'],
    liveUrl: 'https://idanlevian.com',
    featured: true,
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