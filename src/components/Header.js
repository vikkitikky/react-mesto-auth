import React from 'react';
import logo from '../image/logo.svg';
import {Link, Switch, Route} from 'react-router-dom';

function Header({handleSignOut, loggedIn, email}) {

  function signOut() {
    handleSignOut();
  }

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} className="header__logo" alt="Место.Россия"/>
      </Link>
      <p className="header__text">{email}</p>
      <Switch>
        <Route path='/sign-in'>
          <Link to='/sign-up' className='header__text'>Регистрация</Link>
        </Route>
        <Route path='/sign-up'>
          <Link to='/sign-in' className='header__text'>Войти</Link>
        </Route>
        {
          loggedIn && <Link to='/sign-in' className='header__text' onClick={signOut}>Выйти</Link>
        }
      </Switch>
    </header>
  )
}

export default Header;