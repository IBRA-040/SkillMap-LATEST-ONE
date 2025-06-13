const LoginHeader = () => {
  return (
    <header className="bg-white shadow-md py-6 px-4 relative z-10">
      <div className="flex justify-center flex-col md:flex-row items-center gap-0 md:gap-3">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary text-2xl md:text-4xl font-bold tracking-wide">
          SkillMap
        </h1>
        <p className="text-sm text-gray-500 mt-0 md:mt-5">Map Your Skills, Master Your Path</p>
      </div>
    </header>
  );
};

export default LoginHeader;
