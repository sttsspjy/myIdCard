import { Box, Flex, Link as ChakraLink, Spacer, Icon } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import { useAppContext } from '../context/AppContext'

// Empty star icon for particles off state
const EmptyStarIcon = (props: any) => (
  <Icon viewBox="0 0 20 20" {...props}>
    <path
      fill="currentColor"
      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
      stroke="currentColor"
      strokeWidth="1.5"
      fillOpacity="0"
    />
  </Icon>
)

const Navbar = () => {
  const { particlesEnabled, toggleParticles } = useAppContext();
  const musicLink = 'https://www.youtube.com/watch?v=mRsUPoFtUtA'
  
  return (
    <Box bg="transparent" px={4} shadow="none" position="relative" zIndex="10">
      <Flex h={16} alignItems="center" maxW="container.xl" mx="auto">
        <Box 
          display="flex"
          alignItems="center"
          position="relative"
        >
          <ChakraLink 
            href={musicLink} 
            isExternal 
            fontSize={{ base: "xl", md: "2xl" }} 
            fontWeight="bold" 
            color="white"
            _hover={{ textDecoration: 'none' }}
            display="inline-block"
          >
            Hi.
          </ChakraLink>
        </Box>
        <Spacer />
        <Flex alignItems="center">
          <Box
            as="button"
            onClick={toggleParticles}
            aria-label={particlesEnabled ? "Turn off particles" : "Turn on particles"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="40px"
            height="40px"
            borderRadius="md"
            bg="transparent"
            color={particlesEnabled ? "#ffea96" : "gray.400"}
            cursor="pointer"
            outline="none"
            border="none"
            transition="all 0.2s ease"
            sx={{
              filter: particlesEnabled ? 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))' : 'none',
            }}
            _hover={{ 
              color: particlesEnabled ? "#fde68a" : "gray.300",
              transform: "scale(1.2)",
              filter: particlesEnabled ? 'drop-shadow(0 0 16px rgba(255, 255, 255, 1))' : 'none',
            }}
            _focus={{
              outline: 'none !important',
              boxShadow: 'none !important',
            }}
            _active={{
              outline: 'none !important',
              boxShadow: 'none !important',
              transform: "scale(1.1)",
            }}
          >
            {particlesEnabled ? <StarIcon boxSize="1.5em" /> : <EmptyStarIcon boxSize="1.5em" />}
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar