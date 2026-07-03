import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCheck, FaRoad, FaCogs, FaGasPump, FaTint } from 'react-icons/fa';
import cars from '../data/cars';
import './CarDetail.css';

function CarDetail() {
  const { id } = useParams();
  const car = useMemo(() => cars.find((item) => item.id === Number(id)), [id]);

  if (!car) {
    return (
      <main className="car-detail-page">
        <div className="section-404">
          <h1>Vehicle not found</h1>
          <p>We couldn't locate that car. Please return to the inventory.</p>
          <Link to="/browse" className="button button--primary">Back to Browse</Link>
        </div>
      </main>
    );
  }

  const imageStyle = { backgroundColor: car.color === 'Black' ? '#222' : car.color === 'White' ? '#f8f8f8' : car.color === 'Silver' ? '#d5d7dc' : car.color === 'Red' ? '#f5a6a0' : '#c6dcff' };

  return (
    <main className="car-detail-page">
      <div className="car-detail__top">
        <div className="car-detail__hero" style={imageStyle}>
          <div className="car-detail__hero-label">{car.make} {car.model} 🚘</div>
        </div>
        <div className="car-detail__summary">
          <Link to="/browse" className="button button--ghost car-detail__back">Back</Link>
          <div className="car-detail__headline">
            <div>
              <p className="eyebrow">{car.condition}</p>
              <h1>{car.year} {car.make} {car.model}</h1>
            </div>
            {car.badge && <span className="car-detail__badge">{car.badge}</span>}
          </div>
          <div className="car-detail__info-grid">
            <div>
              <p className="car-detail__price">${car.price.toLocaleString()}</p>
              <p className="car-detail__meta">Mileage: {car.mileage.toLocaleString()} km</p>
              <p className="car-detail__meta">Transmission: {car.transmission}</p>
              <p className="car-detail__meta">Fuel: {car.fuelType}</p>
              <p className="car-detail__meta">Color: {car.color}</p>
            </div>
            <div>
              <p className="car-detail__meta">Year: {car.year}</p>
              <p className="car-detail__meta">Type: {car.type}</p>
              <p className="car-detail__meta">Condition: {car.condition}</p>
            </div>
          </div>
          <p className="car-detail__description">{car.description}</p>
          <Link to={`/checkout/${car.id}`} className="button button--primary">Buy This Car</Link>
        </div>
      </div>
      <section className="car-detail__features">
        <h2>Key features</h2>
        <ul>
          {car.features.map((feature) => (
            <li key={feature}><FaCheck /> {feature}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default CarDetail;
