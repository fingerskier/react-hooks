import {useEffect, useRef, useState} from 'react'

export default function() {
  const [fx, setFx] = useState({})
  const [hash, setHash] = useState()
  
  
  const on = (key,handler)=>{
    fx[key] = handler
    setFx({ ...fx })
  }
  
  
  const windowHashChanged = event=>{
    event.preventDefault()
    setHash(window.location.hash.substring(1))
    return false
  }
  
  
  useEffect(() => {
    window.addEventListener('hashchange', windowHashChanged)
    
    
    return () => {
      window.removeEventListener('hashchange', windowHashChanged)
    }
  }, [])
  
  
  useEffect(() => {
    if (hash) {
      if (fx?.[hash]) {
        return fx[hash](hash)
      }
    }
  }, [hash])
  
  
  return {
    hash,
    on,
  }
}
