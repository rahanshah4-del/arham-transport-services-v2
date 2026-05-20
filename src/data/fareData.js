export const carPricing = {
  'Toyota Yaris Sedan Pakistan': {
    baseFare: 2200,
    oneWayPerKm: 53.94,
    returnPerKm: 105,
  },
  'Honda City Pakistan 2026 Model': {
    baseFare: 2500,
    oneWayPerKm: 52,
    returnPerKm: 102,
  },
  'Toyota Corolla Altis Pakistan 2024 Model': {
    baseFare: 3000,
    oneWayPerKm: 58,
    returnPerKm: 114,
  },
  'Changan Karvaan Pakistan': {
    baseFare: 3400,
    oneWayPerKm: 66,
    returnPerKm: 126,
  },
  'Toyota Hiace Pakistan': {
    baseFare: 4800,
    oneWayPerKm: 85,
    returnPerKm: 165,
  },
  'Toyota Coaster Pakistan': {
    baseFare: 0,
    oneWayPerKm: 300,
    returnPerKm: 300,
    upDownRate: true,
  },
}

export const routeOptions = [
  {
    id: 'multan-lahore',
    from: 'Multan',
    to: 'Lahore',
    distanceKm: 350,
  },
  {
    id: 'lahore-islamabad',
    from: 'Lahore',
    to: 'Islamabad',
    distanceKm: 380,
  },
  {
    id: 'islamabad-peshawar',
    from: 'Islamabad',
    to: 'Peshawar',
    distanceKm: 185,
  },
  {
    id: 'lahore-faisalabad',
    from: 'Lahore',
    to: 'Faisalabad',
    distanceKm: 180,
  },
  {
    id: 'lahore-sialkot',
    from: 'Lahore',
    to: 'Sialkot',
    distanceKm: 130,
  },
  {
    id: 'karachi-hyderabad',
    from: 'Karachi',
    to: 'Hyderabad',
    distanceKm: 165,
  },
  {
    id: 'karachi-sukkur',
    from: 'Karachi',
    to: 'Sukkur',
    distanceKm: 470,
  },
  {
    id: 'multan-bahawalpur',
    from: 'Multan',
    to: 'Bahawalpur',
    distanceKm: 100,
  },
  {
    id: 'multan-dg-khan',
    from: 'Multan',
    to: 'DG Khan',
    distanceKm: 230,
  },
  {
    id: 'multan-rahim-yar-khan',
    from: 'Multan',
    to: 'Rahim Yar Khan',
    distanceKm: 260,
  },
  {
    id: 'rawalpindi-murree',
    from: 'Rawalpindi',
    to: 'Murree',
    distanceKm: 65,
  },
  {
    id: 'islamabad-abbottabad',
    from: 'Islamabad',
    to: 'Abbottabad',
    distanceKm: 125,
  },
]
