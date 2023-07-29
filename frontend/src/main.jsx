import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { MantineProvider } from '@mantine/core';
import { RecoilRoot } from 'recoil';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider>
      <RecoilRoot>
        <App />
      </RecoilRoot>
      
    </MantineProvider>
   
  </React.StrictMode>,
)
