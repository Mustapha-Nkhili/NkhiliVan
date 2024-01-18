import { Link, useRouteError } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

export default function Error() {
  const error = useRouteError();
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
