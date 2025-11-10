/**
 * @copyright 2024 codewithmutahir
 *  @license   Apache-2.0
 */

/**
 * Node Modules
 */

import PropTypes from "prop-types";


const SkillCard = ({
    imgSrc, 
    label,
    desc,
    classes = ""
}) => {

    return(
        <div className={'flex items-center gap-3 ring-2 ring-inset ring-zinc-300/50 dark:ring-zinc-50/10 rounded-2xl p-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors group shadow-sm dark:shadow-none ' + classes}>
            <figure className="bg-zinc-200/80 dark:bg-zinc-700/50 rounded-lg overflow-hidden w-12 h-12 p-2 group-hover:bg-zinc-300 dark:group-hover:bg-zinc-900 transition-colors">
                <img 
                src={imgSrc}
                width={32}
                height={32}
                alt={label}
                className="" />
            </figure>

            <div className="">
                <h3 className="text-zinc-900 dark:text-zinc-50">{label}</h3>

                <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                    {desc}
                </p>
            </div>
        </div>
    )
    
}

export default SkillCard;

SkillCard.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    classes: PropTypes.string
}