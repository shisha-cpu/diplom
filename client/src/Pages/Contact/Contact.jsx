import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import "./contact.css";

const TELEGRAM_BOT_TOKEN = "7206132347:AAE_Mkk08XcCW1pAfxRorHhksQ8ApjCDOH8";
const CHAT_ID = 1137493485
const API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Формируем текст сообщения без кодирования (кодирование будет в теле запроса)
  const text = `Новое сообщение:\n👤 Имя: ${formData.name}\n✉ Email: ${formData.email}\n💬 Сообщение: ${formData.message}`;
  
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        chat_id: CHAT_ID, 
        text: text,
        parse_mode: "HTML" // опционально, если хотите использовать HTML-разметку
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Ошибка при отправке: ${response.statusText}`);
    }
    
    alert("Сообщение отправлено!");
    setFormData({ name: "", email: "", message: "" });
  } catch (error) {
    console.error(error);
    alert("Ошибка отправки сообщения!");
  }
};
  
  

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
        <ContactCard icon={<Mail size={36} />} title="Email" text="contact@edventura.com" />
        <ContactCard icon={<Phone size={36} />} title="Телефон" text="+7 999 123-45-67" />
        <ContactCard icon={<MapPin size={36} />} title="Адрес" text="Москва, ул. Прогресса, 21" />
      </motion.div>

      <motion.form
        className="contact-form"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        onSubmit={handleSubmit}
      >
        <h2>Оставьте сообщение</h2>
        <input type="text" name="name" placeholder="Ваше имя" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Ваш Email" value={formData.email} onChange={handleChange} required />
        <textarea name="message" placeholder="Ваше сообщение" value={formData.message} onChange={handleChange} required />
        <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          Отправить
        </motion.button>
      </motion.form>
    </div>
  );
};

const ContactCard = ({ icon, title, text }) => (
  <motion.div className="contact-card" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
    <div className="contact-card-icon">{icon}</div>
    <h3 className="contact-card-title">{title}</h3>
    <p className="contact-card-text">{text}</p>
  </motion.div>
);

export default Contact;
