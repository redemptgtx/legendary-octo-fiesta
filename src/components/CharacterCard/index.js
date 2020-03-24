import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./style.scss";

class CharacterCard extends Component {
  static propTypes = {
    character: PropTypes.object
  };
  render() {
    const {
      character: { id, name, thumbnail }
    } = this.props;
    const { path, extension } = thumbnail;

    return (
      <Link to={`/${id}`} className="character-card-wrapper">
        <figure className="character-card-wrapper__poster">
          <img
            className="poster-image"
            src={`${path}.${extension}`}
            alt="poster"
          />
        </figure>
        <div className="character-card-wrapper__info">
          <p className="info-name">{name}</p>
        </div>
      </Link>
    );
  }
}

export default CharacterCard;
