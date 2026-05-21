function MobileBookingBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[110] border-t border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.94)] p-3 shadow-[0_-10px_30px_rgba(15,23,42,0.1)] backdrop-blur-xl md:hidden">
      <a href="#booking" className="primary-btn w-full animate-glow">
        Book Now
      </a>
    </div>
  )
}

export default MobileBookingBar
