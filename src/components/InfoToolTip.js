import React from 'react';

function InfoToolTip({
                       isOpen,
                       success,
                       onClose,
                       stopClose
                     }) {
  return (
    <section className={`popup ${isOpen ? ' popup_visible' : ''}`} onMouseDown={onClose}>
      <div className="popup__info" onClick={stopClose}>
        <button type="button" className="popup__close-btn" onMouseDown={onClose}></button>
        <div
          className={`popup__confirm-img ${success ? 'popup__confirm-img_type_success' : 'popup__confirm-img_type_fail'}`}>
        </div>
        <p
          className='popup__text'>{success ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </p>
      </div>
    </section>
  )
}

export default InfoToolTip;