import {useEffect, useRef, useState} from 'react'

export default function() {
  const [hash, setHash] = useState()
  const [location, setLocation] = useState()
  
  
  const windowHashChanged = event=>{
    event.preventDefault()
    console.log('windowHashChanged', event)
    return false
  }
  
  
  const windowLocationChanged = event=>{
    event.preventDefault()
    console.log('windowLocationChanged', event)
    return false
  }
  
  
  useEffect(() => {
    window.addEventListener('hashchange', windowHashChanged)
    
    window.addEventListener('locationchange', windowLocationChanged)
    window.addEventListener('popstate', windowLocationChanged)
    window.addEventListener('pushstate', windowLocationChanged)
    window.addEventListener('replacestate', windowLocationChanged)
    
    return () => {
      window.removeEventListener('hashchange', windowHashChanged)
    }
  }, [])
  
  
  return {
    hash,
    location
  }
}
