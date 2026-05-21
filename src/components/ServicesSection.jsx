import { motion } from 'framer-motion'
import {
  BriefcaseBusiness,
  Building2,
  CarTaxiFront,
  Plane,
  Repeat,
  Smile,
  UsersRound,
} from 'lucide-react'
import { serviceList } from '../data/services'
import SectionHeading from './SectionHeading'

const serviceIcons = [CarTaxiFront, Plane, Smile, BriefcaseBusiness, UsersRound, Repeat, Building2]

function ServicesSection() {
  return (
    <section id="services" className="section-wrap py-20 lg:py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow="Services"
          title="Premium Transport Solutions for Every Travel Plan"
          description="Book city travel, airport routes, business movement, and long-term contracts with modern fleet support and professional execution."
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {serviceList.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length]
            return (
              <motion.article
                key={service.title}
                className="glass-panel blue-glow"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <div className="inline-flex rounded-xl border border-[rgba(245,184,65,0.35)] bg-[rgba(245,184,65,0.12)] p-2 text-[color:var(--gold-500)]">
                  <Icon size={19} />
                </div>
                <h3 className="mt-4 font-heading text-xl font-bold text-[color:var(--text-main)]">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-body)]">{service.description}</p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
