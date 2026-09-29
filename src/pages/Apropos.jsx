import PublicNavbar from "../components/PublicNavbar";
import { FaAngleDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/easy_travel_logos.png";
import bgImage from "../assets/decouvrer.jpg";
import chauffeurImg from "../assets/chauffeur.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function About() {
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
        className="relative bg-cover bg-center h-[70vh]"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1B29]/90 via-[#0A1B29]/70 to-[#0A1B29]/30 z-0"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white text-center mb-4"
          >
            Découvrez <span className="text-[#D4AF37]">EasyTravel</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl max-w-2xl text-center text-white/90"
          >
            Votre partenaire de confiance pour des voyages interurbains confortables et sécurisés
          </motion.p>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={() => {
            const missionSection = document.getElementById('mission');
            missionSection.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <FaAngleDown className="text-[#D4AF37] text-3xl" />
        </motion.div>
      </section>

      {/* Mission Section */}
      <motion.section 
        id="mission"
        className="py-20 px-4 sm:px-6 flex justify-center bg-[#0A1B29]/30"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <motion.div 
          className="max-w-5xl w-full bg-[#1A2A3B]/70 text-white rounded-3xl shadow-2xl p-6 sm:p-10 space-y-6 border border-[#D4AF37]/20"
          whileHover={{ boxShadow: "0 0 30px rgba(212,175,55,0.2)" }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl text-center text-[#D4AF37] font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Notre mission
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Fondée en 2025, EasyTravel a pour mission de transformer le transport interurbain au Cameroun en offrant des solutions de déplacement fiables, confortables et sécurisées. Nous croyons que chaque voyage devrait être une expérience agréable, sans stress ni tracas.
          </motion.p>
          <motion.p 
            className="text-base sm:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Notre vision est de promouvoir un passage significatif vers le transport partagé de qualité, contribuant ainsi à désengorger les routes, réduire l'empreinte carbone et offrir une alternative économique aux déplacements individuels. Avec une flotte moderne et des chauffeurs expérimentés, nous nous engageons à élever les standards du transport interurbain au Cameroun.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Services Section */}
      <motion.section 
        className="py-20 px-4 sm:px-6 bg-[#1A2A3B]"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div 
          variants={fadeInUp}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl text-center text-[#D4AF37] font-bold mb-4">Nos services</h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto mt-2 mb-12"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Le grand public",
              "Agences de voyage",
              "Entreprises",
              "Reservations",
              "Groupes d'incitation",
              "Gestion de colis",
              "Planification de voyages",
              "Reservation Hôtels et complexes",
              "Suivie de reservation et des voyages",
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -15, boxShadow: "0 10px 30px rgba(212,175,55,0.15)" }}
                className="bg-[#0A1B29]/70 text-white rounded-xl shadow-2xl border border-[#D4AF37]/30 p-6 text-center transition-all"
              >
                <p className="text-base sm:text-lg font-medium">{service}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Chauffeurs Section */}
      <motion.section 
        className="py-20 px-4 sm:px-6 bg-[#0A1B29] flex flex-col md:flex-row items-center justify-center gap-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <motion.div 
          className="md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
        >
          <img src={chauffeurImg} alt="Chauffeur" className="rounded-xl shadow-2xl transition-transform duration-500 hover:scale-105" />
        </motion.div>
        <motion.div 
          className="md:w-1/2 bg-[#1A2A3B]/80 text-white rounded-3xl shadow-2xl p-6 sm:p-10 border border-[#D4AF37]/20"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl font-bold text-[#D4AF37] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Nos chauffeurs professionnels
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Nos chauffeurs professionnels sont triés sur le volet et formés pour offrir une expérience de voyage sûre, confortable et ponctuelle. Avec des années d'expérience sur les routes camerounaises, ils connaissent les itinéraires comme leur poche et s'adaptent aux conditions routières pour assurer votre sécurité.
          </motion.p>
          <motion.p 
            className="text-base sm:text-lg leading-relaxed mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Chaque chauffeur suit régulièrement des formations sur la sécurité routière et les premiers secours, garantissant ainsi le plus haut niveau de professionnalisme et de fiabilité pour votre tranquillité d'esprit.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Style Section */}
      <motion.section 
        className="py-20 px-4 sm:px-6 flex justify-center bg-[#1A2A3B]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <motion.div 
          className="max-w-5xl w-full bg-[#0A1B29]/70 text-white rounded-3xl shadow-2xl p-6 sm:p-10 space-y-6 border border-[#D4AF37]/20"
          whileHover={{ boxShadow: "0 0 30px rgba(212,175,55,0.2)" }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl text-center text-[#D4AF37] font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Voyagez avec style entre Douala et Yaoundé
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg leading-relaxed text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            EasyTravel vous garantit confort et sécurité entre Douala et Yaoundé. Nos véhicules modernes sont équipés de sièges ergonomiques, climatisation, WiFi et systèmes de divertissement pour rendre votre voyage aussi agréable que possible. Réservez votre billet maintenant et découvrez une nouvelle façon de voyager.
          </motion.p>
          <motion.div 
            className="flex justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/register")}
              className="bg-[#D4AF37] text-white px-8 py-3 rounded-xl hover:bg-[#b9952c] transition-all"
            >
              Réservez maintenant
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        className="py-20 px-4 sm:px-6 bg-[#0A1B29]"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div 
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#D4AF37]">Notre équipe</h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto mt-4 mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-300">Découvrez les personnes passionnées qui font d'EasyTravel une entreprise exceptionnelle.</p>
        </motion.div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item, index) => (
            <motion.div 
              key={index}
              className="bg-[#1A2A3B]/70 p-8 rounded-lg shadow-lg border border-[#D4AF37]/20 group"
              variants={fadeInUp}
              whileHover={{ y: -15, boxShadow: "0 10px 30px rgba(212,175,55,0.15)" }}
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#D4AF37]/20 overflow-hidden border-2 border-[#D4AF37]">
                <img src={chauffeurImg} alt="Team member" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-semibold text-center text-[#D4AF37]">johan {index + 1}</h3>
              <p className="text-sm text-center text-gray-400 mt-1">Dev</p>
              <p className="mt-4 text-center text-white">
                Un professionnel dévoué qui contribue à faire d'EasyTravel un leader dans le transport interurbain au Cameroun.
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Newsletter Section */}
      <motion.section 
        className="py-16 px-6 bg-[#1A2A3B]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="max-w-4xl mx-auto bg-[#0A1B29] rounded-2xl p-10 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Restez informé</h2>
            <p className="text-gray-300 mt-2">Inscrivez-vous pour recevoir nos offres spéciales et actualités</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Votre email" 
              className="flex-1 p-3 rounded-lg bg-[#1A2A3B] text-white border border-gray-700 focus:border-[#D4AF37] focus:outline-none transition-all"
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