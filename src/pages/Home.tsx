import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartBar, ChartLine, Clock, User, Sun, Moon } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // theme state (persisted)
  const [isDark, setIsDark] = useState<boolean>(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    setIsLoggedIn(!!userJson);
  }, []);

  // apply theme to document element so Tailwind dark: classes work
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const handleLogout = () => {
    // remove auth and optional local profile copies
    const userJson = localStorage.getItem("user");
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        localStorage.removeItem(`userProfile_${user.email}`);
      } catch { }
    }
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="animate-fade-in">
      {/* Theme toggle (non-structural, positioned over page) */}
      <div className="fixed top-4 right-4 z-50">
        <button
          aria-label="Toggle theme"
          onClick={() => setIsDark(d => !d)}
          className="p-2 rounded-md shadow-sm bg-medical-100 text-medical-800 dark:bg-gray-800 dark:text-medical-100"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>

      <section className="bg-gradient-to-r from-medical-300 to-medical-100 py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-10">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-800 dark:text-gray-100 mb-6 leading-tight">
                Safe Medication Management. <span className="text-medical-600 dark:text-medical-300">Better Health.</span>
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                MedSafety helps predict and prevent medication overdose through advanced analysis and personalized recommendations.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button asChild size="lg">
                  <Link to="/signup">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/login">Log In</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&q=75&fit=crop&w=600"
                alt="Medication Safety"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-heading font-bold text-center mb-12 text-gray-900 dark:text-gray-100">How MedSafety Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="shadow-md card-hover bg-white dark:bg-gray-800 p-6 rounded-lg">
              <div className="rounded-full bg-medical-100 dark:bg-medical-800 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <User className="h-6 w-6 text-medical-600 dark:text-medical-200" />
              </div>
              <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-gray-100">1. Enter Patient Data</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Provide basic medical information and current medications for accurate analysis.
              </p>
            </div>

            <div className="shadow-md card-hover bg-white dark:bg-gray-800 p-6 rounded-lg">
              <div className="rounded-full bg-medical-100 dark:bg-medical-800 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <ChartLine className="h-6 w-6 text-medical-600 dark:text-medical-200" />
              </div>
              <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-gray-100">2. Review Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our system analyzes medication interactions and identifies potential overdose risks.
              </p>
            </div>

            <div className="shadow-md card-hover bg-white dark:bg-gray-800 p-6 rounded-lg">
              <div className="rounded-full bg-medical-100 dark:bg-medical-800 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <ChartBar className="h-6 w-6 text-medical-600 dark:text-medical-200" />
              </div>
              <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-gray-100">3. Get Recommendations</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Receive personalized guidance to ensure safe medication usage and prevent adverse effects.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-medical-100/50 dark:bg-transparent">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-heading font-bold text-center mb-12 text-gray-900 dark:text-gray-100">Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex bg-white dark:bg-gray-800 p-6 rounded-lg">
              <div className="mr-4">
                <div className="rounded-full bg-medical-300 dark:bg-medical-800 p-3 w-12 h-12 flex items-center justify-center">
                  <ChartBar className="h-6 w-6 text-medical-600 dark:text-medical-200" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-gray-100">Risk Visualization</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Clear charts and graphs help you understand potential medication risks and interactions.
                </p>
              </div>
            </div>

            <div className="flex bg-white dark:bg-gray-800 p-6 rounded-lg">
              <div className="mr-4">
                <div className="rounded-full bg-medical-300 dark:bg-medical-800 p-3 w-12 h-12 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-medical-600 dark:text-medical-200" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-gray-100">Real-time Analysis</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get immediate feedback on medication safety without waiting for appointments.
                </p>
              </div>
            </div>

            <div className="flex bg-white dark:bg-gray-800 p-6 rounded-lg">
              <div className="mr-4">
                <div className="rounded-full bg-medical-300 dark:bg-medical-800 p-3 w-12 h-12 flex items-center justify-center">
                  <User className="h-6 w-6 text-medical-600 dark:text-medical-200" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-gray-100">Personalized Guidance</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Custom recommendations based on your specific medical profile and needs.
                </p>
              </div>
            </div>

            <div className="flex bg-white dark:bg-gray-800 p-6 rounded-lg">
              <div className="mr-4">
                <div className="rounded-full bg-medical-300 dark:bg-medical-800 p-3 w-12 h-12 flex items-center justify-center">
                  <ChartLine className="h-6 w-6 text-medical-600 dark:text-medical-200" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-gray-100">Progress Tracking</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Monitor medication safety over time with tracked results and adjustments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-4 dark:bg-gray-900">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">Ready to ensure your medication safety?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Sign up today and get personalized insights into your medication regimen.
          </p>
          <Button asChild size="lg">
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      </section>

      <footer className="bg-gray-800 dark:bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-100">MedSafety</h3>
              <p className="text-gray-300">
                Advanced medication overdose prediction and prevention through data-driven analysis.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-gray-100">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
                <li><Link to="/login" className="text-gray-300 hover:text-white">Log In</Link></li>
                <li><Link to="/signup" className="text-gray-300 hover:text-white">Sign Up</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-gray-100">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
                <li><Link to="#" className="text-gray-300 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} MedSafety. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
