import { motion } from 'framer-motion'
import { MessageCircle, PhoneCall } from 'lucide-react'
import { useMemo, useState } from 'react'
import { pakistanCities } from '../data/cities'
import { carPricing, routeOptions } from '../data/fareData'
import { fleetCars } from '../data/fleet'
import {
  WITH_REFRESHMENT,
  WITHOUT_REFRESHMENT,
  calculateFareBreakdown,
  findRouteByCities,
  getVehicleRates,
} from '../utils/fareCalculator'
import SectionHeading from './SectionHeading'

const initialFormValues = {
  customerName: '',
  phoneNumber: '',
  cnic: '',
  pickupCity: '',
  dropOffCity: '',
  pickupDate: '',
  pickupTime: '',
  carType: 'Toyota Yaris Sedan Pakistan',
  tripType: 'One Way',
  serviceCategory: WITHOUT_REFRESHMENT,
  passengers: '',
  message: '',
}

const currencyFormatter = new Intl.NumberFormat('en-PK', {
  style: 'currency',
  currency: 'PKR',
  maximumFractionDigits: 0,
})

function validateForm(formValues) {
  const errors = {}

  if (!formValues.customerName.trim()) {
    errors.customerName = 'Customer name is required.'
  }

  if (!formValues.phoneNumber.trim()) {
    errors.phoneNumber = 'Phone number is required.'
  } else {
    const digitsOnly = formValues.phoneNumber.replace(/\D/g, '')
    if (digitsOnly.length < 10 || digitsOnly.length > 15) {
      errors.phoneNumber = 'Enter a valid phone number.'
    }
  }

  if (!formValues.pickupCity) {
    errors.pickupCity = 'Pickup city is required.'
  }

  if (!formValues.dropOffCity) {
    errors.dropOffCity = 'Drop-off city is required.'
  }

  if (formValues.pickupCity && formValues.pickupCity === formValues.dropOffCity) {
    errors.dropOffCity = 'Pickup and drop-off city cannot be the same.'
  }

  if (!formValues.pickupDate) {
    errors.pickupDate = 'Pickup date is required.'
  }

  if (!formValues.pickupTime) {
    errors.pickupTime = 'Pickup time is required.'
  }

  if (!formValues.carType) {
    errors.carType = 'Car type is required.'
  }

  if (!formValues.tripType) {
    errors.tripType = 'Trip type is required.'
  }

  if (!formValues.serviceCategory) {
    errors.serviceCategory = 'Service category is required.'
  }

  if (!formValues.passengers) {
    errors.passengers = 'Passengers count is required.'
  }

  return errors
}

function BookingFormSection({ whatsappNumber, phoneNumber }) {
  const [formValues, setFormValues] = useState(initialFormValues)
  const [errors, setErrors] = useState({})
  const [statusMessage, setStatusMessage] = useState('')

  const matchedRoute = useMemo(
    () => findRouteByCities(routeOptions, formValues.pickupCity, formValues.dropOffCity),
    [formValues.pickupCity, formValues.dropOffCity],
  )

  const vehicleRates = useMemo(
    () => getVehicleRates(formValues.carType, carPricing),
    [formValues.carType],
  )

  const fareBreakdown = useMemo(() => {
    if (!matchedRoute || !formValues.carType) {
      return null
    }

    return calculateFareBreakdown({
      carType: formValues.carType,
      distanceKm: matchedRoute.distanceKm,
      tripType: formValues.tripType,
      serviceCategory: formValues.serviceCategory,
      carPricing,
    })
  }, [formValues.carType, formValues.serviceCategory, formValues.tripType, matchedRoute])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((previous) => ({ ...previous, [name]: value }))

    if (errors[name]) {
      setErrors((previous) => ({ ...previous, [name]: '' }))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const formErrors = validateForm(formValues)
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      setStatusMessage('Please complete all required fields before submitting.')
      return
    }

    const routeInfo = matchedRoute
      ? `${matchedRoute.from} to ${matchedRoute.to} (${matchedRoute.distanceKm} km)`
      : `${formValues.pickupCity} to ${formValues.dropOffCity} (distance to be confirmed)`

    const baseKmText = fareBreakdown
      ? `Base ${currencyFormatter.format(fareBreakdown.baseFare)} + ${fareBreakdown.appliedRatePerKm.toFixed(2)}/km x ${matchedRoute.distanceKm} km`
      : 'Route not in quick-estimate list'

    const vehicleChargesText = fareBreakdown
      ? currencyFormatter.format(fareBreakdown.vehicleCharges)
      : 'To be confirmed'

    const refreshmentChargesText = fareBreakdown
      ? currencyFormatter.format(fareBreakdown.refreshmentCharges)
      : formValues.serviceCategory === WITH_REFRESHMENT
        ? 'Rs 2,000'
        : 'Rs 0'

    const totalFareText = fareBreakdown
      ? currencyFormatter.format(fareBreakdown.totalEstimatedFare)
      : 'Final fare to be confirmed'

    const oneWayRateText = vehicleRates ? `${vehicleRates.oneWayRate.toFixed(2)} PKR/km` : 'N/A'
    const returnRateText = vehicleRates
      ? vehicleRates.upDownRate
        ? `${vehicleRates.returnRate.toFixed(2)} PKR/km (Up & Down)`
        : `${vehicleRates.returnRate.toFixed(2)} PKR/km`
      : 'N/A'

    const bookingMessage = `Assalam-o-Alaikum Arham Transport Services, I want to book a car.\n\nCustomer Name: ${formValues.customerName}\nPhone Number: ${formValues.phoneNumber}\nCNIC: ${formValues.cnic || 'Not provided'}\nPickup City: ${formValues.pickupCity}\nDrop-off City: ${formValues.dropOffCity}\nRoute: ${routeInfo}\nPickup Date: ${formValues.pickupDate}\nPickup Time: ${formValues.pickupTime}\nCar Type: ${formValues.carType}\nTrip Type: ${formValues.tripType}\nPer KM Rate (One Way): ${oneWayRateText}\nPer KM Rate (Return): ${returnRateText}\nService Category: ${formValues.serviceCategory}\nBase fare / KM fare: ${baseKmText}\nVehicle charges: ${vehicleChargesText}\nRefreshment charges: ${refreshmentChargesText}\nTotal estimated fare: ${totalFareText}\nPassengers: ${formValues.passengers}\nSpecial Request: ${formValues.message || 'No special request'}`

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(bookingMessage)}`

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    setErrors({})
    setStatusMessage('Booking details prepared successfully. WhatsApp window opened.')
    setFormValues(initialFormValues)
  }

  return (
    <section id="booking" className="section-wrap py-20 lg:py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow="Customer Details"
          title="User Info / Customer Details"
          description="Share customer and trip details, then send the complete booking request to WhatsApp with the fare summary and selected service category."
        />

        <motion.div
          className="glass-panel"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <form
            onSubmit={handleSubmit}
            noValidate
            className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          >
            <div>
              <label htmlFor="customerName" className="form-label">
                Customer Name*
              </label>
              <input
                id="customerName"
                name="customerName"
                type="text"
                className="form-input"
                value={formValues.customerName}
                onChange={handleChange}
                placeholder="Enter full name"
              />
              {errors.customerName ? <p className="error-text">{errors.customerName}</p> : null}
            </div>

            <div>
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number*
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                className="form-input"
                value={formValues.phoneNumber}
                onChange={handleChange}
                placeholder="03XXXXXXXXX"
              />
              {errors.phoneNumber ? <p className="error-text">{errors.phoneNumber}</p> : null}
            </div>

            <div>
              <label htmlFor="cnic" className="form-label">
                CNIC Optional
              </label>
              <input
                id="cnic"
                name="cnic"
                type="text"
                className="form-input"
                value={formValues.cnic}
                onChange={handleChange}
                placeholder="Optional CNIC"
              />
            </div>

            <div>
              <label htmlFor="pickupCity" className="form-label">
                Pickup City*
              </label>
              <select
                id="pickupCity"
                name="pickupCity"
                className="form-input"
                value={formValues.pickupCity}
                onChange={handleChange}
              >
                <option value="">Select pickup city</option>
                {pakistanCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.pickupCity ? <p className="error-text">{errors.pickupCity}</p> : null}
            </div>

            <div>
              <label htmlFor="dropOffCity" className="form-label">
                Drop City*
              </label>
              <select
                id="dropOffCity"
                name="dropOffCity"
                className="form-input"
                value={formValues.dropOffCity}
                onChange={handleChange}
              >
                <option value="">Select drop city</option>
                {pakistanCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.dropOffCity ? <p className="error-text">{errors.dropOffCity}</p> : null}
            </div>

            <div>
              <label htmlFor="pickupDate" className="form-label">
                Pickup Date*
              </label>
              <input
                id="pickupDate"
                name="pickupDate"
                type="date"
                className="form-input"
                value={formValues.pickupDate}
                onChange={handleChange}
              />
              {errors.pickupDate ? <p className="error-text">{errors.pickupDate}</p> : null}
            </div>

            <div>
              <label htmlFor="pickupTime" className="form-label">
                Pickup Time*
              </label>
              <input
                id="pickupTime"
                name="pickupTime"
                type="time"
                className="form-input"
                value={formValues.pickupTime}
                onChange={handleChange}
              />
              {errors.pickupTime ? <p className="error-text">{errors.pickupTime}</p> : null}
            </div>

            <div>
              <label htmlFor="carType" className="form-label">
                Car Type*
              </label>
              <select
                id="carType"
                name="carType"
                className="form-input"
                value={formValues.carType}
                onChange={handleChange}
              >
                <option value="">Select car type</option>
                {fleetCars.map((car) => (
                  <option key={car.name} value={car.name}>
                    {car.name}
                  </option>
                ))}
              </select>
              {errors.carType ? <p className="error-text">{errors.carType}</p> : null}
            </div>

            <div>
              <label htmlFor="tripType" className="form-label">
                Trip Type*
              </label>
              <select
                id="tripType"
                name="tripType"
                className="form-input"
                value={formValues.tripType}
                onChange={handleChange}
              >
                <option value="One Way">One Way</option>
                <option value="Return">Return</option>
              </select>
              {errors.tripType ? <p className="error-text">{errors.tripType}</p> : null}
            </div>

            <div>
              <label htmlFor="passengers" className="form-label">
                Passengers*
              </label>
              <input
                id="passengers"
                name="passengers"
                type="number"
                min="1"
                max="22"
                className="form-input"
                value={formValues.passengers}
                onChange={handleChange}
                placeholder="Enter passenger count"
              />
              {errors.passengers ? <p className="error-text">{errors.passengers}</p> : null}
            </div>

            <div>
              <label htmlFor="serviceCategory" className="form-label">
                Service Category*
              </label>
              <select
                id="serviceCategory"
                name="serviceCategory"
                className="form-input"
                value={formValues.serviceCategory}
                onChange={handleChange}
              >
                <option value={WITHOUT_REFRESHMENT}>Without Refreshment</option>
                <option value={WITH_REFRESHMENT}>With Refreshment (+2000 PKR)</option>
              </select>
              {errors.serviceCategory ? <p className="error-text">{errors.serviceCategory}</p> : null}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="message" className="form-label">
                Special Request
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="form-input"
                value={formValues.message}
                onChange={handleChange}
                placeholder="Share exact pickup location, luggage details, and request notes"
              />
            </div>

            <div className="md:col-span-2 grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div className="glass-soft text-sm text-[color:var(--text-body)]">
                <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--gold-500)]">Vehicle Details Card</p>
                <p className="mt-1 break-words font-bold text-[color:var(--text-main)]">
                  {formValues.carType || 'Select a vehicle to view rates'}
                </p>
                <p className="mt-2">
                  One Way Rate:{' '}
                  {vehicleRates ? `${vehicleRates.oneWayRate.toFixed(2)} PKR/km` : 'N/A'}
                </p>
                <p>
                  Return Rate:{' '}
                  {vehicleRates
                    ? vehicleRates.upDownRate
                      ? `${vehicleRates.returnRate.toFixed(2)} PKR/km (Up & Down)`
                      : `${vehicleRates.returnRate.toFixed(2)} PKR/km`
                    : 'N/A'}
                </p>
              </div>

              <div className="glass-soft text-sm text-[color:var(--text-body)]">
                <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--gold-500)]">Fare Breakdown Preview</p>
                <p className="mt-1">With Refreshment: + Rs 2,000</p>
                <p>Without Refreshment: Rs 0</p>
                <p className="mt-2 break-words">
                  Base fare / KM fare:{' '}
                  {fareBreakdown && matchedRoute
                    ? `Base ${currencyFormatter.format(fareBreakdown.baseFare)} + ${fareBreakdown.appliedRatePerKm.toFixed(2)}/km x ${matchedRoute.distanceKm} km`
                    : 'Select known route for instant estimate'}
                </p>
                <p>
                  Vehicle charges:{' '}
                  {fareBreakdown
                    ? currencyFormatter.format(fareBreakdown.vehicleCharges)
                    : 'To be confirmed'}
                </p>
                <p>
                  Refreshment charges:{' '}
                  {fareBreakdown
                    ? currencyFormatter.format(fareBreakdown.refreshmentCharges)
                    : formValues.serviceCategory === WITH_REFRESHMENT
                      ? 'Rs 2,000'
                      : 'Rs 0'}
                </p>
                <p className="font-bold text-[color:var(--text-main)]">
                  Total estimated fare:{' '}
                  {fareBreakdown
                    ? currencyFormatter.format(fareBreakdown.totalEstimatedFare)
                    : 'To be confirmed'}
                </p>
              </div>
            </div>

            <div className="md:col-span-2 grid grid-cols-1 gap-2 pt-2 sm:grid-cols-2 sm:gap-3">
              <button type="submit" className="primary-btn flex items-center gap-2">
                <MessageCircle size={16} /> Submit Booking on WhatsApp
              </button>
              <a href={`tel:${phoneNumber}`} className="ghost-btn flex items-center gap-2">
                <PhoneCall size={16} /> Call Now
              </a>
            </div>

            {statusMessage ? (
              <p className="md:col-span-2 text-sm font-semibold text-[color:var(--gold-500)]">{statusMessage}</p>
            ) : null}
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default BookingFormSection
