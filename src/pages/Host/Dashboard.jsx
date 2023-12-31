import { Suspense } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLoaderData, defer, Await } from "react-router-dom";
import { getHostVans } from "../../api";

export function loader() {
  return defer({ vans: getHostVans() });
}

export default function Dashboard() {
  const data = useLoaderData();

  return (
    <div className="dashboard">
      <div className="dashboard-income">
        <h2>Welcome!</h2>
        <div className="income-time flex-sb-ctr">
          <span>
            Income last <span className="days">30 days</span>
          </span>
          <Link to="income" className="link">
            Details
          </Link>
        </div>
        <span className="income-amount">$2,260</span>
      </div>
      <div className="dashboard-reviews flex-sb-ctr">
        <div className="score">
          <span>Review score</span>
          <FontAwesomeIcon icon={faStar} className="star" />
          <span className="score-details">
            5.0<span className="voters-number">/5</span>
          </span>
        </div>
        <Link to="income" className="link">
          Details
        </Link>
      </div>
      <div className="dashboard-vans">
        <div className="header flex-sb-ctr">
          <h2>Your listed vans</h2>
          <Link to="vans" className="link">
            view all
          </Link>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <Await resolve={data.vans}>
            {(vans) => {
              return (
                <div className="vans container">
                  {vans.map((van) => {
                    return (
                      <div key={van.id}>
                        <Link to={`/host/vans/${van.id}`} className="van">
                          <img src={van.imageUrl} className="van-img" />
                          <div>
                            <div className="van-name">{van.name}</div>
                            <span className="van-price">${van.price}/day</span>
                          </div>
                          <button>Edit</button>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              );
            }}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}
