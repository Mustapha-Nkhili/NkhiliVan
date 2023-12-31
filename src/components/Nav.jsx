import { NavLink, Link } from "react-router-dom";

export default function Nav() {
  return (
    <header className="flex-sb-ctr">
      <div className="logo">
        <Link to="/">VanLife</Link>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink
              to={{ pathname: "/" }}
              style={({ isActive }) => (isActive ? {color: "#FF8C38"} : null)}
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
        </ul>
      </nav>
    </header>
  );
}
