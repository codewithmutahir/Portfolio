/**
 * @copyright 2024 codewithmutahir
 *  @license   Apache-2.0
 */

/**
 * Components
 */

import { ButtonPrimary, ButtonOutline } from "./Button";
import BlurText from "../components/BlurText";

const Hero = () => {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <section id="home" className="pt-28 lg:pt-36">
      <div className="container lg:grid lg:grid-cols-2 items-center lg:gap-10">
        <div>
          <div className="flex items-center gap-3">
            <figure className="img-box w-9 h-9 rounded-lg">
              <img
                src="/images/avatar-1.png"
                width={40}
                height={40}
                alt="Mutahir Hussain - Web and Mobile App Developer profile picture"
                className="img-cover"
              />
            </figure>


            <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 text-sm tracking-wide">
              <span className="relative w-2 h-2 rounded-full bg-emerald-400">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping"></span>
              </span>
              Available for work
            </div>
          </div>

          <h1 className="sr-only">Mutahir Hussain - Web & Mobile App Developer</h1>
          <BlurText
            text="Building Scalable Modern Websites for the Future"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="font-semibold text-5xl max-w-[15ch] sm:max-w-[20ch] lg:max-w-[15ch] mt-5 mb-8 lg:mb-10"
          />

          <div className="flex items-center gap-3 ">
            <ButtonPrimary
              label="Download CV"
              icon="download"
              href="/resume/Resume.pdf"
              target="_blank"
            />

            <ButtonOutline
              href="#about"
              label="Scroll down"
              icon="arrow_downward"
            />
          </div>
        </div>

        <div className="hidden lg:block">
          <figure
            className="w-full max-w-[480px] ml-auto bg-gradient-to-t from-sky-400 via 25% via-sky-400/40
          to-65% rounded-[60px] overflow-hidden"
          >
            <img
              src="/images/hero-banner.png"
              width={656}
              height={800}
              alt="Mutahir Hussain - Professional Web Developer showcasing modern web development skills"
              className="w-full"
              loading="eager"
            />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Hero;
