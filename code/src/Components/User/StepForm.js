import React, { useState } from "react";

const StepForm = () => {
  const steps = [
    "Time & Duration",
    "Location",
    "Slot Type",
    "Select Slot",
    "Confirm",
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div>
      {/* Step Indicator */}
      <div className="step-indicator d-flex justify-content-between mb-4">
        {steps.map((stepTitle, index) => (
          <div
            key={index}
            className={`step ${index === currentStep ? "active" : ""}`}
          >
            <div className="step-number">{index + 1}</div>
            <div className="step-title">{stepTitle}</div>
          </div>
        ))}
      </div>

      {/* Form Content */}
      <div className="form-content">
        <h3>{steps[currentStep]}</h3>
        <p>Yahan {steps[currentStep]} ka form hoga...</p>
      </div>

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-secondary"
          disabled={currentStep === 0}
          onClick={prevStep}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          disabled={currentStep === steps.length - 1}
          onClick={nextStep}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepForm;
