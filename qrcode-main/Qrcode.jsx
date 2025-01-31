import React from 'react'
import './Qrcode.css'
import { useState } from 'react'
  
function Qrcode() { 

   const [img, setImg] = useState("");
   const[loading,Setloading]=useState(false);
   const[qrdata,setQrdata]=useState("pooju");
   const[qrsize,setqrsize]=useState("150")
  
   async function generateqr() {
    
    Setloading(true);
    try{
     const url =`https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata)}`;
     setImg(url);
    }catch(error){
      console.log("Error generating Qr code",error)
    }finally{
      Setloading(false);
    }
    
   }
   function downloadQR() {
    fetch(img)
    .then((response) => response.blob())
    .then((blob) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "qrcode.png"
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    });
    }
    

  return (
    <div className='app-container'>
         <h1>QR CODE GENERATOR</h1>
         { loading ? <p>Please wait...</p>:""}
         {img &&  <img src={img} className='qr-img' />}
     
        <div>
        <label htmlFor='dataInput'className='input-label'>Data for Qrcode:</label>
        <input type='text' id='dataInput' value={qrdata}placeholder='Enter the data for Qrcode' onChange={(e)=>setQrdata(e.target.value)}></input>
        <label htmlFor='sizeInput' className='input-label'>Image size(eg..150)</label>
        <input type='text' id='sizeInput' value={qrsize} placeholder='Enter size' onChange={(e)=>setqrsize(e.target.value)}></input>
        <button className='generate-button' disabled={loading} onClick={generateqr}>Generate Qrcode</button>
        <button className='download-button' onClick={downloadQR}>Download Qrcode</button>
        </div>
        <div>
            <p className='footer'>Designed by <a href='#'>pooj</a></p>
        </div>
    </div>
    
  )
}

export default Qrcode