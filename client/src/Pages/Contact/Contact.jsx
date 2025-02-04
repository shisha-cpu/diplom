import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import './contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <motion.h1
        className="contact-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Свяжитесь с нами
      </motion.h1>

      <motion.div
        className="contact-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <ContactCard
          icon={<Mail size={36} />}
          title="Email"
          text="contact@edventura.com"
        />
        <ContactCard
          icon={<Phone size={36} />}
          title="Телефон"
          text="+7 999 123-45-67"
        />
        <ContactCard
          icon={<MapPin size={36} />}
          title="Адрес"
          text="Москва, ул. Прогресса, 21"
        />
      </motion.div>

      <motion.form
        className="contact-form"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <h2>Оставьте сообщение</h2>
        <input
          type="text"
          placeholder="Ваше имя"
        />
        <input
          type="email"
          placeholder="Ваш Email"
        />
        <textarea
          placeholder="Ваше сообщение"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Отправить
        </motion.button>
      </motion.form>
    </div>
  );
};

const ContactCard = ({ icon, title, text }) => (
  <motion.div
    className="contact-card"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <div className="contact-card-icon">{icon}</div>
    <h3 className="contact-card -title">{title}</h3>
    <p className="contact-card-text">{text}</p>
  </motion.div>
);

export default Contact;