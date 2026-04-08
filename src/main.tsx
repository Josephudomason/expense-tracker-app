
import { ChakraProvider } from '@chakra-ui/react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { GlobalContextProvider } from './context'
import './index.css'
import theme from './theme'

createRoot(document.getElementById('root')!).render(
  <GlobalContextProvider>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </GlobalContextProvider>,
)
