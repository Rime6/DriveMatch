import { Link } from 'react-router-dom';
import { FaShieldAlt, FaSearchDollar, FaHandHoldingUsd } from 'react-icons/fa';
import cars from '../data/cars';
import CarCard from '../components/CarCard';
import './Home.css';

function Home() {
  const featured = cars.filter((car) => car.badge).slice(0, 3);

  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-section__overlay" />
        <div className="hero-section__content">
          <span className="eyebrow">Premium car shopping</span>
          <h1>Find Your Perfect Drive</h1>
          <p>Explore hundreds of vehicles tailored to your needs — new, used, and certified pre-owned.</p>
          <div className="hero-section__actions">
            <Link to="/browse" className="button button--primary">Browse All Cars</Link>
            <Link to="/deals" className="button button--secondary">View This Week's Deals</Link>
          </div>
        </div>
      </section>

      <section className="why-section">
        <div className="section-header">
          <p className="section-eyebrow">Why DriveMatch?</p>
          <h2>Car shopping made simple, trusted, and exciting.</h2>
        </div>
        <div className="feature-grid">
          <article className="feature-card">
            <FaSearchDollar className="feature-card__icon" />
            <h3>Transparent Pricing</h3>
            <p>No hidden fees. What you see is what you pay.</p>
          </article>
          <article className="feature-card">
            <FaShieldAlt className="feature-card__icon" />
            <h3>Verified Listings</h3>
            <p>Every vehicle inspected and certified by our team.</p>
          </article>
          <article className="feature-card">
            <FaHandHoldingUsd className="feature-card__icon" />
            <h3>Easy Financing</h3>
            <p>Flexible payment options tailored to your budget.</p>
          </article>
        </div>
      </section>

      <section className="deals-section">
        <div className="section-header section-header--wide">
          <p className="section-eyebrow">Featured Deals</p>
          <h2>Don't miss out — these deals won't last!</h2>
        </div>
        <div className="deal-cards">
          {featured.map((car) => (
            <div key={car.id} className="deal-card">
              <div className="deal-card__badge">🔥 {car.badge}</div>
              <div className="deal-card__info">
                <p className="deal-card__name">{car.year} {car.make} {car.model}</p>
                <p className="deal-card__tagline">Premium value with standout performance and comfort.</p>
                <p className="deal-card__price">${car.price.toLocaleString()}</p>
                <Link to={`/car/${car.id}`} className="button button--tertiary">View Deal</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
