import React, { createContext, useContext, useState, useEffect } from 'react';
import { verifyTokenRequest, logoutRequest } from '../api/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para verificar el token
  const verifyToken = async () => {
    try {
      const res = await verifyTokenRequest();
      setIsAuthenticated(res.data.isAuthenticated);
    } catch (error) {
      console.error("Error verifying token context:", error);
      setIsAuthenticated(false);
    }
  };

  // Verificar el token al montar el componente
  useEffect(() => {
    verifyToken();
  }, []);

  // Función de login que verifica el token
  const login = async () => {
    verifyToken();
  };

  // Función de logout que llama al backend para cerrar sesión
  const logout = async () => {
    try {
      await logoutRequest();
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error during logout:", error, "forced logout");
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
