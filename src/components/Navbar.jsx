import { AnimatePresence, motion } from 'framer-motion'
import {
  BadgeCheck,
  BriefcaseBusiness,
  Calculator,
  CalendarClock,
  CarFront,
  Home,
  Mail,
  MapPin,
  MapPinned,
  Menu,
  Phone,
  Star,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import logo from '/logo/ats-logo.png'

const navLinks = [
  { label: 'Home', href: '#home', icon: Home },
  { label: 'About Us', href: '#about', icon: BadgeCheck },
  { label: 'Services', href: '#services', icon: BriefcaseBusiness },
  { label: 'Fleet', href: '#fleet', icon: CarFront },
  { label: 'Cities', href: '#city-booking', icon: MapPinned },
  { label: 'Price Estimate', href: '#price-estimate', icon: Calculator },
  { label: 'Booking', href: '#booking', icon: CalendarClock },
  { label: 'Contact', href: '#contact', icon: Phone },
]

function Navbar({ whatsappLink }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('#home')

  useEffect(() => {
    const sections = navLinks
      .map((item) => document.querySelector(item.href))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(`#${entry.target.id}`)
          }
        })
      },
      { threshold: 0.45 },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1201) {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleNavClick = (href) => {
    setActiveLink(href)
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-[260] border-b border-[rgba(245,184,65,0.28)] bg-[#06152f]">
      <div className="border-b border-[rgba(245,184,65,0.35)] bg-[#06152f]">
        <div className="mx-auto w-full max-w-[1440px] px-6">
          <div className="hide-scrollbar flex items-center gap-3 overflow-x-auto py-2 text-[10px] font-semibold text-[#c7d2fe] sm:text-[11px] min-[1201px]:overflow-visible">
            <span className="flex items-center gap-1 whitespace-nowrap text-[#f5b841]">
              <Star size={12} className="text-[#f5b841]" /> Refreshment at Your Tour
            </span>
            <span className="whitespace-nowrap">KFC Refreshment Free of Cost</span>
            <span className="flex items-center gap-1 whitespace-nowrap">
              <Phone size={12} /> 0311-4000477
            </span>
            <span className="flex items-center gap-1 whitespace-nowrap">
              <Phone size={12} /> 0300-9474048
            </span>
            <span className="flex items-center gap-1 whitespace-nowrap">
              <MapPin size={12} /> Office: 0331-6114747
            </span>
            <span className="flex items-center gap-1 whitespace-nowrap">
              <Mail size={12} /> ARHAMTRANSPORT477@GMAIL.COM
            </span>
          </div>
        </div>
      </div>

      <div className="bg-[#081b3d]">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-3">
          <div className="rounded-2xl border border-[rgba(245,184,65,0.26)] bg-[#081b3d] px-4 py-3 shadow-[0_18px_30px_-24px_rgba(0,0,0,0.9)]">
            <div className="hidden min-[1201px]:grid min-[1201px]:grid-cols-[minmax(280px,auto)_minmax(0,1fr)_auto] min-[1201px]:items-center min-[1201px]:gap-3">
              <a href="#home" className="relative min-w-0 shrink-0">
                <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-[rgba(245,184,65,0.15)] to-[rgba(245,184,65,0.05)] blur-lg opacity-60 -z-10" />
                <img
                  src={logo}
                  alt="Arham Transport Services Logo"
                  className="h-auto max-h-[70px] w-auto object-contain drop-shadow-lg"
                />
              </a>

              <nav className="min-w-0 overflow-hidden">
                <ul className="flex items-start justify-center gap-0.5 whitespace-nowrap xl:gap-1">
                  {navLinks.map((link) => {
                    const Icon = link.icon
                    const isActive = activeLink === link.href

                    return (
                      <li key={link.href} className="shrink-0">
                        <a
                          href={link.href}
                          onClick={() => handleNavClick(link.href)}
                          className="group flex w-[58px] flex-col items-center rounded-xl px-0.5 py-1 transition hover:bg-[rgba(245,184,65,0.1)] xl:w-[66px]"
                        >
                          <Icon
                            size={13}
                            className={
                              isActive ? 'text-[#f5b841]' : 'text-[#c7d2fe] transition group-hover:text-[#f5b841]'
                            }
                          />
                          <span
                            className={`mt-1 text-center text-[10px] font-bold leading-3 ${
                              isActive
                                ? 'text-[#f5b841]'
                                : 'text-[#c7d2fe] transition group-hover:text-[#ffffff]'
                            }`}
                          >
                            {link.label}
                          </span>
                          <span
                            className={`mt-1 h-[2px] w-8 rounded-full transition ${
                              isActive ? 'bg-[#f5b841]' : 'bg-transparent group-hover:bg-[rgba(245,184,65,0.4)]'
                            }`}
                          />
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </nav>

              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-[188px] shrink-0 items-center justify-center whitespace-nowrap rounded-2xl bg-[#16a34a] px-4 py-3 text-sm font-bold uppercase tracking-[0.05em] text-[#ffffff] transition hover:bg-[#15803d]"
                >
                  WhatsApp Booking
                </a>
                <a
                  href="#booking"
                  className="inline-flex w-[132px] shrink-0 items-center justify-center whitespace-nowrap rounded-2xl bg-[#f5b841] px-4 py-3 text-sm font-bold uppercase tracking-[0.05em] text-[#06152f] transition hover:bg-[#e0a12d]"
                >
                  Book Now
                </a>
              </div>
            </div>

            <div className="min-[1201px]:hidden">
              <div className="flex items-center justify-between gap-3">
                <a href="#home" className="relative min-w-0 flex-1">
                  <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-[rgba(245,184,65,0.1)] to-[rgba(245,184,65,0.03)] blur-md opacity-50 -z-10" />
                  <img
                    src={logo}
                    alt="Arham Transport Services Logo"
                    className="h-auto max-h-[50px] sm:max-h-[55px] w-auto object-contain drop-shadow-lg"
                  />
                </a>

                <button
                  type="button"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[rgba(245,184,65,0.5)] bg-[#081b3d] text-[#ffffff] transition hover:text-[#f5b841]"
                  onClick={() => setIsOpen((prev) => !prev)}
                  aria-expanded={isOpen}
                  aria-label="Toggle menu"
                >
                  {isOpen ? <X size={21} /> : <Menu size={21} />}
                </button>
              </div>

              <div className="mt-3 grid gap-2 min-[430px]:grid-cols-2">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-[#16a34a] px-4 py-2.5 text-sm font-bold uppercase tracking-[0.05em] text-[#ffffff]"
                >
                  WhatsApp Booking
                </a>
                <a
                  href="#booking"
                  className="inline-flex items-center justify-center rounded-xl bg-[#f5b841] px-4 py-2.5 text-sm font-bold uppercase tracking-[0.05em] text-[#06152f]"
                >
                  Book Now
                </a>
              </div>

              <AnimatePresence>
                {isOpen ? (
                  <motion.div
                    className="mt-3 border-t border-[rgba(245,184,65,0.25)] pt-3"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.24, ease: 'easeInOut' }}
                  >
                    <nav className="grid gap-2">
                      {navLinks.map((link) => {
                        const Icon = link.icon
                        const isActive = activeLink === link.href

                        return (
                          <a
                            key={link.href}
                            href={link.href}
                            onClick={() => handleNavClick(link.href)}
                            className={`flex items-center gap-3 rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                              isActive
                                ? 'border-[rgba(245,184,65,0.55)] bg-[rgba(245,184,65,0.12)] text-[#f5b841]'
                                : 'border-[rgba(199,210,254,0.22)] bg-[rgba(8,27,61,0.75)] text-[#c7d2fe] hover:border-[rgba(245,184,65,0.45)] hover:text-[#ffffff]'
                            }`}
                          >
                            <Icon size={16} className={isActive ? 'text-[#f5b841]' : 'text-[#c7d2fe]'} />
                            {link.label}
                          </a>
                        )
                      })}
                    </nav>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
