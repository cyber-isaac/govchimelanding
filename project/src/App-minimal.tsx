import { useState, useEffect } from 'react';
import ThemeSwitcher from './components/ThemeSwitcher';

function App() {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setCurrentTheme(savedTheme as 'light' | 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      setCurrentTheme(initialTheme);
      localStorage.setItem('theme', initialTheme);
    }
  }, []);

  const handleThemeChange = (theme: 'light' | 'dark') => {
    setCurrentTheme(theme);
  };

  return (
    <div
      className={`antialiased min-h-screen flex transition-colors duration-300 ${
        currentTheme === 'dark'
          ? 'dark bg-gray-900 text-white'
          : 'light bg-white text-gray-900'
      }`}
    >
      <ThemeSwitcher onThemeChange={handleThemeChange} />
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold">App is Loading...</h1>
        <p className="mt-4">Testing basic components</p>
      </div>
    </div>
  );
}

export default App;