
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Header from "@/components/Header";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Exercises from "@/pages/Exercises";
import ExerciseDetail from "@/pages/ExerciseDetail";
import Progress from "@/pages/Progress";
import NotFound from "@/pages/NotFound";
import LandingPage from "@/pages/LandingPage";

// ProtectedRoute component to handle authentication
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Routes>
        {/* Landing page as the default route */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <LandingPage />
            )
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Header />
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/exercises" 
          element={
            <ProtectedRoute>
              <Header />
              <Exercises />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/exercise/:id" 
          element={
            <ProtectedRoute>
              <Header />
              <ExerciseDetail />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/progress" 
          element={
            <ProtectedRoute>
              <Header />
              <Progress />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
