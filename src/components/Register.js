import React from 'react';
import {withRouter, Link} from 'react-router-dom';

const Register = ({onRegister}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(password, email);
    setEmail('');
    setPassword('');
  }

  return (
    <div className="sign">
      <h1 className="sign__title">Регистрация</h1>
      <form onSubmit={handleSubmit} className="sign__form" noValidate>
        <input className="sign__input" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email"
               type='email' value={email || ''}/>
        <input className="sign__input" name="password" onChange={(e) => setPassword(e.target.value)}
               placeholder="Пароль"
               type='password' value={password || ''}/>
        <button type='submit' className="sign__submit">Зарегистрироваться</button>
      </form>
      <Link to="/sign-in" className='sign__link'>Уже зарегистрированы? Войти</Link>
    </div>
  )
}

export default withRouter(Register);