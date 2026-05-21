import logo from '/logo/ats-logo.png'

function Footer({ officeNumber }) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[rgba(15,23,42,0.08)] bg-[#f8fafc]">
      <div className="section-container py-8">
        <div className="glass-panel">
          <div className="relative mb-4 inline-block">
            <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-[rgba(245,184,65,0.15)] to-[rgba(245,184,65,0.05)] blur-lg opacity-60 -z-10" />
            <img
              src={logo}
              alt="Arham Transport Services Logo"
              className="h-auto max-h-[60px] w-auto object-contain drop-shadow-lg"
            />
          </div>
          <p className="mt-3 text-sm text-[color:var(--text-body)]">
            {year} premium city-to-city transport service across Pakistan.
          </p>

          <div className="premium-divider my-5" />

          <div className="space-y-1 text-sm text-[color:var(--text-body)]">
            <p>Office Number: {officeNumber.display}</p>
            <p>Web Developer: Nexora</p>
            <p>Developed By: Rahan Shah</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
