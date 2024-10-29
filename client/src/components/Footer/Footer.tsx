import React from "react";
import { FaTelegramPlane, FaWhatsapp, FaVk, FaYoutube } from "react-icons/fa";
import styles from "./Footer.module.css";
export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.logoSection}>
          {/* Место для вашего логотипа */}
          <img
            src="/photo1.png"
            alt="Your Logo"
            className={styles.logo}
          />
        </div>
        <div className={styles.contactInfo}>
          <p>Позвоните нам: +7 (495) 123-45-67</p>
          <p>Напишите нам: AdventureTime@example.com</p>
        </div>
        <div className={styles.socialLinks}>
          <p>Следуйте за нами</p>
          <a href="https://t.me/gaynullina_a" target="_blank" rel="noreferrer">
            <FaTelegramPlane color="#fff" size={28} title="Telegram" />
          </a>

          <a href="https://wa.me/+79963356738" target="_blank" rel="noreferrer">
            <FaWhatsapp color="#fff" size={28} title="WhatsApp" />
          </a>

          <a href="https://vk.com" target="_blank" rel="noreferrer">
            <FaVk color="#fff" size={28} title="VKontakte" />
          </a>
          <a href="https://youtu.be/SFbBzufAhkc">
            <FaYoutube size={28} />
          </a>
        </div>
        <div className={styles.contactInfo}>
          <p>Отзывы путешественников</p>
          <p>Организуйте авторский тур</p>
          <p>Присоединиться к партнёрской программе</p>
        </div>
        <div className={styles.copyRight}>
          <p>
            &copy; {new Date().getFullYear()} Adventure Time. Все права
            защищены.
          </p>
        </div>
      </footer>
    </>
  );
}
