import type { ResumeData } from '@/types/resume';

export const fullstackData: ResumeData = {
  variant: 'fullstack',
  name: 'Shadmaan Hussain',
  title: 'Full Stack Software Engineer',
  tagline: 'C# .NET Core • React / TypeScript • Azure',
  pageTitle: 'Shadmaan Hussain — Full Stack Engineer',
  summary:
    'Full Stack Software Engineer with 3+ years at a Microsoft engineering partner, specializing in C# .NET Core Web APIs and React/TypeScript front-end development. Delivered production full-stack systems for Microsoft Power Platform — RESTful APIs backed by SQL Data Warehouse, serverless Azure Functions, and enterprise React dashboards.',
  about:
    'I build end-to-end web platforms — designing typed REST APIs, wiring them up to relational data warehouses, and shipping polished React/TypeScript front-ends on top. My day-to-day blends backend services, serverless microservices, identity (MSAL / Entra External ID), and modern UI work with Fluent UI and Tailwind.',
  contact: {
    email: 'shd.hussain.dev@gmail.com',
    phone: '+91 8102444245',
    linkedin: 'https://www.linkedin.com/in/shadmaan-hussain-73075719a/',
    github: 'https://github.com/ShadmaanHussain',
    location: 'Noida, Uttar Pradesh, India',
  },
  stats: [
    { label: 'Years of experience', value: '3+' },
    { label: 'Production PCF controls', value: '5' },
    { label: 'Revenue leakage prevented', value: '$1M+' },
    { label: 'Microsoft certifications', value: 'AZ-900' },
  ],
  experience: [
    {
      company: 'GlobalLogic India Pvt Ltd',
      role: 'Software Engineer',
      period: 'Sept 2023 — Present',
      location: 'Noida, Uttar Pradesh',
      bullets: [
        'Architected the full-stack Licensing platform for Microsoft Power Platform Admin Center — C# .NET Core REST APIs backed by SQL Data Warehouse and a React/TypeScript frontend — surfacing real-time license consumption and a 12-month CSV export, preventing $1M+ revenue leakage.',
        'Developed production C# .NET Core Web APIs integrating Dataverse, Azure AI Services, and SQL Data Warehouse for a custom Licensing & Operations application, enabling secure, scalable data workflows for Microsoft internal teams.',
        'Engineered Azure Functions as serverless microservices, including a GitHub API bridge auto-generating Markdown PRs from the MDA Release Planner; built C# D365 validation plugins for Microsoft Fabric docs review, significantly cutting release turnaround time.',
        'Integrated MSAL (Entra External ID) authentication, Graph API, and Ping Identity SSO across enterprise full-stack applications; implemented end-to-end RBAC and delivered an AI chatbot powered by the Copilot Client SDK in React.',
        'Shipped 5 production PCF controls (Carousel, Text-to-Speech, RTO Calendar, PDF Viewer, Copilot Agent) in React and TypeScript, deployed across Power Pages portals and Canvas apps; featured in a winning Microsoft customer demo.',
        'Delivered the front-end for the Event Registration Portal Template, now live as an official Microsoft Power Pages template; led Bootstrap 3→5 and V1→V2 migrations across legacy portals.',
        'Automated Power Automate workflows syncing Azure DevOps work items with Dataverse tables; built reusable React components with dynamic Dataverse data fetching, reducing component duplication across 3+ enterprise projects.',
      ],
    },
    {
      company: 'GlobalLogic India Pvt Ltd',
      role: 'Software Engineer Trainee',
      period: 'Feb 2023 — June 2023',
      location: 'Noida, Uttar Pradesh',
      bullets: [
        'Contributed to enterprise React.js and TypeScript front-end modules; participated in code reviews and Agile sprints, improving component reusability and maintainability by 25%.',
      ],
    },
  ],
  skills: [
    {
      category: 'Backend',
      items: [
        'C#',
        '.NET Core (Web API)',
        'REST APIs',
        'Azure Functions',
        'SQL Server',
        'SQL Data Warehouse',
        'D365 Plugins',
        'Dataverse',
      ],
    },
    {
      category: 'Frontend',
      items: [
        'React',
        'TypeScript',
        'JavaScript (ES6+)',
        'Redux',
        'Context API',
        'Next.js',
        'PCF',
        'Fluent UI',
        'Tailwind CSS',
        'Bootstrap',
      ],
    },
    {
      category: 'Cloud & Integration',
      items: [
        'Azure App Services',
        'Azure AI Services',
        'Azure DevOps',
        'Graph API',
        'Entra External ID (MSAL)',
        'Power Automate',
        'Copilot Studio',
      ],
    },
    {
      category: 'Tools & Testing',
      items: [
        'Git',
        'GitHub',
        'Visual Studio',
        'VS Code',
        'Vite',
        'Webpack',
        'Jest',
        'React Testing Library',
        'Copilot Client SDK',
        'Ping Identity',
      ],
    },
  ],
  resumePdfPath: '/resumes/Resume_FullStack.pdf',
};
