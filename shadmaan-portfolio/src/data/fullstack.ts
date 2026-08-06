import type { ResumeData } from '@/types/resume';

export const fullstackData: ResumeData = {
  variant: 'fullstack',
  name: 'Shadmaan Hussain',
  title: 'C# / .NET Core Software Engineer',
  tagline: 'C# .NET Core Web APIs • Azure Functions • React / TypeScript',
  pageTitle: 'Shadmaan Hussain — Full Stack Engineer',
  summary:
    'C# / .NET Core Software Engineer with 3+ years building backend systems at a Microsoft engineering partner. I specialize in C# .NET Core Web APIs, serverless Azure Functions, SQL Data Warehouse, and REST microservices, with React/TypeScript delivery — using layered architecture, async/await, Entity Framework, and Azure DevOps CI/CD.',
  about:
    'I build end-to-end systems — designing C# .NET Core Web APIs with layered architecture and dependency injection, backing them with SQL Data Warehouse, and shipping typed React/TypeScript dashboards on top. My day-to-day spans serverless Azure Functions, identity (MSAL / Entra External ID, OAuth 2.0 / OIDC), query tuning, and Azure DevOps CI/CD pipelines.',
  contact: {
    email: 'shd.hussain.dev@gmail.com',
    phone: '+91 8102444245',
    linkedin: 'https://www.linkedin.com/in/shadmaan-hussain-73075719a/',
    github: 'https://github.com/ShadmaanHussain',
    location: 'Noida, Uttar Pradesh, India',
  },
  stats: [
    { label: 'Years of experience', value: '3+' },
    { label: 'API latency reduced', value: '3–4x' },
    { label: 'Reusable UI across', value: '3+ projects' },
    { label: 'Microsoft certification', value: 'AZ-900' },
  ],
  experience: [
    {
      company: 'GlobalLogic India Pvt Ltd',
      role: 'Software Engineer',
      period: 'Jun 2023 — Present',
      location: 'Noida, Uttar Pradesh',
      bullets: [
        'Architected the licensing analytics backend for an internal Microsoft platform — C# .NET Core REST APIs with a layered architecture and dependency-injected services on SQL Data Warehouse — powering real-time tracking and 12-month CSV exports.',
        'Shipped multiple Azure Functions as serverless microservices (HTTP and timer triggers), including a GitHub REST API integration auto-generating Markdown PRs.',
        'Built secure C# .NET Core Web APIs with async/await and Entity Framework; secured endpoints via MSAL (Entra External ID), OAuth 2.0 / OIDC, Graph API, and Ping Identity SSO with RBAC.',
        'Tuned SQL Data Warehouse access with covering indexes, batched reads to eliminate N+1 patterns, and caching — reducing average API latency 3–4x.',
        'Configured Azure DevOps CI/CD pipelines for .NET with automated build/test gates; raised deployment cadence from bi-weekly to several times weekly.',
        'Delivered React / TypeScript dashboards on the .NET APIs; built a reusable component library cutting UI duplication across 3+ projects.',
        'Built an in-app AI assistant on the Copilot Client SDK with GitHub Copilot and Claude, applying prompt engineering and context grounding over internal docs; used AI-assisted development for scaffolding/tests, accelerating delivery.',
      ],
    },
    {
      company: 'GlobalLogic India Pvt Ltd',
      role: 'Software Engineer Trainee',
      period: 'Feb 2023 — Jun 2023',
      location: 'Noida, Uttar Pradesh',
      bullets: [
        'Authored production C# server-side validation plugins enforcing business rules on a Microsoft docs review pipeline, cutting release turnaround time.',
      ],
    },
  ],
  skills: [
    {
      category: 'Languages',
      items: ['C#', 'TypeScript', 'JavaScript (ES6+)', 'SQL (T-SQL)', 'HTML5', 'CSS3'],
    },
    {
      category: 'Backend',
      items: [
        '.NET Core (Web API)',
        'ASP.NET Core',
        'REST APIs',
        'Azure Functions (Serverless Microservices)',
        'Entity Framework',
        'LINQ',
        'Dependency Injection',
        'Async/Await',
      ],
    },
    {
      category: 'Data & Cloud',
      items: [
        'SQL Server',
        'SQL Data Warehouse',
        'Stored Procedures',
        'Indexing & Query Optimization',
        'Azure App Services',
        'Azure AI Services',
        'Application Insights',
      ],
    },
    {
      category: 'Auth & Security',
      items: [
        'MSAL / Entra ID',
        'OAuth 2.0',
        'OIDC',
        'JWT',
        'RBAC',
        'Graph API',
        'Ping Identity SSO',
      ],
    },
    {
      category: 'Frontend',
      items: [
        'React',
        'TypeScript',
        'Redux',
        'Context API',
        'Next.js',
        'Fluent UI',
        'Tailwind CSS',
        'Bootstrap',
      ],
    },
    {
      category: 'AI Engineering',
      items: [
        'GitHub Copilot',
        'Claude',
        'LLM Integration',
        'Prompt Engineering',
        'Context Grounding',
        'Azure OpenAI',
      ],
    },
    {
      category: 'DevOps & Tools',
      items: [
        'Azure DevOps (CI/CD)',
        'Git',
        'GitHub',
        'Visual Studio',
        'VS Code',
        'Postman',
        'Vite',
        'Webpack',
        'Jest',
        'React Testing Library',
      ],
    },
  ],
  resumePdfPath: '/resumes/Resume_FullStack.pdf',
};
