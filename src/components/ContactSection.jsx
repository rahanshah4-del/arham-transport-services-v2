import { motion } from 'framer-motion'
import { Building2, Mail, MapPin, Phone, Send } from 'lucide-react'
import SectionHeading from './SectionHeading'

function ContactSection({ phoneNumbers, officeNumber, email, whatsappLink }) {
  return (
    <section id="contact" className="section-wrap py-20 lg:py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow="Contact"
          title="Connect with Arham Transport Services"
          description="For route planning, pricing confirmation, and immediate booking support, reach us through phone, office, email, or WhatsApp."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
          <motion.article
            className="glass-panel min-w-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <Phone size={18} className="text-[#F5B841]" />
            <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[#F5B841]">Phone Number</p>
            <p className="mt-1 text-lg font-bold text-[#FFFFFF]">{phoneNumbers[0].display}</p>
            <a href={`tel:${phoneNumbers[0].dial}`} className="mt-4 inline-flex text-sm font-semibold text-[#C7D2FE] hover:text-[#F5B841]">
              Call Now
            </a>
          </motion.article>

          <motion.article
            className="glass-panel min-w-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            <Phone size={18} className="text-[#F5B841]" />
            <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[#F5B841]">Phone Number</p>
            <p className="mt-1 text-lg font-bold text-[#FFFFFF]">{phoneNumbers[1].display}</p>
            <a href={`tel:${phoneNumbers[1].dial}`} className="mt-4 inline-flex text-sm font-semibold text-[#C7D2FE] hover:text-[#F5B841]">
              Call Alternate
            </a>
          </motion.article>

          <motion.article
            className="glass-panel min-w-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.16 }}
          >
            <Building2 size={18} className="text-[#F5B841]" />
            <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[#F5B841]">Office Number</p>
            <p className="mt-1 text-lg font-bold text-[#FFFFFF]">{officeNumber.display}</p>
            <p className="mt-3 text-sm font-semibold text-[#C7D2FE]">Office: {officeNumber.display}</p>
          </motion.article>

          <motion.article
            className="glass-panel min-w-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.24 }}
          >
            <Mail size={18} className="text-[#F5B841]" />
            <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[#F5B841]">Email</p>
            <p className="mt-1 break-all text-base font-bold text-[#FFFFFF]">{email}</p>
            <a href={`mailto:${email}`} className="mt-4 inline-flex text-sm font-semibold text-[#C7D2FE] hover:text-[#F5B841]">
              Send Email
            </a>
          </motion.article>

          <motion.article
            className="glass-panel min-w-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.32 }}
          >
            <MapPin size={18} className="text-[#F5B841]" />
            <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[#F5B841]">Service Area</p>
            <p className="mt-1 text-lg font-bold text-[#FFFFFF]">All Pakistan</p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#C7D2FE] hover:text-[#F5B841]"
            >
              <Send size={14} /> WhatsApp Booking
            </a>
          </motion.article>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
