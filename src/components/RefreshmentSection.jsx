import { motion } from 'framer-motion'
import { CupSoda, Sparkles } from 'lucide-react'

function RefreshmentSection() {
  return (
    <section id="refreshment" className="section-wrap py-20 lg:py-24">
      <div className="section-container">
        <motion.div
          className="glass-panel relative overflow-hidden gold-glow"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-[rgba(245,184,65,0.14)] blur-2xl" />
          <p className="title-eyebrow">Refreshment at Your Tour</p>
          <h2 className="mt-4 font-heading text-3xl font-extrabold text-[color:var(--text-main)] sm:text-4xl">
            Premium Ride Refreshment Options
          </h2>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-[color:var(--text-body)] sm:text-base">
            KFC Refreshment Free of Cost is offered in selected campaigns. For standard booking,
            choose Service Category in booking: With Refreshment (+2000 PKR) or Without
            Refreshment (0 PKR).
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="glass-soft flex items-center gap-2 text-sm font-semibold text-[color:var(--text-main)]">
              <CupSoda size={18} className="text-[color:var(--gold-500)]" />
              With Refreshment: +2000 PKR
            </div>
            <div className="glass-soft flex items-center gap-2 text-sm font-semibold text-[color:var(--text-main)]">
              <Sparkles size={18} className="text-[color:var(--gold-500)]" />
              Without Refreshment: 0 PKR
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default RefreshmentSection
