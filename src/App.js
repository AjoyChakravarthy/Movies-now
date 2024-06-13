import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Banner from "./Components/Banner/Banner";
import Rowpost from "./Components/Rowpost/Rowpost";
import { topRated, popular, popularTvShows } from "./urls";
import MoviePage from "./Components/MoviePage/MoviePage";
import SearchResults from "./Components/SearchResults/SearchResults";
import { useState } from "react";
import Footer from "./Components/Footer/Footer";
import Signup from "./Components/pages/Signup/Signup";
import Login from "./Components/pages/Login/Login";
import Profile from "./Components/pages/Profile/Profile";
import { useAuth } from "./Components/context/FirebaseContext";
import ProfileSettings from "./Components/pages/ProfileSettings/ProfileSettings";

function App() {
  const [results, setResults] = useState([]);
  const { userLoggedIn } = useAuth();
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  const toggleProfile = () => {
    setIsProfileVisible((prevState) => !prevState);
  };

  return (
    <Router>
      <div className="App">
        <Navbar
          setResults={setResults}
          toggleProfile={toggleProfile}
        />
        {userLoggedIn && isProfileVisible && (
          <Profile className="profile_overlay" />
        )}

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Rowpost
                  url={topRated}
                  title="Top Rated"
                />
                <Rowpost
                  url={popular}
                  title="Popular"
                  isSmall
                />
                <Rowpost
                  url={popularTvShows}
                  title="Popular Tv Shows"
                  isSmall
                />
              </>
            }
          />
          <Route
            path="/movie/:id"
            element={<MoviePage />}
          />
          <Route
            path="/search"
            element={<SearchResults results={results} />}
          />
          <Route
            path="/signup"
            element={<Signup />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/settings"
            element={<ProfileSettings />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
