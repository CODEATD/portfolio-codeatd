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
  { name: "About", href: "/#about" },
  { name: "Experience", href: "/#experience" },
  { name: "Projects", href: "/#projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/#contact" },
] as const;

export const footerNavCol1 = [
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/#projects" },
  { name: "Blog", href: "/blog" },
] as const;

export const footerNavCol2 = [
  { name: "Experience", href: "/#experience" },
  { name: "Contact", href: "/#contact" },
] as const;

