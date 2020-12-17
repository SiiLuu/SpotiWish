// Packages
import React from "react";

// Components & files
import { loginUrl } from "../spotify";

const Login = () => {
  return (
    <div className="grid place-items-center h-screen bg-black">
      <img
        className="w-1/2"
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt="Spotify Logo"
      />
      <a
        href={loginUrl}
        className="p-7 rounded-full bg-green-400 font-extrabold text-white"
      >
        LOGIN WITH SPOTIFY
      </a>
    </div>
  );
};

export default Login;
