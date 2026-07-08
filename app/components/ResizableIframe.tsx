'use client'
import { useEffect, useRef, useState } from 'react'

export default function ResizableIframe({ src, title }: { src: string; title: string }) {
  const [height, setHeight] = useState(1200)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data && e.data.type === 'rechner-resize' && iframeRef.current?.contentWindow === e.source) {
        setHeight(e.data.height)
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <iframe
      ref={iframeRef}
      title={title}
      src={src}
      style={{ width: '100%', height, border: 'none', display: 'block' }}
    />
  )
}
