import { useState, useEffect } from 'react';
import ThemeSwitcher from './components/ThemeSwitcher';
import Sidebar from './components/Sidebar';
import SearchHeader from './components/SearchHeader';
import RecentWins from './components/RecentWins';
import NewsSignals from './components/NewsSignals';
import ValueProps from './components/ValueProps';
import EntityProfile from './components/EntityProfile';
import ContractModal from './components/ContractModal';
import TrustSection from './components/TrustSection';
import Pricing from './components/Pricing';
import { Contract, Entity } from './types';
import { mockContracts } from './data/mockData';


function App() {
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [selectedEntity] = useState<Entity | null>(null);
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

  const handleContractClick = (contractId: string) => {
    const contract = mockContracts.find((c) => c.id === contractId);
    if (contract) {
      setSelectedContract(contract);
    }
  };

  const handleCloseModal = () => {
    setSelectedContract(null);
  };

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
      <Sidebar />
      
      <div className="flex-1 ml-20 lg:ml-72">
        <main>
          <section id="dashboard">
            <SearchHeader />
            <TrustSection />
          </section>

          <section id="recent-wins">
            <RecentWins />
          </section>

          <section id="news-signals">
            <NewsSignals />
          </section>

          <section id="value-props">
            <ValueProps />
          </section>


          <section id="pricing">
            <Pricing />
          </section>

          <section id="entities">
            <EntityProfile
              entity={selectedEntity}
              onContractClick={handleContractClick}
            />
          </section>
        </main>

        <footer className={`border-t py-12 transition-colors duration-300 ${
          currentTheme === 'dark'
            ? 'bg-gray-800 border-gray-700'
            : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="w-full px-4">
            <div className={`text-center text-sm space-y-4 transition-colors duration-300 ${
              currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <div className="flex justify-center gap-6">
                <a href="#about" className={`hover:text-blue-600 transition-colors duration-200 ${
                  currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>About</a>
                <a href="#contact" className={`hover:text-blue-600 transition-colors duration-200 ${
                  currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>Contact</a>
                <a href="#privacy" className={`hover:text-blue-600 transition-colors duration-200 ${
                  currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>Privacy Policy</a>
                <a href="#terms" className={`hover:text-blue-600 transition-colors duration-200 ${
                  currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>Terms</a>
                <a href="#linkedin" className={`hover:text-blue-600 transition-colors duration-200 ${
                  currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>LinkedIn</a>
                <a href="#twitter" className={`hover:text-blue-600 transition-colors duration-200 ${
                  currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>X</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
      
      <ContractModal contract={selectedContract} onClose={handleCloseModal} />
    </div>
  );
}

export default App;