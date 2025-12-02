/**
 * @copyright 2024 codewithmutahir
 *  @license   Apache-2.0
 */

const About = () => {
  const aboutItems = [
    {
      label: "Project done",
      number: 45,
    },
    {
      label: "Years of experience",
      number: 3,
    },
  ];

  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="sr-only">About Mutahir Hussain</h2>
        <div className="bg-zinc-100/80 dark:bg-zinc-800/50 p-7 rounded-2xl md:p-12 reveal-up ring-1 ring-zinc-300/50 dark:ring-zinc-50/5 shadow-sm dark:shadow-none">
          <p className="text-zinc-700 dark:text-zinc-300 mb-4 md:mb-8 md:text-xl md:max-w-[60ch]">
            Hello! I&apos;m Mutahir Hussain, a passionate Web & Mobile App Developer
            specializing in crafting scalable, visually engaging, and
            high-performing websites. With strengths in React, React Native, Next.js,
            JavaScript, TypeScript, Node.js, and UI/UX design using Figma, I
            combine creativity with deep technical expertise to deliver seamless
            user experiences. From elegant front-end interfaces with Tailwind
            CSS and CSS3 to robust back-end solutions utilizing Express,
            MongoDB, Firebase, MySQL, and WordPress, I bring ideas to life—ensuring every project is
            both beautiful and functionally exceptional.
          </p>

          <div className="flex flex-wrap items-center gap-4 md:gap-7">
            {aboutItems.map(({ label, number }, key) => (
              <div key={key}>
                <div className="flex items-center md:mb-2">
                  <span className="text-2xl font-semibold md:text-4xl">
                    {number}
                  </span>
                  <span className="text-sky-400 font-semibold md:text-3xl">
                    +
                  </span>
                </div>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 ">
                  {label}
                </p>
              </div>
            ))}

            <img
              src="/images/logo.svg"
              alt="Mutahir Hussain Portfolio Logo"
              width={30}
              height={30}
              className="ml-auto md:w-[40px] md:h-[40px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
