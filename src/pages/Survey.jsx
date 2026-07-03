import { useState } from 'react';
import StarRating from '../components/StarRating';
import './Survey.css';

const feedbackOptions = ['Search Filters', 'Car Descriptions', 'Checkout Process', 'Website Speed', 'Overall Design', 'Other'];
const easeOptions = ['Very Difficult', 'Difficult', 'Neutral', 'Easy', 'Very Easy'];

function Survey() {
  const [rating, setRating] = useState(0);
  const [foundCar, setFoundCar] = useState('Still browsing');
  const [ease, setEase] = useState('Neutral');
  const [improvements, setImprovements] = useState([]);
  const [comments, setComments] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function toggleImprovement(item) {
    setImprovements((prev) => (prev.includes(item) ? prev.filter((entry) => entry !== item) : [...prev, item]));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="survey-page">
      <div className="survey-header">
        <span className="eyebrow">Your voice matters</span>
        <h1>We'd Love to Hear From You 💬</h1>
        <p>Your feedback helps us improve DriveMatch for everyone. This survey takes less than 2 minutes. We promise it's worth it! 😊</p>
      </div>
      {submitted ? (
        <div className="survey-success-card">
          <h2>Thank you, {name.trim() || 'friend'}!</h2>
          <p>Your feedback means the world to us. 🚗💨</p>
        </div>
      ) : (
        <form className="survey-form" onSubmit={handleSubmit}>
          <div className="survey-section">
            <label className="survey-label">Overall experience rating</label>
            <StarRating value={rating} onChange={setRating} />
          </div>
          <div className="survey-section">
            <label className="survey-label">Did you find the car you were looking for?</label>
            <div className="radio-grid">
              {['Yes', 'No', 'Still browsing'].map((option) => (
                <label key={option} className="radio-option">
                  <input type="radio" name="foundCar" value={option} checked={foundCar === option} onChange={() => setFoundCar(option)} />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="survey-section">
            <label className="survey-label">How easy was it to use our search filters?</label>
            <div className="radio-grid">
              {easeOptions.map((option) => (
                <label key={option} className="radio-option">
                  <input type="radio" name="ease" value={option} checked={ease === option} onChange={() => setEase(option)} />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="survey-section">
            <label className="survey-label">What could we improve?</label>
            <div className="checkbox-grid">
              {feedbackOptions.map((option) => (
                <label key={option} className="checkbox-option">
                  <input type="checkbox" checked={improvements.includes(option)} onChange={() => toggleImprovement(option)} />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="survey-section">
            <label className="survey-label">Any additional comments?</label>
            <textarea value={comments} onChange={(e) => setComments(e.target.value)} placeholder="Share anything that would help us improve..." />
          </div>
          <div className="survey-section survey-section--small">
            <label className="survey-label">Name (optional)</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Leave blank to stay anonymous" />
          </div>
          <button type="submit" className="button button--primary">Submit Feedback</button>
        </form>
      )}
    </main>
  );
}

export default Survey;
