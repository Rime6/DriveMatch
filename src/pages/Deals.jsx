import cars from '../data/cars';
import CarCard from '../components/CarCard';
import './Deals.css';

function Deals() {
  const dealCars = cars.filter((car) => car.badge);

  return (
    <main className="deals-page">
      <div className="deals-hero">
        <p className="section-eyebrow">Limited time offers</p>
        <h1>🔥 This Week's Hottest Deals</h1>
        <p>Act fast — limited inventory! Find standout savings on premium cars today.</p>
      </div>
      <div className="deals-grid">
        {dealCars.map((car) => (
          <CarCard key={car.id} car={car} highlightDeal />
        ))}
      </div>
      {dealCars.length === 0 && (
        <div className="empty-state">
          <h2>No deals available right now.</h2>
          <p>Check back soon for fresh promotions and hot prices.</p>
        </div>
      )}
    </main>
  );
}

export default Deals;
