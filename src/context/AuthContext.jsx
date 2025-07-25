import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); 
 const [loading, setLoading] = useState(true);
  useEffect(() => {
  const token = localStorage.getItem("token");
  console.log("Token from localStorage:", token);
  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log("Decoded user:", decoded);
      setUser(decoded);
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Invalid token");
      setIsAuthenticated(false);
    }
  }
  setLoading(false);
}, []);


  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, loading }}>

      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
