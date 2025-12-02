/**
 * @copyright 2024 codewithmutahir
 * @license   Apache-2.0
 * SEO Component for managing meta tags, structured data, and SEO optimization
 */

import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "Mutahir Hussain - Web & Mobile App Developer | Portfolio",
  description = "Professional Web & Mobile App Developer specializing in React, Next.js, Node.js, and modern web technologies. 45+ projects completed. Available for collaboration.",
  canonical = "https://mutahir.qzz.io",
  ogImage = "https://mutahir.qzz.io/images/hero-banner.png",
  section = "home"
}) => {
  const siteUrl = "https://mutahir.qzz.io";
  const fullTitle = title.includes("Mutahir Hussain") ? title : `${title} | Mutahir Hussain`;
  
  // Person schema for structured data
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mutahir Hussain",
    "jobTitle": "Web & Mobile App Developer",
    "url": siteUrl,
    "sameAs": [
      "https://www.github.com/codewithmutahir",
      "https://www.linkedin.com/in/mutahirhussain",
      "https://www.instagram.com/whoissmut4hir"
    ],
    "description": "Passionate Web & Mobile App Developer specializing in crafting scalable, visually engaging, and high-performing websites. Expert in React, React Native, Next.js, JavaScript, TypeScript, Node.js, and UI/UX design.",
    "knowsAbout": [
      "React",
      "React Native",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Firebase",
      "MySQL",
      "WordPress",
      "Figma",
      "Tailwind CSS",
      "UI/UX Design"
    ],
    "email": "mutharsoomro13@gmail.com"
  };

  // Website schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Mutahir Hussain Portfolio",
    "url": siteUrl,
    "description": description,
    "author": {
      "@type": "Person",
      "name": "Mutahir Hussain"
    }
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content="Web Developer, Mobile App Developer, React Developer, Next.js Developer, JavaScript Developer, Full Stack Developer, Portfolio, Mutahir Hussain, Frontend Developer, Backend Developer" />
      <meta name="author" content="Mutahir Hussain" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Mutahir Hussain Portfolio" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@whoissmut4hir" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#0ea5e9" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Structured Data - JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;

