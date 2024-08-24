// src/Register.js

import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaLock, FaEnvelope, FaCheck } from "react-icons/fa"; // Icons for a better design
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

const Register = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [nameOrWord, setNameOrWord] = useState("");
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPassword] = useState(""); // New state for confirm password
  const [verificationCode, setVerificationCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const {login}=useAuth();
  const token =localStorage.getItem("token")
  if (token) {
    return <Navigate to="/" />;
      }
  const handleSendVerificationCode = async (e) => {
    e.preventDefault();
    if (nameOrWord.trim().length <= 0) {
      alert("Create a specific word please");
      return;
    }

    try {
      const response = await axios.post(
        "http://srv586727.hstgr.cloud:8000/send-verification-code",
        {
          nameOrWord,
        }
      );

      setGeneratedCode(response.data.verificationCode);
      setMessage(response.data.message);
      setNameOrWord("")
      setStep(2);
    } catch (error) {
      setMessage("Error sending verification code.");
      console.error(error);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();

    if (verificationCode === generatedCode) {
      setStep(3);
      setVerificationCode("")
      setMessage("Verification code accepted");
    } else {
      setMessage("Invalid verification code.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // if (password !== confirmPassword) {
    //   setMessage("Passwords do not match.");
    //   return;
    // }

    try {
      const response = await axios.post("http://srv586727.hstgr.cloud:8000/api/register", {
        username,
        email,
        password,
        confirmPW,
        verificationCode,
      });

      setMessage(response.data.message);
      setConfirmPassword('')
      setPassword("")
      setEmail("")
      setName("")
      setIsRegisterMode(false)

    } catch (error) {
      setMessage("Error during registration.");
      console.error(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://srv586727.hstgr.cloud:8000/api/login", {
        email: loginEmail,
        password: loginPassword,
      });
      console.log('************',response)
      login(response.data.token,response.data.user)
      setMessage("login success");

    } catch (error) {
      setMessage("Error during login.");
      console.error(error.response.data.message);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {isRegisterMode ? "Register" : "Login"}
        </h1>

        {message && (
          <div
            className={`mb-4 p-3 rounded ${
              message.includes("Error")
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        {isRegisterMode ? (
          <>
            {step === 1 && (
              <form onSubmit={handleSendVerificationCode} className="space-y-4">
                <div className="relative">
                  <span className="absolute left-3 top-3">
                    <FaUser className="text-gray-500" />
                  </span>
                  <input
                    type="text"
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 transition"
                    placeholder="Enter a Name/Word"
                    value={nameOrWord}
                    onChange={(e) => setNameOrWord(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
                >
                  Send Verification Code
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleVerification} className="space-y-4">
                <div className="relative">
                  <span className="absolute left-3 top-3">
                    <FaCheck className="text-gray-500" />
                  </span>
                  <input
                    type="text"
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring focus:ring-green-200 transition"
                    placeholder="Verification Code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition"
                >
                  Verify Code
                </button>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="relative">
                  <span className="absolute left-3 top-3">
                    <FaUser className="text-gray-500" />
                  </span>
                  <input
                    type="text"
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 transition"
                    placeholder="Name"
                    value={username}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="relative">
                  <span className="absolute left-3 top-3">
                    <FaEnvelope className="text-gray-500" />
                  </span>
                  <input
                    type="email"
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 transition"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="relative">
                  <span className="absolute left-3 top-3">
                    <FaLock className="text-gray-500" />
                  </span>
                  <input
                    type="password"
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 transition"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="relative">
                  <span className="absolute left-3 top-3">
                    <FaLock className="text-gray-500" />
                  </span>
                  <input
                    type="password"
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 transition"
                    placeholder="Confirm Password"
                    value={confirmPW}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
                >
                  Register
                </button>
              </form>
            )}
          </>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <span className="absolute left-3 top-3">
                <FaEnvelope className="text-gray-500" />
              </span>
              <input
                type="email"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring focus:ring-green-200 transition"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <span className="absolute left-3 top-3">
                <FaLock className="text-gray-500" />
              </span>
              <input
                type="password"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring focus:ring-green-200 transition"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition"
            >
              Login
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <button
            className="text-blue-500 font-semibold underline"
            onClick={() => {
              setIsRegisterMode(!isRegisterMode);
              setStep(1); // Reset step to 1 when switching modes
              setMessage(""); // Clear message when switching modes
            }}
          >
            {isRegisterMode ? "Switch to Login" : "Switch to Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
