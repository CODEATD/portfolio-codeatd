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
// Social media links for the website
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

// Trusted brands and tools used in projects
export const trustedBrands = [
  { name: "Figma", slug: "figma" },
  { name: "Supabase", slug: "supabase" },
  { name: "Netlify", slug: "netlify" },
  { name: "Framer", slug: "framer" },
  { name: "React", slug: "react" },
  { name: "Vue", slug: "vue" },
  { name: "Cursor", slug: "cursor" },
  { name: "OpenAI", slug: "openai" },
  { name: "GitHub", slug: "github" },
  { name: "Notion", slug: "notion" },
  { name: "Flutter", slug: "flutter" },
  { name: "Astro", slug: "astro" },
  { name: "Expo", slug: "expo" },
  { name: "Tailwind CSS", slug: "tailwind-css" },
  { name: "n8n", slug: "n8n" },
  { name: "Gemini", slug: "gemini" },
  { name: "Docker", slug: "docker" },
  { name: "WordPress", slug: "wordpress" },
  { name: "Unity", slug: "unity" },
  { name: "Photoshop", slug: "photoshop" },
  { name: "After Effects", slug: "after-effects" },
  { name: "Premiere Pro", slug: "premiere-pro" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Node.js", slug: "nodejs" },
  { name: "Next.js", slug: "nextjs" },
  { name: "Dart", slug: "dart" },
  { name: "PHP", slug: "php" },
  { name: "Git", slug: "git" },
  { name: "Shopify", slug: "shopify" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "GSAP", slug: "gsap" },
  { name: "WooCommerce", slug: "woocommerce" },
] as const;