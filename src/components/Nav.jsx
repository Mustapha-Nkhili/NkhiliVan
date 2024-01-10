import { NavLink, Link, redirect, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebaseConfig";
import { faBars, faXmark, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

export default function Nav() {
  const navigate = useNavigate();
  const isLoggedIn = JSON.parse(localStorage.getItem("loggedin"));
  const navListRef = useRef(null);
  const [navClicked, setNavClicked] = useState(false);
  const auth = getAuth(app);

  async function userSignOut() {
    await signOut(auth);
    navigate("/", { replace: true });
    localStorage.removeItem("loggedin");
  }

  return (
    <header className="flex-sb-ctr">
      <div className="logo">
        <Link to="/">NkhiliVan</Link>
      </div>
      <nav className="main--nav">
        {navClicked ? (
          <FontAwesomeIcon
            icon={faXmark}
            className="Xbar"
            onClick={() => {
              navListRef.current.classList.remove("clicked");
              setNavClicked(false);
            }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faBars}
            className="bar"
            onClick={() => {
              navListRef.current.classList.add("clicked");
              setNavClicked(true);
            }}
          />
        )}

        <ul ref={navListRef}>
          <li>
            <NavLink
              to={{ pathname: "/" }}
              style={({ isActive }) => (isActive ? { color: "#FF8C38" } : null)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={{ pathname: "/about" }}
              className={({ isActive }) => (isActive ? "active" : null)}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to={{ pathname: "/vans" }}
              className={({ isActive }) => (isActive ? "active" : null)}
            >
              Vans
            </NavLink>
          </li>
          <li>
            <NavLink
              to={{ pathname: "/host" }}
              className={({ isActive }) => (isActive ? "active" : null)}
            >
              Host
            </NavLink>
          </li>
          {isLoggedIn === null && (
            <li>
              <NavLink
                to={{ pathname: "/login" }}
                className={({ isActive }) =>
                  `log-in-uo-links login-in-link ${isActive ? "active" : null}`
                }
              >
                Log in
              </NavLink>
            </li>
          )}
          {isLoggedIn === null && (
            <li>
              <NavLink
                to={{ pathname: "/signup" }}
                className={({ isActive }) =>
                  `log-in-uo-links sign-up-link ${isActive ? "active" : null}`
                }
              >
                Sign up
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <div
              className="user-profile-icon"
              onClick={() => {
                document
                  .querySelector("header nav ul .user-list")
                  .classList.toggle("profile-clicked");
                document
                  .getElementsByTagName("body")[0]
                  .classList.toggle("no-scroll");
              }}
            >
              <FontAwesomeIcon icon={faUser} />
            </div>
          )}
          {isLoggedIn && (
            <ul className="user-list">
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => {
                  document
                    .querySelector("header nav ul .user-list")
                    .classList.toggle("profile-clicked");
                  document
                    .getElementsByTagName("body")[0]
                    .classList.toggle("no-scroll");
                }}
              />
              <li>Your Profile</li>
              <li onClick={userSignOut}>Sign out</li>
            </ul>
          )}
        </ul>
      </nav>
    </header>
  );
}
