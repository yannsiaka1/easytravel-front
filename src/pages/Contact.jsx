import PublicNavbar from "../components/PublicNavbar";
import { FaAngleDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/easy_travel_logos.png";
import contactBg from "../assets/contact.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Contact() {
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
    <div className="bg-[#0A1B29] text-white min-h-screen overflow-x-hidden">
      <PublicNavbar />

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[60vh] flex items-center justify-center"
        style={{ backgroundImage: `url(${contactBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1B29]/90 via-[#0A1B29]/70 to-[#0A1B29]/30"></div>
        <motion.h1 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 text-4xl md:text-5xl font-bold text-center text-[#D4AF37]"
        >
          Contactez-nous
        </motion.h1>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={() => {
            const contactFormSection = document.getElementById('contact-form');
            contactFormSection.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <FaAngleDown className="text-[#D4AF37] text-3xl" />
        </motion.div>
      </section>

      {/* Contact Form Section */}
      <motion.section 
        id="contact-form"
        className="py-20 px-6 bg-[#f9f9f9] text-[#0A1B29]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Details */}
          <motion.div 
            className="space-y-6"
            variants={fadeInUp}
          >
            <motion.h2 
              className="text-3xl font-bold text-[#D4AF37] mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Nous joindre
            </motion.h2>
            
            <motion.p 
              className="text-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              N'hésitez pas à nous contacter pour toute question ou réservation.
            </motion.p>
            
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <h4 className="font-semibold text-[#D4AF37]">Adresse :</h4>
                <p>Douala - Yaoundé, Cameroun</p>
              </div>
              
              <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <h4 className="font-semibold text-[#D4AF37]">Téléphone :</h4>
                <p>+237 6 XX XX XX XX</p>
              </div>
              
              <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <h4 className="font-semibold text-[#D4AF37]">Email :</h4>
                <p>contact@easytravel.com</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.form 
            className="bg-white rounded-3xl shadow-xl p-8 space-y-6"
            variants={fadeInUp}
            whileHover={{ boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
          >
            <motion.div 
              className="flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <label className="text-[#0A1B29] font-semibold mb-1">Nom</label>
              <input 
                type="text" 
                className="p-3 rounded-xl border border-gray-300 focus:border-[#D4AF37] focus:outline-none transition-all" 
                placeholder="Votre nom" 
              />
            </motion.div>
            
            <motion.div 
              className="flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <label className="text-[#0A1B29] font-semibold mb-1">Email</label>
              <input 
                type="email" 
                className="p-3 rounded-xl border border-gray-300 focus:border-[#D4AF37] focus:outline-none transition-all" 
                placeholder="Votre email" 
              />
            </motion.div>
            
            <motion.div 
              className="flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <label className="text-[#0A1B29] font-semibold mb-1">Sujet</label>
              <select 
                className="p-3 rounded-xl border border-gray-300 focus:border-[#D4AF37] focus:outline-none transition-all"
              >
                <option value="">Sélectionnez un sujet</option>
                <option value="reservation">Réservation</option>
                <option value="information">Demande d'information</option>
                <option value="feedback">Commentaires</option>
                <option value="other">Autre</option>
              </select>
            </motion.div>
            
            <motion.div 
              className="flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <label className="text-[#0A1B29] font-semibold mb-1">Message</label>
              <textarea 
                className="p-3 rounded-xl border border-gray-300 focus:border-[#D4AF37] focus:outline-none transition-all" 
                rows="5" 
                placeholder="Votre message"
              ></textarea>
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-[#D4AF37] py-3 rounded-xl text-white font-semibold hover:bg-[#b9952c] transition-all"
            >
              Envoyer
            </motion.button>
          </motion.form>
        </div>
      </motion.section>

      {/* Map Section */}
      <motion.section
        className="py-16 bg-[#0A1B29]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-[#D4AF37]">Notre emplacement</h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mt-4 mb-6"></div>
            <p className="text-gray-300">Retrouvez-nous facilement grâce à notre carte</p>
          </motion.div>
          
          <motion.div 
            className="h-80 bg-gray-700 rounded-xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.01 }}
          >
            {/* Emplacement pour intégrer une carte Google Maps */}
            <div className="w-full h-full flex items-center justify-center bg-gray-800">
              <p className="text-gray-400">Carte interactive non disponible en prévisualisation</p>
            </div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* FAQ Section */}
      <motion.section 
        className="py-16 px-6 bg-[#1A2A3B]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-[#D4AF37]">Questions fréquentes</h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mt-4 mb-6"></div>
            <p className="text-gray-300">Retrouvez les réponses à vos questions les plus courantes</p>
          </motion.div>
          
          <div className="space-y-4">
            {[
              {
                question: "Comment puis-je réserver un trajet ?",
                answer: "Vous pouvez réserver en ligne depuis notre site web, par téléphone ou directement dans nos agences. Le paiement peut être effectué par carte bancaire, mobile money ou en espèces."
              },
              {
                question: "Quels sont vos horaires de départ ?", 
                answer: "Nos bus partent régulièrement tout au long de la journée, de 6h à 18h. Veuillez consulter notre grille horaire pour des informations précises selon votre itinéraire."
              },
              {
                question: "Peut-on annuler ou reporter un voyage ?",
                answer: "Oui, vous pouvez annuler ou reporter votre voyage jusqu'à 24h avant le départ. Des frais peuvent s'appliquer selon les conditions de votre réservation."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                className="bg-[#0A1B29] p-6 rounded-xl cursor-pointer"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold text-[#D4AF37] mb-2">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
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