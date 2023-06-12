import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft,  faCoffee, faInfo, faCopy } from '@fortawesome/free-solid-svg-icons';
import { ChangeEvent } from 'react';
import { shell } from 'electron';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { clipboard } from 'electron';
import { toast } from 'react-toastify';
import { version } from '../version';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
 
};



function InfoAboutMe() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [ModalImg, setModalImg] = useState<string>("");
  const notify = () => toast("Email has been copied");

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const CopyEmail = () => {
    clipboard.writeText('kczmrz@proton.me');
     notify();
  }

  return (
    <div>
      <button className='absolute text-white px-4 py-2 bg-green-700 mt-12 rounded-r-lg hover:bg-gray-400 ' onClick={openModal}><FontAwesomeIcon icon={faInfo}/> click me!</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        ariaHideApp={false}
        contentLabel="Upload image"
        className={'UploadModal'}
      >
        
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
        <button onClick={closeModal} className='text-2xl px-6 py-2 hover:bg-white hover:text-blue-500 rounded-r-lg'> <FontAwesomeIcon icon={faArrowLeft}/> Back </button>
        <div className='flex w-full flex-row justify-center h-screen'>
        <div className="flex flex-col ">
          <div className='text-2xl text-white flex flex-row flex justify-center'>Author: &nbsp; <div className='font-bold text-3xl'>Kczmrz</div></div>

          <div className='flex flex-row px-4'> 
              <div className='flex-col mr-8'> 
                <div className='italic text-4xl mt-4 text-center font-bold'>Links:</div>
                <div className='mt-6 text-3xl'><button className='px-4 py-2 bg-gray-800 rounded-2xl hover:bg-gray-500' onClick={()=> shell.openExternal('https://github.com/kczmrz')} ><FontAwesomeIcon icon={faGithub} className='text-4xl'/>&nbsp;Check my Github</button></div>
                <div className='mt-6 text-3xl'><button className='px-4 py-2 bg-blue-600 rounded-2xl hover:bg-gray-700' onClick={()=> shell.openExternal('https://twitter.com/kczmrz')} ><FontAwesomeIcon icon={faTwitter} className='text-4xl'/>&nbsp;Check my Twitter</button></div>
                <div className='mt-6 text-3xl'><button className='px-4 py-2 bg-yellow-500 rounded-2xl hover:bg-gray-700' onClick={()=> shell.openExternal('https://www.buymeacoffee.com/kczmrz')} ><FontAwesomeIcon icon={faCoffee} className='text-4xl'/>&nbsp;Buy me a coffe!</button></div>
                <div className='mt-12 text-lg flex flex-row'><div className='mt-1'>Contact: &nbsp; </div> <div className='text-xl font-bold mt-1'> kczmrz@proton.me </div> &nbsp; <button className='bg-gray-700 p-2 rounded-xl hover:bg-gray-500' onClick={CopyEmail}><FontAwesomeIcon icon={faCopy}/></button></div>
              </div>
            <div className='flex-col'>
              <div className='mt-20'> <button className='px-4 py-2 bg-gray-800 rounded-2xl hover:bg-gray-500' onClick={()=> shell.openExternal('https://github.com/kczmrz/dc-webhook-pilot')}>Show documentation</button></div>
              <div className='mt-6 flex flex-col bg-gray-700 py-8 px-4 w-6/6 text-center rounded-2xl italic'>version: {version} </div>
            </div>
          </div>
         
        </div>
        </div>
      </Modal>
    </div>
  );
}

export default InfoAboutMe;