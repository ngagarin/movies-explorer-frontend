import React, { useState, useEffect } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import InfoTooltip from "../Popups/InfoTooltip/InfoTooltip";
import PageNotFound from "../PageNotFound/PageNotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import MainApi from "../../utils/MainApi";
import MoviesApi from "../../utils/MoviesApi";
import { signUp, signIn, logOut, checkToken } from "../../utils/AuthApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import {
  SOMETHING_WENT_WRONG_MSG,
  PROFILE_UPDATED_MSG,
  REQUEST_ERROR_MSG,
  getGreetingMessage,
} from "../../utils/constants";

import checkmarkImg from "../../images/auth/chekmark.json";
import crossImg from "../../images/auth/crossmark.json";
import wellcomeImg from "../../images/auth/wellcome.json";

function App() {
  const { pathname } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [authStatus, setAuthStatus] = useState({ image: "", message: "" });
  const [infoTooltip, setInfoTooltip] = useState(false);
  const [isJustAuthorized, setIsJustAuthorized] = useState(false);

  const isLanding = location.pathname === "/";
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  function handleLogin(email, password) {
    signIn(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res._id);
        localStorage.setItem("isLoggedIn", true);
        setAuthStatus({
          image: wellcomeImg,
          message: getGreetingMessage(res.name),
        });
        setIsJustAuthorized(true);
        setTimeout(() => {
          setIsJustAuthorized(false);
        }, 5000);
      })
      .catch(() => {
        setAuthStatus({
          image: crossImg,
          message: SOMETHING_WENT_WRONG_MSG,
        });
        handleInfoTooltip();
      })
      .finally(() => {
        handleInfoTooltip();
      });
  }

  function handleRegister(name, email, password) {
    signUp(name, email, password)
      .then(() => {
        setAuthStatus({
          image: checkmarkImg,
          message: getGreetingMessage(name),
        });
        handleLogin(email, password);
      })
      .catch(() => {
        setAuthStatus({
          image: wellcomeImg,
          message: SOMETHING_WENT_WRONG_MSG,
        });
      })
      .finally(() => {
        handleInfoTooltip();
      });
  }

  function handleLogOut() {
    logOut();
    localStorage.clear();
    navigate("/");
  }

  function handleUpdateUser(data) {
    MainApi.updateUserInfo(data)
      .then((updatedUser) => {
        setAuthStatus({
          image: checkmarkImg,
          message: PROFILE_UPDATED_MSG,
        });
        setCurrentUser(updatedUser);
      })
      .catch(() => {
        setAuthStatus({
          image: crossImg,
          message: SOMETHING_WENT_WRONG_MSG,
        });
      })
      .finally(() => {
        handleInfoTooltip();
      });
  }

  //присваиваем токен
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          if (res) {
            localStorage.setItem("isLoggedIn", true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [navigate]);

  // рендерим фильмы и данные профайла
  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([
        MainApi.getUserInfo(),
        MainApi.getMovies(),
        MoviesApi.getAllMovies(),
      ])
        .then(([userInfo, getMovies, allMovies]) => {
          setCurrentUser(userInfo, getMovies);
          localStorage.setItem("allMovies", JSON.stringify(allMovies));
        })
        .catch(() => {
          setAuthStatus({
            image: crossImg,
            message: REQUEST_ERROR_MSG,
          });
        })
    }
  }, [isLoggedIn]);

  const handleLoginButtonClick = () => {
    navigate("/sign-in");
  };

  const handleBurgerClick = () => {
    setIsBurgerMenuOpen(true);
  };

  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  const handleClose = () => {
    setIsBurgerMenuOpen(false);
    setInfoTooltip(false);
  };

  document.body.classList.add("root");

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {pathname === "/sign-in" || pathname === "/sign-up" ? (
        ""
      ) : (
        <Header
          isLoggedIn={isLoggedIn}
          isLanding={isLanding}
          onButtonClick={handleLoginButtonClick}
          onBurgerClick={handleBurgerClick}
        />
      )}

      <main className="app">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Main
                isBurgerMenuOpen={isBurgerMenuOpen}
                onBurgerMenuClose={handleClose}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              isLoggedIn ? (
                <Navigate to="/movies" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/sign-up"
            element={
              isLoggedIn ? (
                <Navigate to="/movies" />
              ) : (
                <Register onRegister={handleRegister} />
              )
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <ProtectedRoute
                component={Profile}
                isLoggedIn={isLoggedIn}
                isBurgerMenuOpen={isBurgerMenuOpen}
                onBurgerMenuClose={handleClose}
                onUpdateUser={handleUpdateUser}
                onLogout={handleLogOut}
              />
            }
          />
          <Route
            exact
            path="/movies"
            element={
              <ProtectedRoute
                component={Movies}
                isLoggedIn={isLoggedIn}
                isJustAuthorized={isJustAuthorized}
                isBurgerMenuOpen={isBurgerMenuOpen}
                onBurgerMenuClose={handleClose}
              />
            }
          />
          <Route
            exact
            path="/saved-movies"
            element={
              <ProtectedRoute
                component={SavedMovies}
                isLoggedIn={isLoggedIn}
                isBurgerMenuOpen={isBurgerMenuOpen}
                onBurgerMenuClose={handleClose}
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <InfoTooltip
          authStatus={authStatus}
          isOpen={infoTooltip}
          onClose={handleClose}
        />
      </main>

      {pathname === "/profile" ||
      pathname === "/sign-in" ||
      pathname === "/sign-up" ? (
        ""
      ) : (
        <Footer />
      )}
    </CurrentUserContext.Provider>
  );
}

export default App;
