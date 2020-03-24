import {
  GET_CHARACTERS_FAILED,
  GET_CHARACTERS_SUCCEEDED,
  GET_CHARACTER_DETAIL_FAILED,
  GET_CHARACTER_DETAIL_SUCCEEDED,
  GET_CHARACTER_COMICS_FAILED,
  GET_CHARACTER_COMICS_SUCCEEDED
} from "./constants";

const getCharactersSucceeded = characters => ({
  type: GET_CHARACTERS_SUCCEEDED,
  characters
});

const getCharactersFailed = reason => ({
  type: GET_CHARACTERS_FAILED,
  reason
});

const getCharacterDetailSucceeded = character => ({
  type: GET_CHARACTER_DETAIL_SUCCEEDED,
  character
});

const getCharacterDetailFailed = reason => ({
  type: GET_CHARACTER_DETAIL_FAILED,
  reason
});

const getCharacterComicsSucceeded = comics => ({
  type: GET_CHARACTER_COMICS_SUCCEEDED,
  comics
});

const getCharacterComicsFailed = reason => ({
  type: GET_CHARACTER_COMICS_FAILED,
  reason
});

export {
  getCharactersSucceeded,
  getCharactersFailed,
  getCharacterDetailSucceeded,
  getCharacterDetailFailed,
  getCharacterComicsSucceeded,
  getCharacterComicsFailed
};
