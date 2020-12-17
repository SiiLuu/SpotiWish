export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  item: null,
  token: null,
  song: null,
  artist: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    case "SET_DISCOVER_WEEKLY":
      return {
        ...state,
        discover_weekly: action.discover_weekly,
      };
    case "SET_SONG":
      return {
        ...state,
        song: action.song,
      };
    case "SET_ARTIST":
      return {
        ...state,
        artist: action.artist,
      };
    case "SET_PLAYING":
      return {
        ...state,
        playing: action.playing,
      };
    default:
      return state;
  }
};

export default reducer;
