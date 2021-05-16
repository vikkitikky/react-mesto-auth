import React from 'react';
import logo from '../image/logo.svg';
import {useHistory, useLocation, Link} from 'react-router-dom';

function Header({handleSignOut, loggedIn, email}) {
  const history = useHistory();
  const location = useLocation().pathname;

  function signOut() {
    handleSignOut();
    history.push('/')
  }

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} className="header__logo" alt="Место.Россия"/>
      </Link>
      <p className="header__text">{email}</p>
      {location === '/sign-in' && <Link to='/sign-up' className='header__text'>Регистрация</Link>}
      {location === '/sign-up' && <Link to='/sign-in' className='header__text'>Войти</Link>}
      {loggedIn && <Link to='/sign-in' className='header__text' onClick={signOut}>Выйти</Link>}
    </header>
  )
}

export default Header;