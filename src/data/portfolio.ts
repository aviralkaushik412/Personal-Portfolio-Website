export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  highlights: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  category: 'fullstack' | 'backend' | 'frontend' | 'tools' | 'algorithms';
  year: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  type: string;
  period: string;
  location: string;
  description: string[];
  techStack: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  score: string;
  location: string;
}

export interface CodingProfile {
  platform: string;
  handle: string;
  url: string;
  metric: string;
  metricValue: string;
  badge?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export const personalInfo = {
  name: 'Aviral Kaushik',
  title: 'Software Engineer',
  tagline: 'Building scalable systems, solving hard problems, and engineering products that matter.',
  email: 'aviralkaushik412@gmail.com',
  github: 'https://github.com/aviralkaushik412',
  linkedin: 'https://www.linkedin.com/in/aviralkshik/',
  resumeUrl: '/AviralKaushik_Resume.pdf',
  profileImage: '/images/profile.png',
  location: 'India',
};

export const projects: Project[] = [
  {
    id: 'skillmirror',
    title: 'SkillMirror',
    subtitle: 'Daily Interview Preparation SaaS',
    description:
      'A full-featured SaaS platform that delivers daily interview preparation content — DSA problems, theory questions, MCQs, and puzzles — with intelligent progress tracking, streak computation, and weak-area analytics.',
    problem:
      'Interview preparation is scattered across dozens of platforms with no structured daily practice or personalized performance insights.',
    solution:
      'Engineered an end-to-end platform with automated DSA challenge delivery, real-time ranking systems, and performance analytics modules that surface weak areas and track improvement over time.',
    highlights: [
      'Architected scheduled delivery of daily DSA challenges with integrated performance tracking',
      'Engineered ranking, streak computation, and weak-area analytics modules',
      'Optimized MongoDB Atlas queries, reducing average response time by 30%',
      'Designed leaderboard synchronization supporting 200+ concurrent submissions',
      'Serving 100+ active users with automated workflows',
    ],
    techStack: ['Java', 'Spring Boot', 'Spring Data MongoDB', 'REST APIs', 'React', 'Tailwind CSS'],
    githubUrl: 'https://github.com/aviralkaushik412/SkillMirror',
    liveUrl: 'https://skillmirror.vercel.app',
    featured: true,
    category: 'fullstack',
    year: '2025–26',
  },
  {
    id: 'mcp-server',
    title: 'GitHub MCP Server',
    subtitle: 'AI-Powered Developer Tooling',
    description:
      'A TypeScript-based Model Context Protocol server that integrates Claude AI with GitHub API, exposing 6 specialized developer tools including PR summarization with risk scoring.',
    problem:
      'Developers spend significant time reviewing pull requests, analyzing code changes, and assessing risk across large codebases.',
    solution:
      'Built an MCP server with a registry pattern that reduced tool onboarding from 50 lines to a single declaration, featuring PR summarization with risk scoring across 15+ rules.',
    highlights: [
      'Built a TypeScript MCP server integrating Claude AI with GitHub API, exposing 6 tools',
      'Designed a registry pattern reducing onboarding from 50 lines to a single declaration',
      'Implemented PR summarization over 10+ files with multi-level risk scoring using 15+ rules',
      'Added typed error handling (404, 403, internal), eliminating silent crashes',
    ],
    techStack: ['TypeScript', 'Node.js', 'MCP SDK', 'GitHub API', 'Groq API'],
    githubUrl: 'https://github.com/aviralkaushik412/MCP-Server',
    featured: true,
    category: 'tools',
    year: '2026',
  },
  {
    id: 'mazerun',
    title: 'MazeRun',
    subtitle: 'Pathfinding Algorithm Visualizer',
    description:
      'An interactive graph traversal and pathfinding visualizer that demonstrates BFS, DFS, Dijkstra\'s, and Weighted DFS on dynamic NxN grids with real-time algorithm telemetry.',
    problem:
      'Understanding pathfinding algorithms is difficult without visual, interactive feedback showing how each algorithm explores the search space.',
    solution:
      'Built a zero-dependency, vanilla JS visualizer with live execution telemetry, configurable animation speed, weighted/unweighted modes, and CSS-driven cell weight rendering using data attributes.',
    highlights: [
      'Implemented 4 pathfinding algorithms: BFS, DFS, Dijkstra\'s, and Weighted DFS',
      'Zero-dependency architecture — pure HTML/CSS/JS with no frameworks or libraries',
      'Real-time algorithm telemetry HUD showing queue contents, exploration coordinates, and search status',
      'CSS attr(data-weight) technique for minimal-DOM weight badge rendering',
      'Async animation throttling with configurable speed control (10ms–200ms)',
    ],
    techStack: ['JavaScript', 'HTML5', 'CSS3', 'CSS Grid', 'Async/Await'],
    githubUrl: 'https://github.com/aviralkaushik412/MazeRun',
    featured: true,
    category: 'algorithms',
    year: '2025',
  },
  {
    id: 'tastetrails',
    title: 'TasteTrails',
    subtitle: 'Recipe Management Platform',
    description:
      'A full-stack web application enabling users to upload, manage, and discover recipes with RESTful APIs, JWT authentication, and optimized database queries.',
    problem:
      'Users needed a centralized platform to manage, share, and discover recipes with secure authentication and efficient search.',
    solution:
      'Built RESTful APIs supporting CRUD operations secured with JWT authentication, with MongoDB schema design enabling efficient filtering and scalable recipe search.',
    highlights: [
      'Built RESTful APIs with CRUD operations secured via JWT authentication',
      'Modeled MongoDB schema for efficient filtering and scalable recipe search',
      'Improved API response latency by 25% through optimized database queries',
      'Full-stack implementation with React frontend and Express backend',
    ],
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    githubUrl: 'https://github.com/aviralkaushik412/tastetrails',
    liveUrl: 'https://tastetrails.vercel.app/index.html',
    featured: false,
    category: 'fullstack',
    year: '2025',
  },
];

export const experience: Experience[] = [
  {
    id: 'turing',
    role: 'LLM Trainer',
    company: 'Turing',
    type: 'Full-time · Contract',
    period: 'Aug 2026 – Present',
    location: 'Remote',
    description: [
      'Developed and validated Python backend applications for ComputerBench tasks, replicating SaaS tools and their integrations',
      'Built backend integrations for platforms such as Slack, Jira, Linear, Notion, Gmail, and internal wikis',
      'Designed and tested task environments using Docker, ensuring reproducible execution and reliable backend behavior',
      'Reviewed and refined LLM-generated technical tasks for clarity, correctness, deterministic evaluation, and edge cases',
      'Built and validated automated test suites and verification workflows to assess task correctness and model performance',
      'Debugged backend, connector, and evaluation issues across multi-service environments',
    ],
    techStack: ['Python', 'Docker', 'LLMs', 'Backend Integrations', 'Automated Testing'],
  },
];

export const education: Education[] = [
  {
    id: 'chitkara',
    institution: 'Chitkara University',
    degree: 'B.Tech, Computer Science & Engineering',
    period: 'June 2023 – June 2027',
    score: 'CGPA: 9.37',
    location: 'Rajpura, Punjab',
  },
  {
    id: 'school-12',
    institution: "Holy Angels' Convent School",
    degree: 'Senior Secondary (XII), PCM + CS',
    period: 'Apr 2022 – Mar 2023',
    score: '83.2%',
    location: 'Muzaffarnagar, UP',
  },
  {
    id: 'school-10',
    institution: "Holy Angels' Convent School",
    degree: 'Secondary (X)',
    period: 'Apr 2020 – Mar 2021',
    score: '70.4%',
    location: 'Muzaffarnagar, UP',
  },
];

export const codingProfiles: CodingProfile[] = [
  {
    platform: 'LeetCode',
    handle: 'aviral_kaushik',
    url: 'https://leetcode.com/u/aviral_kaushik/',
    metric: 'Problems Solved',
    metricValue: '850+',
    badge: 'Knight · Rating 2060',
  },
  {
    platform: 'CodeChef',
    handle: 'aviral_kaushik',
    url: 'https://www.codechef.com/users/aviral_kaushik',
    metric: 'Max Rating',
    metricValue: '1600+',
  },
  {
    platform: 'GeeksforGeeks',
    handle: 'kaushik_aviral',
    url: 'https://www.geeksforgeeks.org/profile/kaushik_aviral',
    metric: 'Problems Solved',
    metricValue: '300+',
  },
];

export const certificates: Certificate[] = [
  {
    id: 'rh124',
    title: 'Red Hat System Administration I (RH124)',
    issuer: 'Red Hat',
    year: '2024',
  },
  {
    id: 'rh134',
    title: 'Red Hat System Administration II (RH134)',
    issuer: 'Red Hat',
    year: '2024',
  },
  {
    id: 'spm',
    title: 'Software Product Management Specialization',
    issuer: 'University of Alberta · Coursera',
    year: '2024',
  },
  {
    id: 'cybersec',
    title: 'Cyber Security Essentials',
    issuer: 'Cisco',
    year: '2024',
  },
  {
    id: 'modern-ai',
    title: 'Introduction to Modern AI',
    issuer: 'IBM',
    year: '2024',
  },
];

export const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    skills: ['C++', 'Java', 'Python', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    name: 'Frontend',
    skills: ['React', 'Next.js', 'Angular', 'Tailwind CSS', 'HTML/CSS'],
  },
  {
    name: 'Backend',
    skills: ['Spring Boot', 'Node.js', 'Express.js', 'REST APIs'],
  },
  {
    name: 'Data & Cloud',
    skills: ['MongoDB', 'MySQL', 'Firebase', 'Docker', 'AWS'],
  },
  {
    name: 'Tools & Platforms',
    skills: ['Git', 'GitHub', 'Vercel', 'Render', 'Cloudflare'],
  },
];

export const navItems = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'projects', label: 'Work', href: '#projects' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'journey', label: 'Journey', href: '#journey' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];
