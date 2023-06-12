import React, { ChangeEvent } from 'react';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faCode, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import  UploadImageModal  from '../components/modal/uploadImage';
import InfoAboutMe from '../components/modal/infoAboutMe';
import {  toast } from 'react-toastify';
import axios from 'axios';

function Home() {
  /* message */
  const [message, setMessage] = useState<string>("");
  const [txtToWeight, setTxtToWeight] = useState<string>("");


  /*image localy*/
  const [ImageOnApp, setImageOnApp] = useState<string>("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");

  /*set image link to webhook */
 const [ImageLink, setImageLink] = useState<string>("");

 /* set webhook name */
 const [Name, setName] = useState<string>("");

 /*set link do webhook */
 const [WebhookLink, setWebhookLink] = useState<string>("")

 const notify = (msg:string) => toast(msg);

  const chooseImage = (link:any) => {
    setImageLink(link);
 
    
  };

 

  useEffect(()=> {
    if(ImageLink === "") {
      setImageOnApp("https://i.ibb.co/bQdyZgX/def.png");
    }
    else {
      setImageOnApp(ImageLink);
    }

  }, [ImageLink])
  

  const GoWebhook = async (event:any)=> {
    event.preventDefault();
    if(message == "" || message == " ") {
      notify("Empty message!");
    }
    else {
      const data = 
      {
        webhook: {
          username: Name,
          avatar_url: ImageLink,
          content: message 
        },
      }
    const dc_data = JSON.stringify(data.webhook);
    
    
    await axios.post(WebhookLink, dc_data, { headers: {'Content-Type': 'application/json',}}).then(() => notify("Message was sent!")).catch((e)=> notify("Error"));
        
      
         
    }
   }

  const SpecialTxt = (prefix:string) => {
    setMessage(message + " "+ prefix + txtToWeight + prefix);
    setTxtToWeight("");
  }

  return (
    <React.Fragment>
      <Head>
        <title>Discord Webhook Pilot!</title>
      </Head>
      <InfoAboutMe/>
     <div className='flex items-center flex-row h-fit w-full pt-12'> 
     <div className='flex flex-col items-center pl-8 text-white w-1/6 bg-themeColor-4 py-6 px-4 mt-0 rounded-r-3xl'>
       <img src={ImageOnApp} alt="Upload image" className='rounded-full w-24 h-24'/>
       <UploadImageModal chooseImage={chooseImage}/>
     </div>
     <div className='flex justify-center w-5/6'> 
        <form onSubmit={GoWebhook} className='flex flex-col w-5/6 text-white text-2xl mt-2'>
          
           <label htmlFor="one">Webhook link</label>
           <input type="text" id="webhook" name="webhook" className='send-form-input' value={WebhookLink} onChange={(e:ChangeEvent<HTMLInputElement>) => setWebhookLink(e.target.value)} required/>

           <label htmlFor="two">Name</label>
           <input type="text" id="name" name="name" value={Name} onChange={(e:ChangeEvent<HTMLInputElement>) => setName(e.target.value)} className='send-form-input'/>

           <label htmlFor="four">Message</label>
           <textarea className="message-form" placeholder="Type your message" maxLength={2000} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)} value={message}></textarea>
           <div className='flex flex-row py-4 mt-4 w-fit bg-themeColor-5 rounded-3xl px-2 place-self-center'> 
              <button type='button' className='bg-blue-700 w-fit mt-2 text-white px-4 py-2 text-sm rounded-xl hover:bg-yellow-400 mx-2' onClick={() => setMessage(message + "@everyone")}>@everyone</button>
              <button type='button' className='bg-red-500 w-fit mt-2 text-white px-4 py-2 text-2xl rounded-2xl hover:bg-yellow-500 mx-2' onClick={() => setMessage(" ")}><FontAwesomeIcon icon={faDeleteLeft}/>  </button>
              <button type='button' className='bg-gray-500 w-fit mt-2 text-white px-4 py-2 text-2xl rounded-2xl hover:bg-purple-500 mx-2' onClick={() => setMessage(message + "👍")}>👍 </button>
              <button type='button' className='bg-gray-500 w-fit mt-2 text-white px-4 py-2 text-2xl rounded-2xl hover:bg-purple-500 mx-2' onClick={() => setMessage(message + "👎")}>👎 </button>
              <button type='button' className='bg-gray-500 w-fit mt-2 text-white px-4 py-2 text-2xl rounded-2xl hover:bg-purple-500 mx-2' onClick={() => setMessage(message + "😮")}>😮 </button>
              <button type='button' className='bg-gray-500 w-fit mt-2 text-white px-4 py-2 text-2xl rounded-2xl hover:bg-purple-500 mx-2' onClick={() => setMessage(message + "😱")}>😱 </button>
          </div>

          <div className='flex flex-row py-4 px-4 mt-4 w-full bg-themeColor-5 rounded-3xl px-2 place-self-center'> 
              <textarea className="message-form w-5/6" placeholder="Type your special text" maxLength={300} onChange={(e: any) => setTxtToWeight(e.target.value)} value={txtToWeight}></textarea>
              <button type='button' className='bg-gray-500 w-fit mt-2 text-white px-4 py-2 text-2xl rounded-2xl hover:bg-red-500 mx-2' onClick={() => SpecialTxt("*")}><FontAwesomeIcon icon={faItalic}/> </button>
              <button type='button' className='bg-gray-500 w-fit mt-2 text-white px-4 py-2 text-2xl rounded-2xl hover:bg-red-500 mx-2' onClick={() => SpecialTxt("**")}><FontAwesomeIcon icon={faBold}/> </button>
              <button type='button' className='bg-gray-500 w-fit mt-2 text-white px-4 py-2 text-2xl rounded-2xl hover:bg-red-500 mx-2' onClick={() => SpecialTxt("`")}><FontAwesomeIcon icon={faCode}/> </button>
          </div>
               <div className='flex flex-row-reverse'>
                 <button className='btn bg-blue-500 text-2xl text-white mt-8 w-48 px-2 hover:bg-blue-300' type='submit'>Send!</button>
             </div>
           </form>
         </div>
       </div>
     </React.Fragment>
  );
}

              

export default Home;


/**
 * I want to make a 3 buttons for every input: clear, copy, paste
 */