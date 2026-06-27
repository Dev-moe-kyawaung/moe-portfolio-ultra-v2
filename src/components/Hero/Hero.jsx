import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimate } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { useScrollReveal } from '../../hooks/useScrollReveal.js';
import { socialLinks, techSpecialties } from '../../data/portfolioData.js';

/**
 * ULTRA V2 Hero with 3D Particle Background + Advanced Animations
 */
export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const ref = useRef(null);
  const visible = useScrollReveal(ref);
  const [scope, animate] = useAnimate();

  // 3D Particle Background
  function ParticleBackground() {
    const ref = useRef();
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));

    useFrame(() => {
      ref.current.rotation.x -= 0.001;
      ref.current.rotation.y -= 0.001;
    });

    return (
      <group rotation={[0, 0, Math.PI / 4]}>
        <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
          <PointMaterial
            transparent
            color="#00f5ff"
            size={0.002}
            sizeAttenuation={true}
            depthWrite={false}
          />
        </Points>
      </group>
    );
  }

  // Rotate roles
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % techSpecialties.length);
      setTypedText('');
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Typing effect
  useEffect(() => {
    const currentRole = techSpecialties[roleIndex];
    let charIndex = 0;
    const timer = setInterval(() => {
      if (charIndex < currentRole.length) {
        setTypedText(currentRole.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(timer);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [roleIndex]);

  // Animate on visible
  useEffect(() => {
    if (visible) {
      animate('.heroCard', { opacity: [0, 1], y: [40, 0] });
    }
  }, [visible]);

  return (
    <section ref={ref} className="hero">
      {/* 3D Canvas Background */}
      <Canvas className="heroCanvas" camera={{ position: [0, 0, 1] }}>
        <ParticleBackground />
      </Canvas>

      <div className="heroGlow" aria-hidden="true" />
      
      <motion.div
        ref={scope}
        className={`heroCard glass ${visible ? 'show' : ''}`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 40 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <p className="eyebrow">
          Professional Android Portfolio • Ultra Premium SaaS Experience
        </p>
        
        <h1 className="heroTitle">
          <span className="gradient-text text-glow">MOE KYAW AUNG</span>
          <br />
          Android Senior Developer
        </h1>

        <div className="typing-container" aria-live="polite">
          <p className="typing cursor">{typedText}</p>
        </div>

        <p className="heroText">
          Android Developer with nearly <strong>12 years of hands-on experience</strong> 
          building secure, scalable, and user-friendly mobile applications. Strong in 
          Kotlin and modern Jetpack development (Compose, ViewModel, Room), Firebase 
          integration, and REST API consumption.
        </p>

        <div className="heroBtns">
          <Link to="/contact" className="btn primary glow">
            Contact Me
          </Link>
          <Link to="/projects" className="btn holo-hover">
            View Projects
          </Link>
        </div>

        <div className="socialRow" role="list" aria-label="Social media links">
          {socialLinks.map((social, idx) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer noopener"
              className="social-icon holo-hover"
              aria-label={`${social.label} profile`}
              title={social.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className={`fa ${social.icon}`} />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
