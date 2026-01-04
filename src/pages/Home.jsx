import { useEffect, useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { gsap } from 'gsap'

function Home() {
  const [currentTime, setCurrentTime] = useState('08:44:59')
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')
  const [progress, setProgress] = useState(0)
  const [showLoader, setShowLoader] = useState(true)
  const [appVisible, setAppVisible] = useState(false)
  const appRef = useRef(null)
  const cardsRef = useRef([])
  const pagesRef = useRef([])
  const navigate = useNavigate()

  useEffect(() => {
    // Loader animation
    const duration = 1800
    const start = performance.now()

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3)
    }

    function animateLoader(time) {
      const elapsed = time - start
      const t = Math.min(elapsed / duration, 1)
      const newProgress = Math.floor(easeOutCubic(t) * 100)
      setProgress(newProgress)

      if (t < 1) {
        requestAnimationFrame(animateLoader)
      } else {
        document.body.classList.remove('loading')
        document.body.classList.add('loaded')
        setTimeout(() => {
          setShowLoader(false)
          setAppVisible(true)
        }, 1000)
      }
    }

    document.body.classList.add('loading')
    requestAnimationFrame(animateLoader)
  }, [])

  useEffect(() => {
    // Time update
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString())
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Theme setup
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const COLLAPSED_WIDTH = 75
  const EXPANDED_WIDTH = 320

  const collapseAll = () => {
    cardsRef.current.forEach((card, index) => {
      if (!card) return
      card.classList.remove('active')
      gsap.to(card, {
        width: COLLAPSED_WIDTH,
        scale: 1,
        opacity: 0.6,
        boxShadow: '0 0 0 rgba(0,0,0,0)',
        duration: 0.4,
        ease: 'power2.out',
      })

      const span = card.querySelector('span')
      if (span) {
        gsap.to(span, {
          rotate: -90,
          duration: 0.4,
          ease: 'power2.out',
        })
      }
    })

    pagesRef.current.forEach((p) => {
      if (p) p.setAttribute('data-active', 'false')
    })
  }

  const handleCardClick = (index, e) => {
    const card = cardsRef.current[index]
    if (!card) return

    const isActive = card.classList.contains('active')

    if (!isActive) {
      e.preventDefault()
      collapseAll()

      card.classList.add('active')
      if (pagesRef.current[index]) {
        pagesRef.current[index].setAttribute('data-active', 'true')
      }

      gsap.to(card, {
        width: EXPANDED_WIDTH,
        scale: 1.05,
        opacity: 1,
        boxShadow: '0 25px 60px rgba(0,0,0,0.45)',
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      })

      const span = card.querySelector('span')
      if (span) {
        gsap.to(span, {
          rotate: 0,
          duration: 0.6,
          ease: 'power2.out',
        })
      }

      card.scrollIntoView({ behavior: 'smooth', inline: 'center' })
    } else {
      // Second click - navigate
      e.preventDefault()
      const routes = ['/about', '/projects', '/contact']
      navigate(routes[index])
    }
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      const clickedInside = cardsRef.current.some((card) =>
        card && card.contains(e.target)
      )

      if (!clickedInside) {
        collapseAll()
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [appVisible])

  return (
    <>
      {showLoader && (
        <div
          className="fixed inset-0 bg-[#1A1A1A] grid place-items-center z-[9999] transition-opacity duration-1000 ease-in-out"
          style={{ opacity: showLoader ? 1 : 0, pointerEvents: showLoader ? 'auto' : 'none' }}
        >
          <div className="text-[64px] tracking-[4px] text-white font-light font-mono">
            {progress}
          </div>
        </div>
      )}
      <div
        ref={appRef}
        className="min-h-screen flex flex-col transition-opacity duration-1000 ease-in-out"
        style={{ opacity: appVisible ? 1 : 0 }}
      >
        <header className="flex justify-center items-center p-[40px_50px] relative">
          <div className="text-[32px] font-bold tracking-[2px] text-[#c0c0c0] absolute left-[50px] font-satoshi">
            KARERU <br />
            <div className="text-[14px] font-normal tracking-[1px] mt-1 text-[#888] font-mono">
              <span>{currentTime}</span>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center p-[20px_50px] overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-none">
            <div className="flex gap-[10px] items-center p-0 min-w-min">
              <div
                ref={(el) => (pagesRef.current[0] = el)}
                className="page bg-[#666] cursor-pointer flex-shrink-0 w-[3px] h-[15px] transition-all duration-[600ms] ease-[cubic-bezier(.22,.61,.36,1)]"
                data-theme={theme}
                data-active="false"
              ></div>
              <div
                ref={(el) => (pagesRef.current[1] = el)}
                className="page bg-[#666] cursor-pointer flex-shrink-0 w-[3px] h-[15px] transition-all duration-[600ms] ease-[cubic-bezier(.22,.61,.36,1)]"
                data-theme={theme}
                data-active="false"
              ></div>
              <div
                ref={(el) => (pagesRef.current[2] = el)}
                className="page bg-[#666] cursor-pointer flex-shrink-0 w-[3px] h-[15px] transition-all duration-[600ms] ease-[cubic-bezier(.22,.61,.36,1)]"
                data-theme={theme}
                data-active="false"
              ></div>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className={`absolute right-[50px] bg-transparent border-none cursor-pointer flex items-center justify-center w-10 h-10
              transition-transform duration-300 ease-in-out hover:scale-110
              ${theme === 'light' ? 'text-black' : 'text-white'}
            `}
            aria-label="Toggle dark/light mode"
          >
            <svg
              className={`absolute w-6 h-6 stroke-current stroke-2 fill-none stroke-linecap-round stroke-linejoin-round transition-all duration-300 ${
                theme === 'light' ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'
              }`}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
            <svg
              className={`absolute w-6 h-6 stroke-current stroke-2 fill-none stroke-linecap-round stroke-linejoin-round transition-all duration-300 ${
                theme === 'light' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'
              }`}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>
        </header>
        <div className="flex-1 flex items-center justify-center p-[20px_50px] overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-none">
          <div className="flex gap-[15px] items-center w-fit">
            <div
              ref={(el) => (cardsRef.current[0] = el)}
              className="gallery-item w-[75px] h-[230px] bg-gradient-to-b from-[#777] to-[#555] rounded-[14px] cursor-pointer overflow-hidden relative flex-shrink-0 transition-all duration-[550ms] ease-[cubic-bezier(.22,.61,.36,1)] data-[theme=light]:bg-[#ddd]"
              data-theme={theme}
            >
              <Link
                to="/about"
                onClick={(e) => handleCardClick(0, e)}
                className="absolute inset-0 flex items-center justify-center no-underline"
              >
                <span className="text-[18px] font-semibold tracking-[2px] rotate-[-90deg] origin-center whitespace-nowrap text-white font-inter transition-transform duration-[550ms] ease-[cubic-bezier(.22,.61,.36,1)]">
                  Me
                </span>
              </Link>
            </div>
            <div
              ref={(el) => (cardsRef.current[1] = el)}
              className="gallery-item w-[75px] h-[230px] bg-gradient-to-b from-[#777] to-[#555] rounded-[14px] cursor-pointer overflow-hidden relative flex-shrink-0 transition-all duration-[550ms] ease-[cubic-bezier(.22,.61,.36,1)] data-[theme=light]:bg-[#ddd]"
              data-theme={theme}
            >
              <Link
                to="/projects"
                onClick={(e) => handleCardClick(1, e)}
                className="absolute inset-0 flex items-center justify-center no-underline"
              >
                <span className="text-[18px] font-semibold tracking-[2px] rotate-[-90deg] origin-center whitespace-nowrap text-white font-inter transition-transform duration-[550ms] ease-[cubic-bezier(.22,.61,.36,1)]">
                  Builds
                </span>
              </Link>
            </div>
            <div
              ref={(el) => (cardsRef.current[2] = el)}
              className="gallery-item w-[75px] h-[230px] bg-gradient-to-b from-[#777] to-[#555] rounded-[14px] cursor-pointer overflow-hidden relative flex-shrink-0 transition-all duration-[550ms] ease-[cubic-bezier(.22,.61,.36,1)] data-[theme=light]:bg-[#ddd]"
              data-theme={theme}
            >
              <Link
                to="/contact"
                onClick={(e) => handleCardClick(2, e)}
                className="absolute inset-0 flex items-center justify-center no-underline"
              >
                <span className="text-[18px] font-semibold tracking-[2px] rotate-[-90deg] origin-center whitespace-nowrap text-white font-inter transition-transform duration-[550ms] ease-[cubic-bezier(.22,.61,.36,1)]">
                  Connect
                </span>
              </Link>
            </div>
          </div>
        </div>
        <footer className="flex justify-between p-[40px_50px] text-[12px] tracking-[1px] mt-auto">
          <div className="flex flex-col items-start gap-[5px] text-[#888] data-[theme=light]:text-[#666]">
            <div>ROYCEE LACUESTA</div>
            <div>CS241</div>
          </div>
          <div className="flex flex-col items-end gap-[5px]">
            <a
              href="https://www.linkedin.com/in/royceelacuesta/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888] no-underline transition-colors duration-300 ease-in-out hover:text-white group"
              data-theme={theme}
            >
              LINKEDIN <span className="arrow opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">↗</span>
            </a>
            <a
              href="https://github.com/KareruRei"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888] no-underline transition-colors duration-300 ease-in-out hover:text-white group"
              data-theme={theme}
            >
              GITHUB <span className="arrow opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">↗</span>
            </a>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Home

