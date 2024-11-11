import React, { useState } from 'react'
import axios from 'axios';

const Audiouploader = () => {
  const [file ,setFile] = useState(null);
  const [transcription, setTranscription] = useState("")
  const handleFileChange = (e) =>{
    setFile(e.target.files[0]);
  };
  const handleUpload = async () =>{
    const formData = new FormData();
    formData.append('file',file);
    try{
      const response = await axios.post('http://localhost:8080/api/transcribe',formData,{
        headers : {
          'Content-Type' : 'multipart/form-data',

        }
      });
      setTranscription(response.data);
    }catch(error){
      console.error("error transcibe audio",error);
    }
  }
  return (
    <div className='container'>
      <h1>Audio to Text Transcriber</h1>
      <div className='file-input'>
       <input type="file" accept='audio/*' onChange={handleFileChange} /> 
      </div>
      <button className='upload-button' onClick={handleUpload}>Upload and Transcribe</button>
    <div className='transcription-result'>
      <h2>Transcription result</h2>
      {
        transcription !== null ? <p>{transcription}</p> :  window.alert("tokens are nill")
      }
      
    </div>
    </div>
  )
}

export default Audiouploader
