export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  stack: string[];
}

export const experience: WorkExperience[] = [
  {
    id: "College Instructor/Visiting Lecturer",
    company: "Zamboanga Peninsula Polytechnic State University",
    role: "College Instructor/Visiting Lecturer",
    period: "Academic Year 2025 — 2026",
    location: "Zamboanga, PH",
    description:
      "Design and build web and mobile products end-to-end for clients across fintech, SaaS, and consumer apps. Scope includes architecture, UI engineering, API design, and deployment.",
    highlights: [
      "Delivered four production apps from zero to launch across React Native and React web",
      "Built a real-time analytics dashboard handling 50k+ events per minute via WebSockets",
      "Established component libraries and design systems used across multiple client projects",
    ],
    stack: ["OOP", "Fundamentals of Database Systems", "DSA", "ComProg 2", "IoT"],
  },
  {
    id: "Freelance",
    company: "Freelance",
    role: "Freelance Developer",
    period: "2025 — Present",
    location: "Remote",
    description:
      "Worked on small-scale freelance projects both collaboratively and independently, contributing to small-scale applications and custom software solutions",
    highlights: [
      "Collaborated with clients and small development teams to deliver custom web and mobile applications",
      "Designed and developed end-to-end solutions independently, from requirements gathering to deployment",
      "Built responsive user interfaces, REST APIs, database systems, and IoT-integrated applications based on client needs",
    ],
    stack: ["React", "JavaScript", "Express" , "MongoDB","Flutter", "Figma", "PHP", "MySQL", "IoT Hardware and Software"],
  },
];
