import { motion } from 'framer-motion'
import { Route, Shield, Timer } from 'lucide-react'
import { pakistanCities } from '../data/cities'
import SectionHeading from './SectionHeading'

function CityBookingSection() {
  return (
    <section id="city-booking" className="section-wrap py-20 lg:py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow="Cities"
          title="All Pakistan City Booking Coverage"
          description="Travel from one city to another with planned routes, clean vehicles, and transparent booking support."
        />

        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <motion.div
            className="glass-panel min-w-0"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
          >
            <h3 className="font-heading text-xl font-bold text-[#FFFFFF]">How Booking Works</h3>
            <ol className="mt-4 space-y-3 text-sm text-[#C7D2FE]">
              <li className="glass-soft">1. Select pickup city, drop city, and vehicle.</li>
              <li className="glass-soft">2. Add date, time, trip type, and service category.</li>
              <li className="glass-soft">3. Confirm instantly via WhatsApp for fast dispatch.</li>
            </ol>

            <div className="mt-4 grid gap-2 text-xs text-[#C7D2FE] sm:grid-cols-3">
              <div className="glass-soft flex items-center gap-2">
                <Route size={14} className="text-[#F5B841]" /> All Pakistan
              </div>
              <div className="glass-soft flex items-center gap-2">
                <Timer size={14} className="text-[#F5B841]" /> On-Time Pickup
              </div>
              <div className="glass-soft flex items-center gap-2">
                <Shield size={14} className="text-[#F5B841]" /> Safe Dispatch
              </div>
            </div>
          </motion.div>

          <motion.div
            className="glass-panel min-w-0"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <h3 className="font-heading text-xl font-bold text-[#FFFFFF]">Major City Network</h3>
            <div className="mt-4 flex max-h-[330px] flex-wrap gap-2 overflow-y-auto pr-1">
              {pakistanCities.map((city) => (
                <span
                  key={city}
                  className="rounded-full border border-[rgba(245,184,65,0.26)] bg-[rgba(10,31,68,0.65)] px-3 py-1 text-xs font-semibold text-[#C7D2FE]"
                >
                  {city}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CityBookingSection
