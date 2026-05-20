import { motion } from 'framer-motion'

const alignStyles = {
  left: 'items-start text-left',
  center: 'items-center text-center',
}

function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <motion.div
      className={`mb-10 flex flex-col gap-3 ${alignStyles[align] || alignStyles.left}`}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
    >
      {eyebrow ? <p className="title-eyebrow">{eyebrow}</p> : null}
      <h2 className="section-title">{title}</h2>
      {description ? <p className="section-description max-w-3xl">{description}</p> : null}
    </motion.div>
  )
}

export default SectionHeading
