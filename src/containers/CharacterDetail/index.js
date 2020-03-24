import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { createStructuredSelector } from "reselect";
import moment from "moment";

import {
  getCharacterDetailSucceeded,
  getCharacterDetailFailed,
  getCharacterComicsSucceeded,
  getCharacterComicsFailed
} from "modules/actions";

import {
  makeSelectCharacterDetail,
  makeSelectCharacterComics
} from "modules/selectors";

import CharacterDetailCard from "components/CharacterDetailCard";

import "./style.scss";

class CharacterDetail extends Component {
  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    this.fetchCharacterDetail(params);
  }

  fetchCharacterDetail = params => {
    const { id } = params;
    const { getCharacterDetail, getCharacterDetailError } = this.props;
    const apiUrl = process.env.REACT_APP_MARVEL_API_URL;
    const apiKey = process.env.REACT_APP_MARVEL_API_PUBLIC_KEY;
    axios
      .get(`${apiUrl}characters/${id}?apikey=${apiKey}`)
      .then(res => {
        const { results } = res.data.data;
        getCharacterDetail(results[0]);
        this.fetchCharacterComics(results[0].id);
      })
      .catch(err => {
        getCharacterDetailError(err);
      });
  };

  fetchCharacterComics = id => {
    const { getCharacterComics, getCharacterComicsError } = this.props;
    const apiUrl = process.env.REACT_APP_MARVEL_API_URL;
    const apiKey = process.env.REACT_APP_MARVEL_API_PUBLIC_KEY;
    const comicLimit = 10;
    const endDate = moment().format("YYYY-MM-DD");
    const startDate = "2005-12-31";
    axios
      .get(
        `${apiUrl}characters/${id}/comics?apikey=${apiKey}&limit=${comicLimit}&orderBy=-onsaleDate&dateRange=${startDate},${endDate}`
      )
      .then(res => {
        const { results } = res.data.data;
        getCharacterComics(results);
      })
      .catch(err => {
        getCharacterComicsError(err);
      });
  };

  render() {
    const { character, comics, history } = this.props;
    return (
      <div className="character-detail-wrapper">
        {character && (
          <CharacterDetailCard
            character={character}
            comics={comics}
            history={history}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  character: makeSelectCharacterDetail(),
  comics: makeSelectCharacterComics()
});

const mapDispatchToProps = dispatch => ({
  getCharacterDetail: character => {
    dispatch(getCharacterDetailSucceeded(character));
  },
  getCharacterDetailError: reason => {
    dispatch(getCharacterDetailFailed(reason));
  },
  getCharacterComics: comics => {
    dispatch(getCharacterComicsSucceeded(comics));
  },
  getCharacterComicsError: reason => {
    dispatch(getCharacterComicsFailed(reason));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CharacterDetail);
