import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Contact() {
  const [currentTime, setCurrentTime] = useState('00:00:00')
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')

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
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <div className="bg-[#1a1a1a] text-white font-sans min-h-screen flex flex-col overflow-hidden data-[theme=light]:bg-[#f5f5f5] data-[theme=light]:text-[#1a1a1a]" data-theme={theme}>
      <header className="flex justify-between items-center p-[40px_50px]">
        <div className="text-[32px] font-semibold text-[#c0c0c0] leading-none font-satoshi data-[theme=light]:text-[#333]">
          CONNECT
          <div className="text-[13px] tracking-[1px] mt-2 text-[#777] font-mono">
            <span>{currentTime}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`bg-transparent border-none cursor-pointer flex items-center justify-center w-10 h-10
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
          <Link
            to="/"
            className="text-white no-underline text-sm tracking-[2px] border-b border-white pb-0.5 transition-colors duration-[2000ms] ease-in-out hover:text-[#888] data-[theme=light]:text-[#1a1a1a] data-[theme=light]:border-[#1a1a1a]"
            data-theme={theme}
          >
            BACK
          </Link>
        </div>
      </header>
      <div className="flex gap-[30px] justify-center items-center flex-1">
        <a
          data-social="X"
          style={{ '--accent-color': 'black' }}
          href="https://x.com/idk_kareru"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#c0c0c0] p-4 rounded-full h-[100px] w-[100px] box-border flex-shrink-0 grid place-items-center relative group hover:bg-[var(--accent-color)] hover:fill-white transition-all duration-[200ms] ease-[cubic-bezier(.42,0,.44,1.68)]"
        >
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[50px] w-[50px]"
          >
            <title>X</title>
            <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
          </svg>
          <span className="absolute bg-[var(--accent-color)] text-white no-underline py-2 px-4 rounded-full -translate-y-10 rotate-[25deg] opacity-0 transition-all duration-[200ms] ease-[cubic-bezier(.42,0,.44,1.68)] group-hover:-translate-y-20 group-hover:rotate-0 group-hover:opacity-100 pointer-events-none">
            X
          </span>
          <span className="absolute w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent border-t-[var(--accent-color)] translate-y-0 rotate-[25deg] opacity-0 transition-all duration-[200ms] ease-[cubic-bezier(.42,0,.44,1.68)] group-hover:-translate-y-[60px] group-hover:rotate-0 group-hover:opacity-100 pointer-events-none"></span>
        </a>
        <a
          data-social="Github"
          style={{ '--accent-color': '#888' }}
          href="https://github.com/KareruRei"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#c0c0c0] p-4 rounded-full h-[100px] w-[100px] box-border flex-shrink-0 grid place-items-center relative group hover:bg-[var(--accent-color)] hover:fill-white transition-all duration-[200ms] ease-[cubic-bezier(.42,0,.44,1.68)]"
        >
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[50px] w-[50px]"
          >
            <title>GitHub</title>
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
          <span className="absolute bg-[var(--accent-color)] text-white no-underline py-2 px-4 rounded-full -translate-y-10 rotate-[25deg] opacity-0 transition-all duration-[200ms] ease-[cubic-bezier(.42,0,.44,1.68)] group-hover:-translate-y-20 group-hover:rotate-0 group-hover:opacity-100 pointer-events-none">
            Github
          </span>
          <span className="absolute w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent border-t-[var(--accent-color)] translate-y-0 rotate-[25deg] opacity-0 transition-all duration-[200ms] ease-[cubic-bezier(.42,0,.44,1.68)] group-hover:-translate-y-[60px] group-hover:rotate-0 group-hover:opacity-100 pointer-events-none"></span>
        </a>
        <a
          data-social="Discord"
          style={{ '--accent-color': 'rgb(128, 84, 251)' }}
          href="https://discord.com/users/748762806232285305"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#c0c0c0] p-4 rounded-full h-[100px] w-[100px] box-border flex-shrink-0 grid place-items-center relative group hover:bg-[var(--accent-color)] hover:fill-white transition-all duration-[200ms] ease-[cubic-bezier(.42,0,.44,1.68)]"
        >
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[50px] w-[50px]"
          >
            <title>Discord</title>
            <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
          </svg>
          <span className="absolute bg-[var(--accent-color)] text-white no-underline py-2 px-4 rounded-full -translate-y-10 rotate-[25deg] opacity-0 transition-all duration-[200ms] ease-[cubic-bezier(.42,0,.44,1.68)] group-hover:-translate-y-20 group-hover:rotate-0 group-hover:opacity-100 pointer-events-none">
            Discord
          </span>
          <span className="absolute w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent border-t-[var(--accent-color)] translate-y-0 rotate-[25deg] opacity-0 transition-all duration-[200ms] ease-[cubic-bezier(.42,0,.44,1.68)] group-hover:-translate-y-[60px] group-hover:rotate-0 group-hover:opacity-100 pointer-events-none"></span>
        </a>
        <a
          data-social="LinkedIn"
          style={{ '--accent-color': 'rgb(94, 94, 243)' }}
          href="https://www.linkedin.com/in/royceelacuesta/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#c0c0c0] p-4 rounded-full h-[100px] w-[100px] box-border flex-shrink-0 grid place-items-center relative group hover:bg-[var(--accent-color)] hover:fill-white transition-all duration-[200ms] ease-[cubic-bezier(.42,0,.44,1.68)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            className="h-[50px] w-[50px]"
          >
            <path
              fill="#000000"
              d="M512 96L127.9 96C110.3 96 96 110.5 96 128.3L96 511.7C96 529.5 110.3 544 127.9 544L512 544C529.6 544 544 529.5 544 511.7L544 128.3C544 110.5 529.6 96 512 96zM231.4 480L165 480L165 266.2L231.5 266.2L231.5 480L231.4 480zM198.2 160C219.5 160 236.7 177.2 236.7 198.5C236.7 219.8 219.5 237 198.2 237C176.9 237 159.7 219.8 159.7 198.5C159.7 177.2 176.9 160 198.2 160zM480.3 480L413.9 480L413.9 376C413.9 351.2 413.4 319.3 379.4 319.3C344.8 319.3 339.5 346.3 339.5 374.2L339.5 480L273.1 480L273.1 266.2L336.8 266.2L336.8 295.4L337.7 295.4C346.6 278.6 368.3 260.9 400.6 260.9C467.8 260.9 480.3 305.2 480.3 362.8L480.3 480z"
            />
          </svg>
          <span className="absolute bg-[var(--accent-color)] text-white no-underline py-2 px-4 rounded-full -translate-y-10 rotate-[25deg] opacity-0 transition-all duration-[200ms] ease-[cubic-bezier(.42,0,.44,1.68)] group-hover:-translate-y-20 group-hover:rotate-0 group-hover:opacity-100 pointer-events-none">
            LinkedIn
          </span>
          <span className="absolute w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent border-t-[var(--accent-color)] translate-y-0 rotate-[25deg] opacity-0 transition-all duration-[200ms] ease-[cubic-bezier(.42,0,.44,1.68)] group-hover:-translate-y-[60px] group-hover:rotate-0 group-hover:opacity-100 pointer-events-none"></span>
        </a>
        <a
          data-social="Instagram"
          style={{ '--accent-color': '#E20098' }}
          href="https://www.instagram.com/ww.yhgh/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#c0c0c0] p-4 rounded-full h-[100px] w-[100px] box-border flex-shrink-0 grid place-items-center relative group hover:bg-[var(--accent-color)] hover:fill-white transition-all duration-[200ms] ease-[cubic-bezier(.42,0,.44,1.68)]"
        >
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[50px] w-[50px]"
          >
            <title>Instagram</title>
            <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
          </svg>
          <span className="absolute bg-[var(--accent-color)] text-white no-underline py-2 px-4 rounded-full -translate-y-10 rotate-[25deg] opacity-0 transition-all duration-[200ms] ease-[cubic-bezier(.42,0,.44,1.68)] group-hover:-translate-y-20 group-hover:rotate-0 group-hover:opacity-100 pointer-events-none">
            Instagram
          </span>
          <span className="absolute w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent border-t-[var(--accent-color)] translate-y-0 rotate-[25deg] opacity-0 transition-all duration-[200ms] ease-[cubic-bezier(.42,0,.44,1.68)] group-hover:-translate-y-[60px] group-hover:rotate-0 group-hover:opacity-100 pointer-events-none"></span>
        </a>
      </div>
      <footer className="flex justify-between p-[40px_50px] text-xs tracking-[1px] mt-auto">
        <div className="flex flex-col items-start gap-[5px] text-[#888]">
          <a
            href="https://www.linkedin.com/in/royceelacuesta/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#888] no-underline transition-colors duration-300 ease-in-out hover:text-white group"
          >
            LINKEDIN <span className="opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">↗</span>
          </a>
          <a
            href="https://github.com/KareruRei"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#888] no-underline transition-colors duration-300 ease-in-out hover:text-white group"
          >
            GITHUB <span className="opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">↗</span>
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Contact

