import React,{useEffect,useRef,useState} from 'react'
import {shallowCopyEvent} from '../lib/network'


export default function useWebSocket(url, defaultValue) {
  const ws = useRef(null)
  
  const [data, setData] = useState(defaultValue)
  const [error, setError] = useState(0)
  const [state, setState] = useState({})
  const [unload, setUnload] = useState(false)
  
  let fullURL
  
  
  function transmit(msg) {
    const JSONdata = JSON.stringify(msg)
    
    setData(msg)
    
    try {
      if (ws.current.readyState === 1) {
        try {
          ws.current.send(JSONdata)
        } catch (error) {
          console.error(error)
        }
      }
    } catch (err) {
      console.error(err)
    }
  }
  
  
  const connect = ()=> {
    try {
      fullURL = !url.includes('://')? `wss://${process.env.REACT_APP_CTRL_HOST}/${url}`: url
      
      ws.current = new WebSocket(fullURL)
      
      
      ws.current.onerror = function(event) {
        console.error('error', event)
        setError(event)
      }
      
      
      ws.current.onclose = function(event) {
        setState(shallowCopyEvent(event))
        
        if (!unload) {
          setTimeout(() => {
            console.error('WS UNEXPECTED CLOSE: attempt reconnect')
            ws.current = new WebSocket(fullURL)
          }, 357);
        }
      }
      
      
      ws.current.onopen = function(event) {
        console.log(event)
        setState(shallowCopyEvent(event))
      }
      
      
      ws.current.onmessage = function(event) {
        setData(JSON.parse(event.data))
        console.log('RECV', event.data)
      }
    } catch(err) {
      console.error(err)
    }
  }
  
  
  useEffect(() => {
    connect()
    
    return () => {
      setUnload(true)
      if (ws?.current) ws.current.close()
    }
  }, [])
  
  
  useEffect(() => {
    console.log('WS', state)
  }, [state])
  
  
  return [
    data,
    transmit,
    error,
    state,
  ] 
}