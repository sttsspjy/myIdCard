import { ChakraProvider, Box, extendTheme } from '@chakra-ui/react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useCallback } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CardFlip from './components/CardFlip'
import CardBack from './components/CardBack'
import GradientTypewriter from './components/GradientTypewriter'
import ParticleBackground from './components/ParticleBackground'
import { AppProvider } from './context/AppContext'
import './App.css'

const theme = extendTheme({
  fonts: {
    heading: '"Roboto", sans-serif',
    body: '"Roboto", sans-serif',
  },
  colors: {
    gray: {
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
    }
  },
  styles: {
    global: {
      body: {
        overflowX: 'hidden',
        bg: '#000000'
      }
    }
  }
})

function App() {
  const [isNameClicked, setIsNameClicked] = useState(false);
  
  const bioTextLength = 300;
  const typingSpeed = 45; 
  const bioTypingTime = (bioTextLength * typingSpeed) / 1000;
  
  // Use useCallback to prevent unnecessary re-renders
  const handleNameClick = useCallback(() => {
    setIsNameClicked(true);
  }, []);
  
  // Shoutouts text for card back
  const shoutOuts = `React, Chakra UI, Cursor.`;
  
  return (
    <>
      <ChakraProvider theme={theme}>
        <AppProvider>
          <Router>
            {/* Particle Background - positioned beneath everything */}
            <ParticleBackground />
            
            {/* Main content */}
            <Box 
              minH="100vh" 
              width="100%" 
              className="content-layer"
              bg="transparent"
            >
              {/* Navbar with higher z-index */}
              <Box className="navbar-layer">
                <Navbar />
              </Box>
              
              <Routes>
                <Route path="/" element={
                  <Box 
                    py={8} 
                    px={4} 
                    width="100%" 
                    display="flex" 
                    flexDirection="column" 
                    alignItems="center"
                    className="main-content"
                  >
                    {/* Heading outside the white container */}
                    <Box 
                      width="100%" 
                      textAlign="center" 
                      mb={16} 
                      className="header-content"
                    >
                      <GradientTypewriter 
                        text="Jaeyoung Park" 
                        typingSpeed={150}
                        fontSize={{ base: "40px", md: "100px" }}
                        fontWeight="bold"
                        initialColor="#000000"
                        gradientColors={[
                          "#FFF7B3", // light yellow
                          "#FFE4E1", // light pink
                          "#B3E5FC", // light skyblue
                          "#E1BEE7"  // light purple
                        ]}
                        onClick={handleNameClick}
                        fillDuration={bioTypingTime}
                        flowDuration={15}
                      />
                    </Box>
                    
                    {/* Content container */}
                    <Box
                      maxW="container.lg"
                      mx="auto"
                      className="main-content"
                    >
                      <CardFlip 
                        frontContent={<Home isNameClicked={isNameClicked} />}
                        backContent={<CardBack shoutOuts={shoutOuts} />}
                        gradientColors={["#FFF7B3", "#FFE4E1", "#B3E5FC", "#E1BEE7"]}
                      />
                    </Box>
                  </Box>
                } />
              </Routes>
            </Box>
          </Router>
        </AppProvider>
      </ChakraProvider>
    </>
  )
}

export default App