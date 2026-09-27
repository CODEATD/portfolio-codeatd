// Metadata configuration
export const siteConfig = {
  name: 'CODE ATD',
  brandName: 'CODEATD',
  title: 'CODE ATD | Desarrollador Full Stack | Portafolio y Blog',
  description: 'Portafolio personal y blog de desarrollo.',
  author: 'CODE ATD',
  url: 'https://codeatd.dev',
  ogImage: '/og-image.jpg',
  phone: '+58 412-1464014',
  email: 'email@example.com',
  location: 'Valencia, VE',
  timeZone: 'America/Caracas', // IANA TimeZone para Intl.DateTimeFormat
};

// Navigation for Header and Footer
export const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
] as const;

export const footerNavCol1 = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "#blog" },
] as const;

export const footerNavCol2 = [
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
] as const;

export const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/codeatd/', icon: 'ri-instagram-line' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/codeatd', icon: 'ri-linkedin-fill' },
  { name: 'Website', href: 'https://codeatd.dev', icon: 'ri-global-line' },
  { name: 'WhatsApp', href: 'https://wa.me/584121464014', icon: 'ri-whatsapp-line' },
] as const