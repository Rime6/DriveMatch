import './StepIndicator.css';

function StepIndicator({ steps, currentStep }) {
  return (
    <div className="step-indicator" aria-label="Checkout progress">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const status = stepNumber < currentStep ? 'completed' : stepNumber === currentStep ? 'active' : 'upcoming';
        return (
          <div key={step.name} className={`step-indicator__step step-indicator__step--${status}`}>
            <div className="step-indicator__icon">
              {status === 'completed' ? '✓' : stepNumber}
            </div>
            <div>
              <p className="step-indicator__label">{step.name}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StepIndicator;
