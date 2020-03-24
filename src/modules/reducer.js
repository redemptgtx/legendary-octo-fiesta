import { fromJS } from "immutable";
import {
  GET_CHARACTERS_SUCCEEDED,
  GET_CHARACTERS_FAILED,
  GET_CHARACTER_DETAIL_SUCCEEDED,
  GET_CHARACTER_DETAIL_FAILED,
  GET_CHARACTER_COMICS_SUCCEEDED,
  GET_CHARACTER_COMICS_FAILED
} from "./constants";

export const initialState = fromJS({
  characters: [],
  reason: null,
  character: {
    data: null,
    reason: null
  },
  comics: {
    data: null,
    reason: null
  }
});

const characterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHARACTERS_SUCCEEDED: {
      return state.update("characters", arr => arr.concat(action.characters));
    }
    case GET_CHARACTERS_FAILED: {
      return state.set("reason", action.reason);
    }

    case GET_CHARACTER_DETAIL_SUCCEEDED: {
      return state.setIn(["character", "data"], action.character);
    }

    case GET_CHARACTER_DETAIL_FAILED: {
      return state.setIn(["character", "reason"], action.reason);
    }

    case GET_CHARACTER_COMICS_SUCCEEDED: {
      return state.setIn(["comics", "data"], action.comics);
    }

    case GET_CHARACTER_COMICS_FAILED: {
      return state.setIn(["comics", "reason"], action.reason);
    }

    default:
      return state;
  }
};

export default characterReducer;
