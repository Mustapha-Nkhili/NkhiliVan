import { Suspense } from "react";
import { Link, useLoaderData, defer, Await } from "react-router-dom";
import { getHostVans } from "../../../api";

export function loader() {
  return defer({ vans: getHostVans() });
}
export default function Vans() {
  const data = useLoaderData();

  return (
    <div className="host-vans">
      <div className="header flex-sb-ctr">
        <h2>Your listed vans</h2>
        <Link to="/vans">view all</Link>
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
  );
}
