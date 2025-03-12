import { Heading, Text, Button, VStack, HStack, Link as ChakraLink, useBreakpointValue } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaGithub, FaSteam } from 'react-icons/fa'

const Home = () => {
  // Split the text by periods and format with line breaks
  const bioText = `Guy. 2000-born in Seoul. 
  INTJ
Reads and speaks decent English
Pessimistic. 

5 years at Seoul Gaewon Elemantary School
1 year at Seri Insan Borneo International School
2 years at Sabah Tsung Tsin Secondary School
5 years at Sayfol International School
IGCSE O & A-level participant
Bachelor of Science at University of Melbourne
Completed military service

Metacognition keeps me alive, 
Underdogma keeps me running,
Hipsterism keeps me proud.

Find me at the peak of "Mount Stupid".

Everyone else is stupid.`

  // Social media links with icons
  const socialLinks = [
    { name: 'Facebook', url: 'https://www.facebook.com/jaeyoung.park.334491/', icon: FaFacebook },
    { name: 'GitHub', url: 'https://github.com/sttsspjy', icon: FaGithub },
    { name: 'Steam', url: 'https://steamcommunity.com/profiles/76561198254379003', icon: FaSteam }
  ]
  const iconSize = useBreakpointValue({ base: 20, md: 24 });

  return (
    <VStack gap={12} alignItems="center" textAlign="center" w="100%">
      <Heading size={{ base: "xl", md: "2xl" }} color="gray.800" _dark={{ color: 'gray.100' }}>
        Me.
      </Heading>
      <Text 
        fontSize={{ base: "13px", md: "2xl" }} 
        color="gray.600" 
        _dark={{ color: 'gray.300' }} 
        maxW="10xl"
        whiteSpace="pre-line"
        textAlign="center"
        px={{ base: 0, md: 0 }}
      >
        {bioText}
      </Text>
      
      {/* Social Media Icons */}
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