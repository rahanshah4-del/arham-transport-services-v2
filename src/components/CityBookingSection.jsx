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
            <h3 className="font-heading text-xl font-bold text-[color:var(--text-main)]">How Booking Works</h3>
            <ol className="mt-4 space-y-3 text-sm text-[color:var(--text-body)]">
              <li className="glass-soft">1. Select pickup city, drop city, and vehicle.</li>
              <li className="glass-soft">2. Add date, time, trip type, and service category.</li>
              <li className="glass-soft">3. Confirm instantly via WhatsApp for fast dispatch.</li>
            </ol>

            <div className="mt-4 grid gap-2 text-xs text-[color:var(--text-body)] sm:grid-cols-3">
              <div className="glass-soft flex items-center gap-2">
                <Route size={14} className="text-[color:var(--gold-500)]" /> All Pakistan
              </div>
              <div className="glass-soft flex items-center gap-2">
                <Timer size={14} className="text-[color:var(--gold-500)]" /> On-Time Pickup
              </div>
              <div className="glass-soft flex items-center gap-2">
                <Shield size={14} className="text-[color:var(--gold-500)]" /> Safe Dispatch
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
            <h3 className="font-heading text-xl font-bold text-[color:var(--text-main)]">Major City Network</h3>
            <div className="mt-4 flex max-h-[330px] flex-wrap gap-2 overflow-y-auto pr-1">
              {pakistanCities.map((city) => (
                <span
                  key={city}
                  className="rounded-full border border-[rgba(15,23,42,0.08)] bg-[#ffffff] px-3 py-1 text-xs font-semibold text-[color:var(--text-body)] shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
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
