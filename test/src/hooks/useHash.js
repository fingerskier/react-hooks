import {useEffect, useRef, useState} from 'react'

export default function() {
  const [fx, setFx] = useState({})
  const [hash, setHash] = useState()
  
  
  const on = (key,handler)=>{
    fx[key] = handler
    setFx({ ...fx })
    console.log('hash hand reg', fx)
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
      console.log('hash changed', hash, fx)
      if (fx?.[hash]) {
        console.log('hash handler', hash, fx[hash])
        return fx[hash](hash)
      }
    }
  }, [hash])
  
  
  return {
    hash,
    on,
  }
}
