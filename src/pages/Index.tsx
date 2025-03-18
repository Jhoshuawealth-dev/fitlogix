
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Redirect based on authentication status
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Show a loading indicator while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse-gentle">
        <div className="text-center">
          <div className="text-3xl font-bold text-fitblue-500 mb-2">FitLogix</div>
          <p className="text-gray-500">Loading your fitness journey...</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
