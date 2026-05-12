import type { ResumeData } from '@/types/resume';

export const powerplatformData: ResumeData = {
  variant: 'powerplatform',
  name: 'Shadmaan Hussain',
  title: 'Dynamics 365 & Power Platform Developer',
  tagline: 'Power Pages • PCF • Copilot Studio • Dataverse',
  pageTitle: 'Shadmaan Hussain — Power Platform Developer',
  summary:
    'Dynamics 365 & Power Platform Developer with 2+ years shipping production Power Pages portals, PCF controls, Copilot Studio agents, D365 plugins, Power Automate workflows, and .NET Core Web APIs for Microsoft internal teams and enterprise customers. Hands-on across Dataverse, MSAL/Entra External ID, and Azure Functions, with deep front-end expertise in React, TypeScript, and PCF.',
  about:
    'I design and ship Power Platform experiences end-to-end — from PCF controls and Power Pages portals to Copilot Studio agents, Dataverse schemas, and the .NET Core / Azure services that back them. I work directly with Microsoft engineering teams on Dynamics 365 customer scenarios.',
  contact: {
    email: 'shd.hussain.dev@gmail.com',
    phone: '+91 8102444245',
    linkedin: 'https://www.linkedin.com/in/shadmaan-hussain-73075719a/',
    github: 'https://github.com/ShadmaanHussain',
    location: 'Noida, Uttar Pradesh, India',
  },
  stats: [
    { label: 'Years of experience', value: '2+' },
    { label: 'Production PCF controls', value: '5' },
    { label: 'Revenue leakage prevented', value: '$1M+' },
    { label: 'Live Microsoft templates', value: '1' },
  ],
  experience: [
    {
      company: 'GlobalLogic India Pvt Ltd',
      role: 'Software Engineer — Dynamics 365 & Power Platform',
      period: 'Sept 2023 — Present',
      location: 'Noida, Uttar Pradesh',
      bullets: [
        'Revamped the Power Platform Admin Center Licensing UI for Power Apps with the Microsoft Engineering team, surfacing real-time license consumption and a 12-month CSV export preventing $1M+ revenue leakage.',
        'Engineered the Event Registration Template for the D365 Marketing Event Portal, now live as an official Microsoft Power Pages template; led V1→V2 and Bootstrap 3→5 migrations across legacy portals.',
        'Launched the Power Pages community hub (community.microsoftbusinessapps.com) with a custom Carousel PCF; shipped Kentucky CHFS and CDPH D365 portal UIs, showcased by Microsoft in a winning customer demo.',
        'Shipped PCF controls — Carousel, Text-to-Speech, RTO Calendar, PDF Viewer, and a Copilot Studio agent control on the Copilot Client SDK with MSAL auth — embedded across Power Pages and a customer-facing Canvas app.',
        'Developed C# .NET Core Web APIs integrating Dataverse, Azure AI Services, and a SQL Data Warehouse for a custom Licensing & Operations application.',
        'Architected an Azure Function bridging the MDA Release Planner with the GitHub API to auto-generate Markdown PRs, significantly cutting release turnaround time.',
        'Automated Power Automate workflows syncing Azure DevOps items with Dataverse rate-card tables and orchestrating the Copilot Studio Licensing Rate Card lifecycle.',
        'Designed Copilot Studio agents (Sales Insight with Dataverse knowledge, topics, RBAC, custom Client ID/Secret auth) and a content moderation & relevance plugin invoking Copilot at runtime.',
        'Built MDA tooling for Microsoft internal teams — validation plugins for Microsoft Fabric docs review/PR generation, RBAC for Release Planner, and Power Platform Community Site Dataverse schema; integrated Entra External ID (MSAL), Graph API, and Ping Identity SSO.',
      ],
    },
    {
      company: 'GlobalLogic India Pvt Ltd',
      role: 'Software Engineer Trainee',
      period: 'Feb 2023 — June 2023',
      location: 'Noida, Uttar Pradesh',
      bullets: [
        'Contributed to enterprise Power Platform front-end modules using React.js, TypeScript, and ES6+; participated in code reviews and Agile sprints, improving component reusability and maintainability by 25%.',
      ],
    },
  ],
  skills: [
    {
      category: 'Power Platform & D365',
      items: [
        'Power Pages',
        'Power Apps (MDA & Canvas)',
        'Power Automate',
        'Copilot Studio',
        'Dataverse',
        'PCF',
        'Liquid',
        'Plugins',
      ],
    },
    {
      category: 'Microsoft Cloud',
      items: [
        'Azure Functions',
        'App Services',
        'Azure AI Services',
        'Graph API',
        'Entra External ID (MSAL)',
        'Azure DevOps',
        'SQL Data Warehouse',
      ],
    },
    {
      category: 'Languages & Frameworks',
      items: [
        'TypeScript',
        'JavaScript (ES6+)',
        'C#',
        'SQL',
        'HTML5',
        'CSS3',
        'React',
        'Redux',
        'Next.js',
        '.NET Core',
        'Fluent UI',
        'Tailwind CSS',
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
  resumePdfPath: '/resumes/Resume_PowerPlatform.pdf',
};
