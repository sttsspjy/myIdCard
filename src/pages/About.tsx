import { VStack, Heading, Text } from '@chakra-ui/react'

const About = () => {
    // Split the text by periods and format with line breaks
    const shoutOuts = `Family.
    God if there is any.
    Unimelb people. Sayfol friends. Malaysian friends.
    React, Chakra UI, Cursor.`
  return (
    <VStack gap={8} alignItems="flex-start">
      <Heading size="xl" color="gray.800" _dark={{ color: 'gray.100' }}>
        Shoutouts
      </Heading>
      <Text 
        fontSize="lg" 
        color="gray.600" 
        _dark={{ color: 'gray.300' }}
        whiteSpace="pre-line"
      >
        {shoutOuts}
      </Text>
    </VStack>
  )
}

export default About 