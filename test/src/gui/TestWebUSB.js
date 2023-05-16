import {useRef} from 'react'
import useWebUSB from '../hooks/useWebUSB'


export default function() {
  const sendData = useRef()

  const {close, connect, send} = useWebUSB({})
  
  
  return <div>
    <h1> Web-USB </h1>
    
    <button onClick={connect}>Connect</button>
    
    <label>
      String to send:
      <input ref={sendData} type="text" />
    </label>
    <button onClick={E=>send(sendData.current.value)}>Send</button>

    <button onClick={close}>Close</button>
  </div>
}