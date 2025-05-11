import { useState } from "react";
import HeroImg from "../../assets/Images/Hero.png";
import LoginForm from "../form/LoginForm";
import RegisterForm from "../form/RegisterForm";

const Hero = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="bg-primary">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center max-w-7xl mx-auto px-6 py-10">
        <div className="col-span-1 lg:col-span-5 flex justify-center">
          {isLogin ? (
            <LoginForm onSignUp={handleToggleForm} />
          ) : (
            <RegisterForm onLogin={handleToggleForm} />
          )}
        </div>

        <div className="col-span-1 lg:col-span-7 hidden lg:flex justify-center">
          <img className="w-full max-w-3xl" src={HeroImg} alt="Hero image" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
