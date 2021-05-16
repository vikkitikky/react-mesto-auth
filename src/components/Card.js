import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({
                card,
                onCardClick,
                onCardLike,
                onCardDelete
              }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardDeleteButtonClassName = (`element__delete-btn ${isOwn ? '' : 'element__delete-btn_hidden'}`);
  const cardLikeButton = (`element__like-btn ${isLiked ? 'element__like-btn_active' : ''}`);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card._id);
  }

  return (
    <article className="element">
      <img className="element__img" src={card.link} alt={card.name} onClick={handleClick}/>
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <h2 className="element__title">{card.name}</h2>
      <div className="element__like-group">
        <button type="button" className={cardLikeButton} onClick={handleLikeClick}></button>
        <p className="element__like-count">{card.likes.length}</p>
      </div>
    </article>
  )
}

export default Card;