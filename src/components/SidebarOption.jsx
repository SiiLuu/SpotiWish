import React from "react";

const SidebarOption = ({ id, title, Icon, changePlaylist }) => {
  return (
    <div
      onClick={
        changePlaylist
          ? () => changePlaylist(id)
          : () => alert("Non disponible")
      }
      style={{ transition: "200ms color ease-in" }}
      className="text-gray-500 h-14 cursor-pointer hover:text-white flex items-center"
    >
      {Icon && <Icon className="ml-3 mr-3" />}
      {Icon ? <h4>{title}</h4> : <p className="mt-3 ml-7 text-base">{title}</p>}
    </div>
  );
};

export default SidebarOption;
