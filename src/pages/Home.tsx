import { Heading, Text, Button, VStack, HStack, Link as ChakraLink } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaGithub, FaSteam } from 'react-icons/fa'

const Home = () => {
  // Split the text by periods and format with line breaks
  const bioText = `Guy. 2000-born in Seoul. 
  INTJ
Reads and speaks decent English
Pessimistic. 

5 years at Seoul Gaewon Elemantary School, Korea
1 year at Seri Insan Borneo International School, Malaysia
2 years at Sabah Tsung Tsin Secondary School, Malaysia
5 years at Sayfol International School, Malaysia
IGCSE O & A-level participant
Graduated with Bachelor of Science at University of Melbourne, Australia
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

  return (
    <VStack gap={12} alignItems="center" textAlign="center" w="100%">
      <Heading size="2xl" color="gray.800" _dark={{ color: 'gray.100' }}>
        Me.
      </Heading>
      <Text 
        fontSize="2xl" 
        color="gray.600" 
        _dark={{ color: 'gray.300' }} 
        maxW="5xl"
        whiteSpace="pre-line"
        textAlign="center"
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
              p={3}
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
              <IconComponent size={24} />
            </ChakraLink>
          );
        })}
      </HStack>
      
      {/* Borderless button that looks like text */}
      <Link to="/about">
        <Button
          variant="link"
          colorScheme="blue"
          fontSize="xl"
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