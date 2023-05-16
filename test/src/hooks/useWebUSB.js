import {useEffect, useRef} from 'react'


export default function({baudRate=9600}) {
  const device = useRef()
  
  let reader, writer
  
  
  useEffect(() => {
    
    return ()=>{
    }
  }, [])
  
  
  const close = async()=>{
  }
  
  
  const connect = async()=>{
    const device = await navigator.usb.requestDevice({
      filters: [{ vendorId: 0x2E8A }] 
    })
    
    await device.open()
    
    console.log('USB FOUND', device)
    
    device.selectConfiguration(1)
    device.claimInterface(1)
  }
  
  
  const list = async()=>{
    const devices = navigator.usb.getDevices()
    
    devices.forEach(device => {
      console.log(device.productName)
      console.log(device.manufacturerName)
    });
  }
  
  
  const send = async(data)=>{
  }
  
  
  return {
    close,
    connect,
    send,
  }
}