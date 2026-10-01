import { useEffect, useState } from 'react';
import {
  ArrowRight, ChevronDown, ChevronLeft, ChevronRight, CircleCheck, Facebook, Factory,
  Flame, Instagram, Mail, MapPin, Menu, MessageCircle, Phone, Play, ShieldCheck,
  Sparkles, Store, Truck, Utensils, X, Lock
} from 'lucide-react';
import { business, gallery, productFormats, products } from '@/data/businessData';
import Dashboard from '@/Dashboard';
import { isSupabaseConfigured } from '@/lib/supabase';

type Language = 'es' | 'en';

const copy = {
  es: {
    nav: ['Inicio', 'Productos', 'Sobre Nosotros', 'Encanto Foods', 'Food Service', 'Dónde Comprar', 'Contacto'],
    heroEyebrow: 'SMP MANUFACTURING, INC.', heroTitle: 'Lo Nuestro Es Calidad', heroBody: 'Fabricamos discos/plantillas de masa para empanadillas, pastelillos y empanadas con la calidad, consistencia y sabor que tu cocina necesita.', heroTag: 'Más de 20 años de experiencia en la industria.', viewProducts: 'Ver nuestros productos', call: 'Llámanos', marketplace: 'Buscar en Marketplace',
    trust: ['20+ años de experiencia', 'Venta al por mayor y detal', 'Food service', 'Florida, Estados Unidos', 'Calidad de manufactura'],
    aboutLabel: 'Nuestra historia', aboutTitle: 'Tradición, calidad y experiencia.', aboutBody: 'SMP Manufacturing, Inc. se especializa en la fabricación de discos/plantillas de masa para empanadillas, pastelillos y empanadas. Nuestra experiencia en la industria nos permite ofrecer productos consistentes y de alta calidad para consumidores, restaurantes, food service, comercios y supermercados.', aboutBody2: 'Desde nuestras instalaciones en Orlando, Florida, trabajamos para llevar nuestros productos a clientes en Estados Unidos y el Caribe.', aboutQuote: 'Nuestra masa puede prepararse frita u horneada y rellenarse según el gusto, tradición o creatividad de cada cliente.', productsLabel: 'Calidad para cada preparación', productsTitle: 'Nuestros productos', productsBody: 'Una base confiable para crear lo que tu cocina imagina. Tamaños, presentaciones y disponibilidad se confirman directamente con nuestro equipo.', order: 'Llamar para ordenar', info: 'Solicitar información',
    benefitsTitle: 'Hecho para rendir en tu cocina.', benefits: [['Versátil', 'Ideal para una gran variedad de rellenos.'], ['Frita u horneada', 'Una masa, múltiples posibilidades.'], ['Calidad consistente', 'Fabricada pensando en consistencia y rendimiento.'], ['Food service ready', 'Opciones para restaurantes y operaciones comerciales.'], ['Retail y wholesale', 'Disponible al detal y al por mayor.']],
    encantoLabel: 'Una marca de nuestra familia', encantoTitle: 'Conoce Encanto Foods.', encantoBody: 'Encanto Foods forma parte de la familia de SMP Manufacturing, Inc., llevando nuestra experiencia y compromiso con la calidad a productos creados para nuestra comunidad y nuestros clientes.', discover: 'Descubre Encanto Foods', family: 'Parte de SMP Manufacturing, Inc.',
    serviceLabel: 'Soluciones comerciales', serviceTitle: 'Tu operación necesita una masa en la que pueda confiar.', serviceBody: '¿Tienes restaurante, cafetería, panadería, food truck, supermercado o negocio de alimentos? Hablemos de opciones para food service y clientes comerciales.', wholesale: 'Consultar sobre ventas al por mayor', serviceTypes: ['Restaurantes', 'Food trucks', 'Cafeterías', 'Panaderías', 'Supermercados', 'Distribuidores', 'Catering', 'Cocinas comerciales'],
    galleryLabel: 'De nuestra cocina a la tuya', galleryTitle: 'Una tradición que se ve y se siente.', viewGallery: 'Ver galería', slideshowLabel: 'El resultado de una buena masa', slideshowTitle: 'Textura, sabor y presentación en cada preparación.', slideshowBody: 'Una masa bien elaborada se reconoce desde el primer vistazo: flexible para trabajar, consistente al cocinar y capaz de mantener el relleno con un acabado dorado y apetitoso. Esa calidad convierte cada disco/plantilla en una experiencia que tus clientes recuerdan.',
    qualityTitle: 'Lo Nuestro Es Calidad', qualityBody: 'Cada disco/plantilla representa nuestra forma de trabajar: con experiencia, atención al detalle y respeto por la tradición.', qualityItems: ['Calidad consistente', 'Producto versátil', 'Experiencia en la industria', 'Servicio al cliente', 'Opciones comerciales', 'Venta al detal y al por mayor'],
    reviewsTitle: 'La confianza también se comparte.', reviews: 'en Google', viewReviews: 'Ver reseñas', leaveReview: 'Déjanos una reseña',
    locationLabel: 'Encuéntranos en Orlando', locationTitle: 'Estamos listos para servirte.', directions: 'Cómo llegar', hours: 'Horario',
    contactLabel: 'Hablemos de tu próximo pedido', contactTitle: '¿Interesado en nuestros productos?', contactBody: 'Comunícate con SMP Manufacturing para información sobre productos, food service, ventas al por mayor o disponibilidad.', request: 'Solicitar información', name: 'Nombre', company: 'Empresa', phone: 'Teléfono', email: 'Email', customer: 'Tipo de cliente', interest: 'Interés', message: 'Mensaje', select: 'Selecciona una opción', send: 'Enviar solicitud', success: 'Gracias. Hemos recibido tu solicitud y nos comunicaremos contigo.',
    footerNav: 'Navegación', associated: 'Marca asociada', rights: 'Todos los derechos reservados.'
  },
  en: {
    nav: ['Home', 'Products', 'About Us', 'Encanto Foods', 'Food Service', 'Where to Buy', 'Contact'],
    heroEyebrow: 'SMP MANUFACTURING, INC.', heroTitle: 'Quality you can taste in every bite.', heroBody: 'Premium dough discs/templates for empanadas, turnovers and filled pastries, created with the consistency and quality your kitchen deserves.', heroTag: 'More than 20 years of industry experience.', viewProducts: 'Explore our products', call: 'Call us', marketplace: 'Find us on Marketplace',
    trust: ['20+ years of experience', 'Wholesale & retail', 'Food service', 'Florida, United States', 'Quality manufacturing'],
    aboutLabel: 'Our story', aboutTitle: 'Tradition, quality & experience.', aboutBody: 'SMP Manufacturing, Inc. specializes in manufacturing premium dough discs/templates for empanadas, turnovers and filled pastries. Our industry experience allows us to provide dependable, consistent products for consumers, restaurants, food-service operators, retailers and supermarkets.', aboutBody2: 'From Orlando, Florida, we serve customers throughout the United States and Caribbean.', aboutQuote: 'Our dough can be fried or baked and filled according to each customer’s taste, tradition or creativity.', productsLabel: 'Quality for every preparation', productsTitle: 'Our products', productsBody: 'A dependable base for whatever your kitchen imagines. Sizes, presentations and availability are confirmed directly with our team.', order: 'Call to order', info: 'Request information',
    benefitsTitle: 'Made to perform in your kitchen.', benefits: [['Versatile', 'Ideal for a wide variety of fillings.'], ['Fried or baked', 'One dough, many possibilities.'], ['Consistent quality', 'Made with consistency and performance in mind.'], ['Food service ready', 'Options for restaurants and commercial operations.'], ['Retail & wholesale', 'Available retail and wholesale.']],
    encantoLabel: 'A brand in our family', encantoTitle: 'Meet Encanto Foods.', encantoBody: 'Encanto Foods is part of the SMP Manufacturing, Inc. family, bringing our experience and commitment to quality to products created for our community and customers.', discover: 'Discover Encanto Foods', family: 'Part of SMP Manufacturing, Inc.',
    serviceLabel: 'Commercial solutions', serviceTitle: 'Your operation needs dough it can count on.', serviceBody: 'Do you run a restaurant, café, bakery, food truck, supermarket or food business? Let’s talk about options for food service and commercial customers.', wholesale: 'Ask about wholesale', serviceTypes: ['Restaurants', 'Food trucks', 'Cafés', 'Bakeries', 'Supermarkets', 'Distributors', 'Catering', 'Commercial kitchens'],
    galleryLabel: 'From our kitchen to yours', galleryTitle: 'A tradition you can see and taste.', viewGallery: 'View gallery', slideshowLabel: 'The result of great dough', slideshowTitle: 'Texture, flavor and presentation in every preparation.', slideshowBody: 'Great dough is recognized at first glance: flexible to work with, consistent when cooked and strong enough to hold every filling with an appetizing golden finish. That quality turns every disc/template into an experience your customers remember.',
    qualityTitle: 'Quality Is What We Do', qualityBody: 'Every disc/template represents how we work: with experience, attention to detail and respect for tradition.', qualityItems: ['Consistent quality', 'Versatile product', 'Industry experience', 'Customer service', 'Commercial options', 'Retail & wholesale'],
    reviewsTitle: 'Trust is shared, too.', reviews: 'on Google', viewReviews: 'View reviews', leaveReview: 'Leave us a review',
    locationLabel: 'Find us in Orlando', locationTitle: 'Ready to serve you.', directions: 'Get directions', hours: 'Hours',
    contactLabel: 'Let’s talk about your next order', contactTitle: 'Interested in our products?', contactBody: 'Contact SMP Manufacturing for product information, food service, wholesale sales or availability.', request: 'Request information', name: 'Name', company: 'Company', phone: 'Phone', email: 'Email', customer: 'Customer type', interest: 'Interest', message: 'Message', select: 'Select an option', send: 'Send inquiry', success: 'Thank you. We received your inquiry and will be in touch.',
    footerNav: 'Navigation', associated: 'Associated brand', rights: 'All rights reserved.'
  }
};

const iconFor = (index: number) => [Utensils, Truck, Store, Factory, ShieldCheck][index] ?? Sparkles;
const slideshowItems: { src: string; type: 'image' | 'video' }[] = [
  { src: '/images/slideshow/don1.jpeg', type: 'image' },
  { src: '/images/slideshow/don3.jpeg', type: 'image' },
  { src: '/images/slideshow/don4.jpeg', type: 'image' },
  { src: '/images/slideshow/don5.jpeg', type: 'image' },
  { src: '/images/slideshow/SMP1.jpeg', type: 'image' },
  { src: '/images/slideshow/SMP2.jpeg', type: 'image' },
  { src: '/images/slideshow/SMP3.jpeg', type: 'image' },
  { src: '/images/slideshow/SMP4.jpeg', type: 'image' },
  { src: '/images/slideshow/SMP5.jpeg', type: 'image' },
  { src: '/images/slideshow/SMP6.mp4', type: 'video' },
  { src: '/images/slideshow/SMP7.mp4', type: 'video' },
  { src: '/images/slideshow/SMP8.jpeg', type: 'image' },
];

function App() {
  const [language, setLanguage] = useState<Language>('es');
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showDashboard, setShowDashboard] = useState(false);
  const t = copy[language];

  useEffect(() => { document.documentElement.lang = language; }, [language]);
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/track-visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: '/' }),
    }).catch(() => {});
  }, []);
  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slideshowItems.length);
    }, 2000);
    return () => window.clearInterval(interval);
  }, []);
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); };

  return (
    <div className="site-shell">
      <header className="nav-wrap">
        <nav className="nav container" aria-label="Main navigation">
          <button className="brand" onClick={() => scrollTo('inicio')} aria-label="SMP Manufacturing home">
            <img src="/brand/SMP_Logo_final_white.png" alt="SMP Manufacturing, Inc." />
          </button>
          <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
            {t.nav.map((item, index) => <button key={item} onClick={() => scrollTo(['inicio', 'productos', 'nosotros', 'encanto', 'food-service', 'galeria', 'contacto'][index])}>{item}</button>)}
            <div className="mobile-nav-cta"><a href={business.phoneLink} className="button button-small"><Phone size={15} /> {t.call}</a></div>
          </div>
          <div className="nav-actions"><div className="language" aria-label="Language selector"><button className={language === 'es' ? 'active' : ''} onClick={() => setLanguage('es')}>ES</button><span>|</span><button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>EN</button></div><a href={business.phoneLink} className="button button-small nav-call"><Phone size={15} /> {t.call}</a><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button></div>
        </nav>
      </header>

      <main>
        <section id="inicio" className="hero">
          <div className="hero-image" role="img" aria-label="Fresh empanadas ready for preparation" />
          <div className="hero-overlay" />
          <div className="container hero-content"><div className="hero-copy"><div className="eyebrow light"><span />{t.heroEyebrow}</div><h1>{t.heroTitle}</h1><p className="hero-lead">{t.heroBody}</p><div className="hero-highlight"><strong>{t.heroTag}</strong><em>{business.slogan[language]}</em></div><div className="hero-actions"><button className="button button-accent" onClick={() => scrollTo('productos')}>{t.viewProducts}<ArrowRight size={18} /></button><a className="button button-ghost" href={business.phoneLink}><Phone size={17} /> {t.call}</a></div><a className="market-link" href={business.facebookMarketplace} target="_blank" rel="noreferrer"><Facebook size={15} /> {t.marketplace} <ArrowRight size={15} /></a></div></div>
        </section>

        <section className="trust-bar"><div className="container trust-items">{t.trust.map((item, i) => <div className="trust-item" key={item}><CircleCheck size={17} /><span>{item}</span>{i < t.trust.length - 1 && <b />}</div>)}</div></section>

        <section id="nosotros" className="section about-section"><div className="container about-grid"><div className="about-visual"><div className="image-frame"><img src="/brand/fab2.jpeg" alt="SMP Manufacturing production facility" loading="lazy" /><div className="visual-stamp"><span>20+</span><small>{language === 'es' ? 'años de oficio' : 'years of craft'}</small></div></div></div><div className="about-copy"><div className="eyebrow"><span />{t.aboutLabel}</div><h2>{t.aboutTitle}</h2><p>{t.aboutBody}</p><p>{t.aboutBody2}</p><blockquote>“{t.aboutQuote}”</blockquote><div className="signature"><span className="signature-line" /> <span>SMP Manufacturing, Inc.</span></div></div></div></section>

        <section id="productos" className="section products-section"><div className="container"><div className="section-heading centered"><div className="eyebrow"><span />{t.productsLabel}</div><h2>{t.productsTitle}</h2><p>{t.productsBody}</p></div><div className="product-grid">{products.map((product) => <article className="product-card" key={product.key}><div className="product-image"><img src={product.image} alt={product.name[language]} loading="lazy" /><span>{product.badge[language]}</span></div><div className="product-content"><h3>{product.name[language]}</h3><a href={business.phoneLink} className="text-link">{t.order} <ArrowRight size={16} /></a></div></article>)}</div></div></section>

        <section className="section result-section"><div className="container result-grid"><div className="result-slideshow">{(() => { const item = slideshowItems[activeSlide]; return item.type === 'video' ? <video key={item.src} src={item.src} autoPlay muted loop playsInline /> : <img key={item.src} src={item.src} alt={language === 'es' ? `Preparación final ${activeSlide + 1}` : `Finished preparation ${activeSlide + 1}`} />; })()}<div className="result-progress" aria-label={language === 'es' ? 'Progreso de imágenes' : 'Image progress'}>{slideshowItems.map((item, index) => <span className={index === activeSlide ? 'active' : ''} key={item.src} />)}</div></div><div className="result-copy"><div className="eyebrow"><span />{t.slideshowLabel}</div><h2>{t.slideshowTitle}</h2><p>{t.slideshowBody}</p></div></div></section>

        <section className="section formats-section"><div className="container formats-inner"><div className="formats-copy"><div className="eyebrow"><span />{language === 'es' ? 'Nuestros formatos' : 'Our formats'}</div><h2>{language === 'es' ? 'Tres tamaños. Dos colores.' : 'Three sizes. Two colors.'}</h2><p>{language === 'es' ? 'Trabajamos tres tamaños de disco/plantilla para cubrir cada preparación, disponibles en color blanco y amarillo.' : 'We make three disc/template sizes to cover every preparation, available in white and yellow.'}</p></div><div className="formats-sizes">{productFormats.sizes.map((size) => <div className="format-size" key={size}><strong>{size}</strong><span>{language === 'es' ? 'diámetro' : 'diameter'}</span></div>)}</div><div className="formats-colors">{productFormats.colors[language].map((color) => <div className={`format-color ${color.toLowerCase() === 'blanco' || color.toLowerCase() === 'white' ? 'is-white' : 'is-yellow'}`} key={color}><span className="swatch" /><strong>{color}</strong></div>)}</div></div></section>

        <section className="benefits-section" aria-label={language === 'es' ? 'Beneficios' : 'Benefits'}><video className="benefits-video" autoPlay muted loop playsInline poster="/brand/fab2.jpeg"><source src="/images/SMP_Loop.mp4" type="video/mp4" /></video><div className="benefits-overlay" /><div className="container benefits-grid"><div><div className="eyebrow light"><span />{language === 'es' ? 'Pensado para profesionales' : 'Built for professionals'}</div><h2>{t.benefitsTitle}</h2></div><div className="benefits-list">{t.benefits.map(([title, body], i) => { const Icon = iconFor(i); return <div className="benefit" key={title}><div className="benefit-icon"><Icon size={20} /></div><div><h3>{title}</h3><p>{body}</p></div></div>; })}</div></div></section>

        <section id="encanto" className="section encanto-section"><div className="container encanto-card"><div className="encanto-mark"><span>ENCANTO</span><strong>FOODS</strong><i>Una marca de SMP</i></div><div className="encanto-copy"><div className="eyebrow"><span />{t.encantoLabel}</div><h2>{t.encantoTitle}</h2><p>{t.encantoBody}</p><div className="encanto-slogan">{business.slogan[language]}</div><button className="text-link" onClick={() => scrollTo('productos')}>{t.discover} <ArrowRight size={17} /></button></div></div></section>

        <section id="food-service" className="service-section"><div className="container service-grid"><div className="service-copy"><div className="eyebrow light"><span />{t.serviceLabel}</div><h2>{t.serviceTitle}</h2><p>{t.serviceBody}</p><a className="button button-accent" href={business.phoneLink}><Phone size={17} /> {t.wholesale}</a></div><div className="service-types">{t.serviceTypes.map((type, i) => { const Icon = iconFor(i % 5); return <div className="service-type" key={type}><Icon size={20} /><span>{type}</span></div>; })}</div></div></section>

        <section id="galeria" className="section gallery-section"><div className="container"><div className="section-heading"><div><div className="eyebrow"><span />{t.galleryLabel}</div><h2>{t.galleryTitle}</h2></div><button className="text-link" onClick={() => setLightbox(0)}>{t.viewGallery} <ArrowRight size={16} /></button></div><div className="gallery-grid">{gallery.map((item, i) => <button className={`gallery-item gallery-${i}`} key={item.image} onClick={() => setLightbox(i)}><img src={item.image} alt={item.title[language]} loading="lazy" /><span>{item.title[language]} <ArrowRight size={15} /></span></button>)}</div></div></section>

        <section className="quality-section"><div className="quality-texture" /><div className="container quality-inner"><div><div className="eyebrow light"><span />{language === 'es' ? 'Nuestro compromiso' : 'Our commitment'}</div><h2>{t.qualityTitle}</h2><p>{t.qualityBody}</p></div><div className="quality-items">{t.qualityItems.map((item) => <div key={item}><CircleCheck size={18} /> {item}</div>)}</div></div></section>

        <section className="review-section"><div className="container review-inner"><div className="review-stars">★★★★★</div><div><div className="eyebrow"><span />{t.reviewsTitle}</div><strong>{business.rating} <span>{t.reviews}</span></strong><small>{business.reviewCount} {language === 'es' ? 'reseñas verificadas' : 'verified reviews'}</small></div><div className="review-actions"><a href="#" className="button button-outline">{t.viewReviews}</a><a href="#" className="text-link">{t.leaveReview} <ArrowRight size={15} /></a></div></div></section>

        <section className="location-section"><div className="container location-grid"><div className="map-placeholder"><div className="map-grid" /><div className="map-pin"><MapPin size={22} fill="currentColor" /><span>SMP Manufacturing, Inc.</span></div><div className="map-label">ORLANDO<br /><strong>FLORIDA</strong></div></div><div className="location-copy"><div className="eyebrow"><span />{t.locationLabel}</div><h2>{t.locationTitle}</h2><div className="contact-detail"><MapPin size={19} /><div><strong>{business.name}</strong><span>159 Jamaica Ln<br />Orlando, FL 32809<br />United States</span></div></div><div className="contact-detail"><Phone size={19} /><div><strong>{business.phone}</strong><span>{t.hours}: {business.hours[language]}</span></div></div><a href={business.mapsUrl} className="button button-primary" target="_blank" rel="noreferrer"><MapPin size={17} /> {t.directions}</a></div></div></section>

        <section id="contacto" className="contact-section"><div className="container contact-grid"><div className="contact-intro"><div className="eyebrow light"><span />{t.contactLabel}</div><h2>{t.contactTitle}</h2><p>{t.contactBody}</p><a href={business.phoneLink} className="contact-phone"><Phone size={20} /><span>{business.phone}</span></a><div className="contact-emails">{business.emails.map((email) => <a key={email} href={`mailto:${email}`} className="contact-email"><Mail size={16} /><span>{email}</span></a>)}</div><div className="contact-social"><a href={business.facebook} aria-label="Facebook"><Facebook size={18} /></a><a href={business.instagram} aria-label="Instagram"><Instagram size={18} /></a><a href={`mailto:${business.email}`} aria-label="Email"><Mail size={18} /></a></div></div></div></section>
      </main>

      <footer className="footer"><div className="container footer-grid"><div className="footer-brand"><img src="/brand/SMP_Logo_final_white.png" alt="SMP Manufacturing, Inc." /><p>{business.slogan[language]}</p><span>{business.address}</span><a href={business.phoneLink}>{business.phone}</a></div><div><h3>{t.footerNav}</h3><div className="footer-links"><button onClick={() => scrollTo('inicio')}>{t.nav[0]}</button><button onClick={() => scrollTo('productos')}>{t.nav[1]}</button><button onClick={() => scrollTo('food-service')}>Food Service</button><button onClick={() => scrollTo('encanto')}>Encanto Foods</button><button onClick={() => scrollTo('contacto')}>{t.nav[6]}</button></div></div><div><h3>{t.associated}</h3><div className="footer-encanto">ENCANTO <strong>FOODS</strong></div><small>{t.family}</small><div className="footer-social"><a href={business.facebook} aria-label="Facebook"><Facebook size={17} /></a><a href={business.instagram} aria-label="Instagram"><Instagram size={17} /></a></div></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} SMP Manufacturing, Inc. {t.rights}</span><span>Orlando, Florida · United States & Caribbean</span></div></footer>

      <div className="mobile-bar"><a href={business.phoneLink}><Phone size={17} />{language === 'es' ? 'Llamar' : 'Call'}</a><button onClick={() => scrollTo('productos')}><Sparkles size={17} />{language === 'es' ? 'Productos' : 'Products'}</button><a href={business.facebookMarketplace} target="_blank" rel="noreferrer"><Facebook size={17} />Marketplace</a><a href={business.mapsUrl} target="_blank" rel="noreferrer"><MapPin size={17} />{language === 'es' ? 'Direcciones' : 'Directions'}</a></div>

      <div className="dash-access-bar"><button onClick={() => setShowDashboard(true)} aria-label="Staff dashboard"><Lock size={13} /> Staff</button></div>

      {showDashboard && <Dashboard onExit={() => setShowDashboard(false)} />}

      {lightbox !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery viewer" onClick={() => setLightbox(null)}><button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close"><X /></button><button className="lightbox-arrow left" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + gallery.length - 1) % gallery.length); }} aria-label="Previous"><ChevronLeft /></button><img src={gallery[lightbox].image} alt={gallery[lightbox].title[language]} onClick={(e) => e.stopPropagation()} /><button className="lightbox-arrow right" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % gallery.length); }} aria-label="Next"><ChevronRight /></button><div className="lightbox-caption">{gallery[lightbox].title[language]}</div></div>}
    </div>
  );
}

export default App;
