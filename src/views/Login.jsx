import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { userAuthApi } from '../services/api/userAuth.api';
import { useAuth } from "../context/AuthContext";

function AuthForm() {
  const navigate = useNavigate();
const { setUserFromToken } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
    const response=  await userAuthApi.userLogin(data.username, data.password);
      toast.success('Login successful!');
      setUserFromToken(response.token);
      navigate('/account');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Login failed, try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Username"
            className="w-full border px-3 py-2 rounded"
            {...register('username', { required: true })}
          />
          {errors.username && <p className="text-red-500 text-sm">Username is required</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full border px-3 py-2 rounded"
            {...register('password', { required: true })}
          />
          {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
