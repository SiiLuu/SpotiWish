import React from "react";
import { useDataLayerValue } from "../DataLayer";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import Header from "./Header";
import SongRow from "./SongRow";

const Body = ({ spotify }) => {
  const [{ discover_weekly }, dispatch] = useDataLayerValue();

  const playSong = (artist, song) => {
    dispatch({
      type: "SET_ARTIST",
      artist: artist,
    });
    dispatch({
      type: "SET_SONG",
      song: song,
    });
    dispatch({
      type: "SET_PLAYING",
      playing: true,
    });
  };

  return (
    <div
      style={{
        overflowY: "overlay",
        flex: "0.8",
        background: "linear-gradient(rgb(91, 87, 115), rgba(0, 0, 0, 1))",
      }}
      className="body h-screen text-white p-10"
    >
      <Header spotify={spotify} />
      <div className="flex items-end p-3">
        <img
          style={{
            height: "20vw",
            margin: "0 20px",
            boxShadow: "0 4px 60px rgba(0, 0, 0, 0.5)",
          }}
          src={discover_weekly?.images[0].url}
          alt=""
        />
        <div className="flex-1">
          <strong>PLAYLIST</strong>
          <h2 className="text-6xl mb-3">{discover_weekly?.name}</h2>
          <p className="text-lg">{discover_weekly?.description}</p>
        </div>
      </div>
      <br />
      <hr />
      <div style={{ margin: "0px -30px" }}>
        <div
          style={{ margin: "0px -30px" }}
          className="body_icons flex items-center"
        >
          <PlayCircleFilledIcon
            onClick={() =>
              playSong(
                discover_weekly?.tracks.items[0].track.artists[0].name,
                discover_weekly?.tracks.items[0].track.name
              )
            }
            style={{ fontSize: "80px", transition: "100ms transform ease-in" }}
            className="ml-16 mt-7 mb-7 transform hover:scale-125"
          />
          <FavoriteIcon
            onClick={() => alert("Non disponible")}
            fontSize="large"
            style={{ transition: "100ms transform ease-in" }}
            className="transform hover:scale-125"
          />
          <MoreHorizIcon
            onClick={() => alert("Non disponible")}
            style={{ transition: "100ms transform ease-in" }}
            className="transform hover:scale-125"
          />
        </div>
        {discover_weekly?.tracks.items.map((item, index) => (
          <SongRow key={index} track={item.track} playSong={playSong} />
        ))}
        <br />
        <br />
      </div>
    </div>
  );
};

export default Body;
