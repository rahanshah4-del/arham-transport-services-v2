function Footer({ officeNumber }) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[rgba(245,184,65,0.25)] bg-[rgba(7,23,57,0.9)]">
      <div className="section-container py-8">
        <div className="glass-panel">
          <h3 className="font-heading text-2xl font-extrabold text-[#FFFFFF]">Arham Transport Services</h3>
          <p className="mt-2 text-sm text-[#C7D2FE]">
            {year} premium city-to-city transport service across Pakistan.
          </p>

          <div className="premium-divider my-5" />

          <div className="space-y-1 text-sm text-[#C7D2FE]">
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
