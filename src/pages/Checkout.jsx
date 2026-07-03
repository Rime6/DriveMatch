import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import cars from '../data/cars';
import StepIndicator from '../components/StepIndicator';
import './Checkout.css';

const steps = [
  { name: 'Your Details' },
  { name: 'Review Order' },
  { name: 'Payment' },
  { name: 'Confirmation' },
];

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  province: '',
  postalCode: '',
  cardName: '',
  cardNumber: '',
  expiryMonth: '01',
  expiryYear: '2026',
  cvv: '',
};

function Checkout() {
  const { id } = useParams();
  const car = useMemo(() => cars.find((item) => item.id === Number(id)), [id]);
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [errorMessage, setErrorMessage] = useState('');
  const [orderNumber] = useState(() => `DM-${Math.floor(100000 + Math.random() * 900000)}`);

  if (!car) {
    return (
      <main className="checkout-page">
        <div className="section-404">
          <h1>Vehicle not found</h1>
          <p>Please choose another car from our inventory.</p>
          <Link to="/browse" className="button button--primary">Back to Browse</Link>
        </div>
      </main>
    );
  }

  const requiredStepOne = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'province', 'postalCode'];
  const requiredStepThree = ['cardName', 'cardNumber', 'expiryMonth', 'expiryYear', 'cvv'];

  const missingStepOne = requiredStepOne.filter((field) => !form[field]).map((field) => {
    if (field === 'postalCode') return 'Postal Code';
    return field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
  });
  const missingStepThree = requiredStepThree.filter((field) => !form[field]).map((field) => {
    if (field === 'cardName') return 'Cardholder Name';
    if (field === 'cardNumber') return 'Card Number';
    if (field === 'expiryMonth') return 'Expiry Month';
    if (field === 'expiryYear') return 'Expiry Year';
    return field.toUpperCase();
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) {
      setErrorMessage('');
    }
  }

  function nextStep() {
    if (currentStep === 1) {
      if (missingStepOne.length) {
        setErrorMessage(`Please fill in: ${missingStepOne.join(', ')}.`);
        return;
      }
      setErrorMessage('');
      setCurrentStep(2);
      return;
    }

    if (currentStep === 2) {
      setErrorMessage('');
      setCurrentStep(3);
      return;
    }

    if (currentStep === 3) {
      if (missingStepThree.length) {
        setErrorMessage(`Please fill in: ${missingStepThree.join(', ')}.`);
        return;
      }
      setErrorMessage('');
      setCurrentStep(4);
    }
  }

  function previousStep() {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  }

  function goToDetails() {
    setCurrentStep(1);
  }

  return (
    <main className="checkout-page">
      <div className="checkout-top">
        <StepIndicator steps={steps} currentStep={currentStep} />
        <div className="checkout-summary-card">
          <p className="eyebrow">Order summary</p>
          <h2>{car.year} {car.make} {car.model}</h2>
          <p className="checkout-summary-card__price">${car.price.toLocaleString()}</p>
        </div>
      </div>

      {currentStep === 1 && (
        <section className="checkout-panel">
          <h1>Your Details</h1>
          <p>Please fill in your details below.</p>
          <div className="checkout-form-grid">
            {['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'province', 'postalCode'].map((field) => (
              <label key={field}>
                <span>{field === 'postalCode' ? 'Postal Code' : field.charAt(0).toUpperCase() + field.slice(1)}</span>
                <input
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={field === 'postalCode' ? 'A1A 1A1' : ''}
                />
              </label>
            ))}
          </div>
          {errorMessage && <div className="checkout-error">{errorMessage}</div>}
          <div className="checkout-actions">
            <button type="button" className="button button--primary" onClick={nextStep}>Continue to Review</button>
          </div>
        </section>
      )}

      {currentStep === 2 && (
        <section className="checkout-panel">
          <h1>Review Order</h1>
          <p>Review your information before proceeding.</p>
          <div className="review-grid">
            <div className="review-card">
              <h2>Vehicle</h2>
              <p>{car.year} {car.make} {car.model}</p>
              <p className="review-price">${car.price.toLocaleString()}</p>
            </div>
            <div className="review-card">
              <h2>Your Details</h2>
              <p>{form.firstName} {form.lastName}</p>
              <p>{form.email}</p>
              <p>{form.phone}</p>
              <p>{form.address}</p>
              <p>{form.city}, {form.province} {form.postalCode}</p>
            </div>
          </div>
          <div className="checkout-actions">
            <button type="button" className="button button--ghost" onClick={goToDetails}>Edit Details</button>
            <button type="button" className="button button--primary" onClick={nextStep}>Proceed to Payment</button>
          </div>
        </section>
      )}

      {currentStep === 3 && (
        <section className="checkout-panel">
          <h1>Payment</h1>
          <p>🔒 Secure checkout — your information is encrypted.</p>
          <div className="checkout-form-grid">
            <label>
              <span>Cardholder Name</span>
              <input name="cardName" value={form.cardName} onChange={handleChange} />
            </label>
            <label>
              <span>Card Number</span>
              <input name="cardNumber" value={form.cardNumber} onChange={handleChange} />
            </label>
            <label>
              <span>Expiry Month</span>
              <select name="expiryMonth" value={form.expiryMonth} onChange={handleChange}>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option key={month} value={String(month).padStart(2, '0')}>{String(month).padStart(2, '0')}</option>
                ))}
              </select>
            </label>
            <label>
              <span>Expiry Year</span>
              <select name="expiryYear" value={form.expiryYear} onChange={handleChange}>
                {['2026', '2027', '2028', '2029', '2030'].map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </label>
            <label>
              <span>CVV</span>
              <input name="cvv" value={form.cvv} onChange={handleChange} />
            </label>
          </div>
          {errorMessage && <div className="checkout-error">{errorMessage}</div>}
          <div className="checkout-actions">
            <button type="button" className="button button--ghost" onClick={previousStep}>Back</button>
            <button type="button" className="button button--primary" onClick={nextStep}>Place Order</button>
          </div>
        </section>
      )}

      {currentStep === 4 && (
        <section className="checkout-panel checkout-panel--confirmation">
          <div className="confirmation-card">
            <div className="confirmation-card__icon">✓</div>
            <h1>🎉 Your order has been placed!</h1>
            <p>Our team will contact you within 24 hours to arrange delivery or pickup.</p>
            <div className="confirmation-details">
              <p><strong>Order number:</strong> {orderNumber}</p>
              <p><strong>Car:</strong> {car.year} {car.make} {car.model}</p>
              <p><strong>Buyer:</strong> {form.firstName} {form.lastName}</p>
            </div>
            <div className="confirmation-actions">
              <Link to="/browse" className="button button--primary">Browse More Cars</Link>
              <Link to="/survey" className="button button--secondary">Fill Out Our Survey</Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default Checkout;
