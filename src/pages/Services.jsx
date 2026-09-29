import PublicNavbar from "../components/PublicNavbar";
import { FaAngleDown, FaBus, FaClock, FaMoneyBillWave, FaUsers, FaSchool, FaCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../assets/easy_travel_logos.png";
import bgHero from "../assets/services.jpg";
import serviceImg from "../assets/confort.jpg";
import { Link, useNavigate } from "react-router-dom";

export default function Services() {
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
        className="relative h-[60vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bgHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1B29]/90 via-[#0A1B29]/70 to-[#0A1B29]/50"></div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 text-center"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Nos <span className="text-[#D4AF37]">Services</span>
          </h1>
          <p className="text-lg max-w-xl mx-auto">
            Découvrez notre gamme complète de services conçus pour rendre vos voyages agréables et sans souci.
          </p>
          
          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-[-100px] left-1/2 transform -translate-x-1/2 cursor-pointer"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            onClick={() => {
              const introSection = document.getElementById('intro');
              introSection.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <FaAngleDown className="text-[#D4AF37] text-3xl" />
          </motion.div>
        </motion.div>
      </section>

      {/* Introduction */}
      <motion.section 
        id="intro"
        className="py-20 px-6 flex justify-center bg-[#f4f4f5]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <motion.div 
          className="max-w-5xl w-full bg-white text-[#0A1B29] rounded-3xl shadow-lg p-10 space-y-6"
          whileHover={{ boxShadow: "0 10px 30px rgba(212,175,55,0.3)" }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-3xl text-center text-[#D4AF37] font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Découvrez nos offres
          </motion.h2>
          <motion.p 
            className="text-lg leading-relaxed text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            EasyTravel propose une gamme complète de services adaptés à vos besoins de transport interurbain, alliant confort, ponctualité et sécurité. Notre expertise nous permet de répondre à toutes vos attentes, que ce soit pour un voyage personnel ou professionnel.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Services principaux */}
      <motion.section 
        className="py-20 px-6 bg-[#f4f4f5]"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl text-center text-[#D4AF37] font-bold mb-6"
          >
            Nos services principaux
          </motion.h2>
          <motion.div 
            variants={fadeInUp}
            className="w-20 h-1 bg-[#D4AF37] mx-auto mb-12"
          ></motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { name: "Transport interurbain", icon: FaBus, text: "Déplacements réguliers entre les villes avec des horaires adaptés à vos besoins." },
              { name: "Location pour entreprises", icon: FaUsers, text: "Solutions sur mesure pour les déplacements professionnels et séminaires d'entreprise." },
              { name: "Services scolaires", icon: FaSchool, text: "Transport sécurisé et fiable pour les élèves et les sorties scolaires." },
              { name: "Groupes sportifs", icon: FaUsers, text: "Transport pour équipes sportives avec espace pour équipements et matériel." },
              { name: "Événements spéciaux", icon: FaCalendarAlt, text: "Service personnalisé pour mariages, conférences et tous types d'événements." },
              { name: "Transferts d'hôtel", icon: FaClock, text: "Service ponctuel pour vos transferts entre l'aéroport, l'hôtel ou tout autre lieu." },
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -15, boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
                className="bg-white text-[#0A1B29] rounded-2xl shadow-lg p-8 border border-[#D4AF37]/30 group cursor-pointer"
              >
                <div className="p-4 rounded-full bg-[#0A1B29]/5 inline-block mb-4 group-hover:bg-[#D4AF37]/20 transition-all">
                  <service.icon className="text-3xl text-[#D4AF37]" />
                </div>
                <div className="text-6xl font-bold text-[#0A1B29]/10 absolute right-8 top-8 opacity-50">{index + 1}</div>
                <h3 className="text-xl font-bold mb-4">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {service.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Section avantages */}
      <motion.section 
        className="py-20 px-6 bg-[#0A1B29]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <motion.div 
            className="md:w-1/2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={serviceImg} 
                alt="Bus" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
              />
            </div>
          </motion.div>
          
          <div className="md:w-1/2">
            <motion.h3 
              className="text-2xl md:text-3xl font-bold text-[#D4AF37] mb-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Pourquoi choisir EasyTravel ?
            </motion.h3>
            <motion.h4 
              className="text-xl md:text-2xl font-semibold mb-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Un service premium dédié à votre confort
            </motion.h4>
            <motion.p 
              className="text-white text-base md:text-lg"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Avec EasyTravel, vous bénéficiez d'une flotte moderne, de chauffeurs professionnels et d'une expérience client inégalée, le tout dans un cadre sécurisé et confortable. Notre engagement pour l'excellence nous pousse à toujours améliorer nos services pour vous offrir le meilleur.
            </motion.p>
            
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/contact")}
                className="bg-[#D4AF37] text-white px-6 py-3 rounded-xl hover:bg-[#b9952c] transition-all font-semibold"
              >
                En savoir plus
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Section détails des services */}
      <motion.section 
        className="py-20 px-6 bg-[#f4f4f5] text-[#0A1B29]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl text-center font-bold mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Nos <span className="text-[#D4AF37]">Garanties</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Ponctualité", 
                icon: FaClock,
                description: "Nous comprenons l'importance de la ponctualité. Nos chauffeurs sont formés pour respecter les horaires prévus."
              },
              { 
                title: "Confort optimal", 
                icon: FaBus,
                description: "Nos véhicules sont modernes, bien entretenus et équipés de toutes les commodités pour un trajet agréable."
              },
              { 
                title: "Tarifs compétitifs", 
                icon: FaMoneyBillWave,
                description: "Nous proposons des prix abordables sans compromis sur la qualité de service et le confort."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-[#D4AF37]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                  borderColor: "#b9952c"
                }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mr-4">
                    <item.icon className="text-[#D4AF37] text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                </div>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Appel à l'action */}
      <motion.section 
        className="py-16 px-6 bg-[#0A1B29] relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div 
            className="bg-[#1A2A3B] rounded-2xl p-10 shadow-2xl text-center"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-2xl md:text-3xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Prêt à voyager avec nous ?
            </motion.h2>
            <motion.p 
              className="text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Réservez votre prochain voyage dès maintenant et découvrez pourquoi nos clients nous font confiance.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/register")}
                className="bg-[#D4AF37] text-white px-8 py-4 rounded-full shadow-md hover:bg-[#b9952c] transition-all font-semibold"
              >
                Réservez maintenant
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Newsletter Section */}
      <motion.section 
        className="py-16 px-6 bg-[#f4f4f5]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-10 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0A1B29]">Restez informé</h2>
            <p className="text-gray-600 mt-2">Inscrivez-vous pour recevoir nos offres spéciales et actualités</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Votre email" 
              className="flex-1 p-3 rounded-lg bg-gray-100 text-[#0A1B29] border border-gray-300 focus:border-[#D4AF37] focus:outline-none transition-all"
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
