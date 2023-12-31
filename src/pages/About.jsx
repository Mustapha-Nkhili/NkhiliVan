import heroImg from "../assets/imgs/about-hero-img.png";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <main className="about">
      <div className="container">
        <img src={heroImg} alt="this is an image for an van on it a girl" />
        <div className="about-text-btn-container">
          <h1 className="title">
            Don’t squeeze in a sedan when you could relax in a van.
          </h1>
          <div className="our-mission">
            <p>
              Our mission is to enliven your road trip with the perfect travel
              van rental. Our vans are recertified before each trip to ensure
              your travel plans can go off without a hitch. (Hitch costs extra
              😉)
            </p>
            <p>
              Our team is full of vanlife enthusiasts who know firsthand the
              magic of touring the world on 4 wheels.
            </p>
          </div>
          <div className="explore-our-vans">
            <span>Your destination is waiting. Your van is ready.</span>
            <Link to="/vans" className="vans-btn">
              Explore our van
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
