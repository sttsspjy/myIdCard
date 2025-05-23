import { useState, useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';

interface GradientTypewriterProps {
  text: string;
  typingSpeed?: number;
  fontSize?: any;
  fontWeight?: string;
  initialColor?: string;
  gradientColors?: string[];
  onClick?: () => void;
  fillDuration?: number;
  flowDuration?: number;
}

const GradientTypewriter = ({
  text,
  typingSpeed,
  fontSize,
  fontWeight,
  initialColor,
  gradientColors,
  onClick,
  fillDuration, 
  flowDuration
}: GradientTypewriterProps) => {
  const [displayText, setDisplayText] = useState(text);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isGradientAnimating, setIsGradientAnimating] = useState(false);
  const controls = useAnimation();
  const flowControls = useAnimation();
  const shadowControls = useAnimation();
  const textRef = useRef<HTMLDivElement>(null);
  const hasTypedRef = useRef(false); 
  
  // Start typing animation when component mounts
  useEffect(() => {
    if (hasTypedRef.current) {
      setIsTypingComplete(true);
      return;
    }

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
        
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [text, typingSpeed]);
  

  // Handle click to start gradient animation
  const handleClick = () => {
    if (isTypingComplete && !isGradientAnimating) {
      setIsGradientAnimating(true);
      
      
      // fill from left to right
      controls.start({
        clipPath: "inset(0 0 0 0)",
        transition: { 
          duration: fillDuration, 
          ease: "linear"
        }
      }).then(() => {
        // After fill-up is complete, start the flowing animation
        flowControls.start({
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          transition: {
            duration: flowDuration,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop"
          }
        });
      });
      
      if (onClick) onClick();
    }
  };

  const getExtendedGradient = (colors: string[] = []) => {
    const extendedColors = [...colors, ...colors];
    return `linear-gradient(to right, ${extendedColors.join(', ')})`;
  };

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
        cursor={isTypingComplete ? "pointer" : "default"}
        ref={textRef}
        position="relative"
      >
        <Box 
          as={motion.span}
          fontSize={fontSize}
          fontWeight={fontWeight}
          color={initialColor}
          position="relative"
          whiteSpace="nowrap"
          userSelect="none"
          animate={shadowControls}
          initial={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.7)" }}
          sx={{
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            textRendering: 'optimizeLegibility',
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
              background={getExtendedGradient(gradientColors)}
              backgroundSize="200% 100%"
              animate={flowControls}
              bgClip="text"
              whiteSpace="nowrap"
              userSelect="none"
              sx={{
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                textRendering: 'optimizeLegibility',
                WebkitTextStroke: '1px rgba(39, 39, 42, 0)'
              }}
            >
              {text}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default GradientTypewriter; 