import React, { useState, useEffect } from "react";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import { Grid, Slider } from "@material-ui/core";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import VolumeMuteIcon from "@material-ui/icons/VolumeMute";
import { useDataLayerValue } from "../DataLayer";
import searchYoutube from "youtube-api-search";
import ReactPlayer from "react-player/youtube";

const Footer = () => {
  const [
    { discover_weekly, artist, song, playing },
    dispatch,
  ] = useDataLayerValue();
  const [mute, setMute] = useState(false);
  const [songId, setSongId] = useState(null);
  const [volume, setVolume] = React.useState(30);
  const [volumeSong, setVolumeSong] = React.useState(0.3);
  const [activeLoop, setActiveLoop] = React.useState(false);

  useEffect(() => {
    song !== null &&
      searchYoutube(
        { key: process.env.REACT_APP_API_KEY, term: song },
        (videos) => {
          setSongId(videos[0].id.videoId);
        }
      );
  }, [song]);

  const prevSong = () => {
    for (let i = 0; i < discover_weekly.tracks.items.length; i++) {
      if (discover_weekly.tracks.items[i].track.name === song) {
        if (i - 1 < 0) {
          dispatch({
            type: "SET_ARTIST",
            artist: discover_weekly?.tracks.items[i].track.artists[0].name,
          });
          dispatch({
            type: "SET_SONG",
            song: discover_weekly.tracks.items[i].track.name,
          });
        } else {
          dispatch({
            type: "SET_ARTIST",
            artist: discover_weekly?.tracks.items[i - 1].track.artists[0].name,
          });
          dispatch({
            type: "SET_SONG",
            song: discover_weekly.tracks.items[i - 1].track.name,
          });
        }
        break;
      }
    }
  };

  const playSong = () => {
    song !== null &&
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
  };

  const pauseSong = () => {
    dispatch({
      type: "SET_PLAYING",
      playing: false,
    });
  };

  const nextSong = () => {
    for (let i = 0; i < discover_weekly.tracks.items.length; i++) {
      if (discover_weekly.tracks.items[i].track.name === song) {
        if (i + 1 === discover_weekly.tracks.items.length) {
          dispatch({
            type: "SET_ARTIST",
            artist: discover_weekly?.tracks.items[0].track.artists[0].name,
          });
          dispatch({
            type: "SET_SONG",
            song: discover_weekly.tracks.items[0].track.name,
          });
        } else {
          dispatch({
            type: "SET_ARTIST",
            artist: discover_weekly?.tracks.items[i + 1].track.artists[0].name,
          });
          dispatch({
            type: "SET_SONG",
            song: discover_weekly.tracks.items[i + 1].track.name,
          });
        }
        break;
      }
    }
  };

  const handleChange = (event, newValue) => {
    setVolume(newValue);
    setVolumeSong(newValue / 100);
  };

  return (
    <div
      style={{ backgroundColor: "#282828" }}
      className="fixed flex justify-between bottom-0 pl-6 pr-6 h-20 w-full "
    >
      <div
        style={{ flex: "0.15" }}
        className="flex items-center text-white w-11"
      >
        <div>
          <h4 className="">{song}</h4>
          <p className="text-xs">{artist}</p>
        </div>
      </div>
      <div
        style={{ flex: "0.25" }}
        className="flex items-center text-white justify-between max-w-xs ml-20"
      >
        <ShuffleIcon
          onClick={() => alert("Non disponible")}
          style={{ transition: "transform 200ms ease-in" }}
          className="text-green-500 transform hover:scale-125"
        />
        <SkipPreviousIcon
          onClick={prevSong}
          style={{ transition: "transform 200ms ease-in" }}
          className="transform hover:scale-125"
        />
        {playing ? (
          <PauseCircleOutlineIcon
            onClick={pauseSong}
            fontSize="large"
            style={{ transition: "transform 200ms ease-in" }}
            className="transform hover:scale-125"
          />
        ) : (
          <PlayCircleOutlineIcon
            onClick={playSong}
            fontSize="large"
            style={{ transition: "transform 200ms ease-in" }}
            className="transform hover:scale-125"
          />
        )}
        <SkipNextIcon
          onClick={nextSong}
          style={{ transition: "transform 200ms ease-in" }}
          className="transform hover:scale-125"
        />
        <RepeatIcon
          onClick={() => setActiveLoop(!activeLoop)}
          style={{ transition: "transform 200ms ease-in" }}
          className={`${
            activeLoop ? "text-green-500" : "text-white"
          } transform hover:scale-125`}
        />
      </div>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${songId}`}
        playing={playing}
        muted={mute}
        volume={volumeSong}
        loop={activeLoop}
        onEnded={nextSong}
        width="0"
        height="0"
      />
      <div
        style={{ flex: "0.3", maxWidth: "250px" }}
        className="flex items-center text-white justify-between footer-right"
      >
        <Grid container spacing={2}>
          <Grid item>
            {mute ? (
              <VolumeMuteIcon
                onClick={() => setMute(false)}
                style={{ transition: "transform 200ms ease-in" }}
                className="transform hover:scale-125"
              />
            ) : (
              <VolumeDownIcon
                onClick={() => setMute(true)}
                style={{ transition: "transform 200ms ease-in" }}
                className="transform hover:scale-125"
              />
            )}
          </Grid>
          <Grid item xs>
            <Slider value={volume} onChange={handleChange} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Footer;
