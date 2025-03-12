import { ChakraProvider, Box, extendTheme, ColorModeScript } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
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
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <Router basename="/myIdCard">
          <Box minH="100vh" bg="gray.50" _dark={{ bg: 'gray.900' }} width="100%">
            <Navbar />
            <Routes>
              <Route path="/" element={
                <Box py={8} px={4} width="100%" display="flex" flexDirection="column" alignItems="center">
                  {/* Heading outside the white container */}
                  <Box width="100%" textAlign="center" mb={16}>
                    <Box as="h1" fontSize="100px" fontWeight="bold" color="gray.800" _dark={{ color: 'gray.100' }}>
                      Jaeyoung Park
                    </Box>
                  </Box>
                  
                  {/* White container with the rest of the content */}
                  <Box
                    maxW="container.lg"
                    w="100%"
                    bg="white"
                    color="gray.800"
                    _dark={{ bg: 'gray.800', color: 'white' }}
                    borderRadius="xl"
                    p={12}
                    shadow="md"
                    mt={4}
                  >
                    <Home/>
                  </Box>
                </Box>
              } />
              <Route path="/about" element={
                <Box py={8} px={4} width="100%" display="flex" justifyContent="center">
                  <Box
                    maxW="container.lg"
                    w="100%"
                    bg="white"
                    color="gray.800"
                    _dark={{ bg: 'gray.800', color: 'white' }}
                    borderRadius="xl"
                    p={8}
                    shadow="md"
                    mt={4}
                  >
                    <About />
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