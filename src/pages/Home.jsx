import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <main className="landing">
        <div className="container">
          <div className="landing-text">
            <h1>You got the travel plans, we got the travel vans.</h1>
            <p>
              Add adventure to your life by joining the NkhiliVan movement. Rent
              the perfect van to make your perfect road trip.
            </p>
          </div>
          <Link to="/vans">Find your van</Link>
        </div>
      </main>
    </>
  );
}
