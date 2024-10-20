/**
 * @copyright 2024 codewithmutahir
 *  @license   Apache-2.0
 */

/**
 * Components
 */

import ProjectCard from "./ProjectCard";


const Work = () => {
  const works = [
    {
      imgSrc: "/images/project-1.jpg",
      title: "Full stack music app",
      tags: ["API", "MVC", "Development"],
      projectLink: "https://musify-5al0.onrender.com/",
    },
    {
      imgSrc: "/images/project-2.jpg",
      title: "Free stock photo app",
      tags: ["API", "SPA"],
      projectLink: "https://pixstock-official.vercel.app/",
    },
    {
      imgSrc: "/images/project-3.png",
      title: "E-commerce Store",
      tags: ["Wordpress", "woocommerce"],
      projectLink: "https://brand.designders.com",
    },
    {
      imgSrc: "/images/project-4.png",
      title: "Construction Website",
      tags: ["Web-design", "Development"],
      projectLink: "https://abuomartowing.com",
    },
    {
      imgSrc: "/images/project-5.png",
      title: "eCommerce packing website",
      tags: ["eCommerce", "Development"],
      projectLink: "https://github.com/codewithsadee/anon-ecommerce-website",
    },
    {
      imgSrc: "/images/project-6.png",
      title: "Car rental website",
      tags: ["Web-design", "Development"],
      projectLink: "https://carflex.ae",
    },
  ];

  return (
    <section 
    id="work"
    className="section"
    >
      <div className="container">

        <h2 className="headline-2 mb-8 reveal-up">
        My portfolio highlights
        </h2>

        <div className="grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))]">
            {works.map(({
                imgSrc,
                title,
                tags,
                projectLink
            },key) =>(
                <ProjectCard 
                key={key}
                imgSrc={imgSrc}
                title={title}
                tags={tags}
                projectLink={projectLink}
                classes="reveal-up"/>
            ))}
        </div>

      </div>
    </section>
  );
};

export default Work;
