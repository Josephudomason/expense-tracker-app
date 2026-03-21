
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ChakraProvider, theme } from '@chakra-ui/react'
import GlobalContextState from './context/index.tsx'

createRoot(document.getElementById('root')!).render(
  <GlobalContextState>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </GlobalContextState>

)
