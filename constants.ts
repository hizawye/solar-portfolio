
import { PlanetData } from './types';

export const BIO_DATA = {
    name: "Alex Doe",
    title: "Senior Frontend & WebGL Developer",
    summary: "A creative developer with a passion for building immersive and beautiful user experiences. With over a decade of experience in the web industry, I specialize in React, TypeScript, and 3D graphics using WebGL and Three.js. I thrive on turning complex problems into elegant, performant, and interactive digital solutions. Let's build something amazing together."
};

export const PORTFOLIO_DATA: PlanetData[] = [
  {
    id: "projects",
    name: "Projects",
    color: "#4A90E2",
    emissiveColor: "#2a5285",
    size: 1.8,
    orbitRadius: 18,
    rotationSpeed: 0.001,
    satellites: [
      {
        id: "proj-1",
        name: "3D Product Configurator",
        description: "An interactive WebGL application allowing users to customize product colors, materials, and features in real-time. Built with React Three Fiber.",
        techStack: ["React", "Three.js", "R3F", "TypeScript"],
        imageUrl: "https://picsum.photos/seed/proj1/400/300",
        liveUrl: "#"
      },
      {
        id: "proj-2",
        name: "Data Visualization Dashboard",
        description: "A dynamic dashboard that visualizes complex datasets using D3.js and React, providing insightful analytics through interactive charts and graphs.",
        techStack: ["React", "D3.js", "TypeScript", "Tailwind CSS"],
        imageUrl: "https://picsum.photos/seed/proj2/400/300",
        liveUrl: "#"
      },
      {
        id: "proj-3",
        name: "E-commerce Platform",
        description: "A full-stack e-commerce site with a custom CMS, payment gateway integration, and a seamless user experience.",
        techStack: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
        imageUrl: "https://picsum.photos/seed/proj3/400/300",
        liveUrl: "#"
      }
    ],
  },
  {
    id: "tech-skills",
    name: "Tech Skills",
    color: "#50E3C2",
    emissiveColor: "#2d806c",
    size: 1.5,
    orbitRadius: 30,
    rotationSpeed: 0.0008,
    satellites: [
        { id: "skill-1", name: "React & Next.js", description: "Expert in building scalable and performant applications." },
        { id: "skill-2", name: "TypeScript", description: "Passionate about type safety and clean code." },
        { id: "skill-3", name: "Three.js & R3F", description: "Creating immersive 3D experiences on the web." },
        { id: "skill-4", name: "Node.js", description: "Building robust and efficient backend services." },
        { id: "skill-5", name: "UI/UX Design", description: "A keen eye for aesthetics and user-centric design." },
        { id: "skill-6", name: "GraphQL", description: "Efficient data fetching and API design." },
    ],
  },
  {
    id: "experience",
    name: "Experience",
    color: "#F5A623",
    emissiveColor: "#8c5f14",
    size: 1.6,
    orbitRadius: 42,
    rotationSpeed: 0.0006,
    satellites: [
        {id: "exp-1", name: "Lead Frontend Engineer @ TechCorp", description: "2020 - Present: Led the development of a major client-facing platform, mentored junior developers, and spearheaded the adoption of WebGL technologies."},
        {id: "exp-2", name: "Senior Developer @ Innovate Inc.", description: "2016 - 2020: Developed and maintained high-traffic web applications, focusing on performance optimization and user experience."},
        {id: "exp-3", name: "Web Developer @ Creative Solutions", description: "2013 - 2016: Worked on a variety of client projects, from marketing websites to internal tools, honing my skills in JavaScript and CSS."},
    ],
  },
  {
    id: "soft-skills",
    name: "Soft Skills",
    color: "#BD10E0",
    emissiveColor: "#6c0980",
    size: 1.3,
    orbitRadius: 54,
    rotationSpeed: 0.0004,
    satellites: [
        { id: "soft-1", name: "Communication", description: "Effectively conveying complex ideas to both technical and non-technical stakeholders." },
        { id: "soft-2", name: "Problem Solving", description: "Adept at breaking down complex challenges into actionable steps and finding creative solutions." },
        { id: "soft-3", name: "Team Leadership", description: "Mentoring and empowering team members to achieve their best work." },
        { id: "soft-4", name: "Adaptability", description: "Quickly learning and applying new technologies and methodologies to stay at the forefront of the industry." },
    ],
  },
];
