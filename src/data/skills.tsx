import type React from 'react';

export type SkillCategory =
  | 'Languages'
  | 'Frontend'
  | 'Backend & APIs'
  | 'Database'
  | 'Mobile & IoT'
  | 'Design & Testing'
  | 'Tools & DevOps'
  | 'Networking';

export type Skill = {
  name: string;
  color: string;
  /** True when brand color is near-black — icon needs invert in dark mode */
  invertDark?: boolean;
  icon: React.ReactNode;
  category: SkillCategory;
  /** Core skills shown in the collapsed "top skills" view and visually emphasized */
  primary?: boolean;
};

const CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';
const SI  = 'https://cdn.simpleicons.org';

function DevIcon({
  name,
  variant = 'original',
  alt,
  className,
}: {
  name: string;
  variant?: string;
  alt: string;
  className?: string;
}) {
  return (
    <img
      src={`${CDN}/${name}/${name}-${variant}.svg`}
      width={38}
      height={38}
      alt={alt}
      loading="lazy"
      draggable={false}
      className={className}
    />
  );
}

function SIIcon({
  slug,
  color,
  alt,
  className,
}: {
  slug: string;
  color: string;
  alt: string;
  className?: string;
}) {
  return (
    <img
      src={`${SI}/${slug}/${color.replace('#', '')}`}
      width={38}
      height={38}
      alt={alt}
      loading="lazy"
      draggable={false}
      className={className}
    />
  );
}

export const skills: Skill[] = [
  // ── Languages ────────────────────────────────────────────────────────────
  { name: 'HTML',       color: '#E34F26', category: 'Languages',      icon: <DevIcon name="html5"       alt="HTML5" /> },
  { name: 'CSS',        color: '#1572B6', category: 'Languages',      icon: <DevIcon name="css3"        alt="CSS3" /> },
  { name: 'JavaScript', primary: true, color: '#F7DF1E', category: 'Languages',      icon: <DevIcon name="javascript"  alt="JavaScript" /> },
  { name: 'TypeScript', primary: true, color: '#3178C6', category: 'Languages',      icon: <DevIcon name="typescript"  alt="TypeScript" /> },
  { name: 'PHP',        color: '#777BB4', category: 'Languages',      icon: <DevIcon name="php"         alt="PHP" /> },
  { name: 'Python',     color: '#3776AB', category: 'Languages',      icon: <DevIcon name="python"      alt="Python" /> },
  { name: 'Java',       color: '#ED8B00', category: 'Languages',      icon: <DevIcon name="java"        variant="plain" alt="Java" /> },

  // ── Frontend ─────────────────────────────────────────────────────────────
  { name: 'React', primary: true,       color: '#61DAFB', category: 'Frontend',      icon: <DevIcon name="react"       alt="React" /> },
  { name: 'Next.js', primary: true,     color: '#000000', category: 'Frontend', invertDark: true, icon: <DevIcon name="nextjs"  variant="plain" alt="Next.js" /> },
  { name: 'Tailwind CSS', primary: true,color: '#06B6D4', category: 'Frontend',      icon: <DevIcon name="tailwindcss" variant="original" alt="Tailwind CSS" /> },
  { name: 'Motion',      color: '#8B5CF6', category: 'Frontend',      icon: <SIIcon  slug="framer"      color="#8B5CF6" alt="Framer Motion" /> },
  { name: 'Vite',        color: '#646CFF', category: 'Frontend',      icon: <DevIcon name="vitejs"      alt="Vite" /> },

  // ── Backend & APIs ────────────────────────────────────────────────────────
  { name: 'Node.js', primary: true,    color: '#339933', category: 'Backend & APIs', icon: <DevIcon name="nodejs"      variant="plain" alt="Node.js" /> },
  { name: 'Express.js', color: '#353535', category: 'Backend & APIs', invertDark: true, icon: <SIIcon  slug="express"     color="353535" alt="Express.js" /> },
  { name: 'REST APIs',  color: '#FF6C37', category: 'Backend & APIs', icon: <DevIcon name="postman"     alt="REST APIs" /> },

  // ── Database ──────────────────────────────────────────────────────────────
  { name: 'PostgreSQL', primary: true, color: '#4169E1', category: 'Database',       icon: <DevIcon name="postgresql"  alt="PostgreSQL" /> },
  { name: 'MySQL',      color: '#4479A1', category: 'Database',       icon: <SIIcon  slug="mysql"        color="4479A1" alt="MySQL" /> },
  { name: 'MongoDB',    color: '#47A248', category: 'Database',       icon: <DevIcon name="mongodb"     alt="MongoDB" /> },
  { name: 'Firebase',   color: '#FFCA28', category: 'Database',       icon: <DevIcon name="firebase"    variant="plain" alt="Firebase" /> },

  // ── Mobile & IoT ──────────────────────────────────────────────────────────
{ name: 'Expo', primary: true,         color: '#000020', category: 'Mobile & IoT', invertDark: true, icon: <SIIcon  slug="expo"       color="000000" alt="Expo" /> },
  { name: 'Arduino',      color: '#00979D', category: 'Mobile & IoT', icon: <DevIcon name="arduino"     alt="Arduino" /> },

  // ── Design & Testing ──────────────────────────────────────────────────────
  { name: 'Figma',      color: '#F24E1E', category: 'Design & Testing', icon: <DevIcon name="figma"     alt="Figma" /> },
  { name: 'Playwright', color: '#2EAD33', category: 'Design & Testing', icon: <DevIcon name="playwright" alt="Playwright" /> },

  // ── Tools & DevOps ────────────────────────────────────────────────────────
  { name: 'Git',    color: '#F05032', category: 'Tools & DevOps', icon: <DevIcon name="git"    alt="Git" /> },
  { name: 'GitHub', color: '#181717', category: 'Tools & DevOps', invertDark: true, icon: <DevIcon name="github" alt="GitHub" /> },
  { name: 'Docker', color: '#2496ED', category: 'Tools & DevOps', icon: <DevIcon name="docker" alt="Docker" /> },
  { name: 'VS Code',color: '#007ACC', category: 'Tools & DevOps', icon: <DevIcon name="vscode" alt="VS Code" /> },

  // ── Networking ────────────────────────────────────────────────────────────
  { name: 'Cisco',  color: '#049FD9', category: 'Networking', icon: <SIIcon slug="cisco" color="#049FD9" alt="Cisco" /> },
];
