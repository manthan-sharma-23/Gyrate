import React from "react";

const Home = () => {
  const auth = () => {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=7557fdc21134fa451fa5&scope=user:email%20read:user"
    );
  };

  return (
    <div className="flex h-full w-full justify-center items-center">
      <button
        onClick={auth}
        className="h-auto w-auto px-5 py-2 rounded-md bg-[#101010] hover:bg-[#101010]/80 text-white"
      >
        Login with Github
      </button>
    </div>
  );
};

export default Home;
