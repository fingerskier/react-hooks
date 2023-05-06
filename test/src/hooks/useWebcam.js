import React, {useEffect, useState} from 'react'


export default function useWebcam(videoRef) {
  const [picBase64, setPicBase64] = useState('')

  
  const connect = async()=>{
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      
      console.log('stream', stream)
      videoRef.current.srcObject = stream
      
      requestAnimationFrame(()=>{
        update()
      })
    } catch (error) {
      console.error("Something went wrong!", error);
    }
  }
  
  
  const update = event=>{
    const canvas = document.createElement('canvas')
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
    setPicBase64(canvas.toDataURL().split(',')[1])
  }
  
  
  useEffect(() => {
    let ref = videoRef.current

    if (navigator.mediaDevices.getUserMedia) {
      connect().catch(console.error)
    }
    
    return () => {
      try {
        ref.srcObject = null;
      } catch (error) {
        ;
      }
    }
  }, [])
  
  
  return {picBase64, update}
}