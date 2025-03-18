import { ChakraProvider, Box, extendTheme, ColorModeScript } from '@chakra-ui/react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useCallback } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CardFlip from './components/CardFlip'
import CardBack from './components/CardBack'
import GradientTypewriter from './components/GradientTypewriter'

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
  }
})

function App() {
  const [isNameClicked, setIsNameClicked] = useState(false);
  
  // Calculate an appropriate fill duration based on the bio text length
  // Assuming average bio text length and typing speed of 30ms per character
  const bioTextLength = 300; // Approximate length of bio text
  const typingSpeed = 30; // Milliseconds per character for bio typing
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
          <Box minH="100vh" bg="gray.50" _dark={{ bg: 'gray.900' }} width="100%">
            <Navbar />
            <Routes>
              <Route path="/" element={
                <Box py={8} px={4} width="100%" display="flex" flexDirection="column" alignItems="center">
                  {/* Heading outside the white container */}
                  <Box width="100%" textAlign="center" mb={16}>
                    <GradientTypewriter 
                      text="Jaeyoung Park" 
                      typingSpeed={150}
                      fontSize={{ base: "40px", md: "100px" }}
                      fontWeight="bold"
                      initialColor="#27272a"
                      darkModeInitialColor="#f4f4f5"
                      gradientColors={["#FFF7B3", "#FFE4E1", "#B3E5FC", "#E1BEE7"]} // light yellow-light pink-light skyblue-light purple
                      onClick={handleNameClick}
                      showHint={!isNameClicked}
                      fillDuration={estimatedBioTypingTime} // Match the bio typing duration
                    />
                  </Box>
                  
                  {/* Content container */}
                  <Box
                    maxW="container.lg"
                    mx="auto"
                    position="relative"
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