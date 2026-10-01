export const business = {
  name: 'SMP Manufacturing, Inc.',
  phone: '787-646-2559',
  phoneLink: 'tel:+17876462559',
  address: '159 Jamaica Ln, Orlando, FL 32809, United States',
  latitude: 28.48790135996801,
  longitude: -81.37464612519565,
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=28.48790135996801,-81.37464612519565',
  facebook: '#',
  facebookMarketplace: '#',
  instagram: '#',
  email: 'smpsanchez2021@gmail.com',
  emails: ['smpsanchez2021@gmail.com', 'smpgiova2021@gmail.com', 'smpfoods2021@gmail.com'],
  rating: '5.0',
  reviewCount: 3,
  slogan: { es: '¡Calidad que se siente en la masa!', en: 'Quality Is What We Do!' },
  hours: { es: 'Lunes a viernes · Horario comercial', en: 'Monday to Friday · Business hours' },
};

export const products = [
  { key: 'empanadillas', name: { es: 'Discos/Plantillas para Empanadillas', en: 'Empanadilla Dough Discs/Templates' }, application: { es: 'Para rellenos dulces o salados', en: 'For sweet or savory fillings' }, image: '/images/products/pro1.jpeg', badge: { es: 'Retail / Wholesale', en: 'Retail / Wholesale' } },
  { key: 'pastelillos', name: { es: 'Discos/Plantillas para Pastelillos', en: 'Pastelillo Dough Discs/Templates' }, application: { es: 'Elaboración frita u horneada', en: 'Fried or baked preparation' }, image: '/images/products/pro2.jpeg', badge: { es: 'Versátil', en: 'Versatile' } },
  { key: 'foodservice', name: { es: 'Tamaños para Food Service', en: 'Food Service Sizes' }, application: { es: 'Para restaurantes y operaciones comerciales', en: 'For restaurants and commercial operations' }, image: '/images/products/pro5.jpeg', badge: { es: 'Disponible', en: 'Available' } },
];

export const productFormats = {
  sizes: ['5.5\"', '6\"', '7\"'],
  colors: { es: ['Blanco', 'Amarillo'], en: ['White', 'Yellow'] },
};

export const gallery = [
  { title: { es: 'Manufactura SMP', en: 'SMP manufacturing' }, image: '/images/products/pro3.jpeg' },
  { title: { es: 'Discos/Plantillas blancos', en: 'White dough discs/templates' }, image: '/images/products/pro1.jpeg' },
  { title: { es: 'Presentación para clientes', en: 'Customer presentation' }, image: '/images/products/pro2.jpeg' },
  { title: { es: 'Discos/Plantillas amarillos', en: 'Yellow dough discs/templates' }, image: '/images/products/pro5.jpeg' },
];
