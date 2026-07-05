'use client'
import { useEffect } from 'react'

export default function ScrollAnimator() {
  useEffect(() => {
    const setup = () => {
      const elements = document.querySelectorAll('.scroll-fade')
      const observer = new IntersectionObserver(
        entries => entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        }),
        { threshold: 0.05 }
      )
      elements.forEach(el => observer.observe(el))
      return observer
    }

    // Small delay ensures layout is complete before observing
    const timer = setTimeout(() => {
      const observer = setup()
      return () => observer.disconnect()
    }, 80)

    return () => clearTimeout(timer)
  }, [])
  return null
}
