export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  highlights: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  items: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  projects: ProjectItem[];
}

export type TemplateName = 'classic' | 'modern' | 'minimal';

let counter = 0;
export const generateId = (): string => `id-${Date.now()}-${++counter}`;

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const idx = parseInt(month, 10) - 1;
  if (idx < 0 || idx > 11) return dateStr;
  return `${months[idx]} ${year}`;
}

export const createEmptyResume = (): ResumeData => ({
  personal: { fullName: '', title: '', email: '', phone: '', location: '', linkedin: '', website: '' },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
});

export const sampleResume: ResumeData = {
  personal: {
    fullName: 'Alex Johnson',
    title: 'Senior Software Engineer',
    email: 'alex.johnson@email.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexjohnson',
    website: 'alexjohnson.dev',
  },
  summary: 'Senior Software Engineer with 8+ years of experience building scalable web applications and distributed systems. Passionate about clean architecture, developer experience, and mentoring junior engineers. Track record of leading successful projects from inception to production.',
  experience: [
    {
      id: 'exp-1',
      company: 'TechCorp Inc.',
      position: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: '2021-03',
      endDate: '',
      current: true,
      highlights: 'Led migration of monolithic application to microservices, reducing deployment time by 70%\nDesigned and implemented real-time notification system serving 2M+ daily active users\nMentored team of 5 junior developers through weekly code reviews and pair programming',
    },
    {
      id: 'exp-2',
      company: 'StartupXYZ',
      position: 'Software Engineer',
      location: 'Remote',
      startDate: '2018-06',
      endDate: '2021-02',
      current: false,
      highlights: 'Built REST API handling 10K+ requests/second using Node.js and PostgreSQL\nImplemented CI/CD pipeline reducing release cycles from 2 weeks to 2 days\nDeveloped automated testing framework increasing code coverage from 45% to 92%',
    },
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2014-08',
      endDate: '2018-05',
      gpa: '3.8',
    },
  ],
  skills: [
    { id: 'sk-1', category: 'Languages', items: 'TypeScript, JavaScript, Python, Go, SQL' },
    { id: 'sk-2', category: 'Frameworks', items: 'React, Next.js, Node.js, Express, FastAPI' },
    { id: 'sk-3', category: 'Infrastructure', items: 'AWS, Docker, Kubernetes, PostgreSQL, Redis, Git' },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'DevFlow',
      description: 'Open-source developer productivity dashboard aggregating GitHub, Jira, and Slack activity into a unified view. 500+ GitHub stars.',
      technologies: 'React, TypeScript, GraphQL, PostgreSQL',
      link: 'github.com/alexj/devflow',
    },
  ],
};
