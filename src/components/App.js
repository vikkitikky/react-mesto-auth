import React from 'react';
import {Route, Switch, useHistory} from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import AddPlacePopup from "./AddPlacePopup";
import SubmitDeletePopup from "./SubmitDeletePopup";
import {LoadingContext} from "../contexts/LoadingContext";
import ProtectedRoute from "./ProtectedRoute";
import PageNotFound from "./PageNotFound";
import * as auth from '../utils/auth';
import InfoToolTip from "./InfoToolTip";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [cardToDelete, setCardToDelete] = React.useState(null);
  const [loadingText, setLoadingText] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [successSignUp, setSuccessSignUp] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const history = useHistory();

  React.useEffect(() => {
    handleTokenCheck();
  }, [])

  React.useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn]);

  React.useEffect(() => {
    api.getAppData()
      .then(([userProfile, cardList]) => {
        setCurrentUser(userProfile);
        setCards(cardList);
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setLoadingText('??????????????????');
    document.addEventListener('keydown', handleEscButton);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setLoadingText('??????????????????');
    document.addEventListener('keydown', handleEscButton);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setLoadingText('??????????????');
    document.addEventListener('keydown', handleEscButton);
  }

  function handleDeleteCardClick(card) {
    setIsDeletePopupOpen(true);
    setLoadingText('????')
    setCardToDelete(card);
    document.addEventListener('keydown', handleEscButton);
  }

  function handleEscButton(e) {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  }

  function closeAllPopups() {
    document.removeEventListener('keydown', handleEscButton);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsInfoPopupOpen(false);
    setSelectedCard({name: '', link: ''});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    document.addEventListener('keydown', handleEscButton);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c))
      })
      .catch(err => {
        console.log(err)
      })
  }

  function handleCardDelete() {
    setLoadingText('????????????????');
    api.deleteCard(cardToDelete)
      .then(() => {
        setCards(cards => cards.filter(c => c._id !== cardToDelete));
        closeAllPopups();
      })
      .catch(err => {
        console.log(err)
      })
  }

  function handleUpdateUser(userInfo) {
    setLoadingText('????????????????????');
    api.setUserInfo(userInfo)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err)
      })
  }

  function handleUpdateAvatar(user) {
    setLoadingText('????????????????????');
    api.setAvatar(user.avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err)
      })
  }

  function handleAddPlaceSubmit(newCard) {
    setLoadingText('????????????????????');
    api.addNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err)
      })
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    setEmail('');
    setLoggedIn(false);
    history.push('/');
  }

  function handleSignIn(password, email) {
    auth.authorize(password, email)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          localStorage.setItem('token', data.token);
          setEmail(email);
          history.push('/');
        }
      })
      .catch(err => console.log(err));
  }

  function handleRegister(password, email) {
    auth.register(password, email)
      .then((res) => {
        if (res.data['_id']) {
          setSuccessSignUp(true);
          setIsInfoPopupOpen(true);
          history.push('/sign-in');
        }
        if (res.status === 400 || res.status === 404) {
          setSuccessSignUp(false);
        }
      })
      .catch((err) => {
        console.log(err)
        setSuccessSignUp(false);
      })
      .finally(() => {
        setIsInfoPopupOpen(true);
      })
  }

  function handleTokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token)
        .then(res => {
          if (res) {
            setEmail(res.data.email);
            setLoggedIn(true);
          }
        })
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        handleSignOut={handleSignOut}
        loggedIn={loggedIn}
        email={email}
      />
      <Switch>
        <ProtectedRoute
          exact path='/'
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCardClick}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          component={Main}
          loggedIn={loggedIn}
        />
        <Route path='/sign-up'>
          <Register
            onRegister={handleRegister}
          />
        </Route>
        <Route path='/sign-in'>
          <Login signIn={handleSignIn}/>
        </Route>
        <Route path='*'>
          <PageNotFound/>
        </Route>
      </Switch>

      {loggedIn && <Footer/>}

      <LoadingContext.Provider value={loadingText}>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <SubmitDeletePopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onDelete={handleCardDelete}
        />
      </LoadingContext.Provider>

      <InfoToolTip
        isOpen={isInfoPopupOpen}
        success={successSignUp}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;