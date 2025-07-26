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
      // Verify token has correct format (header.payload.signature)
      if (!token.includes('.') || token.split('.').length !== 3) {
        console.error("Invalid token format");
        localStorage.removeItem("token"); // Remove invalid token
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded user:", decoded);
        
        // Check if token is expired
        if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
          console.error("Token expired");
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        } else {
          setUser(decoded);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("token");
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
