import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/', label: 'Home' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/servicos', label: 'Serviços' },
  { to: '/equipe', label: 'Equipe' },
  { to: '/contato', label: 'Contato' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [blur, setBlur] = useState(0)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      setBlur(Math.min(y / 20, 16))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[9980]"
        style={{
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
          background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
          boxShadow: scrolled ? '0 1px 0 rgba(27,79,114,0.08)' : 'none',
          transition: 'background 0.3s, box-shadow 0.3s',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--ocean)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.5 2 6 5 6 8c0 5 3 8 6 14 3-6 6-9 6-14 0-3-2.5-6-6-6z" fill="#C9A84C" />
                <circle cx="12" cy="8" r="2" fill="white" />
              </svg>
            </div>
            <span
              className="font-playfair font-bold text-xl tracking-tight"
              style={{ color: scrolled ? 'var(--ocean)' : (location.pathname === '/' ? 'white' : 'var(--ocean)') }}
            >
              Oral <span style={{ color: 'var(--gold)' }}>Vida</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `relative font-dm text-sm font-medium tracking-wide group ${isActive ? 'nav-link-active' : ''}`
                }
                style={({ isActive }) => ({
                  color: isActive
                    ? 'var(--gold)'
                    : scrolled
                    ? 'var(--text-main)'
                    : location.pathname === '/'
                    ? 'rgba(255,255,255,0.85)'
                    : 'var(--text-main)',
                })}
              >
                {({ isActive }) => (
                  <>
                    {label}
                    <span
                      className="absolute -bottom-1 left-0 h-[2px] w-full origin-left transition-transform duration-300"
                      style={{
                        background: 'var(--gold)',
                        transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                      }}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              to="/contato"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-dm font-semibold tracking-wide transition-all duration-300 hover:opacity-90 hover:shadow-lg"
              style={{ background: 'var(--ocean)' }}
            >
              Agendar
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden flex flex-col gap-[5px] p-2 z-10"
              aria-label="Menu"
            >
              <motion.span
                animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }}
                className="block h-[2px] w-6 bg-current origin-center"
                style={{ color: location.pathname === '/' && !scrolled ? 'white' : 'var(--ocean)' }}
              />
              <motion.span
                animate={{ opacity: open ? 0 : 1 }}
                className="block h-[2px] w-6 bg-current"
                style={{ color: location.pathname === '/' && !scrolled ? 'white' : 'var(--ocean)' }}
              />
              <motion.span
                animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }}
                className="block h-[2px] w-6 bg-current origin-center"
                style={{ color: location.pathname === '/' && !scrolled ? 'white' : 'var(--ocean)' }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9970] md:hidden flex flex-col"
            style={{ background: 'var(--ocean)' }}
          >
            <div className="h-16 flex items-center px-6 justify-between">
              <span className="font-playfair font-bold text-xl text-white">
                Oral <span style={{ color: 'var(--gold)' }}>Vida</span>
              </span>
              <button onClick={() => setOpen(false)} className="text-white p-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col items-center justify-center flex-1 gap-8">
              {links.map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.07, ease: [0.76, 0, 0.24, 1] }}
                >
                  <Link
                    to={to}
                    className="font-playfair text-3xl font-bold text-white hover:text-yellow-300 transition-colors"
                    style={{ color: location.pathname === to ? 'var(--gold)' : undefined }}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <Link
                  to="/contato"
                  className="mt-4 inline-block px-8 py-3 rounded-full font-dm font-semibold text-ocean tracking-wide"
                  style={{ background: 'var(--gold)' }}
                >
                  Agendar Consulta
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
