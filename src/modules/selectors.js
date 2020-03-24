import { createSelector } from "reselect";

const getCharactersState = state => state.character;

const makeSelectCharacters = () => {
  return createSelector(getCharactersState, state => state.get("characters"));
};

const makeSelectCharacterDetail = () => {
  return createSelector(getCharactersState, state =>
    state.getIn(["character", "data"])
  );
};

const makeSelectCharacterComics = () => {
  return createSelector(getCharactersState, state =>
    state.getIn(["comics", "data"])
  );
};

export {
  makeSelectCharacters,
  makeSelectCharacterDetail,
  makeSelectCharacterComics
};
