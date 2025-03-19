import { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';

interface TypewriterTextProps {
  text: string;
  fontSize?: any;
  fontWeight?: string;
  color?: string;
  darkModeColor?: string;
}

const TypewriterText = ({
  text,
  fontSize = { base: "40px", md: "100px" },
  fontWeight = "bold",
  color = "gray.800",
  darkModeColor = "gray.100"
}: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [, setIsTypingComplete] = useState(false);

  // Start typing animation when component mounts
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 1000);

    return () => clearInterval(typingInterval);
  }, [text]);

  return (
    <Box 
      position="relative" 
      width="100%" 
      textAlign="center" 
      display="flex" 
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
    >
      <Box 
        as="span"
        fontSize={fontSize}
        fontWeight={fontWeight}
        color={color}
        _dark={{ color: darkModeColor }}
        position="relative"
        whiteSpace="nowrap"
      >
        {displayText}
      </Box>
    </Box>
  );
};

export default TypewriterText; 