import axios from 'axios';
import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [error,setError]=useState(null)
  const [password, setPassword] = useState('');
  const token=localStorage.getItem("token")
  const {login}=useAuth();
  if (token) {
    return <Navigate to="/" />;
      }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:8000/api/sponsors/login", {
          email: email,
          password: password,
        });
        console.log('************',response)
        login(response.data.token,response.data.sponsor)

  
      } catch (error) {
       if(error.response.status === 401) alert("your account is not activate");
       else setError("Somthing Wrong")
        console.error(error.response.status);
      }
    };
 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Login</h2>
        
        {error&& <div className='bg-red-100 text-red-700 text-center'> {error} </div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none"
          >
            Login
          </button>
        </form>
        
        
      </div>
    </div>
  );
};

export default Login;
