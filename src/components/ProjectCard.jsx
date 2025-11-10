/**
 * @copyright 2024 codewithmutahir
 *  @license   Apache-2.0
 */

/**
 * Node Modules
 */

import PropTypes from "prop-types";

const ProjectCard = ({ imgSrc, title, projectLink, tags, classes}) => {
  return (
    <div className={"project-card-wrapper " + classes}>
      <div className="project-card relative p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700/50 active:bg-zinc-300 dark:active:bg-zinc-700/60 ring-1 ring-inset ring-zinc-300/50 dark:ring-zinc-50/5 transition-all duration-300 shadow-sm dark:shadow-none">

      <figure className="img-box aspect-square rounded-lg mb-4">
        <img src={imgSrc} alt={title} loading="lazy" className="img-cover" />
      </figure>

      <div className="flex items-center justify-between gap-4">

        <div className="">
          <h3 className="title-1 mb-3 text-zinc-900 dark:text-zinc-50">
            {title}
          </h3>

          <div className="flex flex-wrap items-center gap-2">
            {tags.map((label,key) =>(
                <span key={key} className="h-8 text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-200/80 dark:bg-zinc-50/5 grid items-center px-3 rounded-lg">
                    {label}
                </span>
            ))}
          </div>
        </div>

        <div className="w-11 h-11 rounded-lg grid place-items-center bg-sky-400 text-zinc-950 shrink-0">
            <span 
            className="material-symbols-rounded"
            aria-hidden="true">
                arrow_outward
            </span>
        </div>

        

      </div>

      <a 
       href={projectLink}
       target="_blank"
       className="absolute inset-0 z-10">

       </a>

      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  projectLink: PropTypes.string,
  classes: PropTypes.string,
};

export default ProjectCard;
