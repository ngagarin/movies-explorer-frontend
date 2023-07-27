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
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import PageNotFound from "../PageNotFound/PageNotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import MainApi from "../../utils/MainApi";
import MoviesApi from "../../utils/MoviesApi";
import { signUp, signIn, logOut, checkToken } from "../../utils/AuthApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import {
  PROFILE_UPDATED_MSG,
  REQUEST_ERROR_MSG,
  getGreetingMessage,
} from "../../utils/constants";

import checkmarkImg from "../../images/auth/chekmark.json";
import crossImg from "../../images/auth/crossmark.json";
import wellcomeImg from "../../images/auth/wellcome.json";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [authStatus, setAuthStatus] = useState({ image: "", message: "" });
  const [infoTooltip, setInfoTooltip] = useState(false);
  const [isFormDisaled, setisFormDisabled] = useState(false);

  const isLanding = pathname === "/";
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  function handleLogin(email, password) {
    setisFormDisabled(true);
    signIn(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res._id);
        localStorage.setItem("isLoggedIn", true);
        setAuthStatus({
          image: wellcomeImg,
          message: getGreetingMessage(res.name),
        });
      })
      .catch((err) => {
        setAuthStatus({
          image: crossImg,
          message: err.message,
        });
        handleInfoTooltip();
      })
      .finally(() => {
        handleInfoTooltip();
        setisFormDisabled(false);
      });
  }

  function handleRegister(name, email, password) {
    setisFormDisabled(true);
    signUp(name, email, password)
      .then(() => {
        setAuthStatus({
          image: wellcomeImg,
          message: getGreetingMessage(name),
        });
        handleLogin(email, password);
      })
      .catch((err) => {
        setAuthStatus({
          image: crossImg,
          message: err.message,
        });
        handleInfoTooltip();
      })
      .finally(() => {
        handleInfoTooltip();
        setisFormDisabled(false);
      });
  }

  function handleLogOut() {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setAuthStatus({
          image: crossImg,
          message: err.message,
        });
        handleInfoTooltip();
      });
  }

  function handleUpdateUser(data) {
    setisFormDisabled(true);
    MainApi.updateUserInfo(data)
      .then((updatedUser) => {
        setAuthStatus({
          image: checkmarkImg,
          message: PROFILE_UPDATED_MSG,
        });
        setCurrentUser(updatedUser);
      })
      .catch((err) => {
        setAuthStatus({
          image: crossImg,
          message: err.message,
        });
      })
      .finally(() => {
        handleInfoTooltip();
        setisFormDisabled(false);
      });
  }

  // проверяем токен
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (isLoggedIn) {
      if (jwt) {
        checkToken(jwt)
          .then((res) => {
            if (res) {
              localStorage.setItem("isLoggedIn", true);
            } else {
              localStorage.removeItem("jwt");
              localStorage.clear();
              navigate("/");
            }
          })
          .catch(() => {
            localStorage.removeItem("jwt");
            localStorage.clear();
            navigate("/");
          });
      }
    }
  }, [isLoggedIn, navigate]);

  // рендерим фильмы и данные профайла
  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([
        MainApi.getUserInfo(),
        MainApi.getMovies(),
        MoviesApi.getAllMovies(),
      ])
        .then(([userInfo, getMovies, allMovies]) => {
          setCurrentUser(userInfo);
          localStorage.setItem("allMovies", JSON.stringify(allMovies));
          const currentUserMovies = getMovies.filter(
            (movie) => movie.owner === userInfo._id
          );
          localStorage.setItem("savedMovies", JSON.stringify(currentUserMovies));
        })
        .catch(() => {
          setAuthStatus({
            image: crossImg,
            message: REQUEST_ERROR_MSG,
          });
        });
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
                <Login onLogin={handleLogin} isFormDisabled={isFormDisaled} />
              )
            }
          />
          <Route
            path="/sign-up"
            element={
              isLoggedIn ? (
                <Navigate to="/movies" />
              ) : (
                <Register
                  onRegister={handleRegister}
                  isFormDisabled={isFormDisaled}
                />
              )
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <ProtectedRoute
                component={Profile}
                onBurgerMenuClose={handleClose}
                onUpdateUser={handleUpdateUser}
                onLogout={handleLogOut}
                isLoggedIn={isLoggedIn}
                isBurgerMenuOpen={isBurgerMenuOpen}
                isFormDisabled={isFormDisaled}
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
                // isJustAuthorized={isJustAuthorized}
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
