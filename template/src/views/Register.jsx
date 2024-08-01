import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handlePrevClick = () => {
    if (step === 1) return;
    setStep(s => s - 1);
  };

  const handleNextClick = () => {
    if (step === 3) return;
    setStep(s => s + 1);
  };

  return (
    <>
      <h1>Welcome to ∀ PXL</h1>
      <p>Let&apos;s get to meet you</p>
      {step === 1 && (
        <>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" />
        </>
      )}

      {step === 2 && (
        <>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </>
      )}

      {step === 3 && (
        <>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </>
      )}
      <p>Step {step} / 3</p>
      <div className="controllers">
        {step === 1 ? (
          <button onClick={() => navigate(-1)}>&times; Cancel</button>
        ) : (
          <button onClick={handlePrevClick}>&larr; Back</button>
        )}
        {step === 3 ? (
          <button onClick={handleNextClick}>Register &#x2713;</button>
        ) : (
          <button onClick={handleNextClick}>Next &rarr;</button>
        )}
      </div>
      <p>Already have an account? <Link to='/login'>Login</Link> Instead</p>
    </>
  );
};

export default Register;
