import { Heading, Text, Button, VStack, HStack, Link as ChakraLink, useBreakpointValue, Box } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaGithub, FaSteam } from 'react-icons/fa'
import { motion, useAnimation } from 'framer-motion'
import { useState, useEffect } from 'react'
import SlotMachineText from '../components/SlotMachineText'

const Home = () => {
  // State to track hover
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  // Responsive animation values
  const itsHiddenX = useBreakpointValue({ base: 40, md: 50, lg: 60 }) || 50;
  const itsVisibleX = useBreakpointValue({ base: 15, md: 20, lg: 25 }) || 20;
  const meVisibleX = useBreakpointValue({ base: 25, md: 30, lg: 35 }) || 30;
  
  // Create animation variants with responsive values and initial default values
  const [variants, setVariants] = useState({
    itsVariants: {
      hidden: { 
        x: 50, 
        opacity: 0,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 20
        }
      },
      visible: { 
        x: 20, 
        opacity: 1,
        transition: { 
          type: "spring", 
          stiffness: 200,
          damping: 20
        }
      }
    },
    meVariants: {
      hidden: { 
        x: 0, 
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 20
        }
      },
      visible: { 
        x: 30,
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
      itsVariants: {
        hidden: { 
          x: itsHiddenX, 
          opacity: 0,
          transition: {
            type: "spring",
            stiffness: 200,
            damping: 20
          }
        },
        visible: { 
          x: itsVisibleX, 
          opacity: 1,
          transition: { 
            type: "spring", 
            stiffness: 200,
            damping: 20
          }
        }
      },
      meVariants: {
        hidden: { 
          x: 0, 
          transition: {
            type: "spring",
            stiffness: 200,
            damping: 20
          }
        },
        visible: { 
          x: meVisibleX,
          transition: { 
            type: "spring", 
            stiffness: 200,
            damping: 20
          }
        }
      }
    });
  }, [itsHiddenX, itsVisibleX, meVisibleX]);

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

  // Split the text by periods and format with line breaks
  const bioText = `Guy. 2000-born in Seoul. 
  INTJ
  Pessimistic
I can speak English.

Seoul Gaewon Elemantary School
Seri Insan Borneo International School
Sabah Tshung Tsin Secondary School
Sayfol International School
IGCSE O & A-level examinee
University of Melbourne Graduate
Completed military service`;

  // Slot machine text arrays
  const firstWords = ["Metacognition", "Underdogma", "Hipsterism", "Curiosity", "Pessimism"];
  const lastWords = ["alive", "running", "proud", "dreaming", "objective"];

  const additionalText = `
Find me at the peak of "Mount Stupid".

Everyone else is stupid.`;

  // links
  const socialLinks = [
    { name: 'Facebook', url: 'https://www.facebook.com/jaeyoung.park.334491/', icon: FaFacebook },
    { name: 'GitHub', url: 'https://github.com/sttsspjy', icon: FaGithub },
    { name: 'Steam', url: 'https://steamcommunity.com/profiles/76561198254379003', icon: FaSteam }
  ]
  const iconSize = useBreakpointValue({ base: 20, md: 24 });

  // Animation variants for container
  const containerVariants = {
    hidden: {
      transition: { 
        staggerChildren: 0,
        delayChildren: 0
      }
    },
    visible: { 
      transition: { 
        staggerChildren: 0,
        delayChildren: 0
      }
    }
  };

  return (
    <VStack gap={12} alignItems="center" textAlign="center" w="100%">
      <Box 
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        p={2}
        position="relative"
        width="100%"
      >
        <Box 
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Heading 
            as={motion.h2}
            variants={variants.itsVariants}
            size={{ base: "xl", md: "2xl" }} 
            color="gray.800" 
            _dark={{ color: 'gray.100' }}
            position="absolute"
            right="100%"
            opacity={isHovered ? 1 : 0}
          >
            It's
          </Heading>
          <Heading 
            as={motion.h2}
            variants={variants.meVariants}
            size={{ base: "xl", md: "2xl" }} 
            color="gray.800" 
            _dark={{ color: 'gray.100' }}
          >
            Me.
          </Heading>
        </Box>
      </Box>
      <Text 
        fontSize={{ base: "13px", md: "xl" }} 
        color="gray.600" 
        _dark={{ color: 'gray.300' }} 
        maxW="10xl"
        whiteSpace="pre-line"
        textAlign="center"
        px={{ base: 0, md: 0 }}
      >
        {bioText}
      </Text>
      
      {/* Slot Machine Text */}
      <VStack spacing={1} width="100%">
        <SlotMachineText 
          firstWords={firstWords}
          lastWords={lastWords}
          staticText="keeps me"
          interval={3000}
          fontSize={{ base: "13px", md: "xl" }}
          color="gray.600"
          darkModeColor="gray.300"
        />
      </VStack>
      
      <Text 
        fontSize={{ base: "13px", md: "xl" }} 
        color="gray.600" 
        _dark={{ color: 'gray.300' }} 
        maxW="10xl"
        whiteSpace="pre-line"
        textAlign="center"
        px={{ base: 0, md: 0 }}
      >
        {additionalText}
      </Text>
      
      {/* Icons */}
      <HStack spacing={6} pt={2}>
        {socialLinks.map((social) => {
          const IconComponent = social.icon;
          return (
            <ChakraLink 
              key={social.name}
              href={social.url} 
              isExternal
              p={{ base: 2, md: 3 }}
              borderRadius="full"
              bg="gray.100"
              color="gray.600"
              _dark={{ bg: 'gray.700', color: 'gray.300' }}
              _hover={{ 
                bg: 'blue.100',
                color: 'blue.500',
                _dark: { bg: 'blue.700', color: 'blue.200' }
              }}
              transition="all 0.2s"
            >
              <IconComponent size={iconSize} />
            </ChakraLink>
          );
        })}
      </HStack>
      
      {/* Borderless button that looks like text */}
      <Link to="/about">
        <Button
          variant="link"
          colorScheme="blue"
          fontSize={{ base: "md", md: "xl" }}
          fontWeight="normal"
          _hover={{
            textDecoration: "underline"
          }}
        >
          Extras
        </Button>
      </Link>
    </VStack>
  )
}

export default Home