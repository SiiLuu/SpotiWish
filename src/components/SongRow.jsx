import React from "react";
import { useDataLayerValue } from "../DataLayer";

const SongRow = ({ track, playSong }) => {
  const [{ playing }, dispatch] = useDataLayerValue();

  const play = () => {
    playSong(track.artists[0].name, track.name);
    dispatch({
      type: "SET_PLAYING",
      playing: true,
    });
  };

  return (
    <div
      onClick={play}
      className="ml-6 p-6 flex items-center text-white h-20 cursor-pointer rounded-xl
      hover:cursor-pointer hover:bg-black hover:opacity-70"
    >
      <img className="h-14 w-14" src={track.album.images[0].url} alt="" />
      <div className="ml-7">
        <h1 className="text-lg">{track.name}</h1>
        <p className="text-base text-gray-500">
          {track.artists.map((artist) => artist.name).join(", ")} -{" "}
          {track.album.name}
        </p>
      </div>
    </div>
  );
};

export default SongRow;
