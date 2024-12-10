import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateOtp, validateOtp } from '../redux/userSlice';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);

  const dispatch = useDispatch();
  const { token, status, error } = useSelector((state) => state.user);

  const handleGenerateOtp = () => {
    dispatch(generateOtp(email));
    setStep(2);
  };

  const handleValidateOtp = () => {
    dispatch(validateOtp({ email, otp }));
  };

  if (token) {
    return <div>Logged in! Token: {token}</div>;
  }

  return (
    <div>
      {step === 1 && (
        <div>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleGenerateOtp} disabled={status === 'loading'}>
            Send OTP
          </button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2>Enter OTP</h2>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleValidateOtp} disabled={status === 'loading'}>
            Login
          </button>
        </div>
      )}
      {status === 'failed' && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
