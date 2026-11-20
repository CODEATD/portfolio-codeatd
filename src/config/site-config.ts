// Metadata configuration
export const siteConfig = {
  name: 'CODE ATD',
  brandName: 'CODEATD',
  title: 'CODE ATD | Desarrollador Full Stack | Portafolio y Blog',
  description: 'Portafolio personal y blog de desarrollo.',
  author: 'CODE ATD',
  url: 'https://codeatd.dev',
  ogImage: '/og-image.jpg',
  timeZone: 'America/Caracas', // IANA TimeZone para Intl.DateTimeFormat
};

// Navigation for Header and Footer
// "/#section" (not "#section") so the links also work from /blog and other subpages
// (contact details and social links come from WordPress: Site Settings)
export const navLinks = [
  { name: "Sobre mí", href: "/#about" },
  { name: "Experiencia", href: "/#experience" },
  { name: "Proyectos", href: "/#projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contacto", href: "/contact" },
] as const;

export const footerNavCol1 = [
  { name: "Sobre mí", href: "/#about" },
  { name: "Proyectos", href: "/#projects" },
  { name: "Blog", href: "/blog" },
] as const;

export const footerNavCol2 = [
  { name: "Experiencia", href: "/#experience" },
  { name: "Contacto", href: "/contact" },
] as const;

