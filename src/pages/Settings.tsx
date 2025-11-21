
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { PinIcon, TrashIcon, MoonIcon, SunIcon } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [pinnedAnalyses, setPinnedAnalyses] = useState<any[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Load pinned analyses from localStorage
    const pinned = JSON.parse(localStorage.getItem('pinnedAnalyses') || '[]');
    setPinnedAnalyses(pinned);
    
    // Check theme preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [navigate]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    toast({
      title: `${newDarkMode ? 'Dark' : 'Light'} mode activated`,
      description: `The application is now in ${newDarkMode ? 'dark' : 'light'} mode.`,
    });
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    toast({
      title: `Notifications ${!notificationsEnabled ? 'enabled' : 'disabled'}`,
      description: `You will ${!notificationsEnabled ? 'now' : 'no longer'} receive notifications.`,
    });
  };

  const removePinnedAnalysis = (id: number) => {
    const updatedPinned = pinnedAnalyses.filter(analysis => analysis.id !== id);
    setPinnedAnalyses(updatedPinned);
    localStorage.setItem('pinnedAnalyses', JSON.stringify(updatedPinned));
    
    toast({
      title: "Analysis unpinned",
      description: "The analysis has been removed from your pinned items.",
    });
  };

  const viewAnalysis = (analysisId: number) => {
    // In a real app, this would navigate to a detailed view of the analysis
    // For now, just show a toast
    toast({
      title: "Viewing Analysis",
      description: `Opening analysis ID: ${analysisId}`,
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 dark:text-gray-100">Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - App Settings */}
        <div className="lg:col-span-1">
          <Card className="shadow-md h-full">
            <CardHeader>
              <CardTitle>App Settings</CardTitle>
              <CardDescription>Customize your application experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="dark-mode" className="font-medium">Dark Mode</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Switch between light and dark theme
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <SunIcon className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-yellow-500'}`} />
                  <Switch 
                    id="dark-mode" 
                    checked={darkMode} 
                    onCheckedChange={toggleDarkMode} 
                  />
                  <MoonIcon className={`h-4 w-4 ${darkMode ? 'text-blue-400' : 'text-gray-400'}`} />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="notifications" className="font-medium">Notifications</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Get alerts for important updates
                  </p>
                </div>
                <Switch 
                  id="notifications" 
                  checked={notificationsEnabled} 
                  onCheckedChange={toggleNotifications} 
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right column - Pinned Analyses */}
        <div className="lg:col-span-2">
          <Card className="shadow-md h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PinIcon className="h-5 w-5 mr-2 text-cyan-600" />
                Pinned Analyses
              </CardTitle>
              <CardDescription>
                Easily access your pinned medication analyses
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pinnedAnalyses.length > 0 ? (
                <div className="space-y-4">
                  {pinnedAnalyses.map((analysis) => (
                    <div 
                      key={analysis.id} 
                      className="flex items-center justify-between p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg border border-cyan-100 dark:border-cyan-800"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium dark:text-gray-100">
                          {analysis.date} - {analysis.medications.map(m => m.name).join(', ')}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Risk Level: <span className={`font-medium ${
                            analysis.riskCategory === 'High' ? 'text-red-500' : 
                            analysis.riskCategory === 'Moderate' ? 'text-yellow-500' : 'text-green-500'
                          }`}>{analysis.riskCategory}</span>
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => viewAnalysis(analysis.id)}
                          className="text-cyan-600 border-cyan-200 dark:border-cyan-700 dark:text-cyan-400"
                        >
                          View
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removePinnedAnalysis(analysis.id)}
                        >
                          <TrashIcon className="h-4 w-4 text-gray-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                  <PinIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>No pinned analyses yet.</p>
                  <p className="text-sm mt-2">After completing an analysis, you can pin it for easy access.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
