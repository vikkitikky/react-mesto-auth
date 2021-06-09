import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({
                         isOpen,
                         onClose,
                         stopClose,
                         onAddPlace,
                         isLoadingText
                       }) {
  const name = React.useRef(null);
  const link = React.useRef(null);
  const [nameInputValid, setNameInputValid] = React.useState(false);
  const [linkInputValid, setLinkInputValid] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState();
  const [linkErrorMessage, setLinkErrorMessage] = React.useState();
  const formName = 'add-img';

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      link: link.current.value,
      name: name.current.value
    });
  }

  React.useEffect(() => {
    setLinkInputValid(false);
    setNameInputValid(false);
    setNameErrorMessage(null);
    setLinkErrorMessage(null);
  }, [isOpen])

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name={formName}
      title={'Новое место'}
      isValid={nameInputValid && linkInputValid}
    >
      <input name="name" id="add-title" className="popup__input popup__input_type_title" placeholder="Название"
             required minLength="2" maxLength="30" ref={name}
             onInput={() => {
               setNameInputValid(name.current.validity.valid);
               setNameErrorMessage(name.current.validationMessage);
             }}
      />
      <span id="add-title-error" className="popup__error">{nameErrorMessage}</span>
      <input name="link" id="add-url" type="url" className="popup__input popup__input_type_src"
             placeholder="Ссылка на картинку" required ref={link}
             onInput={() => {
               setLinkInputValid(link.current.validity.valid);
               setLinkErrorMessage(link.current.validationMessage);
             }}
      />
      <span id="add-url-error" className="popup__error">{linkErrorMessage}</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;