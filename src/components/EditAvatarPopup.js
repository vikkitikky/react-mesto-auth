import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, stopClose, onUpdateAvatar}) {
  const avatar = React.useRef('');
  const [avatarInputValid, setAvatarInputValid] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    !isOpen && avatar.current.parentElement.reset();
    setAvatarInputValid(false);
    setErrorMessage('');
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatar.current.value
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      stopClose={stopClose}
      onSubmit={handleSubmit}
      name={'edit-avatar'}
      title={'Обновить аватар'}
      isValid={avatarInputValid}
    >
      <>
        <input name="avatar" id="edit-avatar" type="url" ref={avatar} className="popup__input"
               required onInput={() => {
          setAvatarInputValid(avatar.current.validity.valid);
          setErrorMessage(avatar.current.validationMessage);
        }}/>
        <span id="edit-avatar-error" className="popup__error">{errorMessage}</span>
      </>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;