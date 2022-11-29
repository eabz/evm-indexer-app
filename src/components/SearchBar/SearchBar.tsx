import { FormControl, FormErrorMessage } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, Center, VStack } from '@chakra-ui/layout'
import { isAddress, isHexString, toUtf8Bytes } from 'ethers/lib/utils'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'

export const SearchBar = () => {
  const { push } = useRouter()

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

        push(`/address/${input}`)
        return
      }

      const bytes = toUtf8Bytes(input as string)

      if (bytes.length === 66) {
        setErrorMessage('')

        setError(false)

        push(`/tx/${input}`)
        return
      }
    }

    if (!isNaN(Number(input))) {
      setErrorMessage('')

      setError(false)

      push(`/block/${input}`)
      return
    }

    if (!isValidString) {
      setErrorMessage('Invalid data submitted')
      setError(true)

      return
    }
  }
  return (
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
  )
}
