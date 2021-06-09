import React from 'react';
import {LoadingContext} from "../contexts/LoadingContext";

function PopupWithForm({
                         isOpen,
                         onClose,
                         onSubmit,
                         name,
                         title,
                         children,
                         isValid
                       }) {
  const loadingText = React.useContext(LoadingContext);
  const form = document.getElementsByName(name)[0]

  function stopClose (e) {
    e.stopPropagation();
  }

  function handleClosePopup () {
    form.reset();
    onClose();
  }

  return (
    <section className={`popup popup_type_${name}${isOpen ? ' popup_visible' : ''}`} onMouseDown={handleClosePopup}>
      <form className='popup__form' name={name} onSubmit={onSubmit} noValidate onMouseDown={stopClose}>
        <button type="button" className="popup__close-btn" onMouseDown={handleClosePopup}></button>
        <h3 className="popup__title">{title}</h3>
        {children}
        <button type="submit" disabled={!isValid} className="popup__submit-btn">{loadingText}</button>
      </form>
    </section>
  )
}

export default PopupWithForm;