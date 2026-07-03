import { useMemo } from 'react';
import { FaStar } from 'react-icons/fa';
import './StarRating.css';

function StarRating({ value, onChange }) {
  const stars = useMemo(() => [1, 2, 3, 4, 5], []);
  return (
    <div className="star-rating" role="radiogroup" aria-label="Overall experience rating">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          className={`star-rating__star ${value >= star ? 'star-rating__star--active' : ''}`}
          aria-pressed={value >= star}
          onClick={() => onChange(star)}
        >
          <FaStar />
        </button>
      ))}
    </div>
  );
}

export default StarRating;
