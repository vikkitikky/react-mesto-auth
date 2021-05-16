import React from 'react';
import {withRouter} from 'react-router-dom';

const Login = ({signIn}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    signIn(password, email);
    setEmail('');
    setPassword('');
  }

  return (
    <div className="sign">
      <h1 className="sign__title">Авторизация</h1>
      <form className="sign__form" onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" className="sign__input" type='email'
               onChange={(e) => setEmail(e.target.value)}/>
        <input name="password" placeholder="Пароль" className="sign__input" type='password'
               onChange={(e) => setPassword(e.target.value)}/>
        <button type='submit' className="sign__submit">Войти</button>
      </form>
    </div>
  )
}

export default withRouter(Login);
