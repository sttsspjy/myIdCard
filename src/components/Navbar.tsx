import { Box, Flex, Link as ChakraLink, Spacer, IconButton } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/color-mode'
import { Link as RouterLink } from 'react-router-dom'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  
  return (
    <Box bg="white" _dark={{ bg: 'gray.900' }} px={4} shadow="sm">
      <Flex h={16} alignItems="center" maxW="container.xl" mx="auto">
        <RouterLink to="/">
          <ChakraLink fontSize="xl" fontWeight="bold" color="gray.800" _dark={{ color: 'gray.100' }}>
            Hi.
          </ChakraLink>
        </RouterLink>
        <Spacer />
        <Flex gap={8} alignItems="center">
          <RouterLink to="/">
            <ChakraLink color="gray.600" _dark={{ color: 'gray.300' }} _hover={{ color: 'black' }}>
              Home
            </ChakraLink>
          </RouterLink>
          <IconButton
            aria-label="Toggle dark mode"
            as={colorMode === 'dark' ? SunIcon : MoonIcon}
            onClick={toggleColorMode}
            size="md"
            variant="ghost"
          />
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar