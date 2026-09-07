export const site = {
  name: "Luciano Lazarte",
  legalName: "Luciano Tadeo Lazarte",
  location: "Salta, Argentina",
  email: "lazarteluciano23@gmail.com",
  linkedin: "https://www.linkedin.com/in/lucianolazarte23",
  github: "https://github.com/Jehp23",
  githubUser: "Jehp23",
  url: "https://lucianolazarte.vercel.app",
  company: "Poncho Capital",
  companyUrl: "https://ponchocapital.com",
  jobTitle: "Full Stack Developer",
  updated: "2026-09-04",
  address: {
    locality: "Salta",
    region: "Salta",
    country: "AR",
    countryName: "Argentina",
  },
} as const;

export const siteSameAs = [site.linkedin, site.github] as const;
