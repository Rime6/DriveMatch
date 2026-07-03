import { useMemo, useState } from 'react';
import cars from '../data/cars';
import CarCard from '../components/CarCard';
import './Browse.css';

const initialFilters = {
  makes: [],
  types: [],
  conditions: [],
  transmissions: [],
  fuels: [],
  colors: [],
  priceMin: 0,
  priceMax: 80000,
  yearMin: 2018,
  yearMax: 2024,
};

const options = {
  makes: ['Toyota', 'Honda', 'BMW', 'Ford', 'Hyundai', 'Mazda'],
  types: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Hatchback'],
  conditions: ['New', 'Used', 'Certified Pre-Owned'],
  transmissions: ['Automatic', 'Manual'],
  fuels: ['Gasoline', 'Hybrid', 'Electric'],
  colors: ['Black', 'White', 'Silver', 'Red', 'Blue'],
};

function Browse() {
  const [filters, setFilters] = useState(initialFilters);

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const makeMatch = filters.makes.length === 0 || filters.makes.includes(car.make);
      const typeMatch = filters.types.length === 0 || filters.types.includes(car.type);
      const conditionMatch = filters.conditions.length === 0 || filters.conditions.includes(car.condition);
      const transmissionMatch = filters.transmissions.length === 0 || filters.transmissions.includes(car.transmission);
      const fuelMatch = filters.fuels.length === 0 || filters.fuels.includes(car.fuelType);
      const colorMatch = filters.colors.length === 0 || filters.colors.includes(car.color);
      const priceMatch = car.price >= filters.priceMin && car.price <= filters.priceMax;
      const yearMatch = car.year >= filters.yearMin && car.year <= filters.yearMax;
      return makeMatch && typeMatch && conditionMatch && transmissionMatch && fuelMatch && colorMatch && priceMatch && yearMatch;
    });
  }, [filters]);

  function toggleFilter(key, value) {
    setFilters((prev) => {
      const list = prev[key];
      const next = list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
      return { ...prev, [key]: next };
    });
  }

  function handleRangeChange(field, value) {
    setFilters((prev) => ({ ...prev, [field]: Number(value) }));
  }

  function clearFilters() {
    setFilters(initialFilters);
  }

  return (
    <main className="browse-page">
      <div className="browse-header">
        <div>
          <p className="section-eyebrow">Browse Our Inventory</p>
          <h1>Use the filters below to find the vehicle that fits your lifestyle.</h1>
        </div>
      </div>
      <div className="browse-layout">
        <aside className="browse-filters">
          <div className="browse-filters__top">
            <h2>Filters</h2>
            <button type="button" className="button button--ghost" onClick={clearFilters}>Clear All Filters</button>
          </div>
          {Object.entries(options).map(([key, values]) => (
            <div key={key} className="filter-group">
              <h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
              <div className="filter-group__options">
                {values.map((value) => (
                  <label key={value} className="filter-option">
                    <input
                      type="checkbox"
                      checked={filters[key].includes(value)}
                      onChange={() => toggleFilter(key, value)}
                    />
                    <span>{value}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className="filter-group">
            <h3>Price Range</h3>
            <div className="range-inputs">
              <label>
                Min
                <input
                  type="number"
                  min="0"
                  max="80000"
                  value={filters.priceMin}
                  onChange={(e) => handleRangeChange('priceMin', e.target.value)}
                />
              </label>
              <label>
                Max
                <input
                  type="number"
                  min="0"
                  max="80000"
                  value={filters.priceMax}
                  onChange={(e) => handleRangeChange('priceMax', e.target.value)}
                />
              </label>
            </div>
          </div>
          <div className="filter-group">
            <h3>Year Range</h3>
            <div className="range-inputs">
              <label>
                From
                <input
                  type="number"
                  min="2018"
                  max="2024"
                  value={filters.yearMin}
                  onChange={(e) => handleRangeChange('yearMin', e.target.value)}
                />
              </label>
              <label>
                To
                <input
                  type="number"
                  min="2018"
                  max="2024"
                  value={filters.yearMax}
                  onChange={(e) => handleRangeChange('yearMax', e.target.value)}
                />
              </label>
            </div>
          </div>
        </aside>

        <section className="browse-results">
          <div className="browse-results__top">
            <p className="browse-results__count">Showing {filteredCars.length} of {cars.length} vehicles</p>
          </div>
          {filteredCars.length > 0 ? (
            <div className="browse-grid">
              {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} highlightDeal={Boolean(car.badge)} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>No vehicles match your filters.</h2>
              <p>Try adjusting your search to see more options.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Browse;
