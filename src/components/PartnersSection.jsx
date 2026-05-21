import { motion } from 'framer-motion'
import { Building2, BriefcaseBusiness, GraduationCap, Landmark } from 'lucide-react'
import SectionHeading from './SectionHeading'

const partners = [
  { name: 'Highnoon', type: 'Healthcare', short: 'HN', icon: Building2 },
  { name: 'Ferozsons', type: 'Pharmaceuticals', short: 'FZ', icon: Building2 },
  { name: 'Abbott Medicines', type: 'Medicines', short: 'AB', icon: Building2 },
  { name: 'CCL Pakistan', type: 'Corporate', short: 'CCL', icon: BriefcaseBusiness },
  { name: 'Superior College', type: 'Education', short: 'SC', icon: GraduationCap },
  { name: 'Beaconhouse', type: 'Education', short: 'BH', icon: GraduationCap },
  { name: 'Ocean Ceramics Pakistan', type: 'Industry', short: 'OC', icon: Landmark },
  { name: 'Punjab College', type: 'Education', short: 'PC', icon: GraduationCap },
  { name: 'Events / Corporate Bookings', type: 'Events', short: 'EV', icon: BriefcaseBusiness },
]

function PartnerCard({ partner }) {
  const Icon = partner.icon

  return (
    <article className="glass-soft blue-glow h-full min-w-0 rounded-2xl p-4 transition duration-300 hover:-translate-y-1 hover:border-[rgba(245,184,65,0.5)]">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[rgba(245,184,65,0.4)] bg-[rgba(245,184,65,0.12)] text-[color:var(--gold-500)]">
          <span className="font-heading text-sm font-extrabold">{partner.short}</span>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[rgba(15,23,42,0.08)] bg-[#f8fafc] text-[color:var(--text-body)]">
          <Icon size={20} />
        </div>
      </div>

      <h3 className="mt-4 break-words font-heading text-lg font-bold leading-snug text-[color:var(--text-main)]">{partner.name}</h3>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--text-body)]">{partner.type}</p>
    </article>
  )
}

function PartnersSection({ whatsappLink, phoneNumber }) {
  const rollingPartners = [...partners, ...partners]

  return (
    <section id="partners" className="section-wrap py-20 lg:py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow="Our Partners"
          title="Our Partners"
          description="Trusted by leading companies, colleges, events and business groups."
        />

        <div className="hidden overflow-hidden rounded-3xl border border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.72)] p-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)] lg:block">
          <motion.div
            className="flex w-max gap-4"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
          >
            {rollingPartners.map((partner, index) => (
              <div key={`${partner.name}-${index}`} className="w-[270px] shrink-0">
                <PartnerCard partner={partner} />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:hidden">
          {partners.map((partner) => (
            <PartnerCard key={partner.name} partner={partner} />
          ))}
        </div>

        <motion.div
          className="glass-panel gold-glow mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold leading-relaxed text-[color:var(--text-main)] sm:text-base">
            Want transport service for your company, college or event? Contact us for monthly and
            event contracts.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="secondary-btn">
              WhatsApp Booking
            </a>
            <a href={`tel:${phoneNumber}`} className="primary-btn">
              Call Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PartnersSection
