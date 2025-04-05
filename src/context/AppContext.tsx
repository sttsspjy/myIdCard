import React, { createContext, useState, useContext } from 'react';

interface AppContextType {
  particlesEnabled: boolean;
  toggleParticles: () => void;
}

// Create the context with default values
const AppContext = createContext<AppContextType>({
  particlesEnabled: true,
  toggleParticles: () => {},
});

// Custom hook to use the AppContext
export const useAppContext = () => useContext(AppContext);

// Provider component that wraps the app
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [particlesEnabled, setParticlesEnabled] = useState(true);
  
  const toggleParticles = () => {
    setParticlesEnabled(prev => !prev);
  };
  
  // Value object that will be passed to consuming components
  const value = {
    particlesEnabled,
    toggleParticles,
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext; 