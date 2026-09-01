export const site = {
  name: "Luciano Lazarte",
  legalName: "Luciano Tadeo Lazarte",
  headline: "Full Stack Developer",
  stackLine: "React · TypeScript · NestJS · GraphQL",
  domain: "Fintech",
  location: "Salta, Argentina",
  email: "lazarteluciano23@gmail.com",
  linkedin: "https://www.linkedin.com/in/lucianolazarte23",
  github: "https://github.com/Jehp23",
  url: "https://lucianolazarte.vercel.app",
  title: "Luciano Lazarte · Full Stack Developer",
  description:
    "Full Stack Developer. React, TypeScript, NestJS, GraphQL. Fintech product. Based in Salta, Argentina. Open to full-remote roles.",
} as const;

export const experience = [
  {
    company: "Poncho Capital",
    role: "Full Stack Developer, Product",
    dates: "Mar 2026 – Present",
    place: "Salta, Argentina · Retail investing platform",
    lead: true,
    bullets: [
      "Building a product that makes investing usable for people with no prior finance experience.",
      "Ship features across the stack: React and TypeScript on the frontend, NestJS and GraphQL on the backend.",
      "Work in a small product team owning web flows end to end.",
    ],
  },
  {
    company: "Freelance",
    role: "Data Analyst",
    dates: "Nov 2024 – Jul 2026",
    place: "Remote · Salta, Argentina",
    lead: false,
    bullets: [
      "Delivered analysis and dashboards in Python, SQL, and Power BI.",
      "Turned raw datasets into reports used for financial and operational decisions.",
    ],
  },
] as const;

export const work = [
  {
    name: "Ink",
    tag: "Avalanche",
    url: "https://ink-three-iota.vercel.app",
    host: "ink-three-iota.vercel.app",
    description:
      "Smart-contract risk analyzer: deterministic 0–100 score plus a plain-language explanation.",
  },
  {
    name: "QuantLab",
    tag: null,
    url: "https://quantlab2.vercel.app",
    host: "quantlab2.vercel.app",
    description:
      "Quant research platform: VaR, Monte Carlo, efficient frontier, BYMA options.",
  },
  {
    name: "Cello",
    tag: "Avalanche",
    url: "https://cello-avax.vercel.app",
    host: "cello-avax.vercel.app",
    description: "Private institutional payments using eERC20.",
  },
  {
    name: "EstacionaSalta",
    tag: "1st place, Puna Tech 2026 · City Track",
    url: "https://estacionasalta.vercel.app",
    host: "estacionasalta.vercel.app",
    description: "Measured-parking product for the city of Salta.",
    video: {
      label: "Watch",
      url: "https://www.youtube.com/watch?v=ThcJASSvIPU",
    },
  },
] as const;

export const education = [
  {
    title: "Computer Engineering",
    org: "Universidad Católica de Salta (UCASAL)",
    dates: "2023 – 2028",
    note: "In progress · Salta, Argentina",
  },
  {
    title: "Data Scientist · Data Analytics",
    org: "Coderhouse",
    dates: "Jun 2024 · Nov 2023",
    note: null,
  },
] as const;

export const skills = [
  "TypeScript",
  "React",
  "NestJS",
  "GraphQL",
  "Node.js",
  "Python",
  "SQL",
  "PostgreSQL",
  "Git",
] as const;

export const languages = [
  { name: "Spanish", level: "Native" },
  { name: "English", level: "C1" },
  { name: "Portuguese", level: "B1" },
] as const;
