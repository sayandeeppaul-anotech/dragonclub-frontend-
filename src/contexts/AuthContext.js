import React, { createContext, useContext, useState ,useEffect} from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('token') ? true : false;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem('admin') ? true : false;
  });

  const isTokenExpired = () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return true;
    }
    const decodedToken = jwtDecode(token);
    const expirationDate = new Date(decodedToken.exp * 1000);
    return expirationDate < new Date();
  };


  console.log('isAdmin:', isAdmin);
  const login = (token, admin) => {
    sessionStorage.setItem('token', token);
    Cookies.set('token', token);
    setIsAuthenticated(true);

    if (admin) {
      sessionStorage.setItem('admin', 'true');
      setIsAdmin(true);
    }
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    Cookies.remove('token');
    setIsAuthenticated(false);

    sessionStorage.removeItem('admin');
    setIsAdmin(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isTokenExpired()) {
        logout();
      }
    }, 1000); // check every minute

    return () => clearInterval(interval); // cleanup on unmount
  }, []);
  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);