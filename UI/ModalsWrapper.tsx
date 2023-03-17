const Wrapper = ({ children }) => {
  return (
    <div className="absolute h-screen flex justify-center items-center w-screen">
      {children}
    </div>
  );
};

export default Wrapper;
