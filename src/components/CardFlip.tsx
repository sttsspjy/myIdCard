import { useState } from 'react';
import { Box, Button, VStack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface CardFlipProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  gradientColors: string[];
}

const CardFlip = ({ frontContent, backContent, gradientColors }: CardFlipProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Join colors for gradient
  const gradientString = gradientColors.join(', ');
  
  // Define gradient animation styles
  const gradientAnimationStyles = {
    bgGradient: `linear(to right, ${gradientString}, ${gradientColors[0]})`,
    backgroundSize: '400% 100%',
    animation: 'gradientFlow 10s linear infinite',
  };
  
  const gradientSx = {
    '@keyframes gradientFlow': {
      '0%': { backgroundPosition: '0% 0%' },
      '100%': { backgroundPosition: '400% 0%' }
    },
    '@keyframes flowGradient': {
      '0%': { backgroundPosition: '0% 50%' },
      '100%': { backgroundPosition: '400% 50%' }
    }
  };
  
  const FlipButton = () => (
    <Button
      onClick={() => setIsFlipped(prev => !prev)}
      borderRadius="xl"
      size="md"
      px={7}
      py={5}
      mt={4}
      mb={0}
      fontSize="md"
      fontWeight="bold"
      color="#27272a"
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        bgGradient: `linear(to-r, ${gradientString}, ${gradientColors[0]})`,
        backgroundSize: '400% 100%',
        animation: 'flowGradient 8s linear infinite',
      }}
      _hover={{
        transform: 'scale(1.05)',
      }}
      transition="transform 0.2s"
      sx={gradientSx}
    >
      <Text position="relative" zIndex={1}>
        Flip
      </Text>
    </Button>
  );
  
  // Create enhanced content with the button included
  const enhancedFrontContent = (
    <VStack w="100%" spacing={3} px={4} py={6}>
      {frontContent}
      <FlipButton />
    </VStack>
  );
  
  const enhancedBackContent = (
    <VStack w="100%" spacing={3} px={4} py={6}>
      {backContent}
      <FlipButton />
    </VStack>
  );
  
  return (
    <Box w="100%" position="relative">
      {/* Card container */}
      <Box
        position="relative"
        w="100%"
        style={{ perspective: '1500px' }}
      >
        {/* Front of card with gradient border */}
        <Box
          as={motion.div}
          position="relative"
          w="100%"
          display={isFlipped ? "none" : "block"}
          borderRadius="xl"
          padding="4px" // Thicker border
          {...gradientAnimationStyles}
          sx={gradientSx}
          animate={{
            rotateY: isFlipped ? 180 : 0
          }}
          style={{ 
            transformStyle: 'preserve-3d',
            transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            backfaceVisibility: 'hidden'
          }}
        >
          {/* Inner content box */}
          <Box
            w="100%"
            bg="white"
            color="gray.800"
            _dark={{ bg: 'gray.800', color: 'white' }}
            borderRadius="lg"
            p={6}
          >
            {enhancedFrontContent}
          </Box>
        </Box>
        
        {/* Back of card with gradient border */}
        <Box
          as={motion.div}
          position="relative"
          w="100%"
          display={isFlipped ? "block" : "none"}
          borderRadius="xl"
          padding="4px" // Thicker border
          {...gradientAnimationStyles}
          sx={gradientSx}
          initial={{ rotateY: 180 }}
          animate={{
            rotateY: isFlipped ? 0 : 180
          }}
          style={{ 
            transformStyle: 'preserve-3d',
            transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            backfaceVisibility: 'hidden'
          }}
        >
          {/* Inner content box */}
          <Box
            w="100%"
            bg="white"
            color="gray.800"
            _dark={{ bg: 'gray.800', color: 'white' }}
            borderRadius="lg"
            p={6}
          >
            {enhancedBackContent}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CardFlip; 