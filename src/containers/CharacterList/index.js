import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { createStructuredSelector } from "reselect";
import BottomScrollListener from "react-bottom-scroll-listener";

import CharacterCard from "components/CharacterCard";

import { getCharactersSucceeded, getCharactersFailed } from "modules/actions";
import { makeSelectCharacters } from "modules/selectors";

import "./style.scss";

class CharacterList extends Component {
  state = {
    offset: 0,
    total: null
  };
  componentDidMount() {
    this.fetchCharacters();
  }

  fetchMore = () => {
    const { offset, total } = this.state;

    if (offset + 30 <= total) {
      this.setState(
        prevState => ({
          offset: prevState.offset + 30
        }),
        this.fetchCharacters
      );
    }
  };

  fetchCharacters = () => {
    const apiUrl = process.env.REACT_APP_MARVEL_API_URL;
    const apiKey = process.env.REACT_APP_MARVEL_API_PUBLIC_KEY;
    const { getCharacters, getCharactersError } = this.props;
    const { offset } = this.state;
    const limit = 30;
    axios
      .get(
        `${apiUrl}characters?apikey=${apiKey}&offset=${offset}&limit=${limit}`
      )
      .then(res => {
        const { results, total } = res.data.data;
        this.setState({ total });
        getCharacters(results);
      })
      .catch(err => {
        getCharactersError(err);
      });
  };

  render() {
    const { characters } = this.props;
    return (
      <BottomScrollListener onBottom={this.fetchMore}>
        <div className="character-list-wrapper">
          <h1 className="character-list-wrapper-title">
            Tuttur Frontend Case Study
          </h1>
          <div className="character-list-wrapper__characters">
            {characters.map((character, key) => {
              return <CharacterCard character={character} key={key} />;
            })}
          </div>
        </div>
      </BottomScrollListener>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  characters: makeSelectCharacters()
});

const mapDispatchToProps = dispatch => ({
  getCharacters: characters => {
    dispatch(getCharactersSucceeded(characters));
  },
  getCharactersError: reason => {
    dispatch(getCharactersFailed(reason));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CharacterList);
