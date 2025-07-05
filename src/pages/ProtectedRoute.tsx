import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const checkURL = import.meta.env.VITE_API_URL+"/api/auth/check"
        if(!checkURL){
          throw new Error("Missing VITE_API_URL environment variable")
        }
        console.log("Sending auth check request...");
        const res = await axios.get(checkURL, {
          withCredentials: true,
        });
        console.log("Response received", res.status);
        console.log(res.status)
        if (res.status===200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }
    
    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
