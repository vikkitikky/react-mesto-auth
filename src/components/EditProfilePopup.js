import React from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from '../contexts/CurrentUserContext';


function EditProfilePopup({isOpen, onClose, stopClose, onUpdateUser}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.description);
  const [inputName, setInputNameValid] = React.useState(false);
  const [inputAbout, setInputAboutValid] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [aboutErrorMessage, setAboutErrorMessage] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setNameErrorMessage('');
    setAboutErrorMessage('');
    setInputNameValid(false);
    setInputAboutValid(false);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      stopClose={stopClose}
      onSubmit={handleSubmit}
      name={'edit-profile'}
      title={'Редактировать профиль'}
      isValid={inputName && inputAbout}
    >
      <>
        <input name="name" id="edit-name" className="popup__input" placeholder="Имя" required
               minLength="2" maxLength="40" value={name || ""}
               onChange={e => {
                 setName(e.target.value);
                 setInputNameValid(e.target.validity.valid);
                 setNameErrorMessage(e.target.validationMessage);
               }}
        />
        <span id="edit-name-error" className="popup__error">{nameErrorMessage}</span>
        <input name="about" id="edit-about" className="popup__input" placeholder="О себе"
               required minLength="2" maxLength="200" value={description || ""}
               onChange={e => {
                 setDescription(e.target.value);
                 setInputAboutValid(e.target.validity.valid);
                 setAboutErrorMessage(e.target.validationMessage);
               }
               }
        />
        <span id="edit-about-error" className="popup__error">{aboutErrorMessage}</span>
      </>
    </PopupWithForm>
  )
}

export default EditProfilePopup;