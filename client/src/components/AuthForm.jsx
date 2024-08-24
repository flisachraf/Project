import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';

const AuthForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isRegister, setIsRegister] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPW: ''
    });
    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        confirmPW: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isRegister) {
            try {
                const response = await axios.post("http://srv586727.hstgr.cloud:8000/api/register", formData, { withCredentials: true });
                console.log("SERVER RESPONSE:", response.data);
                localStorage.setItem("authtoken", response.data.token);
                const { token } = response.data;
                login(token);
                navigate("/");
            } catch (error) {
                console.log("Error:", error);
            }
        } else {
            try {
                const response = await axios.post('http://srv586727.hstgr.cloud:8000/api/login', formData, { withCredentials: true });
                console.log('SERVER RESPONSE:', response.data);
                localStorage.setItem('token', response.data.token);
                window.location.href = '/home';
                const { token } = response.data;
                login(token);
            } catch (error) {
                console.log("Error:", error.response.data);
                let tempErrors = {};
                for (let key of Object.keys(error.response.data)) {
                    console.log(key, '------', error.response.data[key].message);
                    tempErrors[key] = error.response.data[key].message;
                }
                setErrors({ ...tempErrors });
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-green-300 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {isRegister ? 'Register' : 'Login'}
                </h2>
                <form onSubmit={handleSubmit}>
                    {isRegister && (
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Username"
                                required
                            />
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Password"
                            required
                        />
                    </div>
                    {isRegister && (
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPW"
                                value={formData.confirmPW}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Confirm Password"
                                required
                            />
                        </div>
                    )}
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            {isRegister ? 'Register' : 'Login'}
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-600 text-sm mt-4">
                    {isRegister ? 'Already have an account?' : "Don't have an account?"}
                    <button
                        onClick={() => setIsRegister(!isRegister)}
                        className="text-blue-500 hover:text-blue-700 font-semibold ml-2"
                    >
                        {isRegister ? 'Login' : 'Register'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;
