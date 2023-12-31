import { Link } from "react-router-dom";
import pandaImg from "../assets/imgs/black-panda-sleeping.png"

export default function NotFound() {
  return (
    <main className="not-found">
      <img src={pandaImg} alt="this is an image of a black panda sleeping" />
      <div>
        <h1>Page not found</h1>
        <h2>404</h2>
        <p>We couldn't find the page you were looking for.</p>
        <Link className="back-to-home-btn" to="/">
          Back to home
        </Link>
      </div>
    </main>
  );
}
