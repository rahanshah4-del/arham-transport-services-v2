export const REFRESHMENT_CHARGE = 2000
export const WITH_REFRESHMENT = 'With Refreshment'
export const WITHOUT_REFRESHMENT = 'Without Refreshment'

export function getRefreshmentCharge(serviceCategory) {
  return serviceCategory === WITH_REFRESHMENT ? REFRESHMENT_CHARGE : 0
}

export function getVehicleRates(carType, carPricing) {
  const pricing = carPricing[carType]
  if (!pricing) {
    return null
  }

  const oneWayRate = Number(pricing.oneWayPerKm ?? pricing.perKm ?? 0)
  const returnRate = Number(pricing.returnPerKm ?? oneWayRate * 2)

  return {
    oneWayRate,
    returnRate,
    upDownRate: Boolean(pricing.upDownRate),
    baseFare: Number(pricing.baseFare ?? 0),
  }
}

export function findRouteByCities(routeOptions, pickupCity, dropOffCity) {
  if (!pickupCity || !dropOffCity) {
    return null
  }

  return (
    routeOptions.find(
      (route) =>
        (route.from === pickupCity && route.to === dropOffCity) ||
        (route.from === dropOffCity && route.to === pickupCity),
    ) || null
  )
}

export function calculateFareBreakdown({
  carType,
  distanceKm,
  tripType,
  serviceCategory,
  carPricing,
}) {
  const rates = getVehicleRates(carType, carPricing)
  if (!rates || typeof distanceKm !== 'number' || Number.isNaN(distanceKm)) {
    return null
  }

  const ratePerKm = tripType === 'Return' ? rates.returnRate : rates.oneWayRate
  const kmFare = ratePerKm * distanceKm
  const vehicleCharges = Math.round(rates.baseFare + kmFare)
  const refreshmentCharges = getRefreshmentCharge(serviceCategory)
  const totalEstimatedFare = vehicleCharges + refreshmentCharges

  return {
    baseFare: rates.baseFare,
    oneWayRate: rates.oneWayRate,
    returnRate: rates.returnRate,
    appliedRatePerKm: ratePerKm,
    kmFare,
    vehicleCharges,
    refreshmentCharges,
    totalEstimatedFare,
    upDownRate: rates.upDownRate,
  }
}
