const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="text-xl text-gray-600 mt-2">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
    </div>
  );
};

export default NotFound;
