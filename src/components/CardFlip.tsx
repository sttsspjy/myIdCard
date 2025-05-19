import { useState } from 'react';
import { Box, IconButton, VStack } from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

interface CardFlipProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  gradientColors: string[];
}

const CardFlip = ({ frontContent, backContent, gradientColors }: CardFlipProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const gradientString = gradientColors.join(', ');
  
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
    <Box
      position="relative"
      borderRadius="full"
      overflow="hidden"
      display="inline-block"
      mt={4}
      css={{
        '&:hover': {
          transform: 'scale(1.1)',
        },
        transition: 'transform 0.2s',
      }}
    >
      {/* Gradient background */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bgGradient={`linear(to-r, ${gradientString}, ${gradientColors[0]})`}
        backgroundSize="400% 100%"
        animation="flowGradient 16s linear infinite"
        zIndex={0}
        sx={gradientSx}
      />
      
      {/* Icon button on top */}
      <IconButton
        icon={<RepeatIcon boxSize="1.5em" />}
        onClick={() => setIsFlipped(prev => !prev)}
        aria-label="Flip card"
        borderRadius="full"
        size="lg"
        color="black"
        bg="transparent"
        zIndex={1}
        position="relative"
        _hover={{
          bg: 'transparent',
        }}
        _active={{
          bg: 'transparent',
        }}
      />
    </Box>
  );
  
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

  // Frosted glass card style
  const cardStyle = {
    background: 'rgba(15, 15, 15, 0.8)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 0 15px 2px rgba(255, 255, 255, 0.15)',
  };
  
  return (
    <Box w="100%" position="relative">
      {/* Card container */}
      <Box
        position="relative"
        w="100%"
        style={{ perspective: '1500px' }}
      >
        {/* Front of card */}
        <Box
          as={motion.div}
          position="relative"
          w="100%"
          display={isFlipped ? "none" : "block"}
          sx={gradientSx}
          animate={{
            rotateY: isFlipped ? 180 : 0
          }}
          style={{ 
            transformStyle: 'preserve-3d',
            transition: 'transform 1.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            backfaceVisibility: 'hidden',
            ...cardStyle
          }}
        >
          {/* Inner content box */}
          <Box
            w="100%"
            p={6}
          >
            {enhancedFrontContent}
          </Box>
        </Box>
        
        {/* Back of card */}
        <Box
          as={motion.div}
          position="relative"
          w="100%"
          display={isFlipped ? "block" : "none"}
          sx={gradientSx}
          initial={{ rotateY: 180 }}
          animate={{
            rotateY: isFlipped ? 0 : 180
          }}
          style={{ 
            transformStyle: 'preserve-3d',
            transition: 'transform 1.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            backfaceVisibility: 'hidden',
            ...cardStyle
          }}
        >
          {/* Inner content box */}
          <Box
            w="100%"
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