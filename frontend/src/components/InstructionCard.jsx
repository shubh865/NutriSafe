import React, { useState } from "react";

const InstructionCard = ({ instructions }) => {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < instructions.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <>
      <div className="p-[20px] h-[150px] mb-[15px] bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <p className="mb-2">{instructions[step]}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <button
          className={`px-4 py-2 font-bold text-blue-600 rounded-md ${
            step === 0 && "opacity-50 cursor-not-allowed"
          }`}
          onClick={handlePrevious}
          disabled={step === 0}
        >
          Previous
        </button>
        <button
          className={`px-4 py-2 font-bold text-blue-600 rounded-md ${
            step === instructions.length - 1 && "opacity-50 cursor-not-allowed"
          }`}
          onClick={handleNext}
          disabled={step === instructions.length - 1}
        >
          Next
        </button>
      </div>
    </>
  );
};
export default InstructionCard;
