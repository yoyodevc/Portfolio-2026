export interface Education {
  id: string;
  institution: string;
  /** Path to logo inside /public/assets/ — optional */
  logo?: string;
  /** Alt text for the logo image */
  logoAlt?: string;
  degree: string;
  field: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
}

export const education: Education[] = [
  {
    id: "bsit",
    institution: "Western Mindanao State University",
    logo: "/assets/education/wmsu-logo.png",
    logoAlt: "University of Santo Tomas seal",
    degree: "Bachelor of Science",
    field: "Information Technology",
    period: "2021 — 2025",
    location: "Zamboanga, PH",
    description:
      "Graduated with a focus on software engineering fundamentals, algorithms, and systems programming. Completed a capstone project on a remote real-time monitoring system and automated egg incubator.",
    highlights: [
      "Best Capstone Award - Hatchify: Real-time Egg Incubator Monitoring and Alert system",
      "Developed a Mobile Appliication Software and IoT Hardware for poultry solutions",
      "Collaborated with WMSU - WESMAARDEC as a part of an academic project in Software Engineering",
    ],
  },
];
