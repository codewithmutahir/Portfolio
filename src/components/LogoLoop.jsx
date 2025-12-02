/**
 * @copyright 2024 codewithmutahir
 *  @license   Apache-2.0
 */

import PropTypes from "prop-types";

const LogoLoop = ({ logos, speed = 50, className = "" }) => {
  // Duplicate logos array for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div
      className={`logo-loop-container overflow-hidden ${className}`}
      style={{ "--speed": `${speed}s` }}
    >
      <div className="logo-loop-wrapper flex items-center gap-8">
        {duplicatedLogos.map((logo, index) => {
          const IconComponent = logo.icon;
          return (
            <div
              key={`logo-${index}`}
              className="logo-item flex-shrink-0 flex items-center justify-center"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl ring-1 ring-zinc-300/50 dark:ring-zinc-50/10 transition-all duration-300 hover:scale-110 hover:bg-zinc-200 dark:hover:bg-zinc-700 group">
                {IconComponent ? (
                  <IconComponent 
                    className="w-full h-full logo-icon-filter transition-all duration-300" 
                    aria-label={logo.label}
                  />
                ) : (
                  <img
                    src={logo.imgSrc}
                    alt={`${logo.label} technology logo - Used by Mutahir Hussain`}
                    className="w-full h-full object-contain logo-bw-filter transition-opacity duration-300 group-hover:opacity-100"
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

LogoLoop.propTypes = {
  logos: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.elementType,
      imgSrc: PropTypes.string,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  speed: PropTypes.number,
  className: PropTypes.string,
};

export default LogoLoop;

