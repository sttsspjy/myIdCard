import { Box, Flex, Link as ChakraLink, Spacer, IconButton, useBreakpointValue, 
  Menu, MenuButton, MenuList, Switch, Text } from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons'
import { useAppContext } from '../context/AppContext'

const Navbar = () => {
  const iconSize = useBreakpointValue({ base: "md", md: "md" });
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
          <Menu closeOnSelect={false}>
            <MenuButton
              as={IconButton}
              icon={<SettingsIcon />}
              variant="ghost"
              aria-label="Settings"
              size={iconSize}
              color="white"
              _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
            />
            <MenuList 
              minWidth="200px"
              bg="rgba(0, 0, 0, 0.7)"
              backdropFilter="blur(10px)"
              borderColor="rgba(255, 255, 255, 0.1)"
            >
              <Box 
                px={3}
                py={2}
                bg="transparent"
                cursor="default"
              >
                <Flex width="100%" justifyContent="space-between" alignItems="center">
                  <Text color="white">Particles</Text>
                  <Switch 
                    isChecked={particlesEnabled} 
                    onChange={toggleParticles} 
                    colorScheme="blue"
                  />
                </Flex>
              </Box>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar