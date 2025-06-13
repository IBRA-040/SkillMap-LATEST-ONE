const Footer = () => {
  return (
    <div className="">
      <footer className="bg-gray-100 ">
        <div className="relative mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8 lg:pt-10">
          <div className="lg:flex lg:items-end lg:justify-between">
            <div>
              <div className="flex justify-center lg:justify-start">
                <a className="block" href="/">
                  <h1 className="text-primary text-3xl font-semibold">SkillMap</h1>
                </a>
              </div>

              <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 lg:text-left">
                SkillMap, created in 2025, aims to formally benefit individuals by facilitating
                skill road maps and professional growth.
              </p>
            </div>

            <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
              <li>
                <a className="text-gray-700 transition hover:text-gray-700/75" href="#">
                  About
                </a>
              </li>

              <li>
                <a className="text-gray-700 transition hover:text-gray-700/75" href="#">
                  Services
                </a>
              </li>

              <li>
                <a className="text-gray-700 transition hover:text-gray-700/75" href="#">
                  Projects
                </a>
              </li>

              <li>
                <a className="text-gray-700 transition hover:text-gray-700/75" href="#">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <p className="mt-12 text-center text-sm text-gray-500 lg:text-right">
            SkillMap&copy; 2025. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
