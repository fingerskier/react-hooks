import useExternalLibrary from './useExternalLibrary.js'
import { useEffect, useRef, useState } from 'react'


export default function({
  clientId='mqtt-web-client',
  debug=false,
  password,
  port,
  host,
  username,
}) {
  const mqttLoaded = useExternalLibrary('https://unpkg.com/mqtt/dist/mqtt.min.js')
  
  const client = useRef()

  const [data, setData] = useState({})
  const [state, setState] = useState({})
  
  
  useEffect(() => {
    if (window.mqtt && !client?.connected) {
      client.current = window.mqtt.connect(`${host}:${port}`, {
        clientId: clientId,
        username: username,
        password: password,
      })
      
      
      client.current.on('connect', event=>{
        state.connected = true
        setState({...state})
      })
      
      
      client.current.on('message', (topic, message)=>{
        const T = topic.toString()
        const M = message.toString()
        console.log(T, M)
        data[T] = M
        setData({...data})
      })
      
      
      client.current.on('reconnect', ()=>{
        state.connected = false
        setState({...state})
      })
      client.current.on('close', ()=>{
        state.connected = false
        setState({...state})
      })
      client.current.on('disconnect', ()=>{
        state.connected = false
        setState({...state})
      })
      client.current.on('offline', ()=>{
        state.connected = false
        setState({...state})
      })
      
      
      return () => {
        // client.current.disconnect()
      }
    }
  }, [mqttLoaded])
  
  
  const publish = (topic='#', message='...')=>{
    client.current.publish(topic, message)
  }
  
  
  const subscribe = (topic='#')=>{
    client.current.subscribe(topic)
    console.log('subscribed to', topic)
  }
  
  
  return {data, publish, state, subscribe}
}