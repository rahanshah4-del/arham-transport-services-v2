import { motion } from 'framer-motion'
import { Calculator } from 'lucide-react'
import { useMemo, useState } from 'react'
import { pakistanCities } from '../data/cities'
import { carPricing } from '../data/fareData'
import {
  WITH_REFRESHMENT,
  WITHOUT_REFRESHMENT,
  calculateFareBreakdown,
  getVehicleRates,
} from '../utils/fareCalculator'
import SectionHeading from './SectionHeading'

const currencyFormatter = new Intl.NumberFormat('en-PK', {
  style: 'currency',
  currency: 'PKR',
  maximumFractionDigits: 0,
})

function PriceEstimateSection({ whatsappNumber }) {
  const [fromCity, setFromCity] = useState('')
  const [toCity, setToCity] = useState('')
  const [distanceKmInput, setDistanceKmInput] = useState('')
  const [selectedCarType, setSelectedCarType] = useState(Object.keys(carPricing)[0])
  const [tripType, setTripType] = useState('One Way')
  const [serviceCategory, setServiceCategory] = useState(WITHOUT_REFRESHMENT)
  const [showValidation, setShowValidation] = useState(false)

  const parsedDistanceKm = Number(distanceKmInput)

  const validationErrors = useMemo(() => {
    const errors = {}

    if (!fromCity) {
      errors.fromCity = 'Please select a departure city.'
    }

    if (!toCity) {
      errors.toCity = 'Please select a destination city.'
    }

    if (fromCity && toCity && fromCity === toCity) {
      errors.route = 'From City and To City cannot be the same.'
    }

    if (!distanceKmInput.trim()) {
      errors.distanceKm = 'Please enter travel distance in KM.'
    } else if (!Number.isFinite(parsedDistanceKm) || parsedDistanceKm <= 0) {
      errors.distanceKm = 'KM must be greater than 0.'
    }

    return errors
  }, [distanceKmInput, fromCity, parsedDistanceKm, toCity])

  const isEstimateValid = Object.keys(validationErrors).length === 0

  const vehicleRates = useMemo(
    () => getVehicleRates(selectedCarType, carPricing),
    [selectedCarType],
  )

  const breakdown = useMemo(() => {
    if (!isEstimateValid) {
      return null
    }

    return calculateFareBreakdown({
      carType: selectedCarType,
      distanceKm: parsedDistanceKm,
      tripType,
      serviceCategory,
      carPricing,
    })
  }, [isEstimateValid, parsedDistanceKm, selectedCarType, serviceCategory, tripType])

  const whatsappMessage = useMemo(() => {
    const routeText = fromCity && toCity ? `${fromCity} to ${toCity}` : 'N/A'

    return `Assalam-o-Alaikum, I need a fare confirmation.\nFrom City: ${fromCity || 'N/A'}\nTo City: ${toCity || 'N/A'}\nRoute: ${routeText}\nDistance KM: ${Number.isFinite(parsedDistanceKm) ? parsedDistanceKm : 'N/A'}\nCar: ${selectedCarType}\nTrip Type: ${tripType}\nService Category: ${serviceCategory}\nPer KM Rate: ${breakdown ? breakdown.appliedRatePerKm.toFixed(2) : 'N/A'} PKR/km\nBase Fare: ${breakdown ? currencyFormatter.format(breakdown.baseFare) : 'N/A'}\nRefreshment charges: ${breakdown ? currencyFormatter.format(breakdown.refreshmentCharges) : 'N/A'}\nTotal estimated fare: ${breakdown ? currencyFormatter.format(breakdown.totalEstimatedFare) : 'N/A'}`
  }, [breakdown, fromCity, parsedDistanceKm, selectedCarType, serviceCategory, toCity, tripType])

  const handleWhatsappConfirm = () => {
    setShowValidation(true)

    if (!isEstimateValid || !breakdown) {
      return
    }

    const quoteLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
    window.open(quoteLink, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="price-estimate" className="section-wrap py-20 lg:py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow="Price Estimate"
          title="Premium City-to-City KM Calculator"
          description="Select departure and destination city, enter custom KM, and get a transparent estimate with base fare, per KM rate, and refreshment charges."
        />

        <div className="grid gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <motion.div
            className="glass-panel min-w-0"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
          >
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label htmlFor="fromCityEstimate" className="form-label">
                  From City
                </label>
                <select
                  id="fromCityEstimate"
                  className="form-input"
                  value={fromCity}
                  onChange={(event) => setFromCity(event.target.value)}
                >
                  <option value="">Select departure city</option>
                  {pakistanCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                {showValidation && validationErrors.fromCity ? (
                  <p className="error-text">{validationErrors.fromCity}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="toCityEstimate" className="form-label">
                  To City
                </label>
                <select
                  id="toCityEstimate"
                  className="form-input"
                  value={toCity}
                  onChange={(event) => setToCity(event.target.value)}
                >
                  <option value="">Select destination city</option>
                  {pakistanCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                {showValidation && validationErrors.toCity ? (
                  <p className="error-text">{validationErrors.toCity}</p>
                ) : null}
              </div>
            </div>

            {showValidation && validationErrors.route ? (
              <p className="error-text">{validationErrors.route}</p>
            ) : null}

            <div className="mt-3">
              <label htmlFor="distanceKmEstimate" className="form-label">
                Distance KM
              </label>
              <input
                id="distanceKmEstimate"
                type="number"
                min="1"
                step="0.1"
                className="form-input"
                value={distanceKmInput}
                onChange={(event) => setDistanceKmInput(event.target.value)}
                placeholder="Example: 350"
              />
              {showValidation && validationErrors.distanceKm ? (
                <p className="error-text">{validationErrors.distanceKm}</p>
              ) : null}
            </div>

            <div className="mt-3">
              <label htmlFor="carTypeEstimate" className="form-label">
                Select Car Type
              </label>
              <select
                id="carTypeEstimate"
                className="form-input"
                value={selectedCarType}
                onChange={(event) => setSelectedCarType(event.target.value)}
              >
                {Object.keys(carPricing).map((carType) => (
                  <option key={carType} value={carType}>
                    {carType}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div>
                <label htmlFor="tripTypeEstimate" className="form-label">
                  Trip Type
                </label>
                <select
                  id="tripTypeEstimate"
                  className="form-input"
                  value={tripType}
                  onChange={(event) => setTripType(event.target.value)}
                >
                  <option value="One Way">One Way</option>
                  <option value="Return">Return</option>
                </select>
              </div>

              <div>
                <label htmlFor="serviceCategoryEstimate" className="form-label">
                  Service Category
                </label>
                <select
                  id="serviceCategoryEstimate"
                  className="form-input"
                  value={serviceCategory}
                  onChange={(event) => setServiceCategory(event.target.value)}
                >
                  <option value={WITHOUT_REFRESHMENT}>Without Refreshment</option>
                  <option value={WITH_REFRESHMENT}>With Refreshment (+2000 PKR)</option>
                </select>
              </div>
            </div>

            <div className="mt-4 grid gap-2 text-sm text-[color:var(--text-main)]">
              <p className="glass-soft">
                <span className="font-semibold text-[color:var(--gold-500)]">With Refreshment:</span> + Rs 2,000
              </p>
              <p className="glass-soft">
                <span className="font-semibold text-[color:var(--gold-500)]">Without Refreshment:</span> Rs 0
              </p>
            </div>
          </motion.div>

          <motion.div
            className="glass-panel min-w-0"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            <p className="title-eyebrow inline-flex items-center gap-2">
              <Calculator size={14} /> Fare Breakdown
            </p>
            <p className="mt-3 font-heading text-4xl font-extrabold text-[color:var(--text-main)] sm:text-5xl">
              {breakdown ? currencyFormatter.format(breakdown.totalEstimatedFare) : 'Enter trip details'}
            </p>

            <div className="mt-5 grid gap-3 text-sm text-[color:var(--text-body)]">
              <div className="glass-soft">
                <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--gold-500)]">Trip Details</p>
                <p className="mt-1 text-[color:var(--text-main)]"><span className="font-semibold">From City:</span> {fromCity || 'N/A'}</p>
                <p className="text-[color:var(--text-main)]"><span className="font-semibold">To City:</span> {toCity || 'N/A'}</p>
                <p className="text-[color:var(--text-main)]"><span className="font-semibold">Entered KM:</span> {distanceKmInput || 'N/A'}</p>
                <p className="text-[color:var(--text-main)]"><span className="font-semibold">Car Type:</span> {selectedCarType}</p>
                <p className="text-[color:var(--text-main)]"><span className="font-semibold">Trip Type:</span> {tripType}</p>
              </div>

              <div className="glass-soft">
                <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--gold-500)]">Per KM Rate</p>
                <p className="mt-1 font-semibold text-[color:var(--text-main)]">
                  {breakdown ? `${breakdown.appliedRatePerKm.toFixed(2)} PKR/km` : 'N/A'}
                </p>
                <p className="mt-2 text-[color:var(--text-main)]">
                  One Way: {vehicleRates ? vehicleRates.oneWayRate.toFixed(2) : 'N/A'} PKR/km
                </p>
                <p className="text-[color:var(--text-main)]">
                  Return: {vehicleRates ? vehicleRates.returnRate.toFixed(2) : 'N/A'} PKR/km
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="glass-soft">
                  <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--gold-500)]">Base fare</p>
                  <p className="mt-1 font-semibold text-[color:var(--text-main)]">
                    {breakdown ? currencyFormatter.format(breakdown.baseFare) : 'N/A'}
                  </p>
                </div>

                <div className="glass-soft">
                  <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--gold-500)]">Refreshment charges</p>
                  <p className="mt-1 font-semibold text-[color:var(--text-main)]">
                    {breakdown ? currencyFormatter.format(breakdown.refreshmentCharges) : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="glass-soft">
                <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--gold-500)]">Fare formula</p>
                <p className="mt-1 break-words font-semibold text-[color:var(--text-main)]">
                  {breakdown
                    ? `Total = Base ${currencyFormatter.format(breakdown.baseFare)} + (${parsedDistanceKm} km x ${breakdown.appliedRatePerKm.toFixed(2)}/km) + ${currencyFormatter.format(breakdown.refreshmentCharges)}`
                    : 'Enter valid cities and KM to view formula'}
                </p>
              </div>

              <div className="glass-soft gold-glow">
                <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--gold-500)]">Total estimated fare</p>
                <p className="mt-1 font-heading text-2xl font-bold text-[color:var(--text-main)]">
                  {breakdown ? currencyFormatter.format(breakdown.totalEstimatedFare) : 'N/A'}
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
              <a href="#booking" className="primary-btn">
                Book This Trip
              </a>
              <button type="button" className="secondary-btn" onClick={handleWhatsappConfirm}>
                Confirm on WhatsApp
              </button>
            </div>

            {showValidation && !isEstimateValid ? (
              <p className="mt-4 text-sm font-semibold text-[color:var(--gold-500)]">
                Please correct the highlighted fields to calculate and send estimate details.
              </p>
            ) : null}

            <p className="mt-4 text-sm text-[color:var(--text-body)]">
              Final fare will be confirmed on call/WhatsApp after route verification.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default PriceEstimateSection
