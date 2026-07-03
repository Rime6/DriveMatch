import { Link } from 'react-router-dom';
import { FaGasPump, FaCogs, FaRoad, FaTint } from 'react-icons/fa';
import './CarCard.css';

function CarCard({ car, highlightDeal }) {
  return (
    <article className={`car-card ${highlightDeal ? 'car-card--deal' : ''}`}>
      <div className="car-card__header">
        <div>
          <p className="car-card__title">{car.year} {car.make} {car.model}</p>
          <div className="car-card__badges">
            <span className="car-card__badge car-card__badge--type">{car.type}</span>
            <span className="car-card__badge car-card__badge--condition">{car.condition}</span>
          </div>
        </div>
        {car.badge && <span className="car-card__deal-badge">{car.badge}</span>}
      </div>
      <div className="car-card__body">
        <div className="car-card__image" aria-hidden="true">
          <span>{car.make} {car.model} 🚘</span>
        </div>
        <div className="car-card__details">
          <p className="car-card__price">${car.price.toLocaleString()}</p>
          {car.originalPrice && (
            <p className="car-card__was-price">Was ${car.originalPrice.toLocaleString()}</p>
          )}
          <ul className="car-card__specs">
            <li><FaRoad /> {car.mileage.toLocaleString()} km</li>
            <li><FaCogs /> {car.transmission}</li>
            <li><FaGasPump /> {car.fuelType}</li>
            <li><FaTint /> {car.color}</li>
          </ul>
        </div>
      </div>
      <Link to={`/car/${car.id}`} className="car-card__action">View Details</Link>
    </article>
  );
}

export default CarCard;
