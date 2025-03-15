import { useState, useEffect, useRef } from 'react';
import { Text, VStack } from '@chakra-ui/react';
import SlotMachineText from './SlotMachineText';

interface TypewriterBioProps {
  bioText: string;
  additionalText: string;
  firstWords: string[];
  lastWords: string[];
  typingSpeed?: number;
  isActive: boolean;
  onTypingComplete?: () => void;
}

const TypewriterBio = ({
  bioText,
  additionalText,
  firstWords,
  lastWords,
  typingSpeed = 30,
  isActive,
  onTypingComplete
}: TypewriterBioProps) => {
  const [displayBioText, setDisplayBioText] = useState('');
  const [displayAdditionalText, setDisplayAdditionalText] = useState('');
  const [isBioTypingComplete, setIsBioTypingComplete] = useState(false);
  const [isAdditionalTypingComplete, setIsAdditionalTypingComplete] = useState(false);
  const [showSlotMachine, setShowSlotMachine] = useState(false);
  const hasStartedTypingRef = useRef(false);

  // Start typing animation for bio text when isActive becomes true
  useEffect(() => {
    // Only start typing if isActive is true and we haven't started typing yet
    if (isActive && !hasStartedTypingRef.current) {
      hasStartedTypingRef.current = true;
      
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex < bioText.length) {
          setDisplayBioText(bioText.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsBioTypingComplete(true);
          // Start slot machine after bio is typed
          setShowSlotMachine(true);
        }
      }, typingSpeed);

      return () => clearInterval(typingInterval);
    }
  }, [isActive, bioText, typingSpeed]);

  // Start typing animation for additional text after bio and slot machine are done
  useEffect(() => {
    if (isBioTypingComplete && showSlotMachine && !isAdditionalTypingComplete) {
      // Add a delay before starting the additional text typing
      const delay = setTimeout(() => {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
          if (currentIndex < additionalText.length) {
            setDisplayAdditionalText(additionalText.substring(0, currentIndex + 1));
            currentIndex++;
          } else {
            clearInterval(typingInterval);
            setIsAdditionalTypingComplete(true);
            if (onTypingComplete) onTypingComplete();
          }
        }, typingSpeed);

        return () => clearInterval(typingInterval);
      }, 1000); // 1 second delay after bio typing is complete

      return () => clearTimeout(delay);
    }
  }, [isBioTypingComplete, showSlotMachine, additionalText, typingSpeed, onTypingComplete, isAdditionalTypingComplete]);

  return (
    <VStack spacing={8} width="100%">
      {/* Bio Text */}
      <Text 
        fontSize={{ base: "13px", md: "xl" }} 
        color="gray.600" 
        _dark={{ color: 'gray.300' }} 
        maxW="10xl"
        whiteSpace="pre-line"
        textAlign="center"
        px={{ base: 0, md: 0 }}
      >
        {displayBioText}
      </Text>
      
      {/* Slot Machine Text */}
      {showSlotMachine && (
        <VStack spacing={1} width="100%">
          <SlotMachineText 
            firstWords={firstWords}
            lastWords={lastWords}
            staticText="keeps me"
            interval={3000}
            fontSize={{ base: "13px", md: "xl" }}
            color="gray.600"
            darkModeColor="gray.300"
          />
        </VStack>
      )}
      
      {/* Additional Text */}
      <Text 
        fontSize={{ base: "13px", md: "xl" }} 
        color="gray.600" 
        _dark={{ color: 'gray.300' }} 
        maxW="10xl"
        whiteSpace="pre-line"
        textAlign="center"
        px={{ base: 0, md: 0 }}
        opacity={displayAdditionalText ? 1 : 0}
        transition="opacity 0.5s"
      >
        {displayAdditionalText}
      </Text>
    </VStack>
  );
};

export default TypewriterBio; 