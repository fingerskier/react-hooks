/*
  Caveats:
    if the message.data is the same as the prior message then state hook will not trigger an update;
    ...so, if it is desired to send trigger messages then the message contents need to change (e.g. a counter)
*/

import {useEffect, useRef, useState} from 'react'


export default function(channelName='broadcast-channel', key='flarn-ghibbet', defaultValue) {
  let channel = useRef()
  
  const [message, setMessage] = useState(defaultValue)
  
  
  useEffect(() => {
    const thisn = new BroadcastChannel(channelName)
    
    channel.current = thisn
    
    channel.current.onmessage = event=>{
      if (event.data.key === key) {
        console.log('BROAD REC', event.data)
        setMessage(event.data.data)
      }
    }
    
    return () => {
      thisn.close()
    }
  }, [])
  
  
  const send = msg=>{
    try {
      let payload = {key:key, data:msg}
      console.log('BROAD POST', payload)
      channel.current.postMessage(payload)
    } catch (error) {
      console.error(error)
    }
  }
  
  
  return [
    message,
    send,
  ]
}
