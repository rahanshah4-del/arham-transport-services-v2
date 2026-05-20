import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeftRight,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  Images,
  Pause,
  Play,
  Users,
  Wind,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { carPricing } from '../data/fareData'
import { fleetCars } from '../data/fleet'
import { getVehicleRates } from '../utils/fareCalculator'
import SectionHeading from './SectionHeading'

const COASTER_NAME = 'Toyota Coaster Pakistan'
const SWIPE_THRESHOLD = 45

function CoasterGalleryModal({ isOpen, onClose, images, title }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoSlide, setAutoSlide] = useState(true)
  const [touchStartX, setTouchStartX] = useState(null)
  const [touchEndX, setTouchEndX] = useState(null)

  const totalImages = images.length

  const goToIndex = (index) => {
    if (!totalImages) {
      return
    }

    const normalized = (index + totalImages) % totalImages
    setCurrentIndex(normalized)
  }

  const goNext = () => goToIndex(currentIndex + 1)
  const goPrevious = () => goToIndex(currentIndex - 1)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    setCurrentIndex(0)
    setAutoSlide(true)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || !autoSlide || totalImages <= 1) {
      return
    }

    const timer = window.setInterval(() => {
      setCurrentIndex((previous) => (previous + 1) % totalImages)
    }, 3500)

    return () => window.clearInterval(timer)
  }, [autoSlide, isOpen, totalImages])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }

      if (event.key === 'ArrowRight') {
        goNext()
      }

      if (event.key === 'ArrowLeft') {
        goPrevious()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  const onTouchStart = (event) => {
    setTouchEndX(null)
    setTouchStartX(event.touches[0].clientX)
  }

  const onTouchMove = (event) => {
    setTouchEndX(event.touches[0].clientX)
  }

  const onTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) {
      return
    }

    const delta = touchStartX - touchEndX

    if (Math.abs(delta) < SWIPE_THRESHOLD) {
      return
    }

    if (delta > 0) {
      goNext()
    } else {
      goPrevious()
    }
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[420] bg-[rgba(2,10,26,0.9)] p-3 backdrop-blur-sm sm:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="mx-auto flex h-full w-full max-w-6xl flex-col rounded-3xl border border-[rgba(245,184,65,0.35)] bg-[linear-gradient(170deg,rgba(8,27,61,0.96),rgba(6,21,47,0.96))] p-3 sm:p-5"
            initial={{ y: 26, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5B841]">Coaster Gallery</p>
                <h3 className="truncate font-heading text-lg font-bold text-[#FFFFFF] sm:text-2xl">{title}</h3>
              </div>

              <div className="flex items-center gap-2">
                <p className="rounded-lg border border-[rgba(245,184,65,0.35)] px-3 py-1 text-sm font-semibold text-[#FFFFFF]">
                  {currentIndex + 1} / {totalImages}
                </p>

                <button
                  type="button"
                  onClick={() => setAutoSlide((previous) => !previous)}
                  className="inline-flex items-center gap-1 rounded-lg border border-[rgba(245,184,65,0.45)] bg-[rgba(245,184,65,0.12)] px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-[#F5B841] transition hover:bg-[rgba(245,184,65,0.2)]"
                >
                  {autoSlide ? <Pause size={14} /> : <Play size={14} />}
                  {autoSlide ? 'Auto On' : 'Auto Off'}
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[rgba(245,184,65,0.45)] text-[#FFFFFF] transition hover:bg-[rgba(245,184,65,0.16)] hover:text-[#F5B841]"
                  aria-label="Close Coaster gallery"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="relative min-h-0 flex-1">
              <button
                type="button"
                onClick={goPrevious}
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[rgba(245,184,65,0.45)] bg-[rgba(6,21,47,0.86)] p-2 text-[#FFFFFF] transition hover:bg-[rgba(245,184,65,0.16)] hover:text-[#F5B841]"
                aria-label="Previous coaster image"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={goNext}
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[rgba(245,184,65,0.45)] bg-[rgba(6,21,47,0.86)] p-2 text-[#FFFFFF] transition hover:bg-[rgba(245,184,65,0.16)] hover:text-[#F5B841]"
                aria-label="Next coaster image"
              >
                <ChevronRight size={20} />
              </button>

              <div
                className="relative h-full overflow-hidden rounded-2xl border border-[rgba(245,184,65,0.28)] bg-[rgba(4,14,34,0.82)]"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={images[currentIndex]}
                    src={images[currentIndex]}
                    alt={`${title} image ${currentIndex + 1}`}
                    className="h-full w-full object-cover transition duration-500 md:hover:scale-110"
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.985 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-3">
              <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1">
                {images.map((image, index) => (
                  <button
                    type="button"
                    key={image}
                    onClick={() => goToIndex(index)}
                    className={`shrink-0 overflow-hidden rounded-xl border transition ${
                      index === currentIndex
                        ? 'border-[rgba(245,184,65,0.9)]'
                        : 'border-[rgba(199,210,254,0.25)] hover:border-[rgba(245,184,65,0.5)]'
                    }`}
                    aria-label={`Show coaster image ${index + 1}`}
                  >
                    <img
                      src={image}
                      alt={`Coaster thumbnail ${index + 1}`}
                      className="h-16 w-24 object-cover sm:h-20 sm:w-32"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function FleetSection() {
  const [isCoasterGalleryOpen, setIsCoasterGalleryOpen] = useState(false)

  const coasterGalleryImages = useMemo(() => {
    const coaster = fleetCars.find((item) => item.name === COASTER_NAME)
    return coaster?.gallery ?? []
  }, [])

  return (
    <section id="fleet" className="section-wrap py-20 lg:py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow="Fleet"
          title="Premium Vehicle Collection"
          description="Explore our modern fleet with per KM rates, return rates, and comfort details for every booking type."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {fleetCars.map((car, index) => {
            const rates = getVehicleRates(car.name, carPricing)
            const isCoaster = car.name === COASTER_NAME

            return (
              <motion.article
                key={car.name}
                className={`glass-panel blue-glow h-full ${isCoaster ? 'cursor-pointer' : ''}`}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                whileHover={{ y: -6 }}
                onClick={isCoaster ? () => setIsCoasterGalleryOpen(true) : undefined}
                role={isCoaster ? 'button' : undefined}
                tabIndex={isCoaster ? 0 : undefined}
                onKeyDown={
                  isCoaster
                    ? (event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          setIsCoasterGalleryOpen(true)
                        }
                      }
                    : undefined
                }
              >
                <div className="relative overflow-hidden rounded-2xl border border-[rgba(245,184,65,0.2)]">
                  <img
                    src={car.image}
                    alt={`${car.name} available for booking`}
                    className="h-48 w-full object-cover transition duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  {isCoaster ? (
                    <div className="absolute inset-x-3 bottom-3">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation()
                          setIsCoasterGalleryOpen(true)
                        }}
                        className="inline-flex items-center gap-1 rounded-full border border-[rgba(245,184,65,0.55)] bg-[rgba(6,21,47,0.88)] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[#F5B841] transition hover:bg-[rgba(245,184,65,0.18)]"
                      >
                        <Images size={14} /> View Coaster Gallery
                      </button>
                    </div>
                  ) : null}
                </div>

                <h3 className="mt-4 font-heading text-xl font-bold leading-snug text-[#FFFFFF]">{car.name}</h3>

                <div className="mt-4 grid gap-2 text-sm text-[#C7D2FE]">
                  <p className="glass-soft flex items-center gap-2">
                    <Users size={16} className="text-[#F5B841]" /> {car.passengers}
                  </p>
                  <p className="glass-soft flex items-center gap-2">
                    <BriefcaseBusiness size={16} className="text-[#F5B841]" /> {car.luggage}
                  </p>
                  <p className="glass-soft flex items-center gap-2">
                    <Wind size={16} className="text-[#F5B841]" /> {car.ac}
                  </p>
                  <p className="glass-soft">{car.bestUse}</p>
                </div>

                <div className="mt-4 grid gap-2 text-sm">
                  <p className="glass-soft text-[#FFFFFF]">
                    <span className="font-semibold text-[#F5B841]">Per KM Rate:</span>{' '}
                    {rates ? `${rates.oneWayRate.toFixed(2)} PKR (One Way)` : 'N/A'}
                  </p>
                  <p className="glass-soft text-[#FFFFFF]">
                    <span className="font-semibold text-[#F5B841]">Return Rate:</span>{' '}
                    {rates
                      ? rates.upDownRate
                        ? `${rates.returnRate.toFixed(2)} PKR per KM (Up & Down)`
                        : `${rates.returnRate.toFixed(2)} PKR per KM`
                      : 'N/A'}
                  </p>
                  <p className="glass-soft flex items-center gap-2 text-[#C7D2FE]">
                    <ArrowLeftRight size={15} className="text-[#F5B841]" />
                    One Way and Return booking available
                  </p>
                </div>

                {isCoaster ? (
                  <div className="mt-4 rounded-2xl border border-[rgba(245,184,65,0.33)] bg-[rgba(245,184,65,0.08)] p-3 text-sm text-[#FFFFFF]">
                    <p className="font-heading text-base font-bold text-[#F5B841]">Toyota Coaster Pakistan</p>
                    <p className="mt-1">20 Seats</p>
                    <p className="mt-1 text-[#C7D2FE]">
                      Best for group tours, weddings, company transport and long routes.
                    </p>
                    <p className="mt-2 font-bold text-[#FFFFFF]">Rate: 300 PKR / KM Up & Down</p>
                  </div>
                ) : null}
              </motion.article>
            )
          })}
        </div>
      </div>

      <CoasterGalleryModal
        isOpen={isCoasterGalleryOpen}
        onClose={() => setIsCoasterGalleryOpen(false)}
        images={coasterGalleryImages}
        title={COASTER_NAME}
      />
    </section>
  )
}

export default FleetSection
