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
        borderColor="rgba(255, 255, 255, 0.3)"
        filter="drop-shadow(0 0 8px rgba(255, 255, 255, 0.2))"
      />
      
      <VStack align="center" spacing={4} w="100%">
        <Heading 
          size={{ base: "lg", md: "xl" }} 
          color="white"
        >
          Ref.
        </Heading>
        
        <Text 
          fontSize={{ base: "md", md: "lg" }} 
          color="rgba(255, 255, 255, 0.9)"
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