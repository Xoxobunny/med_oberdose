
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  User, 
  LogIn, 
  Settings as SettingsIcon,
  History as HistoryIcon,
  Info,
  Moon,
  Sun
} from "lucide-react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
    
    // Check dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Add event listener to check for login state changes
    const handleStorageChange = () => {
      const userCheck = localStorage.getItem("user");
      setIsLoggedIn(!!userCheck);
    };

    window.addEventListener('storage', handleStorageChange);
    // Also check regularly in case localStorage changes within the same tab
    const intervalId = setInterval(handleStorageChange, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };
  
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Force check login status when rendering
  const checkLoginStatus = () => {
    const user = localStorage.getItem("user");
    return !!user;
  };
  
  const userIsLoggedIn = checkLoginStatus();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-heading font-bold text-cyan-600 dark:text-cyan-400">MedSafety</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-6">
              <Link
                to="/"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                  location.pathname === "/"
                    ? "border-cyan-600 text-gray-900 dark:text-gray-100 dark:border-cyan-400"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
              {userIsLoggedIn && (
                <>
                  <Link
                    to="/dashboard"
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                      location.pathname === "/dashboard"
                        ? "border-cyan-600 text-gray-900 dark:text-gray-100 dark:border-cyan-400"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                  <Link
                    to="/history"
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                      location.pathname === "/history"
                        ? "border-cyan-600 text-gray-900 dark:text-gray-100 dark:border-cyan-400"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    <HistoryIcon className="mr-2 h-4 w-4" />
                    History
                  </Link>
                  <Link
                    to="/settings"
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                      location.pathname === "/settings"
                        ? "border-cyan-600 text-gray-900 dark:text-gray-100 dark:border-cyan-400"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    <SettingsIcon className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                  <Link
                    to="/profile"
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                      location.pathname === "/profile"
                        ? "border-cyan-600 text-gray-900 dark:text-gray-100 dark:border-cyan-400"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </>
              )}
              <Link
                to="/about"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                  location.pathname === "/about"
                    ? "border-cyan-600 text-gray-900 dark:text-gray-100 dark:border-cyan-400"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                <Info className="mr-2 h-4 w-4" />
                About
              </Link>
              <Link
                to="/explanation"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                  location.pathname === "/explanation"
                    ? "border-cyan-600 text-gray-900 dark:text-gray-100 dark:border-cyan-400"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                <Info className="mr-2 h-4 w-4" />
                How It Works
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-gray-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </Button>
            {userIsLoggedIn ? (
              <Button
                variant="outline"
                className="font-medium border-gray-300 dark:border-gray-600 dark:text-gray-200"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <div className="flex space-x-4">
                <Button asChild variant="ghost" className="text-gray-600 dark:text-gray-300">
                  <Link to="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Log in
                  </Link>
                </Button>
                <Button asChild className="bg-cyan-600 hover:bg-cyan-700">
                  <Link to="/signup">Sign up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
