import { useState, useEffect } from 'react';
import { Box, useBreakpointValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  typingSpeed?: number;
  cursorBlinkSpeed?: number;
  fontSize?: any;
  fontWeight?: string;
  color?: string;
  darkModeColor?: string;
}

const TypewriterText = ({
  text,
  typingSpeed = 150,
  cursorBlinkSpeed = 500,
  fontSize = { base: "40px", md: "100px" },
  fontWeight = "bold",
  color = "gray.800",
  darkModeColor = "gray.100"
}: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
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
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [text, typingSpeed]);

  // Blink cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, cursorBlinkSpeed);

    return () => clearInterval(cursorInterval);
  }, [cursorBlinkSpeed]);

  // Calculate text width for centering
  //const textLength = displayText.length;
  //const fullTextLength = text.length;
  //const progress = textLength / fullTextLength;

  // Responsive cursor size
  const cursorHeight = useBreakpointValue({ base: "40px", md: "80px" }) || "40px";
  const cursorWidth = useBreakpointValue({ base: "3px", md: "5px" }) || "3px";

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
        <Box
          as={motion.span}
          display="inline-block"
          height={cursorHeight}
          width={cursorWidth}
          bg={color}
          _dark={{ bg: darkModeColor }}
          ml="2px"
          position="relative"
          top="10px"
          animate={{ opacity: showCursor ? 1 : 0 }}
          transition={{ duration: 0.1 } as any}
        />
      </Box>
    </Box>
  );
};

export default TypewriterText; 