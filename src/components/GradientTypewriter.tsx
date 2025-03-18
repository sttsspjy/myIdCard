import { useState, useEffect, useRef } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';

interface GradientTypewriterProps {
  text: string;
  typingSpeed?: number;
  fontSize?: any;
  fontWeight?: string;
  initialColor?: string;
  gradientColors?: string[];
  darkModeInitialColor?: string;
  darkModegradientColors?: string[];
  onClick?: () => void;
  showHint?: boolean;
  fillDuration?: number;
}

const GradientTypewriter = ({
  text,
  typingSpeed = 150,
  fontSize = { base: "40px", md: "100px" },
  fontWeight = "bold",
  initialColor = "gray.800",
  gradientColors = ["#FFF7B3", "#FFE4E1", "#B3E5FC", "#E1BEE7"], // light yellow-light pink-light skyblue-light purple
  darkModeInitialColor = "gray.100",
  darkModegradientColors = ["#FFF7B3", "#FFE4E1", "#B3E5FC", "#E1BEE7"], // same for dark mode
  onClick,
  showHint = true,
  fillDuration = 8 // Default to 8 seconds for the fill animation
}: GradientTypewriterProps) => {
  const [displayText, setDisplayText] = useState(text); // Initialize with full text to prevent retyping
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isGradientAnimating, setIsGradientAnimating] = useState(false);
  const [, setIsFlowing] = useState(false);
  const [showTapHint, setShowTapHint] = useState(showHint);
  const [, setIsHovered] = useState(false);
  const controls = useAnimation();
  const flowControls = useAnimation();
  const hintControls = useAnimation();
  const glowControls = useAnimation();
  const textRef = useRef<HTMLDivElement>(null);
  const isDarkMode = document.documentElement.classList.contains('chakra-ui-dark');
  const hasTypedRef = useRef(false); // Ref to track if typing has occurred

  // Start typing animation when component mounts, but only once
  useEffect(() => {
    // Skip typing if it's already been done
    if (hasTypedRef.current) {
      setIsTypingComplete(true);
      if (showHint) {
        // Make hint text more visible with stronger animation
        hintControls.start({
          opacity: [0.7, 1],
          scale: [1, 1.05, 1],
          transition: {
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }
        });
      }
      return;
    }

    // Start with empty text
    setDisplayText('');
    
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
        hasTypedRef.current = true; // Mark typing as completed
        
        // Start hint animation when typing is complete with stronger animation
        if (showHint) {
          hintControls.start({
            opacity: [0.7, 1],
            scale: [1, 1.05, 1],
            transition: {
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }
          });
        }
        
        // Start subtle glow animation
        startGlowAnimation();
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [text, typingSpeed, showHint, hintControls]);
  
  // Start the glow animation
  const startGlowAnimation = () => {
    glowControls.start({
      textShadow: [
        isDarkMode 
          ? "0 0 5px rgba(255,255,255,0.2)" 
          : "none",
        isDarkMode 
          ? "0 0 8px rgba(255,255,255,0.3)" 
          : "none",
        isDarkMode 
          ? "0 0 5px rgba(255,255,255,0.2)" 
          : "none",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    });
  };

  // Handle hover state
  const handleHoverStart = () => {
    if (isTypingComplete && !isGradientAnimating) {
      setIsHovered(true);
      glowControls.start({
        textShadow: isDarkMode 
          ? "0 0 15px rgba(255,255,255,0.5)" 
          : "none",
        transition: { duration: 0.3 }
      });
    }
  };

  const handleHoverEnd = () => {
    if (isTypingComplete && !isGradientAnimating) {
      setIsHovered(false);
      startGlowAnimation();
    }
  };

  // Handle click to start gradient animation
  const handleClick = () => {
    if (isTypingComplete && !isGradientAnimating) {
      setIsGradientAnimating(true);
      setShowTapHint(false);
      
      // Stop glow animation
      glowControls.stop();
      glowControls.set({ textShadow: "none" });
      
      // Hide the hint
      hintControls.start({
        opacity: 0,
        transition: { duration: 0.5 }
      });
      
      // First animation: fill from left to right (much slower now)
      controls.start({
        clipPath: "inset(0 0 0 0)",
        transition: { 
          duration: fillDuration, 
          ease: "linear" // Changed to linear for a more consistent progress bar feel
        }
      }).then(() => {
        // After fill-up is complete, start the flowing animation
        setIsFlowing(true);
        flowControls.start({
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          transition: {
            duration: 15,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop"
          }
        });
      });
      
      if (onClick) onClick();
    }
  };

  // Prepare gradient colors with extra repetition for smoother flow
  const getExtendedGradient = (colors: string[]) => {
    // Repeat the colors to create a seamless flow
    const extendedColors = [...colors, ...colors];
    return `linear-gradient(to right, ${extendedColors.join(', ')})`;
  };

  // Responsive font size
  //const responsiveFontSize = useBreakpointValue(typeof fontSize === 'object' ? fontSize : { base: fontSize }) || fontSize;

  return (
    <Box 
      position="relative" 
      width="100%" 
      textAlign="center" 
      display="flex" 
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
    >
      <Box
        onClick={handleClick}
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
        cursor={isTypingComplete ? "pointer" : "default"}
        ref={textRef}
        position="relative"
      >
        {/* Base text with initial color */}
        <Box 
          as={motion.span}
          fontSize={fontSize}
          fontWeight={fontWeight}
          color={isDarkMode ? darkModeInitialColor : initialColor}
          position="relative"
          whiteSpace="nowrap"
          userSelect="none"
          animate={glowControls}
          sx={{
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            textRendering: 'optimizeLegibility',
            textShadow: isDarkMode ? 'none' : '0 0 1px #18181b'
          }}
        >
          {displayText}
        </Box>

        {/* Gradient overlay text that animates */}
        {isTypingComplete && (
          <Box
            as={motion.div}
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            display="flex"
            justifyContent="center"
            alignItems="center"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={controls}
            pointerEvents="none"
          >
            <Box
              as={motion.span}
              fontSize={fontSize}
              fontWeight={fontWeight}
              background={getExtendedGradient(isDarkMode ? darkModegradientColors : gradientColors)}
              backgroundSize="200% 100%"
              animate={flowControls}
              bgClip="text"
              whiteSpace="nowrap"
              userSelect="none"
              sx={{
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                textRendering: 'optimizeLegibility'
              }}
            >
              {text}
            </Box>
          </Box>
        )}
      </Box>
      
      {/* Tap hint text */}
      {showTapHint && isTypingComplete && (
        <Box
          as={motion.div}
          initial={{ opacity: 0.7 }}
          animate={hintControls}
          mt={3}
        >
          <Text
            fontSize={{ base: "md", md: "lg" }}
            color={isDarkMode ? "blue.200" : "blue.500"}
            fontWeight="medium"
            textShadow={isDarkMode ? "0 0 8px rgba(255,255,255,0.3)" : "0 0 8px rgba(0,0,0,0.2)"}
            letterSpacing="wide"
          >
            tap on my name
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default GradientTypewriter; 