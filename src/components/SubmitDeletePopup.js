import React from 'react';
import PopupWithForm from "./PopupWithForm";

function SubmitDeletePopup({isOpen, onClose, stopClose, onDelete}) {

  function handleSubmit(e) {
    e.preventDefault();
    onDelete();
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      stopClose={stopClose}
      onSubmit={handleSubmit}
      name={'confirm-form'}
      title={'Вы уверены?'}
      isValid={true}
    >
    </PopupWithForm>
  )
}

export default SubmitDeletePopup;