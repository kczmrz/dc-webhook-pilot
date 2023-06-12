import React from 'react';
import type { AppProps } from 'next/app';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faWindowMinimize } from "@fortawesome/free-solid-svg-icons";
import { ipcRenderer }  from 'electron';
import '../styles/globals.css';
import '../styles/TitleBar.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
  
  const MenuBarVoid = (action:string) => {
    ipcRenderer.send(action);
  }
 return (
  <> 
  <nav>
  <div></div>
    <div></div>
    <div className='group'>
        <div className='nav-btn normal' onClick={()=> MenuBarVoid('minimize')}><FontAwesomeIcon icon={faWindowMinimize}/></div>
        <div> &nbsp;</div>
        <div className='nav-btn close'  onClick={()=> MenuBarVoid('quit-app')}><FontAwesomeIcon icon={faClose}/></div>
    </div>
  </nav>
  <ToastContainer
      position="bottom-left"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  <Component {...pageProps} />
  </>
  );
}

export default MyApp
