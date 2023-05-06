import { useEffect, useState } from 'react'


function useExternalLibrary(url) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')

    script.src = url;
    script.async = true;
    document.body.appendChild(script);

    script.addEventListener('load', ()=>{
      setLoaded(true)
    })

    
    return () => {
      document.body.removeChild(script);
      setLoaded(false)
    }
  }, [url])

  return loaded
}


export default useExternalLibrary