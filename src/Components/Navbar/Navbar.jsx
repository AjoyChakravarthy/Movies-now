import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import "font-awesome/css/font-awesome.min.css";
import { useNavigate } from "react-router-dom";
import { API_KEY } from "../../constants/constants";
import axios from "axios";
import { useAuth } from "../context/FirebaseContext";

function Navbar({ setResults, toggleProfile }) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const handleSearch = () => {
    navigate(`/search`);
  };
  const home = () => {
    navigate(`/`);
  };
  const handleLogin = () => {
    navigate(`/login`);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${API_KEY}`
        )
        .then((response) => {
          if (response.data.results.length !== 0) {
            setSearchResults(response.data.results);
          } else {
            console.log("Movie not available");
          }
        })
        .catch(
          (error) => {
            console.error("Error", error);
          },
          [searchQuery]
        );
    }
  });

  const handleSearchChange = (event) => {
    console.log("search changed");
    setSearchQuery(event.target.value);
  };
  setResults(searchResults);

  return (
    <div className="navbar">
      <img
        className="logo"
        src={logo}
        alt="Logo"
      />
      <div className="search-box">
        <input
          onChange={handleSearchChange}
          value={searchQuery}
          className="search"
          type="text"
          placeholder="Search Movie..."
        />
        <button
          onClick={searchQuery ? handleSearch : null}
          disabled={!searchQuery}
        >
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      <button
        onClick={currentUser ? toggleProfile : handleLogin}
        className="avatar"
      >
        {currentUser ? (
          currentUser.displayName ? (
            currentUser.displayName.charAt(0).toUpperCase()
          ) : currentUser.email ? (
            currentUser.email.charAt(0).toUpperCase()
          ) : (
            <i className="fa-solid fa-user-tie"></i>
          )
        ) : (
          <i className="fa-solid fa-user-tie"></i>
        )}
      </button>
      <button
        onClick={home}
        className="home"
      >
        <i class="fa-solid fa-house"></i>
      </button>
    </div>
  );
}

export default Navbar;