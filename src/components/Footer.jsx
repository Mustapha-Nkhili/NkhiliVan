import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="copy-me">
        Made with <FontAwesomeIcon icon={faHeart} className="heart" /> by{" "}
        <Link to="https://www.linkedin.com/in/mustapha-nkhili-35280a280/"><span>Mustapha Nkhili</span></Link>
      </div>
      <span>
        Ⓒ {year} <span className="company-name">VanLife</span> All Right
        Reserved
      </span>
    </footer>
  );
}
