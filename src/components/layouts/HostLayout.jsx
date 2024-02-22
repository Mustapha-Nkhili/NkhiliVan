import { NavLink, Outlet } from "react-router-dom";
import { requireAuth } from "../../utils";
import classnames from "classnames";
import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthProvider";

export function loader(user) {
  return async ({ request }) => {
    await requireAuth(request, user);
    return null;
  };
}

export default function HostLayout() {
  const { isVerificationEmailSent, setIsVerificationEmailSent } =
    useContext(AuthContext);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVerificationEmailSent(false);
    }, 6000);

    // Cleanup function to clear the timeout if the component unmounts or dependencies change
    return () => {
      clearTimeout(timeoutId);
    };
  }, [setIsVerificationEmailSent]);

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
        <span
          className={classnames("email-verfication-alert", {
            active: isVerificationEmailSent,
          })}
        >
          A verification email has been sent to your email
        </span>

        <Outlet />
      </main>
    </div>
  );
}
