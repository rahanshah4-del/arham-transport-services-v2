import { motion } from 'framer-motion'
import { BadgeCheck, Clock3, ShieldCheck } from 'lucide-react'
import SectionHeading from './SectionHeading'

const aboutItems = [
  {
    title: 'Reliable Operations',
    description:
      'From first message to final drop, each ride is managed with punctual route execution and dependable dispatch.',
    icon: Clock3,
  },
  {
    title: 'Safety First Travel',
    description:
      'Professional drivers, clear communication, and maintained vehicles ensure every family and business trip stays secure.',
    icon: ShieldCheck,
  },
  {
    title: 'Premium Customer Care',
    description:
      'Dedicated support for booking updates, route questions, and travel preferences across all Pakistan cities.',
    icon: BadgeCheck,
  },
]

function AboutSection() {
  return (
    <section id="about" className="section-wrap py-20 lg:py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow="About Us"
          title="Trusted Intercity Transport with Premium Standards"
          description="Arham Transport Services is focused on quality transport experiences through professional scheduling, premium ride comfort, and transparent communication."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {aboutItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.article
                key={item.title}
                className="glass-panel blue-glow"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: 0.12 * index }}
              >
                <div className="inline-flex rounded-xl border border-[rgba(245,184,65,0.35)] bg-[rgba(245,184,65,0.12)] p-2 text-[#F5B841]">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 font-heading text-xl font-bold text-[#FFFFFF]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#C7D2FE]">{item.description}</p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AboutSection
