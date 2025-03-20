import { ChakraProvider, Box, extendTheme, ColorModeScript } from '@chakra-ui/react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useCallback } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CardFlip from './components/CardFlip'
import CardBack from './components/CardBack'
import GradientTypewriter from './components/GradientTypewriter'
import ParticleBackground from './components/ParticleBackground'
import './App.css'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
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
        overflow: 'hidden', // Prevent scrollbar issues with particles
      }
    }
  }
})

function App() {
  const [isNameClicked, setIsNameClicked] = useState(false);
  
  const bioTextLength = 300; // Approximate length of bio text
  const typingSpeed = 45; // Milliseconds per character for bio typing (increased from 30)
  const estimatedBioTypingTime = (bioTextLength * typingSpeed) / 1000; // Convert to seconds
  
  // Use useCallback to prevent unnecessary re-renders
  const handleNameClick = useCallback(() => {
    setIsNameClicked(true);
  }, []);
  
  // Shoutouts text for card back
  const shoutOuts = `Friends and family.
  React, Chakra UI, Cursor.`;
  
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <Router>
          {/* Particle Background - positioned beneath everything */}
          <ParticleBackground />
          
          {/* Main content */}
          <Box 
            minH="100vh" 
            width="100%" 
            className="content-layer"
            bg="transparent"
            _dark={{ bg: 'transparent' }}
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
                      initialColor="gray.300"
                      darkModeInitialColor="gray.500"
                      gradientColors={[
                        "#F9E79F", // darker yellow
                        "#F5B7B1", // darker pink
                        "#85C1E9", // darker skyblue
                        "#C39BD3"  // darker purple
                      ]}
                      darkGradientColors={[
                        "#FFF7B3", // light yellow
                        "#FFE4E1", // light pink
                        "#B3E5FC", // light skyblue
                        "#E1BEE7"  // light purple
                      ]}
                      onClick={handleNameClick}
                      showHint={!isNameClicked}
                      fillDuration={estimatedBioTypingTime}
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
      </ChakraProvider>
    </>
  )
}

export default App