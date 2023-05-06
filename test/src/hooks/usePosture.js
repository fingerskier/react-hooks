import React, {useEffect, useState} from 'react'
import {scrubData} from '../lib/posture/lib'

import "@tensorflow/tfjs-core"
import "@tensorflow/tfjs-converter"
import "@tensorflow/tfjs-backend-webgl"
import * as poseDetection from "@tensorflow-models/pose-detection"


export default function usePosture(videoRef) {
  const [data, setData] = useState({})
  
  let digestPose
  
  
  async function initialize() {
    try {
      const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet)
      
      
      digestPose = async()=>{
        try {
          if (videoRef?.current) {
            let result = await detector.estimatePoses(videoRef.current)

            result = scrubData(result[0]?.keypoints, videoRef.current.videoWidth, videoRef.current.videoHeight)
            
            setData(result)
          }
            
          setTimeout(digestPose, 1234)
        } catch (error) {
          console.error(error)
          
          setTimeout(digestPose, 1234)
        }
      }
      
      
      let stream = await navigator.mediaDevices.getUserMedia({ video: true })
      
      
      videoRef.current.srcObject = stream
      
      videoRef.current.addEventListener('loadeddata', async(event)=>{
        await digestPose()
      })
    } catch (error) {
      // console.error(error)
      
      setTimeout(digestPose, 1234)
    }
  }
  
  
  useEffect(() => {
    if (videoRef.current) initialize().catch(console.error)
  }, [videoRef])
  
  
  return {
    data,
  }
}