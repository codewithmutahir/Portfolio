/**
 * @copyright 2024 codewithmutahir
 *  @license   Apache-2.0
 */

/**
 * Components
 */

import LogoLoop from "./LogoLoop";
import { 
  SiFigma, 
  SiHtml5, 
  SiCss3, 
  SiJavascript, 
  SiReact, 
  SiPhp, 
  SiTailwindcss, 
  SiBootstrap, 
  SiWordpress, 
  SiShopify, 
  SiNodedotjs, 
  SiMongodb, 
  SiExpress,
  SiNextdotjs,
  SiPostman,
  SiDocker,
  SiGit,
  SiGithub,
  SiTypescript,
  SiFirebase,
  SiMysql,
} from "react-icons/si";

const Skill = () => {
  const skillLogos = [
    {
      icon: SiFigma,
      label: "Figma",
    },
    {
      icon: SiHtml5,
      label: "HTML5",
    },
    {
      icon: SiCss3,
      label: "CSS3",
    },
    {
      icon: SiJavascript,
      label: "JavaScript",
    },
    {
      icon: SiTypescript,
      label: "TypeScript",
    },
    {
      icon: SiReact,
      label: "React",
    },
    {
      icon: SiNextdotjs,
      label: "Next.js",
    },
    {
      icon: SiPhp,
      label: "PHP",
    },
    {
      icon: SiTailwindcss,
      label: "TailwindCSS",
    },
    {
      icon: SiBootstrap,
      label: "Bootstrap",
    },
    {
      icon: SiNodedotjs,
      label: "Node.js",
    },
    {
      icon: SiExpress,
      label: "Express",
    },
    {
      icon: SiMongodb,
      label: "MongoDB",
    },
    {
      icon: SiMysql,
      label: "MySQL",
    },
    {
      icon: SiFirebase,
      label: "Firebase",
    },
    {
      icon: SiWordpress,
      label: "Wordpress",
    },
    {
      icon: SiShopify,
      label: "Shopify",
    },
    {
      icon: SiDocker,
      label: "Docker",
    },
    {
      icon: SiPostman,
      label: "Postman",
    },
    {
      icon: SiGit,
      label: "Git",
    },
    {
      icon: SiGithub,
      label: "GitHub",
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <h2 className="headline-2 reveal-up from">Essential Tools I use</h2>

        <p className="text-zinc-600 dark:text-zinc-400 mt-3 mb-8 max-w-[50ch]">
          Discover the powerful tools and technologies I use to create
          exceptional, high-performing websites & applications.
        </p>

        <div className="reveal-up">
          <LogoLoop logos={skillLogos} speed={40} className="py-8" />
        </div>

      </div>
    </section>
  );
};

export default Skill;
