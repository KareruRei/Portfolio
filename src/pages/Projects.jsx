import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'

function Projects() {
  const [currentTime, setCurrentTime] = useState('08:44:59')
  const [isAnimating, setIsAnimating] = useState(false)
  const sliderRef = useRef(null)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString())
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const splitTextIntoSpans = (selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.innerHTML = el.innerText
          .split('')
          .map((c) => `<span>${c === ' ' ? '&nbsp;' : c}</span>`)
          .join('')
      })
    }

    splitTextIntoSpans('.copy h1')
    const cards = gsap.utils.toArray('.card')
    const MAX_VISIBLE = 6
    const Y_STEP = 12
    const Z_STEP = 80

    cards.forEach((card, i) => {
      const y = Math.min(i, MAX_VISIBLE) * Y_STEP + '%'
      const z = Math.min(i, MAX_VISIBLE) * Z_STEP
      const scale = 1 - (MAX_VISIBLE - Math.min(i, MAX_VISIBLE)) * 0.02
      gsap.set(card, { y, z, scale })
    })

    const activeCard = cards[cards.length - 1]
    activeCard.classList.add('is-active')
    gsap.set(activeCard.querySelectorAll('span'), { y: 0 })
    const link = activeCard.querySelector('a')
    if (link) gsap.set(link, { opacity: 1 })

    if (activeCard.dataset.color) {
      const container = document.querySelector('.projects-container')
      if (container) {
        const color = darkenColor(activeCard.dataset.color)
        gsap.set(container, { backgroundColor: color })
      }
    }
  }, [])

  const MAX_VISIBLE = 6
  const Y_STEP = 12
  const Z_STEP = 80

  const darkenColor = (hex, amount = 0.3) => {
    const r = Math.floor(parseInt(hex.slice(1, 3), 16) * (1 - amount))
    const g = Math.floor(parseInt(hex.slice(3, 5), 16) * (1 - amount))
    const b = Math.floor(parseInt(hex.slice(5, 7), 16) * (1 - amount))
    return `rgb(${r}, ${g}, ${b})`
  }

  const repositionCards = (cards) => {
    cards.forEach((card, i) => {
      const y = Math.min(i, MAX_VISIBLE) * Y_STEP + '%'
      const z = Math.min(i, MAX_VISIBLE) * Z_STEP
      const scale = 1 - (MAX_VISIBLE - Math.min(i, MAX_VISIBLE)) * 0.02
      gsap.to(card, { y, z, scale, duration: 0.6, ease: 'power2.inOut' })
    })
  }

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    const slider = sliderRef.current
    const cards = gsap.utils.toArray('.card')
    const activeCard = cards[cards.length - 1]

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false)
    })

    tl.to(activeCard.querySelectorAll('span'), { y: 200, duration: 0.4, ease: 'power2.inOut' })
      .to(activeCard, { y: '100%', duration: 0.5, ease: 'power2.inOut' }, '<')
      .to(activeCard.querySelector('a'), { opacity: 0, duration: 0.2 }, '<')
      .add(() => {
        slider.prepend(activeCard)
        gsap.set(activeCard, { y: -100, scale: 0.9 })
        const updatedCards = gsap.utils.toArray('.card')
        updatedCards.forEach(card => card.classList.remove('is-active'))
        const newActive = updatedCards[updatedCards.length - 1]
        newActive.classList.add('is-active')
        repositionCards(updatedCards)
        if (newActive.dataset.color) {
          const container = document.querySelector('.projects-container')
          if (container) {
            gsap.to(container, { backgroundColor: darkenColor(newActive.dataset.color), duration: 0.8, ease: 'power2.out' })
          }
        }
        gsap.set(newActive.querySelectorAll('span'), { y: 200 })
        gsap.to(newActive.querySelectorAll('span'), { y: 0, duration: 0.4, ease: 'power2.inOut' })
        const link = newActive.querySelector('a')
        if (link) gsap.to(link, { opacity: 1, duration: 0.3, ease: 'power1.out' })
      })
  }

  const handlePrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    const slider = sliderRef.current
    const cards = gsap.utils.toArray('.card')
    const activeCard = cards[cards.length - 1]

    const link = activeCard.querySelector('a')
    if (link) gsap.to(link, { opacity: 0, duration: 0.2, ease: 'power1.out' })
    gsap.to(activeCard.querySelectorAll('span'), { y: 200, duration: 0.4, ease: 'power2.inOut' })

    const firstCard = cards[0]
    gsap.set(firstCard, { y: -100, scale: 0.9 })
    slider.append(firstCard)

    const updatedCards = gsap.utils.toArray('.card')
    updatedCards.forEach(card => card.classList.remove('is-active'))
    const newActive = updatedCards[updatedCards.length - 1]
    newActive.classList.add('is-active')
    repositionCards(updatedCards)
    if (newActive.dataset.color) {
      const container = document.querySelector('.projects-container')
      if (container) {
        gsap.to(container, { backgroundColor: darkenColor(newActive.dataset.color), duration: 0.8, ease: 'power2.out' })
      }
    }
    gsap.set(newActive.querySelectorAll('span'), { y: 200 })
    gsap.to(newActive.querySelectorAll('span'), { y: 0, duration: 0.4, ease: 'power2.inOut' })
    const newLink = newActive.querySelector('a')
    if (newLink) gsap.to(newLink, { opacity: 1, duration: 0.3, ease: 'power1.out' })
    setIsAnimating(false)
  }

  const projects = [
    { name: 'Diane', color: '#950404', bgColor: '#1a0c0f', link: 'https://tranquil-pothos-181adb.netlify.app/' },
    { name: 'AgriConnect', color: '#800000', bgColor: '#1F0F12', link: 'https://github.com/KareruRei/AgriConnect' },
    { name: 'Mr. Facilitator', color: '#5C1A1A', bgColor: '#1E1416', link: '#' },
    { name: 'Direct Clothing', color: '#451A1A', bgColor: '#282020', link: 'https://github.com/KareruRei/DirectClothing' },
    { name: 'Password Manager', color: '#2E1A1A', bgColor: '#202020', link: 'https://github.com/KareruRei/PasswordManager' },
    { name: 'Clearance', color: '#1A1A1A', bgColor: '#141414', link: 'https://karerurei.github.io/Clearance/' },
  ]

  return (
    <div className="projects-container bg-[#1A1A1A] text-white font-sans min-h-screen flex flex-col overflow-hidden transition-colors duration-[600ms] ease-in-out">
      <header className="flex justify-between items-center p-[40px_50px]">
        <div className="text-[32px] font-bold text-[#c0c0c0] font-satoshi">
          BUILDS
          <div className="text-sm text-[#888] mt-1 font-mono">
            <span>{currentTime}</span>
          </div>
        </div>
        <Link to="/" className="text-white no-underline text-sm border-b border-white">BACK</Link>
      </header>
      <div className="relative w-screen h-screen overflow-visible">
        <div ref={sliderRef} className="absolute top-[5vh] w-screen h-screen perspective-[1200px] perspective-origin-[50%_50%] pointer-events-none">
          {projects.map((project, index) => (
            <div
              key={index}
              className="card absolute top-[35%] left-[50%] w-[80%] h-[500px] transform-style-preserve-3d -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden bg-[rgba(26,26,26,0.35)] backdrop-blur-[14px] border border-[rgba(255,255,255,0.12)] shadow-[0_8px_32px_rgba(0,0,0,0.25)] text-white transition-all duration-10 ease-in-out"
              style={{ backgroundColor: project.bgColor }}
              data-color={project.color}
            >
              <div className="copy absolute top-[25%] left-[60%] -translate-x-1/2 -translate-y-1/2 w-full">
                <h1 className="text-left text-[50px] font-heavy tracking-[-0.05em] uppercase font-satoshi opacity-0 pointer-events-none">
                  {project.name}
                </h1>
              </div>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-[13px] relative top-[5%] left-[85%] no-underline text-white inline-block opacity-0 pointer-events-none">
                View Project
                <span className="ml-2 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">↗</span>
              </a>
            </div>
          ))}
        </div>
        <button onClick={handlePrev} className="side-btn absolute top-[35%] -translate-y-1/2 left-[100px] bg-transparent border-none text-white cursor-pointer z-[50] pointer-events-auto w-12 h-12 flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110" aria-label="Previous project">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button onClick={handleNext} className="side-btn absolute top-[35%] -translate-y-1/2 right-[100px] bg-transparent border-none text-white cursor-pointer z-[50] pointer-events-auto w-12 h-12 flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110" aria-label="Next project">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
      <style>{`
        .card.is-active h1,
        .card.is-active a {
          opacity: 1;
          pointer-events: auto;
        }
      `}</style>
    </div>
  )
}

export default Projects
