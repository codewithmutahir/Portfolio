/**
 * @copyright 2024 codewithmutahir
 *  @license   Apache-2.0
 */

/**
 * Components
 */

import SkillCard from "./SkillCard";



const Skill = () => {
  const skillItem = [
    {
      imgSrc: "/images/figma.svg",
      label: "Figma",
      desc: "Design tool",
    },
    {
      imgSrc: "/images/html.svg",
      label: "HTML",
      desc: "Website Structure",
    },
    {
      imgSrc: "/images/css3.svg",
      label: "CSS",
      desc: "User Interface",
    },
    {
      imgSrc: "/images/javascript.svg",
      label: "JavaScript",
      desc: "Interaction",
    },
    {
      imgSrc: "/images/react.svg",
      label: "React",
      desc: "Framework",
    },
    {
      imgSrc: "/images/php.svg",
      label: "PHP",
      desc: "Backend + frontend",
    },
    {
      imgSrc: "/images/tailwindcss.svg",
      label: "TailwindCSS",
      desc: "User Interface",
    },
    {
      imgSrc: "/images/bootstrap.svg",
      label: "Bootstrap",
      desc: "User Interface",
    },
    {
      imgSrc: "/images/wordpress.svg",
      label: "Wordpress",
      desc: "CMS",
    },
    {
      imgSrc: "/images/shopify.svg",
      label: "Shopify",
      desc: "CMS",
    }
  ];

  return (
    <section className="section">
      <div className="container">
        <h2 className="headline-2 reveal-up from">Essential Tools I use</h2>

        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch]">
          Discover the powerful tools and technologies I use to create
          exceptional, high-performing websites & applications.
        </p>

        <div className="grid gap-3 grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]">
          {
            skillItem.map(({
              imgSrc, label, desc
            }, key) =>(
             <SkillCard 
             key={key}
             imgSrc={imgSrc}
             label={label}
             desc={desc}
             classes="reveal-up"
             />
            ))
          }
        </div>

      </div>
    </section>
  );
};

export default Skill;
