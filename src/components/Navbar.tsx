import { Box, Flex, Link as ChakraLink, Spacer, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/color-mode'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react'

const Navbar = () => {
  const iconSize = useBreakpointValue({ base: "sm", md: "md" });
  const { colorMode, toggleColorMode } = useColorMode()
  const musicLink = 'https://www.youtube.com/watch?v=mRsUPoFtUtA'
  
  // State for typing animation
  const [displayText, setDisplayText] = useState('');
  const fullText = "Nice to meet you.";
  const typingSpeed = 100; // ms per character
  
  // Start typing animation when component mounts
  useEffect(() => {
    let currentIndex = 0;
    // Add a small delay before starting the typing animation
    const initialDelay = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setDisplayText(fullText.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, typingSpeed);
      
      return () => clearInterval(typingInterval);
    }, 1000); // 1 second delay before typing starts
    
    return () => clearTimeout(initialDelay);
  }, []);
  
  return (
    <Box bg="white" _dark={{ bg: 'gray.900' }} px={4} shadow="sm">
      <Flex h={16} alignItems="center" maxW="container.xl" mx="auto">
        <Box 
          display="flex"
          alignItems="center"
          position="relative"
        >
          <ChakraLink 
            href={musicLink} 
            isExternal 
            fontSize={{ base: "xl", md: "2xl" }} 
            fontWeight="bold" 
            color="gray.800" 
            _dark={{ color: 'gray.100' }}
            _hover={{ textDecoration: 'none' }}
            display="inline-block"
          >
            Hi.
          </ChakraLink>
          <Box
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="bold"
            color="gray.800"
            _dark={{ color: 'gray.100' }}
            position="absolute"
            left="100%"
            whiteSpace="nowrap"
            ml={1}
          >
            {displayText}
          </Box>
        </Box>
        <Spacer />
        <Flex alignItems="center">
          <IconButton
            aria-label="Toggle dark mode"
            as={colorMode === 'dark' ? SunIcon : MoonIcon}
            onClick={toggleColorMode}
            size={iconSize}
            variant="ghost"
          />
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar