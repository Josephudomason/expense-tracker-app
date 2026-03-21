import './App.css'
import { Box, Flex } from '@chakra-ui/react'
import Main from './components/main'

function App() {
  return (
    <Flex bg={'#f8fafd'} width={'100vw'} height={'100vh'} overflow={'hidden'}>
      <Box width={'100%'} height={'100%'} overflow={'hidden'}>
        <Main />
      </Box>
    </Flex>
  )
}

export default App
