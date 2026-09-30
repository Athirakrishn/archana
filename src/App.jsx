import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import './index.css';
import './preloader.css';

const imagesRow1 = [
  { src: '/a3.jpeg', rotation: -2 }
];

const imagesRow2 = [
  { src: '/a1.jpeg', rotation: -3 },
  { src: '/a2.jpeg', rotation: 4 },
  { src: '/a4.jpeg', rotation: -1 },
  { src: '/a5.jpeg', rotation: 2 }
];

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 10 + Math.random() * 20,
      size: 16 + Math.random() * 24,
      delay: Math.random() * 20
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="floating-hearts">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="heart"
          initial={{ y: '100vh', x: `${heart.left}vw`, opacity: 0 }}
          animate={{
            y: '-10vh',
            x: `${heart.left + (Math.random() * 20 - 10)}vw`,
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: heart.animationDuration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear"
          }}
        >
          <Heart size={heart.size} fill="#ff4d6d" />
        </motion.div>
      ))}
    </div>
  );
};

const Preloader = () => (
  <motion.div 
    className="preloader"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
  >
    <motion.div
      animate={{ 
        scale: [1, 1.3, 1],
        rotate: [0, 10, -10, 0] 
      }}
      transition={{ 
        duration: 1.5, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Heart size={80} fill="#ff4d6d" color="#ff4d6d" />
    </motion.div>
  </motion.div>
);

const LandingPage = ({ onEnter }) => (
  <motion.div 
    className="landing-page"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1 }}
  >
    <motion.div 
      className="landing-content"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onEnter}
    >
      <img src="/a0.jpeg" alt="Click to open" className="landing-image" />
      <motion.p 
        className="landing-text"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Click to open a special surprise... ✨
      </motion.p>
    </motion.div>
  </motion.div>
);

function App() {
  const [loading, setLoading] = useState(true);
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    // Simulate loading time for the preloader to be visible
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : showLanding ? (
        <LandingPage onEnter={() => setShowLanding(false)} />
      ) : (
        <div className="app-container">
          <FloatingHearts />
          
          <motion.div 
            className="hero-section"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring" }}
          >
            <motion.h1 
              className="title"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            >
              Happy Birthday!
            </motion.h1>
            
            <motion.h2 
              className="subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              To my dearest friend, Archana 🌸
            </motion.h2>

            <motion.p 
              className="message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              Wishing you a wonderful day filled with joy, laughter, and love. 
              May this special day bring you everything you've been hoping for and more. 
              I hope the year ahead is full of success, peace, and beautiful moments 
              that make you smile every single day.
            </motion.p>
          </motion.div>

          <div className="gallery-container">
            <div className="gallery-row gallery-row-1">
              {imagesRow1.map((img, idx) => (
                <motion.div
                  key={`row1-${idx}`}
                  className="image-card"
                  style={{ '--rotation': img.rotation }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <img src={img.src} alt="Archana and friend" className="gallery-img" />
                </motion.div>
              ))}
            </div>
            
            <div className="gallery-row gallery-row-2">
              {imagesRow2.map((img, idx) => (
                <motion.div
                  key={`row2-${idx}`}
                  className="image-card"
                  style={{ '--rotation': img.rotation }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + idx * 0.2, duration: 0.5 }}
                >
                  <img src={img.src} alt="Archana and friend" className="gallery-img" />
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            className="footer-wish"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
          >
            <h3>Cheers to amazing years! 🥂</h3>
            <p>Keep shining, keep smiling, and never stop being the wonderful friend you are. Have the sweetest birthday ever! 🍰💖✨</p>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default App;
