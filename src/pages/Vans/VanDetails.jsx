import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

export default function VanDetails() {
  const location = useLocation();

  const search = location.state?.search || "";
  const van = location.state?.van;


  let vanTypeBgClr =
  van?.type === "simple"
    ? "#E17654"
    : van?.type === "rugged"
    ? "#115E59"
    : "#161616";

    let filtredVans = search?.match(/=\w+/)?.[0]?.slice(1);
  
  return (
    <main className="van-details">
      <div className="container">
        <button className="back-to-all-vans routes-btn">
          <Link to={`..?${search}`} relative="path">
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to { filtredVans ||"all" } vans
          </Link>
        </button>
            <img src={van.imageUrl} className="van-img" />
            <div className="van-type" style={{backgroundColor: vanTypeBgClr}}>{van.type}</div>
            <div className="van-name">{van.name}</div>
            <span className="van-price">
              ${van.price}
              <span>/day</span>
            </span>
            <p className="van-description">{van.description}</p>
        <button className="rent-van-btn"></button>
      </div>
    </main>
  );
}
