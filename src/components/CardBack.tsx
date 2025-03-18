import { VStack, Heading, Text, Image } from '@chakra-ui/react';
// Import the icon image
import iconImage from '../assets/QR.png';

interface CardBackProps {
  shoutOuts: string;
}

const CardBack = ({ shoutOuts }: CardBackProps) => {
  return (
    <VStack spacing={8} align="center" h="100%" p={0}>
      <Image 
        src={iconImage} 
        boxSize="180px"
        borderRadius="md" 
        objectFit="cover"
        border="2px solid"
        borderColor="gray.200"
        _dark={{ borderColor: 'gray.600' }}
      />
      
      <VStack align="center" spacing={4} w="100%">
        <Heading 
          size={{ base: "lg", md: "xl" }} 
          color="gray.800" 
          _dark={{ color: 'gray.100' }}
        >
          Shoutouts
        </Heading>
        
        <Text 
          fontSize={{ base: "md", md: "lg" }} 
          color="gray.600" 
          _dark={{ color: 'gray.300' }}
          whiteSpace="pre-line"
          textAlign="center"
        >
          {shoutOuts}
        </Text>
      </VStack>
    </VStack>
  );
};

export default CardBack; 