import { FormControl, FormErrorMessage } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, Center, Text, VStack } from '@chakra-ui/layout'
import { isAddress, isHexString, toUtf8Bytes } from 'ethers/lib/utils'
import { ChangeEvent, useState } from 'react'

import { ChainsBlocks } from '@/components/ChainsBlocks'

export default function Home() {
  const [input, setInput] = useState<string | undefined>(undefined)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    setInput(input)
  }

  const [isError, setError] = useState(false)

  const [errorMessage, setErrorMessage] = useState<string>('Invalid data submitted')

  const handleInputSubmit = () => {
    if (!input) return

    const isValidString = isHexString(input)
    if (isValidString) {
      const isValidAddress = isAddress(input as string)

      if (isValidAddress) {
        setErrorMessage('')

        setError(false)

        // TODO handle address
        return
      }

      const bytes = toUtf8Bytes(input as string)

      if (bytes.length === 66) {
        setErrorMessage('')

        setError(false)

        // TODO handle tx
        return
      }
    }

    const number = parseInt(input)
    if (!isNaN(number)) {
      setErrorMessage('')

      setError(false)

      // TODO handle block
      return
    }

    if (!isValidString) {
      setErrorMessage('Invalid data submitted')
      setError(true)

      return
    }
  }

  return (
    <VStack align="center" justifyContent="center" marginTop="2" width="full">
      <Text fontSize="2xl" fontWeight="bold" marginTop="10" textAlign="center">
        EVM Indexer
      </Text>
      <Text fontSize="md" fontWeight="regular" padding="2" textAlign="center">
        Minimalistic EVM compatible chain indexer
      </Text>
      <FormControl flexDirection="column" isInvalid={isError}>
        <Center>
          <VStack>
            <Box>
              <Input
                fontSize="sm"
                placeholder="Search by Address / Block / Transaction / Contract"
                textAlign="center"
                width={{ base: 'full', md: '400px', lg: '600px' }}
                onChange={handleInputChange}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleInputSubmit()
                  }
                }}
              />
            </Box>
            <Box>{isError && <FormErrorMessage>{errorMessage}</FormErrorMessage>}</Box>
          </VStack>
        </Center>
      </FormControl>

      <Box width="full">
        <Text fontSize="md" fontWeight="regular" padding="2" textAlign="center">
          Chains Indexed
        </Text>
        <ChainsBlocks />
      </Box>
    </VStack>
  )
}
