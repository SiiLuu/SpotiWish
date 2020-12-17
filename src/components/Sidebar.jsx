import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";

import SidebarOption from "./SidebarOption";
import { useDataLayerValue } from "../DataLayer";

const Sidebar = ({ spotify }) => {
  const [{ playlists }, dispatch] = useDataLayerValue();

  const changePlaylist = (id) => {
    spotify.getPlaylist(id).then((response) => {
      dispatch({
        type: "SET_DISCOVER_WEEKLY",
        discover_weekly: response,
      });
    });
  };

  return (
    <div
      style={{ flex: "0.2", backgroundColor: "#040404", minWidth: "230px" }}
      className="h-screen text-white pl-3 pr-3"
    >
      <img
        className="object-contain h-28 p-3 mr-auto"
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt="Spotify Logo"
      />
      <SidebarOption Icon={HomeIcon} title="Home" />
      <SidebarOption Icon={SearchIcon} title="Search" />
      <SidebarOption Icon={LibraryMusicIcon} title="Your Library" />
      <br />
      <strong className="ml-3 pb-2 text-sm">PLAYLISTS</strong>
      <hr
        style={{
          border: "1px solid #282828",
          width: "90%",
          margin: "10px auto",
        }}
      />
      <SidebarOption
        title="TOP 50 France"
        id="37i9dQZEVXbIPWwFssbupI"
        changePlaylist={changePlaylist}
      />
      <SidebarOption
        title="TOP 50 Monde"
        id="37i9dQZEVXbMDoHDwVN2tF"
        changePlaylist={changePlaylist}
      />
      {playlists?.items?.map((playlist, index) => (
        <SidebarOption
          key={index}
          title={playlist.name}
          id={playlist.id}
          changePlaylist={changePlaylist}
        />
      ))}
    </div>
  );
};

export default Sidebar;
