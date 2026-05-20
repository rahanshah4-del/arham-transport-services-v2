import { motion } from 'framer-motion'
import { CalendarClock, CarFront, MapPinned, Phone, Star } from 'lucide-react'
import { useState } from 'react'
import { pakistanCities } from '../data/cities'
import { fleetCars } from '../data/fleet'
import { WITH_REFRESHMENT, WITHOUT_REFRESHMENT } from '../utils/fareCalculator'

const initialQuickBooking = {
  pickupCity: '',
  dropOffCity: '',
  pickupDate: '',
  pickupTime: '',
  carType: 'Toyota Yaris Sedan Pakistan',
  tripType: 'One Way',
  passengers: '1',
  serviceCategory: WITHOUT_REFRESHMENT,
}

function HeroSection({ whatsappNumber, phoneNumbers, officeNumber, primaryPhoneLink }) {
  const [quickBooking, setQuickBooking] = useState(initialQuickBooking)

  const handleChange = (event) => {
    const { name, value } = event.target
    setQuickBooking((prev) => ({ ...prev, [name]: value }))
  }

  const handleQuickBooking = (event) => {
    event.preventDefault()

    const message = `Assalam-o-Alaikum Arham Transport Services, I want quick booking.\nPickup: ${quickBooking.pickupCity || 'Not selected'}\nDrop: ${quickBooking.dropOffCity || 'Not selected'}\nDate: ${quickBooking.pickupDate || 'Not selected'}\nTime: ${quickBooking.pickupTime || 'Not selected'}\nCar: ${quickBooking.carType}\nTrip Type: ${quickBooking.tripType}\nPassengers: ${quickBooking.passengers}\nService Category: ${quickBooking.serviceCategory}`

    const link = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="home" className="section-wrap relative overflow-hidden py-20 lg:py-24">
      <img src="/hero/city.jpg" alt="Dark city skyline" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(110deg,rgba(7,23,57,0.94)_15%,rgba(10,31,68,0.9)_48%,rgba(13,42,92,0.82)_100%)]" />
      <div className="absolute -left-24 top-20 -z-10 h-56 w-56 rounded-full bg-[rgba(245,184,65,0.2)] blur-3xl" />
      <div className="absolute -right-20 bottom-20 -z-10 h-60 w-60 rounded-full bg-[rgba(13,42,92,0.8)] blur-3xl" />

      <div className="section-container grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
        <div className="relative min-w-0 space-y-7">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(245,184,65,0.45)] bg-[rgba(245,184,65,0.12)] px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#F5B841]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Star size={14} /> Premium Intercity Travel
          </motion.div>

          <motion.h1
            className="font-heading text-3xl font-extrabold leading-tight text-[#FFFFFF] sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Luxury City-to-City Car Booking Across Pakistan
          </motion.h1>

          <motion.p
            className="max-w-2xl text-sm leading-relaxed text-[#C7D2FE] sm:text-base lg:text-lg"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Travel with comfort, confidence, and premium service. From executive rides to family
            tours, Arham Transport Services delivers professional transport with modern vehicles and
            trained drivers.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <a href="#booking" className="primary-btn sm:w-auto">
              Book Now
            </a>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="secondary-btn sm:w-auto"
            >
              WhatsApp Booking
            </a>
            <a href={`tel:${primaryPhoneLink}`} className="ghost-btn sm:w-auto">
              Call Now
            </a>
          </motion.div>

          <motion.div
            className="glass-panel relative overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-[rgba(245,184,65,0.16)]" />
            <img
              src="/cars/yaris.png"
              alt="Premium transport car"
              className="h-44 w-full rounded-2xl border border-[rgba(245,184,65,0.22)] object-cover sm:h-56"
            />
            <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-[#C7D2FE] sm:grid-cols-2">
              <div className="glass-soft animate-float">
                <p className="text-xs uppercase tracking-[0.16em] text-[#F5B841]">Coverage</p>
                <p className="mt-1 text-lg font-bold text-[#FFFFFF]">All Pakistan</p>
              </div>
              <div className="glass-soft animate-float [animation-delay:0.7s]">
                <p className="text-xs uppercase tracking-[0.16em] text-[#F5B841]">Office Number</p>
                <p className="mt-1 text-lg font-bold text-[#FFFFFF]">{officeNumber.display}</p>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {phoneNumbers.map((phone, index) => (
              <motion.div
                key={phone.display}
                className="glass-soft blue-glow"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.12 * index }}
              >
                <p className="text-xs uppercase tracking-[0.16em] text-[#F5B841]">Phone</p>
                <p className="mt-1 text-sm font-bold text-[#FFFFFF]">{phone.display}</p>
              </motion.div>
            ))}
            <motion.div
              className="glass-soft blue-glow sm:col-span-2 xl:col-span-1"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.36 }}
            >
              <p className="text-xs uppercase tracking-[0.16em] text-[#F5B841]">Email</p>
              <p className="mt-1 break-all text-sm font-bold text-[#FFFFFF]">ARHAMTRANSPORT477@GMAIL.COM</p>
            </motion.div>
          </div>
        </div>

        <motion.aside
          className="glass-panel gold-glow min-w-0"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2 className="font-heading text-2xl font-bold text-[#FFFFFF]">Premium Quick Booking</h2>
          <p className="mt-2 text-sm text-[#C7D2FE]">
            Fill details and send booking request directly on WhatsApp.
          </p>

          <form className="mt-5 space-y-3" onSubmit={handleQuickBooking}>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="quickPickupCity" className="form-label">
                  Pickup City
                </label>
                <select
                  id="quickPickupCity"
                  name="pickupCity"
                  className="form-input"
                  value={quickBooking.pickupCity}
                  onChange={handleChange}
                >
                  <option value="">Select city</option>
                  {pakistanCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="quickDropOffCity" className="form-label">
                  Drop City
                </label>
                <select
                  id="quickDropOffCity"
                  name="dropOffCity"
                  className="form-input"
                  value={quickBooking.dropOffCity}
                  onChange={handleChange}
                >
                  <option value="">Select city</option>
                  {pakistanCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="quickPickupDate" className="form-label">
                  Pickup Date
                </label>
                <input
                  id="quickPickupDate"
                  name="pickupDate"
                  type="date"
                  className="form-input"
                  value={quickBooking.pickupDate}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="quickPickupTime" className="form-label">
                  Pickup Time
                </label>
                <input
                  id="quickPickupTime"
                  name="pickupTime"
                  type="time"
                  className="form-input"
                  value={quickBooking.pickupTime}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="quickCarType" className="form-label">
                  Car Type
                </label>
                <select
                  id="quickCarType"
                  name="carType"
                  className="form-input"
                  value={quickBooking.carType}
                  onChange={handleChange}
                >
                  {fleetCars.map((car) => (
                    <option key={car.name} value={car.name}>
                      {car.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="quickTripType" className="form-label">
                  Trip Type
                </label>
                <select
                  id="quickTripType"
                  name="tripType"
                  className="form-input"
                  value={quickBooking.tripType}
                  onChange={handleChange}
                >
                  <option value="One Way">One Way</option>
                  <option value="Return">Return</option>
                </select>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="quickPassengers" className="form-label">
                  Passengers
                </label>
                <input
                  id="quickPassengers"
                  name="passengers"
                  type="number"
                  min="1"
                  max="22"
                  className="form-input"
                  value={quickBooking.passengers}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="quickServiceCategory" className="form-label">
                  Service Category
                </label>
                <select
                  id="quickServiceCategory"
                  name="serviceCategory"
                  className="form-input"
                  value={quickBooking.serviceCategory}
                  onChange={handleChange}
                >
                  <option value={WITHOUT_REFRESHMENT}>Without Refreshment</option>
                  <option value={WITH_REFRESHMENT}>With Refreshment (+2000 PKR)</option>
                </select>
              </div>
            </div>

            <button type="submit" className="primary-btn mt-2 w-full">
              Send Quick Booking
            </button>
          </form>

          <div className="premium-divider my-4" />

          <div className="grid gap-2 text-xs text-[#C7D2FE] sm:grid-cols-3">
            <p className="flex items-center gap-1">
              <MapPinned size={14} /> All Pakistan
            </p>
            <p className="flex items-center gap-1">
              <CalendarClock size={14} /> 24/7 Availability
            </p>
            <p className="flex items-center gap-1">
              <CarFront size={14} /> Premium Fleet
            </p>
            <p className="flex items-start gap-1 break-words sm:col-span-3">
              <Phone size={14} /> Call: {phoneNumbers[0].display} | {phoneNumbers[1].display}
            </p>
          </div>
        </motion.aside>
      </div>
    </section>
  )
}

export default HeroSection
