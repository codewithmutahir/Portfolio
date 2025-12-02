/**
 * @copyright 2024 codewithmutahir
 *  @license   Apache-2.0
 */


/*
NODE MODULES
*/
import { useState } from "react";

/*
COMPONENTS
*/
import Navbar from "./Navbar";
import { ModeToggle } from "./mode-toggle";


const Header = () => {
    const [navOpen, setNavOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full h-20 flex items-center z-40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50">
      <div className="max-w-screen-2xl w-full mx-auto px-4 flex justify-between items-center md:px-6 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-4">
        <h1 className="flex-shrink-0">
          <a href="/" className="logo">
            <img
              src="/images/logo.svg"
              width={40}
              height={40}
              alt="Mutahir Hussain Portfolio Logo - Web Developer"
            />
          </a>
        </h1>

        <div className="relative md:justify-self-center md:col-start-2">
          <div className="flex items-center gap-2 md:hidden">
            <button className="menu-btn" onClick={() => setNavOpen((prev) => !prev)}>
              <span className="material-symbols-rounded">
                {navOpen ? 'close' : 'menu'}
              </span>
            </button>
            <div>
              <ModeToggle />
            </div>
          </div>

          <Navbar navOpen={navOpen}/>
        </div>

        <div className="flex items-center gap-3 md:justify-end md:col-start-3">
          <div className="max-md:hidden">
            <ModeToggle />
          </div>
          <a href="#contact" 
            className="btn btn-secondary max-md:hidden"
          >
            Contact Me
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
