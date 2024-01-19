import { NavLink, Outlet } from "react-router-dom";
import { requireAuth } from "../../utils";

export function loader(user) {
  return async ({ request }) => {
    await requireAuth(request, user);
    return null;
  };
}

export default function HostLayout() {
  return (
    <div className="host">
      <nav>
        <ul>
          <li>
            <NavLink
              to={{ pathname: "." }}
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
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to={{ pathname: "income" }}
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
              Income
            </NavLink>
          </li>
          <li>
            <NavLink
              to={{ pathname: "reviews" }}
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
              Reviews
            </NavLink>
          </li>
          <li>
            <NavLink
              to={{ pathname: "vans" }}
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
              Vans
            </NavLink>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
