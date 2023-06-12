import React from 'react';
import { useState } from 'react';

import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faArrowLeft,  faFileImage } from '@fortawesome/free-solid-svg-icons';
import { ChangeEvent } from 'react';
import { toast } from 'react-toastify';





function UploadImageModal( { chooseImage }: any ){
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  const [ModalImgFromLink, setModalImgFromLink] = useState<string>("");
  
  const DefaultImagesLink:string[] = ["https://i.ibb.co/SKLZ37x/megaphone.png","https://i.ibb.co/RgrWgpV/pray.png", "https://i.ibb.co/F7MCDf9/robot.png", "https://i.ibb.co/s978QCS/warn.png", "https://i.ibb.co/bQdyZgX/def.png " ]
  const [DefaultImagesStyles, setDefaultImagesStyles] = useState<string[]>(["rounded-full w-24 h-24 ml-8", "rounded-full w-24 h-24 ml-8", "rounded-full w-24 h-24 ml-8", "rounded-full w-24 h-24 ml-8", "rounded-full w-24 h-24 ml-8"]);
   const ChangeAlert = (msg:string) => toast(msg);
   
   
   /*template avatars and borders */
   const setTemplateAvatar = (avatar:string, nmbr:number) => {
    setModalImgFromLink(avatar);
    let ArrayCss = [];

    for(let i = 0; i<nmbr; i++) {
       ArrayCss.push("rounded-full w-24 h-24 ml-8")
    }
    ArrayCss[nmbr] = "rounded-full w-24 h-24 ml-8 border-4 border-green-600";

    for(let i = nmbr; i <5; i++)
    {
      ArrayCss.push("rounded-full w-24 h-24 ml-8")
    }

    setDefaultImagesStyles(ArrayCss);
    }


    const ClearTemplateAvatarStyles = ()=>
    {
      let ArrayCss = [];

      for(let i = 0; i< 5; i++) {
         ArrayCss.push("rounded-full w-24 h-24 ml-8")
      }
      setDefaultImagesStyles(ArrayCss);
    }
    
  const getImageLink = (e: ChangeEvent<HTMLInputElement>) => {
     setModalImgFromLink(e.target.value);
  }

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  
  const Reset = () => {
    setModalImgFromLink(null);
    chooseImage("", false, '');
    ChangeAlert("Photo has been deleted");
  }
  
  const Save = () => {
    chooseImage(ModalImgFromLink);
    ClearTemplateAvatarStyles();
    ChangeAlert("Photo has been changed");
    setIsOpen(false);
    
  }

  return (
    <div>
       <button className='bg-blue-500 w-6/6 px-2 py-4 mt-4 rounded-lg hover:bg-themeColor-5' onClick={openModal}><FontAwesomeIcon icon={faImage}/> Upload</button>
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
        <div className="flex flex-col mt-8 ">
            <div className='text-4xl text-center'>Add your image</div>
            <div className='flex flex-row w-full mt-8'>{DefaultImagesLink.map((item, id) => {return <img className={DefaultImagesStyles[id]} src={item} key={item} onClick={()=> setTemplateAvatar(item, id)} />}
            )} </div>
            <div className='mt-4 text-3xl text-center'>or</div>
            <div className='mt-6 w-full'><input className='w-full text-black' value={ModalImgFromLink}  onChange={getImageLink}/> </div>
            <div className='italic text-center'>from link</div>
        </div>
        <div className='absolute bottom-20 right-5'>
          <button className='bg-red-700 text-2xl py-2 px-4 rounded-3xl mr-4 hover:bg-gray-700' onClick={Reset} >Reset</button>
          <button className='bg-green-600 text-2xl py-2 px-4 rounded-3xl mr-4 hover:bg-gray-700' onClick={Save} >Save </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default UploadImageModal;