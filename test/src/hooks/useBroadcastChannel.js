import {useEffect, useRef, useState} from 'react'
import K from '../Constants'


export default function(channelName='broadcast-channel') {
  const channel = useRef()
  const handlers = {}
  
  const [message, setMessage] = useState()
  
  
  useEffect(() => {
    channel.current = new BroadcastChannel(channelName)
    
    channel.current.onmessage = event=>{
      let processed = false
      
      try {
        if (!processed) {
          setMessage(event.data)
          
          const handler = handlers[event.data.key]
          
          
          if (handler) {
            handler(event.data?.data)
          }
          
          setMessage('')
          
          processed = true
        }
      } catch (error) {
        console.error(error)
      }
    }
    
    return () => {
      if (channel?.close) {
        channel.close()
      }
    }
  }, [])
  
  
  const on = (key,fx)=>{
    handlers[key] = fx
  }
  

  const post = (key,msg)=>{
    channel.current.postMessage({
      data: msg,
      key: key,
    })
  }
  
  
  return {
    message,
    on,
    post,
  }
}
