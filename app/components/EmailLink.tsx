'use client'
import { useEffect, useState } from 'react'

type Props = {
  encoded: string
  style?: React.CSSProperties
  className?: string
}

export default function EmailLink({ encoded, style, className }: Props) {
  const [email, setEmail] = useState('')

  useEffect(() => {
    setEmail(atob(encoded))
  }, [encoded])

  if (!email) {
    return <span className={className} style={style}>…</span>
  }

  return (
    <a href={`mailto:${email}`} className={className} style={style}>
      {email}
    </a>
  )
}
