import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, Outlet, useLoaderData } from "react-router-dom";
import { getVan } from "../../../api";

export async function loader({ params }) {
  return getVan(params.id);
}
export default function HostVanDetails() {
  const van = useLoaderData();

  let vanTypeBgClr =
    van.type === "simple"
      ? "#E17654"
      : van.type === "rugged"
      ? "#115E59"
      : "#161616";

  return (
    <div className="host-van-details">
      <Link to=".." relative="path">
        <FontAwesomeIcon icon={faArrowLeft} /> back to all vans
      </Link>
      <div className="van">
        <div className="head">
          <img src={van.imageUrl} alt={van.name} />
          <div>
            <span
              className="van-type"
              style={{ backgroundColor: vanTypeBgClr }}
            >
              {van.type}
            </span>
            <h2 className="van-name">{van.name}</h2>
            <span className="van-price">
              <span>${van.price}</span>/day
            </span>
          </div>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink
                to={{
                  pathname: ".",
                }}
                end
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#FF8C38",
                        fontWeight: 700,
                        textDecoration: "underline",
                      }
                    : null
                }
              >
                Details
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{ pathname: `pricing` }}
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#FF8C38",
                        fontWeight: 700,
                        textDecoration: "underline",
                      }
                    : null
                }
              >
                Pricing
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{ pathname: `photos` }}
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: "#FF8C38",
                        fontWeight: 700,
                        textDecoration: "underline",
                      }
                    : null
                }
              >
                Photos
              </NavLink>
            </li>
          </ul>
        </nav>
        <main>
          <Outlet context={{ van }} />
        </main>
      </div>
    </div>
  );
}
