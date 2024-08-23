import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:8000/api', {
        headers: { Authorization: token }
      })
      .then(response => {
        if (response.data && response.data.loggedUser) {
          setUser(response.data.loggedUser);
        } else {
          const decode=jwtDecode(token.replace("Bearer ",""))
          console.log(decode)
          setUser(decode);
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
        setUser(null);
      });
    } else {
      setUser(null);
    }
  }, []);

  const login = (token, user) => {
    localStorage.setItem('token', `Bearer ${token}`);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
