import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar } from "@material-ui/core";
import { useDataLayerValue } from "../DataLayer";

const Header = () => {
  const [{ user }] = useDataLayerValue();

  const onKeyDown = (event) => {
    event.key === "Enter" && alert("Non disponible");
  };

  return (
    <div className="flex justify-between mb-10">
      <div
        style={{ flex: "0.5", minWidth: "100px" }}
        className="bg-white text-gray-500 rounded-3xl p-3 flex items-center"
      >
        <SearchIcon />
        <input
          onKeyDown={onKeyDown}
          className="border-none w-full outline-none"
          type="text"
          placeholder="Search for Artists, Songs ..."
        />
      </div>
      <div className="flex items-center">
        <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
        <h4 className="ml-3">{user?.display_name}</h4>
      </div>
    </div>
  );
};

export default Header;
