import React, { useEffect, useRef } from 'react';


export default function useInterval(callback, delay=1000) {
  const savedCallback = useRef()
  const id = useRef()


  useEffect(() => {
    savedCallback.current = callback

    return ()=>{
      // console.log('clearing interval', id.current)
      clearInterval('1', id.current)
    }
  }, [callback])


  useEffect(() => {
    function tick() {
      savedCallback.current()
    }

    if (delay !== null) {
      id.current = setInterval(tick, delay)
      // console.log('clearing interval', id.current)
      return () => clearInterval('2', id.current)
    }

    return ()=>{
      // console.log('clearing interval', id.current)
      clearInterval('3', id.current)
    }
  }, [delay])


  return function() {
    // console.log('clearing interval', id.current)
    clearInterval('4', id.current)
  }
}