import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({
                         isOpen,
                         onClose,
                         stopClose,
                         onAddPlace
                       }) {
  const name = React.useRef('');
  const link = React.useRef('');
  const [nameInputValid, setNameInputValid] = React.useState(false);
  const [linkInputValid, setLinkInputValid] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [linkErrorMessage, setLinkErrorMessage] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      link: link.current.value,
      name: name.current.value
    });
  }

  React.useEffect(() => {
    !isOpen && link.current.parentElement.reset();
    setLinkInputValid(false);
    setNameInputValid(false);
    setNameErrorMessage('');
    setLinkErrorMessage('');
  }, [isOpen])

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      stopClose={stopClose}
      onSubmit={handleSubmit}
      name={'add-img'}
      title={'Новое место'}
      isValid={nameInputValid && linkInputValid}
    >
      <>
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
      </>
    </PopupWithForm>
  )
}

export default AddPlacePopup;