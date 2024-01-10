import {
  Link,
  useSearchParams,
  useLoaderData,
  Await,
  defer,
} from "react-router-dom";
import { Suspense, useRef, useState } from "react";
import { getVans } from "../../api";
import VanSkeleton from "../../components/skeleton loading/VanSkeleton";

export function loader() {
  return defer({ vans: getVans() });
}

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  const data = useLoaderData();
  console.log(data);

  const vansContainer = useRef();
  const [activeFilter, setActiveFilter] = useState(
    searchParams.get("type") || "all"
  );

  function handleFilter(filterBtn) {
    const filterValue = filterBtn.getAttribute("data-filter");

    setActiveFilter(filterValue);
    setSearchParams({ type: filterValue });
  }

  function clearFilter() {
    setActiveFilter("all");
    setSearchParams({});
  }

  return (
    <main className="vans-page">
      <h1>Explore our van options</h1>
      <Suspense fallback={<VanSkeleton />}>
        <Await resolve={data.vans}>
          {(vans) => {
            let vansType = [];
            let seenTypes = new Set();

            for (let i = 0; i < vans.length; i++) {
              let currentType = vans[i].type;

              // Check if the type is not already in the Set
              if (!seenTypes.has(currentType)) {
                seenTypes.add(currentType);
                vansType.push(currentType);
              }
            }

            const displayedVans =
              activeFilter !== "all"
                ? vans.filter((van) => van.type.toLowerCase() === activeFilter)
                : vans;

            return (
              <>
                <div className="options">
                  <button
                    className={`option ${
                      activeFilter === "all" ? "active" : ""
                    }`}
                    onClick={clearFilter}
                  >
                    All
                  </button>
                  {vansType.map((vanType, index) => {
                    return (
                      <button
                        className={`option ${
                          activeFilter === vanType ? "active" : ""
                        }`}
                        data-filter={vanType}
                        key={index}
                        onClick={(e) => handleFilter(e.target)}
                      >
                        {vanType}
                      </button>
                    );
                  })}
                </div>
                <div className="vans" ref={vansContainer}>
                  {displayedVans.map((van) => {
                    let vanTypeBgClr =
                      van.type === "simple"
                        ? "#E17654"
                        : van.type === "rugged"
                        ? "#115E59"
                        : "#161616";

                    return (
                      <div
                        className="van"
                        key={van.id}
                        data-category={van.type}
                      >
                        <Link
                          to={`/vans/${van.id}`}
                          state={{ search: searchParams.toString(), van: van }}
                        >
                          <img
                            className="van-img"
                            src={van.imageUrl}
                            alt={`this is an image of ${van.name}`}
                          />
                          <div className="van-name-price-wrapper">
                            <h2 className="van-name">{van.name}</h2>
                            <div className="price-wrapper">
                              <span className="price">${van.price}</span>
                              <span>/day</span>
                            </div>
                          </div>
                          <span
                            className="van-type"
                            style={{ backgroundColor: vanTypeBgClr }}
                          >
                            {van.type}
                          </span>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </>
            );
          }}
        </Await>
      </Suspense>
    </main>
  );
}
