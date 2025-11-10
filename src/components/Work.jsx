/**
 * @copyright 2024 codewithmutahir
 *  @license   Apache-2.0
 */

/**
 * Components
 */

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard";


const Work = () => {
  const [activeTab, setActiveTab] = useState("All");

  const works = [
    {
      imgSrc: "/images/project-1.jpg",
      title: "Full stack music app",
      tags: ["API", "MVC", "Development"],
      projectLink: "https://musify-5al0.onrender.com/",
      category: "Custom",
    },
    {
      imgSrc: "/images/project-2.jpg",
      title: "Free stock photo app",
      tags: ["API", "SPA"],
      projectLink: "https://pixstock-official.vercel.app/",
      category: "Custom",
    },
    {
      imgSrc: "/images/project-6.png",
      title: "Car rental website",
      tags: ["Nextjs", "API","TailwindCSS"],
      projectLink: "https://carflex.ae",
      category: "Custom",
    },
    {
      imgSrc: "/images/project_7.png",
      title: "Broaster Chickens Website",
      tags: ["Wordpress Custom Theme", "WooCommerce"],
      projectLink: "https://broasterchickens.com",
      category: "Wordpress",
    },
    {
      imgSrc: "/images/project_8.png",
      title: "Resume Builder",
      tags: ["React", "Artificial Intelligence", "API"],
      projectLink: "https://resume-builder-three-ebon.vercel.app/",
      category: "Custom",
    },
    {
      imgSrc: "/images/project_9.png",
      title: "Currency Converter ",
      tags: ["React + Vite", "API","JavaScript"],
      projectLink: "https://currency-converter-one-flax.vercel.app/",
      category: "Custom",
    },
    {
      imgSrc: "/images/project_10.png",
      title: "Password Generator",
      tags: ["React + Vite", "JavaScript"],
      projectLink: "https://password-generator-beta-green.vercel.app/",
      category: "Custom",
    },
    {
      imgSrc: "/images/project_11.png",
      title: "Business Website",
      tags: ["Wordpress", "Custom Theme"],
      projectLink: "https://mfdsolution.com",
      category: "Wordpress",
    },
    {
      imgSrc: "/images/project_12.png",
      title: "BurgerBuz Website",
      tags: ["Wordpress", "Custom Theme"],
      projectLink: "https://burgerbuz.com",
      category: "Wordpress",
    },
  ];

  // Get unique categories
  const categories = ["All", ...new Set(works.map(work => work.category))];

  // Filter works based on active tab
  const filteredWorks = activeTab === "All" 
    ? works 
    : works.filter(work => work.category === activeTab);

  // Re-initialize animations when filtered works change
  const gridRef = useRef(null);
  const triggersRef = useRef([]);

  useEffect(() => {
    // Clean up previous triggers
    triggersRef.current.forEach((trigger) => trigger.kill());
    triggersRef.current = [];

    // Small delay to ensure DOM is updated
    const timeoutId = setTimeout(() => {
      // Refresh ScrollTrigger to recalculate positions
      ScrollTrigger.refresh();

      // Re-animate newly visible elements
      const elements = gridRef.current?.querySelectorAll(".reveal-up");
      if (elements && elements.length > 0) {
        elements.forEach((element) => {
          // Reset to initial state
          gsap.set(element, { y: 80, opacity: 0 });
          
          // Create animation with ScrollTrigger
          const trigger = gsap.to(element, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "-50 bottom",
              end: "bottom 80%",
              toggleActions: "play none none none",
            },
          });

          // Store trigger for cleanup
          triggersRef.current.push(trigger.scrollTrigger);
        });
      }
    }, 50);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      triggersRef.current.forEach((trigger) => trigger.kill());
      triggersRef.current = [];
    };
  }, [filteredWorks, activeTab]);

  return (
    <section 
    id="work"
    className="section"
    >
      <div className="container">

        <h2 className="headline-2 mb-8 reveal-up">
        My portfolio highlights
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-8 reveal-up">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === category
                  ? "bg-sky-400 text-zinc-950 shadow-lg shadow-sky-400/20"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-300 ring-1 ring-inset ring-zinc-300/50 dark:ring-zinc-50/5"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))]">
            {filteredWorks.map(({
                imgSrc,
                title,
                tags,
                projectLink
            }) =>(
                <ProjectCard 
                key={imgSrc}
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
