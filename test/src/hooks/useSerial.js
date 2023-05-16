import {useEffect, useRef} from 'react'


export default function({baudRate=9600}) {
  const port = useRef()

  let reader, writer


  useEffect(() => {
    
    return ()=>{
      if (port?.current) {
        port.current.close()
      }
    }
  }, [])
  
  
  const close = async()=>{
    await port.current.close()
    console.log('WebUSB PORT CLOSED')
  }
  
  
  const connect = async()=>{
    // Request a port and open a connection.
    port.current = await navigator.serial.requestPort()
    
    // Set up the connection.
    await port.current.open({ baudRate: baudRate })
    
    // Set up reader and writer.
    reader = port.current.readable.getReader()
    writer = port.current.writable.getWriter()
    
  }
  
  
  const send = async(data)=>{
    // Write a command.
    data = new Uint8Array([0x01, 0x02, 0x03, 0x04])
    await writer.write(data)
    
    // Read a response.
    const { value, done } = await reader.read()
    if (done) {
      console.log('Done reading')
    } else {
      console.log('Received response:', value)
    }
    
    // Close the reader and writer.
    reader.releaseLock()
    writer.releaseLock()
  }
  
  
  return {
    close,
    connect,
    send,
  }
}