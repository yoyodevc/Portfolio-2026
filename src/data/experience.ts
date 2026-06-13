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
      "Taught core programming and technology subjects while actively contributing to student development inside and outside the classroom. Built genuine rapport with students through mentorship, org advising, and a shared passion for esports.",
    highlights: [
      "Served as adviser for the local publication organization, guiding students in editorial and organizational work",
      "Contributed to faculty-based system projects, bridging academic instruction with real-world development",
      "Mentored students in hackathon competitions and supported an international student throughout their academic journey",
      "Fostered strong student engagement as an esports coach, creating a space that made learning feel approachable and motivating",
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
