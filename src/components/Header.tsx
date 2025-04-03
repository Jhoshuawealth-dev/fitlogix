
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Dumbbell, Home, Info, LogOut, Menu, MessageSquare, Star, User, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from './ThemeToggle';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    if (isLandingPage) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileMenuOpen(false);
    } else {
      // If not on landing page, navigate to landing page with hash
      window.location.href = `/#${sectionId}`;
    }
  };

  // Get display name, handling the case where name might be undefined
  const displayName = user?.name || user?.email?.split('@')[0] || 'User';

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
                <span className="text-sm text-gray-600 dark:text-gray-400">{displayName}</span>
                <Button variant="ghost" size="icon" onClick={() => logout()}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    {isLandingPage ? (
                      <div 
                        onClick={() => scrollToSection('hero')} 
                        className={navigationMenuTriggerStyle() + " cursor-pointer"}
                      >
                        <Home className="mr-1 h-4 w-4" />
                        Home
                      </div>
                    ) : (
                      <Link to="/" className={navigationMenuTriggerStyle()}>
                        <Home className="mr-1 h-4 w-4" />
                        Home
                      </Link>
                    )}
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    {isLandingPage ? (
                      <div 
                        onClick={() => scrollToSection('features')} 
                        className={navigationMenuTriggerStyle() + " cursor-pointer"}
                      >
                        <Star className="mr-1 h-4 w-4" />
                        Features
                      </div>
                    ) : (
                      <Link to="/#features" className={navigationMenuTriggerStyle()}>
                        <Star className="mr-1 h-4 w-4" />
                        Features
                      </Link>
                    )}
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    {isLandingPage ? (
                      <div 
                        onClick={() => scrollToSection('about')} 
                        className={navigationMenuTriggerStyle() + " cursor-pointer"}
                      >
                        <Info className="mr-1 h-4 w-4" />
                        About Us
                      </div>
                    ) : (
                      <Link to="/#about" className={navigationMenuTriggerStyle()}>
                        <Info className="mr-1 h-4 w-4" />
                        About Us
                      </Link>
                    )}
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    {isLandingPage ? (
                      <div 
                        onClick={() => scrollToSection('contact')} 
                        className={navigationMenuTriggerStyle() + " cursor-pointer"}
                      >
                        <MessageSquare className="mr-1 h-4 w-4" />
                        Contact Us
                      </div>
                    ) : (
                      <Link to="/#contact" className={navigationMenuTriggerStyle()}>
                        <MessageSquare className="mr-1 h-4 w-4" />
                        Contact Us
                      </Link>
                    )}
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
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
                    <span className="text-sm text-gray-600 dark:text-gray-400">{displayName}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => { logout(); toggleMobileMenu(); }}>
                    <LogOut className="h-4 w-4 mr-2" /> Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                {isLandingPage ? (
                  <>
                    <div 
                      onClick={() => scrollToSection('hero')} 
                      className="text-gray-700 dark:text-gray-200 hover:text-fitblue-500 transition-colors py-2 flex items-center gap-2 cursor-pointer"
                    >
                      <Home className="h-4 w-4" />
                      Home
                    </div>
                    <div 
                      onClick={() => scrollToSection('features')} 
                      className="text-gray-700 dark:text-gray-200 hover:text-fitblue-500 transition-colors py-2 flex items-center gap-2 cursor-pointer"
                    >
                      <Star className="h-4 w-4" />
                      Features
                    </div>
                    <div 
                      onClick={() => scrollToSection('about')} 
                      className="text-gray-700 dark:text-gray-200 hover:text-fitblue-500 transition-colors py-2 flex items-center gap-2 cursor-pointer"
                    >
                      <Info className="h-4 w-4" />
                      About Us
                    </div>
                    <div 
                      onClick={() => scrollToSection('contact')} 
                      className="text-gray-700 dark:text-gray-200 hover:text-fitblue-500 transition-colors py-2 flex items-center gap-2 cursor-pointer"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Contact Us
                    </div>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/" 
                      className="text-gray-700 dark:text-gray-200 hover:text-fitblue-500 transition-colors py-2 flex items-center gap-2"
                      onClick={toggleMobileMenu}
                    >
                      <Home className="h-4 w-4" />
                      Home
                    </Link>
                    <Link 
                      to="/#features" 
                      className="text-gray-700 dark:text-gray-200 hover:text-fitblue-500 transition-colors py-2 flex items-center gap-2"
                      onClick={toggleMobileMenu}
                    >
                      <Star className="h-4 w-4" />
                      Features
                    </Link>
                    <Link 
                      to="/#about" 
                      className="text-gray-700 dark:text-gray-200 hover:text-fitblue-500 transition-colors py-2 flex items-center gap-2"
                      onClick={toggleMobileMenu}
                    >
                      <Info className="h-4 w-4" />
                      About Us
                    </Link>
                    <Link 
                      to="/#contact" 
                      className="text-gray-700 dark:text-gray-200 hover:text-fitblue-500 transition-colors py-2 flex items-center gap-2"
                      onClick={toggleMobileMenu}
                    >
                      <MessageSquare className="h-4 w-4" />
                      Contact Us
                    </Link>
                  </>
                )}
                <Link to="/login" onClick={toggleMobileMenu}>
                  <Button className="w-full">Log In</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
