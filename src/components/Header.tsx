
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Dumbbell, LogOut, Menu, User, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from './ThemeToggle';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="border-b bg-white dark:bg-gray-800 sticky top-0 z-10">
      <div className="container mx-auto py-3 px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Dumbbell className="h-6 w-6 text-fitblue-500" />
          <span className="text-xl font-bold text-fitblue-500">FitLogix</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-fitblue-500 transition-colors">
                Dashboard
              </Link>
              <Link to="/exercises" className="text-gray-700 dark:text-gray-200 hover:text-fitblue-500 transition-colors">
                Exercises
              </Link>
              <Link to="/progress" className="text-gray-700 dark:text-gray-200 hover:text-fitblue-500 transition-colors">
                Progress
              </Link>
              <div className="flex items-center gap-2 ml-4">
                <ThemeToggle />
                <User className="h-4 w-4" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{user?.name}</span>
                <Button variant="ghost" size="icon" onClick={() => logout()}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <>
              <ThemeToggle />
              <Link to="/login">
                <Button>Log In</Button>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t absolute w-full bg-white dark:bg-gray-800 z-20 shadow-md">
          <div className="container mx-auto py-4 px-4 flex flex-col gap-4">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 dark:text-gray-200 hover:text-fitblue-500 transition-colors py-2"
                  onClick={toggleMobileMenu}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/exercises" 
                  className="text-gray-700 dark:text-gray-200 hover:text-fitblue-500 transition-colors py-2"
                  onClick={toggleMobileMenu}
                >
                  Exercises
                </Link>
                <Link 
                  to="/progress" 
                  className="text-gray-700 dark:text-gray-200 hover:text-fitblue-500 transition-colors py-2"
                  onClick={toggleMobileMenu}
                >
                  Progress
                </Link>
                <div className="flex items-center justify-between border-t pt-3 mt-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{user?.name}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => { logout(); toggleMobileMenu(); }}>
                    <LogOut className="h-4 w-4 mr-2" /> Logout
                  </Button>
                </div>
              </>
            ) : (
              <Link to="/login" onClick={toggleMobileMenu}>
                <Button className="w-full">Log In</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
