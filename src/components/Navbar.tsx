import { Box, Flex, Link as ChakraLink, Spacer, IconButton, useBreakpointValue, 
  Menu, MenuButton, MenuList, MenuItem, Switch, Text, Tooltip, useColorMode } from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react'
import { useAppContext } from '../context/AppContext'

const Navbar = () => {
  const iconSize = useBreakpointValue({ base: "md", md: "md" });
  const { colorMode, toggleColorMode } = useColorMode();
  const { particlesEnabled, toggleParticles } = useAppContext();
  const musicLink = 'https://www.youtube.com/watch?v=mRsUPoFtUtA'
  
  const [displayText, setDisplayText] = useState('');
  const fullText = "Nice to meet you.";
  const typingSpeed = 100; // ms per character
  
  useEffect(() => {
    let currentIndex = 0;
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
          <Menu closeOnSelect={false}>
            <Tooltip label="Settings" hasArrow>
              <MenuButton
                as={IconButton}
                icon={<SettingsIcon />}
                variant="ghost"
                aria-label="Settings"
                size={iconSize}
              />
            </Tooltip>
            <MenuList minWidth="200px">
              <MenuItem closeOnSelect={false}>
                <Flex width="100%" justifyContent="space-between" alignItems="center">
                  <Text>Dark Mode</Text>
                  <Switch 
                    isChecked={colorMode === 'dark'} 
                    onChange={toggleColorMode} 
                    colorScheme="blue"
                  />
                </Flex>
              </MenuItem>
              <MenuItem closeOnSelect={false}>
                <Flex width="100%" justifyContent="space-between" alignItems="center">
                  <Text>Particles</Text>
                  <Switch 
                    isChecked={particlesEnabled} 
                    onChange={toggleParticles} 
                    colorScheme="blue"
                  />
                </Flex>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar