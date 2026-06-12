// src/data/projects.ts
// All portfolio project data lives here.
// Add, remove, or reorder entries — the UI derives everything from this array.
// `featured: true` renders the project in the hero grid. Max 3 featured at once.

export type TechTag =
  | "React"
  | "TypeScript"
  | "JavaScript"
  | "Tailwind CSS"
  | "Next.js"
  | "Vite"
  | "Node.js"
  | "REST API"
  | "GraphQL"
  | "Zustand"
  | "React Query"
  | "Motion"
  | "CSS"
  | "HTML"
  | "Figma"
  | string; // allow custom tags without breaking type safety

export type ProjectStatus = "live" | "archived" | "in-progress";

export interface Project {
  /** Short slug used in URLs and keys */
  id: string;

  /** Display title */
  title: string;

  /** One-liner shown in cards */
  tagline: string;

  /** 2–4 sentence description for the project detail view */
  description: string;

  /** Tech used — rendered as mono tags */
  stack: TechTag[];

  /** Current state of the project */
  status: ProjectStatus;

  /** Path to cover image inside /public/assets/ */
  cover: string;

  /** Optional: alt text for cover image (defaults to title if omitted) */
  coverAlt?: string;

  /** External links */
  links: {
    live?: string;
    github?: string;
    caseStudy?: string;
  };

  /** Show in hero featured grid */
  featured: boolean;

  /** ISO date string — used to sort by recency */
  date: string;
}

export const projects: Project[] = [
  {
    id: "pokeclash",
    title: "PokéClash",
    tagline: "PokéMon Stat Battle Simulator",
    description:
      "An API-based Pokémon Stat battle Simulator, emphasizing data fetching, handling, and dynamic content rendering. I designed it with a retro theme inspired by classic Pokémon games. This project deepened my understanding of API integration and enhanced my ability to efficiently retrieve and display external data, laying the groundwork for more complex applications.",
    stack: ["ReactJS", "Tailwind CSS", "REST API", "json-server"],
    status: "live",
    cover: "/assets/pokeclash.webp",
    coverAlt: "Nexus Dashboard showing real-time sensor data widgets and analytics charts",
    links: {
      live: "https://pokeclash1.netlify.app/",
      github: "https://github.com/yoyodevc/pokeclash",
    },
    featured: true,
    date: "2025",
  },
  {
    id: "to-do list",
    title: "To-do List",
    tagline: "Private-by-design task manager where your data never leaves your device.",
    description:
    "A secure cross-platform to-do app built for users who value privacy and control. All tasks, categories, and personal data are stored locally on-device using IndexedDB, with no cloud syncing, tracking, or external data collection. Features task organization, priorities, due dates, and fast offline access, ensuring your productivity stays private and available anytime — even without an internet connection.",
    stack: ["React", "TypeScript", "Tailwind CSS", "ShadCN", "LocalStorage"],
    status: "live",
    cover: "/assets/newtodo.webp",
    coverAlt: "Todo list",
    links: {
      live: "https://jfl-newtodo.netlify.app/",
      github: "https://github.com/yoyodevc/New-ToDo",
    },
    featured: true,
    date: "2026",
  },
  {
    id: "Calculator",
    title: "Calculator",
    tagline: "Private calculator with on-device history and a clean, distraction-free design.",
    description:
    "A privacy-first calculator that keeps every calculation and history entry stored locally on your device—nothing is uploaded, tracked, or shared. Features a minimalist interface with subtle glassmorphism accents, instant performance, and searchable calculation history, making everyday math fast, elegant, and completely private.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Motion"],
    status: "live",
    cover: "/assets/calculator.webp",
    coverAlt: "Calculator",
    links: {
      live: "https://jlf-calculator-wip.netlify.app/",
      github: "https://github.com/yoyodevc/Calculator",
    },
    featured: true,
    date: "2026",
  },
];

/** Helper: get only featured projects, sorted by date descending */
export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

/** Helper: get all projects sorted by date descending */
export const allProjects = [...projects].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);