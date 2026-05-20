import AboutSection from './components/AboutSection'
import BookingFormSection from './components/BookingFormSection'
import CityBookingSection from './components/CityBookingSection'
import ContactSection from './components/ContactSection'
import FleetSection from './components/FleetSection'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection'
import MobileBookingBar from './components/MobileBookingBar'
import Navbar from './components/Navbar'
import PartnersSection from './components/PartnersSection'
import PriceEstimateSection from './components/PriceEstimateSection'
import RefreshmentSection from './components/RefreshmentSection'
import ServicesSection from './components/ServicesSection'

const phoneNumbers = [
  { label: 'Phone Number', display: '0311-4000477', dial: '+923114000477' },
  { label: 'Phone Number', display: '0300-9474048', dial: '+923009474048' },
]

const officeNumber = {
  label: 'Office Number',
  display: '0331-6114747',
  dial: '+923316114747',
}

const emailAddress = 'ARHAMTRANSPORT477@GMAIL.COM'
const whatsappNumber = '923114000477'

const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  'Assalam-o-Alaikum Arham Transport Services, I want to book a city-to-city trip.',
)}`

function App() {
  const primaryPhone = phoneNumbers[0]

  return (
    <div className="min-h-screen">
      <Navbar whatsappLink={whatsappLink} />
      <main className="pb-20 md:pb-0">
        <HeroSection
          whatsappNumber={whatsappNumber}
          phoneNumbers={phoneNumbers}
          officeNumber={officeNumber}
          primaryPhoneLink={primaryPhone.dial}
        />
        <AboutSection />
        <ServicesSection />
        <FleetSection />
        <RefreshmentSection />
        <CityBookingSection />
        <PriceEstimateSection whatsappNumber={whatsappNumber} />
        <BookingFormSection whatsappNumber={whatsappNumber} phoneNumber={primaryPhone.dial} />
        <ContactSection
          phoneNumbers={phoneNumbers}
          officeNumber={officeNumber}
          email={emailAddress}
          whatsappLink={whatsappLink}
        />
        <PartnersSection whatsappLink={whatsappLink} phoneNumber={primaryPhone.dial} />
      </main>
      <Footer officeNumber={officeNumber} />
      <MobileBookingBar />
    </div>
  )
}

export default App
