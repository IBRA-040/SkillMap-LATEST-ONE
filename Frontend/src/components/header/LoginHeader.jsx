const LoginHeader = () => {
  return (
    <header className="bg-gray-100 shadow-2xl py-5 relative z-10">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <a className="block" href="/">
              <h1 className="text-primary text-3xl font-semibold">SkillMap </h1>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <a
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-sm"
                href="#"
              >
                Login
              </a>

              <div className="hidden sm:flex">
                <a
                  className="rounded-md bg-secondary px-5 py-2.5 text-sm font-medium text-white"
                  href="#"
                >
                  Register
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LoginHeader;
