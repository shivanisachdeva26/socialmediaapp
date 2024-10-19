import * as React from 'react'
import { ColorModeScript } from '@chakra-ui/react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import App from './App';
import { color } from 'framer-motion';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { SocketContextProvider } from './context/SocketContext';

const style = {            //providing themes
  global:(props) =>({
    body:{
      color:mode('gray.800','whiteAlpha.900')(props),
      bg:mode('gray.100','#101010')(props)
    }
  })
};

const config ={
  initialColorMode: "dark",
  useSystemColorMode: true
};

const colors = {
  gray:{
    light: "#616161",
    // light: "#A0AEC0",
    dark:"#1e1e1e"
  }
}

const theme = extendTheme({config,style,colors});

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RecoilRoot>

      <BrowserRouter>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode}></ColorModeScript>
      <SocketContextProvider>
      <App />
      </SocketContextProvider>
    </ChakraProvider>
    </BrowserRouter>
    </RecoilRoot>
   </React.StrictMode> 
)