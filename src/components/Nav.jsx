import { NavLink, Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebaseConfig";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import classnames from "classnames";

export default function Nav() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const navListRef = useRef();
  const Xbar = useRef();
  const userProfileIconRef = useRef();
  const XmarkProfile = useRef();
  const [navClicked, setNavClicked] = useState(false);
  const [profileCLicked, setProfileClicked] = useState(false);
  const auth = getAuth(app);

  function toggleProfile() {
    document.getElementsByTagName("body")[0].classList.toggle("no-scroll");
    setProfileClicked((prev) => !prev);
  }

  function handleClick(e, firstEleRef, secEleRef, setterFunc) {
    if (
      !firstEleRef?.current?.contains(e?.target) &&
      !secEleRef?.current?.contains(e?.target)
    ) {
      setterFunc(false);
      document.getElementsByTagName("body")[0].classList.remove("no-scroll");
    }
  }

  useEffect(() => {
    document.body.addEventListener(
      "click",
      (e) => handleClick(e, navListRef, Xbar, setNavClicked)
    );

    return () => {
      document.body.removeEventListener(
        "click",
        (e) => handleClick(e, navListRef, Xbar, setNavClicked)
      );
    };
  }, [navListRef]);

  useEffect(() => {
    document.body.addEventListener(
      "click",
      (e) => handleClick(e, userProfileIconRef, XmarkProfile, setProfileClicked)
    );

    return () => {
      document.body.removeEventListener(
        "click",
        (e) => handleClick(e, userProfileIconRef, XmarkProfile, setProfileClicked)
      );
    };
  }, [userProfileIconRef]);

  async function userSignOut() {
    await signOut(auth);
    setUser(null);
    toggleProfile();
    navigate("/", { replace: true });
  }

  return (
    <header className="flex-sb-ctr">
      <div className="logo">
        <Link to="/">
          Nkhili<span>van</span>
        </Link>
      </div>
      <nav className="main--nav">
        {navClicked ? (
          <FontAwesomeIcon
            ref={Xbar}
            icon={faXmark}
            className="Xbar"
            onClick={() => {
              setNavClicked(false);
              document
                .getElementsByTagName("body")[0]
                .classList.remove("no-scroll");
              setProfileClicked(false);
            }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faBars}
            className="bar"
            onClick={() => {
              setNavClicked(true);
            }}
          />
        )}

        <ul
          ref={navListRef}
          className={classnames("main--nav-ul", { clicked: navClicked })}
        >
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
              className={({ isActive }) => classnames({ active: isActive })}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to={{ pathname: "/vans" }}
              className={({ isActive }) => classnames({ active: isActive })}
            >
              Vans
            </NavLink>
          </li>
          <li>
            <NavLink
              to={{ pathname: "/host" }}
              className={({ isActive }) => classnames({ active: isActive })}
            >
              Host
            </NavLink>
          </li>
          {!user &&
            ["Log in", "Sign up"].map((text, index) => {
              return (
                <li key={index}>
                  <NavLink
                    to={{ pathname: index === 0 ? "/login" : "/signup" }}
                    className={({ isActive }) =>
                      classnames(
                        index === 0
                          ? "log-in-out-links login-in-link"
                          : "log-in-out-links sign-up-link",
                        { active: isActive }
                      )
                    }
                  >
                    {text}
                  </NavLink>
                </li>
              );
            })}
          {user && (
            <div
              className="user-profile-icon"
              onClick={() => toggleProfile()}
              ref={userProfileIconRef}
            >
              <img
                src={
                  user.img
                    ? user.img
                    : "/src/assets/imgs/default-profile-picture.png"
                }
                className="user-profile-picture"
              />
            </div>
          )}
          {user && (
            <ul
              className={classnames("user-list", {
                "profile-clicked": profileCLicked,
              })}
            >
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => toggleProfile()}
                ref={XmarkProfile}
              />
              <span className="user-name">{user.name}</span>
              <li>
                <Link to="host/profile">Your Profile</Link>
              </li>
              <li onClick={userSignOut}>Sign out</li>
            </ul>
          )}
        </ul>
      </nav>
    </header>
  );
}
