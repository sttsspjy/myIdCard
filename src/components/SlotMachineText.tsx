import { useState, useEffect } from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

interface SlotMachineTextProps {
  firstWords: string[];
  lastWords: string[];
  staticText?: string;
  interval?: number;
  fontSize?: any;
  color?: string;
  wordColors?: string[];
}

const SlotMachineText = ({
  firstWords,
  lastWords,
  staticText = "keeps me",
  interval = 3000,
  fontSize = { base: "sm", md: "xl" },
  color = "rgba(255, 255, 255, 0.9)",
  wordColors = ["#FF5555", "#55AAFF", "#55FF7F", "#FFAA55", "#AA55FF"]
}: SlotMachineTextProps) => {
  const [currentFirstIndex, setCurrentFirstIndex] = useState(0);
  const [currentLastIndex, setCurrentLastIndex] = useState(0);
  const [, setIsChanging] = useState(false);

  // Find the longest word in each array to set minimum width
  const longestFirstWord = firstWords.reduce((a, b) => a.length > b.length ? a : b, "");
  const longestLastWord = lastWords.reduce((a, b) => a.length > b.length ? a : b, "");

  useEffect(() => {
    const timer = setInterval(() => {
      setIsChanging(true);
      
      setTimeout(() => {
        setCurrentFirstIndex((prevIndex) => (prevIndex + 1) % firstWords.length);
        setCurrentLastIndex((prevIndex) => (prevIndex + 1) % lastWords.length);
        setIsChanging(false);
      }, 500); // Half the transition time
      
    }, interval);

    return () => clearInterval(timer);
  }, [firstWords.length, lastWords.length, interval]);

  // Animation variants
  const variants = {
    enter: { y: -20, opacity: 0 },
    center: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 }
  };

  // Get the current color for the word set
  const getCurrentColorIndex = () => currentFirstIndex % wordColors.length;
  const getCurrentColor = () => wordColors[getCurrentColorIndex()];

  return (
    <Flex 
      width="100%" 
      justifyContent="center" 
      alignItems="center"
      textAlign="center"
      fontSize={fontSize}
      color={color}
      my={2}
      overflow="visible"
    >
      <Box 
        position="relative" 
        height="1.5em" 
        display="inline-block"
        minWidth={`${longestFirstWord.length}ch`}
        textAlign="right"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFirstIndex}
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 } as any}
            style={{ 
              position: 'absolute', 
              width: '100%', 
              right: 0,
              background: `linear-gradient(to right, ${getCurrentColor()}, white)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 'bold'
            }}
          >
            {firstWords[currentFirstIndex]}
          </motion.div>
        </AnimatePresence>
      </Box>
      
      <Text mx={2}>{staticText}</Text>
      
      <Box 
        position="relative" 
        height="1.5em" 
        display="inline-block"
        minWidth={`${longestLastWord.length}ch`}
        textAlign="left"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLastIndex}
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 } as any}
            style={{ 
              position: 'absolute', 
              width: '100%', 
              left: 0,
              background: `linear-gradient(to right, white, ${getCurrentColor()})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 'bold'
            }}
          >
            {lastWords[currentLastIndex]}
          </motion.div>
        </AnimatePresence>
      </Box>
    </Flex>
  );
};

export default SlotMachineText; 