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

          <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="text-sm text-[color:var(--text-body)]">
              <p className="font-semibold">Office Number: {officeNumber.display}</p>
              <p className="mt-1">Address: {officeNumber.address || '08 Jade Parkview City Lahore'}</p>
            </div>

            <div className="min-w-[220px] rounded-xl border border-[rgba(15,23,42,0.06)] bg-[#ffffff] px-4 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#06152f] text-white font-bold">N</div>
                <div>
                  <p className="text-sm font-semibold">Web Developer: Nexora</p>
                  <p className="mt-1 text-xs text-[color:var(--text-body)]">Developed by Rahan Shah</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
