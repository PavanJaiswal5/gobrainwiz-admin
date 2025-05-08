import React, { useState } from 'react';
import { userApi } from '../services/api/userAuth.api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // const data = await userApi.login(email, password);
      toast.success('Login Successful!');
      navigate('/account');
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <>
      <div className="floating-label mb-[20px]">
        <input type="email" className="form-control bw-form-control" id="username" value={email} onChange={(e) => setEmail(e.target.value)} placeholder=" " />
        <label htmlFor="username">Username</label>
      </div>
      <div className="floating-label mb-[20px]">
        <input type="password" className="form-control bw-form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder=" " />
        <label htmlFor="password">Password</label>
      </div>
      <div className="flex flex-col gap-[10px]">
        <button onClick={handleLogin} className="btn btn-primary bw-btn self-start">
          Sign In <i className="fi fi-rr-angle-right"></i>
        </button>
      </div>
    </>
  );
}

export default Login;
