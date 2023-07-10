import React, { useState } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import PageNotFound from "../PageNotFound/PageNotFound";

function App() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();
  const isLanding = location.pathname === "/";

  const handleLoginButtonClick = () => {
    navigate("/sign-in");
  };

  const handleBurgerClick = () => {
    setIsBurgerMenuOpen(true);
  };

  const handleBurgerMenuClose = () => {
    setIsBurgerMenuOpen(false);
  };

  document.body.classList.add("root");

  return (
    <div className="app">
      {pathname === "/sign-in" || pathname === "/sign-up" ? ("") : (
        <Header
          isLoggedIn={true}
          isLanding={isLanding}
          onButtonClick={handleLoginButtonClick}
          onBurgerClick={handleBurgerClick}
        />
      )}

      <Routes>
        <Route exact path="/" element={
          <Main
            isBurgerMenuOpen={isBurgerMenuOpen}
            onBurgerMenuClose={handleBurgerMenuClose}
          />}
        />
        <Route exact path="/sign-in" element={<Login />} />
        <Route exact path="/sign-up" element={<Register />} />
        <Route exact path="/profile" element={
          <Profile
            isBurgerMenuOpen={isBurgerMenuOpen}
            onBurgerMenuClose={handleBurgerMenuClose}
          />}
        />
        <Route exact path="/movies" element={
          <Movies
            isBurgerMenuOpen={isBurgerMenuOpen}
            onBurgerMenuClose={handleBurgerMenuClose}
          />}
        />
        <Route exact path="/saved-movies" element={
          <SavedMovies
            isBurgerMenuOpen={isBurgerMenuOpen}
            onBurgerMenuClose={handleBurgerMenuClose}
          />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {pathname === "/profile" || pathname === "/sign-in" || pathname === "/sign-up" ? ("") : (<Footer />)}
    </div>
  );
}

export default App;
