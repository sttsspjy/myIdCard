import { Box, Flex, Link as ChakraLink, Spacer, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/color-mode'
import { Link as RouterLink } from 'react-router-dom'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { motion, useAnimation } from 'framer-motion'
import { useState, useEffect } from 'react'

const Navbar = () => {
  const iconSize = useBreakpointValue({ base: "sm", md: "md" });
  const { colorMode, toggleColorMode } = useColorMode()
  const musicLink = 'https://www.youtube.com/watch?v=mRsUPoFtUtA'
  
  // State to track hover
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  // Responsive animation values
  const niceHiddenX = useBreakpointValue({ base: -20, md: -30, lg: -40 }) || -30;
  const niceVisibleX = useBreakpointValue({ base: 10, md: 15, lg: 20 }) || 15;
  
  // Create animation variants with responsive values and initial default values
  const [variants, setVariants] = useState({
    niceVariants: {
      hidden: { 
        x: -30, 
        opacity: 0,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 20
        }
      },
      visible: { 
        x: 15, 
        opacity: 1,
        transition: { 
          type: "spring", 
          stiffness: 200,
          damping: 20
        }
      }
    }
  });
  
  // Update variants when breakpoint values change
  useEffect(() => {
    setVariants({
      niceVariants: {
        hidden: { 
          x: niceHiddenX, 
          opacity: 0,
          transition: {
            type: "spring",
            stiffness: 200,
            damping: 20
          }
        },
        visible: { 
          x: niceVisibleX, 
          opacity: 1,
          transition: { 
            type: "spring", 
            stiffness: 200,
            damping: 20
          }
        }
      }
    });
  }, [niceHiddenX, niceVisibleX]);

  // Ensure animation starts in hidden state
  useEffect(() => {
    controls.start("hidden");
  }, [controls]);

  // Handle hover events
  const handleHoverStart = () => {
    setIsHovered(true);
    controls.start("visible");
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    controls.start("hidden");
  };
  
  return (
    <Box bg="white" _dark={{ bg: 'gray.900' }} px={4} shadow="sm">
      <Flex h={16} alignItems="center" maxW="container.xl" mx="auto">
        <Box 
          display="flex"
          alignItems="center"
          cursor="pointer"
          position="relative"
          onMouseEnter={handleHoverStart}
          onMouseLeave={handleHoverEnd}
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
            as={motion.div}
            animate={controls}
            variants={variants.niceVariants}
            initial="hidden"
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="bold"
            color="gray.800"
            _dark={{ color: 'gray.300' }}
            position="absolute"
            left="100%"
            whiteSpace="nowrap"
            opacity={isHovered ? 1 : 0}
            ml={1}
          >
            Nice to meet you.
          </Box>
        </Box>
        <Spacer />
        <Flex gap={8} alignItems="center">
          <RouterLink to="/">
            <ChakraLink color="gray.600" _dark={{ color: 'gray.300' }} _hover={{ color: 'black' }}>
              Home
            </ChakraLink>
          </RouterLink>
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