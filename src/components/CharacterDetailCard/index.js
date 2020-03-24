import React from "react";
import { v1 as uuidv1 } from "uuid";

import "./style.scss";

const CharacterDetailCard = ({ character, comics, history }) => {
  const {
    name,
    description,
    thumbnail: { path, extension }
  } = character;
  return (
    <div className="character-detail-card-wrapper">
      <div className="image">
        <img src={`${path}.${extension}`} alt="poster" />
        <button
          className="status"
          onClick={() => {
            history.goBack();
          }}
        >
          Go Back
        </button>
      </div>
      <div className="details">
        <div className="name">{name}</div>
        {description && (
          <>
            <div className="desc">{description}</div>
          </>
        )}
        <ul className="comics">
          {comics &&
            comics.map((item, idx) => {
              return <li key={uuidv1()}>{item.title}</li>;
            })}
        </ul>
      </div>
    </div>
  );
};

export default CharacterDetailCard;
