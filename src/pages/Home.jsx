import PublicNavbar from "../components/PublicNavbar";
import { FaAngleDown, FaBus, FaClock, FaMoneyBillWave } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../assets/easy_travel_logos.png";
import busImage from "../assets/acceuil.jpg";
import expertiseBus from "../assets/expertise.jpg";
import sectionImage from "../assets/confort.jpg"; 
import exploreImage from "../assets/destination.jpg";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  // Animations pour les sections
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1B29] text-white overflow-x-hidden">
      <PublicNavbar />

      {/* Hero Section */}
      <section
        className="relative h-[90vh] flex flex-col md:flex-row items-center justify-between px-6 py-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${busImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1B29]/90 via-[#0A1B29]/70 to-[#0A1B29]/30 z-0"></div>

        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 w-full md:w-1/2 text-left"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4 transition-all duration-300 hover:text-[#D4AF37] hover:scale-105">
            Bienvenue chez <span className="text-[#D4AF37]">EasyTravel</span>
          </h1>
          <p className="text-lg md:text-xl max-w-md">
            Reservez vos voyages en toute sérénité grâce à notre service de reservation rapide, fiable et sécurisé.
          </p>
          <motion.div 
            className="mt-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => {
                const servicesSection = document.getElementById('services');
                servicesSection.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 bg-[#D4AF37] text-white px-6 py-3 rounded-xl hover:bg-[#b9952c] transition-all"
            >
              <span>Découvrir nos services</span>
              <FaAngleDown />
            </button>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative z-10 w-full md:w-1/3 mt-10 md:mt-0"
        >
          <div className="bg-[#0A1B29]/70 p-12 rounded-3xl shadow-2xl transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            <h2 className="text-lg font-medium mb-6">
              Découvrez un nouveau standard de voyage. Réservez votre voyage en toute simplicité et partez l'esprit tranquille.
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/register")}
              className="w-full bg-[#D4AF37] text-white py-3 rounded-xl hover:bg-[#b9952c] transition-all font-semibold"
            >
              Réserver maintenant
            </motion.button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={() => {
            const expertiseSection = document.getElementById('expertise');
            expertiseSection.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <FaAngleDown className="text-[#D4AF37] text-3xl" />
        </motion.div>
      </section>

      {/* Expertise Section */}
      <motion.section 
        id="expertise"
        className="bg-gradient-to-r from-[#0A1B29]/90 via-[#0A1B29]/70 to-[#0A1B29]/40 py-20 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto bg-[#0A1B29]/50 rounded-xl p-8 flex flex-col md:flex-row items-center gap-10 shadow-md">
          <motion.div 
            className="w-full md:w-1/3 flex justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-80 h-50 rounded-xl overflow-hidden shadow-lg">
              <img src={expertiseBus} alt="Bus" className="object-cover w-full h-full transition-transform duration-500 hover:scale-110" />
            </div>
          </motion.div>
          <div className="w-full md:w-2/3 text-left">
            <motion.h3 
              className="text-2xl md:text-3xl font-bold text-[#D4AF37] mb-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Offrir une grande expertise
            </motion.h3>
            <motion.h4 
              className="text-xl md:text-2xl font-semibold mb-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              dans tous vos besoins en transport terrestre
            </motion.h4>
            <motion.p 
              className="text-white text-base md:text-lg"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
EasyTravel est une plateforme de réservation de billets de voyage interurbain, spécialisée dans les trajets entre les différentes villes du Cameroun. Nous proposons également des services de gestion de colis destinés aux agences de transport. Depuis 2025, notre priorité est d’offrir des solutions de réservation fiables, sécurisées et accessibles à tous.            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section 
        id="services"
        className="bg-gray-100 py-20 px-6 text-gray-800"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div 
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A1B29]">Nos Services</h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto mt-4 mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600">Découvrez nos services conçus pour répondre à vos différents besoins .</p>
        </motion.div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Service 1 */}
          <motion.div 
            className="bg-white p-8 rounded-lg shadow-lg border group cursor-pointer"
            variants={fadeInUp}
            whileHover={{ y: -15, boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
          >
            <div className="p-4 rounded-full bg-[#0A1B29]/5 inline-block mb-4 group-hover:bg-[#D4AF37]/20 transition-all">
              <FaBus className="text-3xl text-[#D4AF37]" />
            </div>
            <div className="text-6xl font-bold text-[#0A1B29]/10 absolute right-8 top-8 opacity-50">1</div>
            <h3 className="text-2xl font-semibold mt-2 relative">
              SERVICES DE <span className="text-[#D4AF37] font-bold">RESRVATION</span>
            </h3>
            <p className="mt-4 text-base leading-relaxed text-gray-700">
            Grâce à notre plateforme moderne de réservation en ligne, EasyTravel vous permet de réserver vos billets en quelques clics, où que vous soyez. Que ce soit pour un départ de dernière minute ou un voyage planifié, nous simplifions l’accès au transport interurbain pour tous les voyageurs.            </p>
          </motion.div>

          {/* Service 2 */}
          <motion.div 
            className="bg-white p-8 rounded-lg shadow-lg border group cursor-pointer"
            variants={fadeInUp}
            whileHover={{ y: -15, boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
          >
            <div className="p-4 rounded-full bg-[#0A1B29]/5 inline-block mb-4 group-hover:bg-[#D4AF37]/20 transition-all">
              <FaClock className="text-3xl text-[#D4AF37]" />
            </div>
            <div className="text-6xl font-bold text-[#0A1B29]/10 absolute right-8 top-8 opacity-50">2</div>
            <h3 className="text-2xl font-semibold mt-2 relative">
              FIABILITÉ DES <span className="text-[#D4AF37] font-bold">RESERVATIONS</span>
            </h3>
            <p className="mt-4 text-base leading-relaxed text-gray-700">
            Nous savons à quel point la fiabilité compte pour chaque voyageur. C’est pourquoi notre système de réservation garantit votre place à bord, avec des départs respectés et un suivi en temps réel pour voyager l’esprit tranquille, à chaque trajet.            </p>
          </motion.div>

          {/* Service 3 */}
          <motion.div 
            className="bg-white p-8 rounded-lg shadow-lg border group cursor-pointer"
            variants={fadeInUp}
            whileHover={{ y: -15, boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
          >
            <div className="p-4 rounded-full bg-[#0A1B29]/5 inline-block mb-4 group-hover:bg-[#D4AF37]/20 transition-all">
              <FaMoneyBillWave className="text-3xl text-[#D4AF37]" />
            </div>
            <div className="text-6xl font-bold text-[#0A1B29]/10 absolute right-8 top-8 opacity-50">3</div>
            <h3 className="text-2xl font-semibold mt-2 relative">
              PRIX <span className="text-[#D4AF37] font-bold">COMPÉTITIFS</span>
            </h3>
            <p className="mt-4 text-base leading-relaxed text-gray-700">
            Grâce à notre plateforme numérique et à notre réseau de partenaires, EasyTravel propose des tarifs de réservation très compétitifs. Nous nous engageons à offrir le meilleur rapport qualité-prix pour chaque trajet, sans compromis sur le confort ou la sécurité.            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Highlight Section */}
      <motion.section
        className="relative h-[400px] bg-cover bg-center flex items-stretch overflow-hidden"
        style={{ backgroundImage: `url(${sectionImage})` }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <motion.div 
          className="relative z-10 flex items-center justify-start w-full"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-[#0A1B29]/80 h-full px-10 py-8 rounded-r-xl flex items-center" style={{ maxWidth: '400px' }}>
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
              Passez un moment inoubliable <br /> dans le confort !
            </h2>
          </div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-8 right-8 z-10"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <button 
            onClick={() => navigate("/contact")}
            className="bg-[#D4AF37] text-white py-3 px-6 rounded-xl hover:bg-[#b9952c] transition-all"
          >
            Contactez-nous
          </button>
        </motion.div>
      </motion.section>

      {/* Explore Section */}
      <motion.section 
        className="bg-[#1A2A3B] relative flex flex-col md:flex-row h-auto md:h-[450px] overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <motion.div 
          className="md:w-1/3 w-full h-[300px] md:h-auto bg-cover bg-center relative"
          style={{ backgroundImage: `url(${exploreImage})` }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A2A3B] via-transparent to-transparent md:bg-gradient-to-l"></div>
        </motion.div>
        
        <div className="md:w-2/3 w-full p-10 md:rounded-l-full flex flex-col justify-center">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Explorez votre destination préférée
          </motion.h2>
          
          <motion.h3 
            className="text-xl md:text-2xl font-semibold text-[#D4AF37]/100 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            avec style et confort !
          </motion.h3>
          
          <motion.p 
            className="text-white text-base md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Notre personnel est à votre disposition avec un service amical et professionnel pour votre périple entre Douala et Yaoundé. Nous avons des années d'expérience, bâties sur l'offre à nos clients d'un service professionnel concernant tous les aspects du transport. Ensemble avec nos partenaires, nous pouvons offrir une large flotte de bus modernes adaptés à toutes les occasions.
          </motion.p>
          
          <motion.div 
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <button 
              onClick={() => navigate("/register")}
              className="bg-[#D4AF37] text-white py-3 px-6 rounded-xl hover:bg-[#b9952c] transition-all"
            >
              Réserver maintenant
            </button>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Newsletter Section */}
      <motion.section 
        className="py-16 px-6 bg-[#0A1B29]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="max-w-4xl mx-auto bg-[#1A2A3B] rounded-2xl p-10 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Restez informé</h2>
            <p className="text-gray-300 mt-2">Inscrivez-vous pour recevoir nos offres spéciales et actualités</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Votre email" 
              className="flex-1 p-3 rounded-lg bg-[#0A1B29] text-white border border-gray-700 focus:border-[#D4AF37] focus:outline-none transition-all"
            />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:w-auto w-full bg-[#D4AF37] text-white py-3 px-6 rounded-lg hover:bg-[#b9952c] transition-all font-semibold"
            >
              S'abonner
            </motion.button>
          </div>
        </div>
      </motion.section>
      
      {/* Footer */}
      <footer className="bg-[#0A1B29] text-white py-10 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <img src={logo} alt="Logo" className="w-12 h-12 mb-2" />
            <h3 className="text-xl font-bold text-[#D4AF37]">EasyTravel</h3>
            <p className="text-sm mt-2 text-gray-300">Voyagez entre Douala et Yaoundé avec confort, fiabilité et sécurité.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-3 text-[#D4AF37]">Liens rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                  Nos services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-3 text-[#D4AF37]">Contact</h4>
            <p className="text-gray-300 text-sm mb-2">Douala, Cameroun</p>
            <p className="text-gray-300 text-sm mb-2">(+237) 6 55 97 51 62</p>
            <p className="text-gray-300 text-sm">contact@easytravel.com</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-3 text-[#D4AF37]">Newsletter</h4>
            <p className="text-gray-300 text-sm mb-2">Recevez nos actualités et offres spéciales.</p>
            <div className="flex flex-col gap-2">
              <input type="email" placeholder="Votre email" className="w-full p-2 rounded bg-[#1f2d3d] text-white placeholder-gray-400 border border-gray-700 focus:border-[#D4AF37] focus:outline-none" />
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/register")}
                className="w-full bg-[#D4AF37] py-2 rounded hover:bg-[#b9952c] text-white font-semibold transition-all"
              >
                S'abonner
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        <div className="text-center text-sm text-gray-500 mt-10">© 2025 EasyTravel. Tous droits réservés.</div>
      </footer>
    </div>
  );
}