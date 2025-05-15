import { Heading, VStack, HStack, Link as ChakraLink, useBreakpointValue, Box } from '@chakra-ui/react'
import { FaFacebook, FaGithub, FaSteam } from 'react-icons/fa'
import TypewriterBio from '../components/TypewriterBio'

const Home = ({ isNameClicked = false }) => {
  // Split the text by periods and format with line breaks
  const bioText = `Guy. 2000-born in Seoul.
  182cm
  INTJ
I can speak English.

Seoul Gaewon Elemantary School
Seri Insan Borneo School
Sabah Tshung Tsin Secondary School
Sayfol International School
IGCSE O & A-level examinee
University of Melbourne Graduate
Completed military service`;

  // Slot machine text arrays
  const firstWords = ["Metacognition", "Underdogma", "Hipsterism", "Curiosity", "Pessimism"];
  const lastWords = ["alive", "running", "proud", "dreaming", "objective"];

  const additionalText = `Find me at the peak of "Mount Stupid".`;

  // links
  const socialLinks = [
    { name: 'Facebook', url: 'https://www.facebook.com/jaeyoung.park.334491/', icon: FaFacebook },
    { name: 'GitHub', url: 'https://github.com/sttsspjy', icon: FaGithub },
    { name: 'Steam', url: 'https://steamcommunity.com/profiles/76561198254379003', icon: FaSteam }
  ]
  const iconSize = useBreakpointValue({ base: 28, md: 40 });

  return (
    <VStack gap={8} alignItems="center" textAlign="center" w="100%" pt={2} pb={4} px={0}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={2}
        position="relative"
        width="100%"
      >
        <Heading
          size={{ base: "xl", md: "2xl" }}
          color="white"
        >
          Me.
        </Heading>
      </Box>
      
      {/* TypewriterBio component */}
      <TypewriterBio
        bioText={bioText}
        additionalText={additionalText}
        firstWords={firstWords}
        lastWords={lastWords}
        typingSpeed={40}
        isActive={isNameClicked}
      />
      
      {/* Icons - only show when bio is active */}
      <HStack 
        spacing={5} 
        opacity={isNameClicked ? 1 : 0}
        transition="opacity 0.5s ease-in"
        transitionDelay="2s"
      >
        {socialLinks.map((social) => {
          const IconComponent = social.icon;
          return (
            <ChakraLink 
              key={social.name}
              href={social.url} 
              isExternal
              borderRadius="full"
              bg="rgba(255, 255, 255, 0.1)"
              color="rgba(255, 255, 255, 0.8)"
              _hover={{ 
                bg: 'rgba(79, 209, 255, 0.2)',
                color: 'rgba(255, 255, 255, 1)'
              }}
              transition="all 0.2s"
            >
              <IconComponent size={iconSize} />
            </ChakraLink>
          );
        })}
      </HStack>
    </VStack>
  )
}

export default Home