import { Link, useNavigate, useRouteError } from "react-router-dom";
import { useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";

export default function Error() {
  const error = useRouteError();
  const navigate = useNavigate();

  useEffect(() => {
    const isError302 = error.status === 302
    if (isError302) {
      // this is an array of the routes that the user came from
      const routes = error.headers.map.location.match(/\/\w+/g);

      // remove the first route from the array and it is the login route
      routes.shift()
      const hostname = routes.join("")

      navigate(`login?message=You must login first&redirectTo=${hostname}`, {replace: true});
    }
  }, [navigate, error]);
  return (
    <>
      <Nav />
      <div className="error container">
        <span>Oops</span>
        <h1>Error{error.message ? `: ${error.message}` : ""}</h1>
        {error.status && <h2>Error code: {error.status}</h2>}
        {error.statstatusTextus && (
          <h2>Error status text: {error.statusText}</h2>
        )}
        <Link className="back-to-home-btn" to="/">
          Back to home
        </Link>
      </div>
      <Footer />
    </>
  );
}
