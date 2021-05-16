import React from 'react';
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({
                cards,
                onCardLike,
                onCardDelete,
                onEditAvatar,
                onEditProfile,
                onAddPlace,
                onCardClick
              }) {

  const currentUser = React.useContext(CurrentUserContext);

  const cardList = cards.map((cardItem) => (
      <Card
        card={cardItem}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
        key={cardItem._id}
      />
    )
  );

  return (
    <main className="content">

      <section className="profile">
        <div onClick={onEditAvatar}>
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар"/>
          <div className="profile__edit-avatar"></div>
        </div>
        <div className="profile__info">
          <div>
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__about">{currentUser.about}</p>
          </div>
          <button type="button" className="profile__edit-btn" onClick={onEditProfile}></button>
        </div>
        <button type="button" className="profile__add-btn" onClick={onAddPlace}></button>
      </section>

      <section className="photo">
        {cardList}
      </section>

      <section className="popup popup_type_confirm">
        <form className="form popup__form_type_confirm" name="confirm-form" noValidate>
          <button type="button" className="popup__close-btn popup__close-btn_form_confirm"></button>
          <h3 className="form__title">Вы уверены?</h3>
          <button type="submit" className="form__submit-btn popup__submit-btn_form_add">Да</button>
        </form>
      </section>

    </main>
  )
}

export default Main;