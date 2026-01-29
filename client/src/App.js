import React, { useEffect, useState } from 'react';
import './App.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaExternalLinkAlt, FaEnvelope, FaMapMarkerAlt, FaPhone, FaBars, FaTimes } from 'react-icons/fa';
import ProfileCard from './ProfileCard';
import profilePic from './profile.jpg'; 

// 1. Import Particles Background
import Particles from './Particles';

// 2. Import Contact Form
import ContactForm from './ContactForm';

function App() {
  const [data, setData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // --- NEW: RESUME DOWNLOAD FUNCTION ---
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // 'public' folder lo unna file path
    link.download = 'Raghava_Donga_Resume.pdf'; // Download ayyaka file name ila vastundi
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Fetch data from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/portfolio')
      .then(res => res.json())
      .then(resData => setData(resData))
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Your Skills Data
  const skillCategories = [
    {
      title: "Frontend Development",
      skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Vue.js", "Tailwind CSS", "SASS/SCSS"]
    },
    {
      title: "Backend Development",
      skills: ["Node.js", "Express.js", "Python", "Java", "PostgreSQL", "MongoDB", "GraphQL", "REST APIs"]
    },
    {
      title: "DevOps & Cloud",
      skills: ["Docker", "Kubernetes", "AWS", "Azure", "Jenkins", "GitLab CI"]
    },
    {
      title: "Generative AI & LLM Engineering",
      skills: [
        "LangChain",
        "OpenAI API",
        "RAG Pipelines",
        "Hugging Face",
        "LlamaIndex",
        "Pinecone",
        "ChromaDB",
        "Prompt Engineering",
        "Streamlit"
      ]
    },
    {
      title: "Tools & Technologies",
      skills: ["Git", "Linux", "Nginx", "Redis", "Prometheus", "VS Code", "Postman", "JIRA"]
    }
  ];

  if (!data) return <div className="loading">Loading Portfolio...</div>;

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <h2 className="logo">
          <span className="gradient-welcome">Welcome</span>
          <span className="dot"></span>
        </h2>

        {/* Desktop Menu */}
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact" className="btn-contact">Contact</a>
        </div>

        {/* Mobile Toggle */}
        <div className="hamburger" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 100 }}
              className="mobile-menu"
            >
              <a href="#about" onClick={toggleMenu}>About</a>
              <a href="#skills" onClick={toggleMenu}>Skills</a>
              <a href="#projects" onClick={toggleMenu}>Projects</a>
              <a href="#contact" onClick={toggleMenu}>Contact</a>
              <a href="Resume.pdf" download className="btn-resume" onClick={handleDownloadResume}>Download Resume</a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <header className="hero" id="about" style={{ position: 'relative', overflow: 'hidden' }}>
        
        {/* PARTICLES BACKGROUND */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
             <Particles
                 particleCount={300}
                 particleSpread={10}
                 speed={0.1}
                 particleColors={['#ffffff', '#00d2ff']} // White and Cyan particles
                 moveParticlesOnHover={true}
                 particleHoverFactor={1}
                 alphaParticles={false}
                 particleBaseSize={100}
                 sizeRandomness={1}
                 cameraDistance={20}
                 disableRotation={false}
             />
        </div>

        {/* Hero Content */}
        <div className="hero-grid-layout" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          width: '100%', 
          maxWidth: '1200px', 
          margin: '0 auto', 
          flexWrap: 'wrap', 
          gap: '20px',
          minHeight: '600px',
          position: 'relative',
          zIndex: 1 
        }}>
          
          {/* LEFT SIDE: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
            className="hero-text-content"
            style={{ flex: 1, textAlign: 'left', minWidth: '350px' }}
          >
            <h4>Hello, I'm</h4>
            
            <div className="hero-name-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <h1 className="glitch" data-text="Raghava" style={{ marginBottom: '-15px' }}>
                Raghava
              </h1>
              <h1 className="glitch" data-text="Donga">
                Donga
              </h1>
            </div>

            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.5, duration: 1 }}
              className="hero-subtitle"
            >
              {data.title}
            </motion.p>
            
            <p className="hero-desc" style={{ marginLeft: 0 }}>{data.summary}</p>
            
            <div className="hero-buttons" style={{ justifyContent: 'flex-start', marginLeft: '-10px' }}>
              <a href={`mailto:${data.contact.email}`} className="btn btn-primary">Hire Me</a>
              <a href="#projects" className="btn btn-outline">View Projects</a>
            </div>

            <div className="social-icons" style={{ justifyContent: 'flex-start', marginLeft: 0 }}>
              <a href={data.links.github} target="_blank" rel="noreferrer"><FaGithub /></a>
              <a href={data.links.linkedin} target="_blank" rel="noreferrer"><FaLinkedin /></a>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Profile Card */}
          <div className="hero-visual" style={{ 
            flex: 1, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minWidth: '350px', 
            height: '600px' 
          }}>
            {/* --- UPDATED PROFILE CARD --- */}
            <ProfileCard
                name="Raghava Donga"
                title="Full-Stack AI Developer"
                handle="raghavadonga4@gmail.com"
                avatarUrl={profilePic} 
                status="Open to Work"
                
                // IMPORTANT: Button Text Update
                contactText="Download Resume"
                
                // IMPORTANT: Linking our Download Function
                onContactClick={handleDownloadResume} 
            />
          </div>

        </div>
      </header>

      {/* Skills Section */}
      <section className="section" id="skills">
        <div className="section-header">
          <h2 className="section-title">Technical <span className="highlight">Skills</span></h2>
          <p className="section-desc">
            A comprehensive toolkit of modern technologies and frameworks that enable me to build robust, scalable applications.
          </p>
        </div>
        
        <div className="skills-grid-container">
          {skillCategories.map((category, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="skill-category-card"
            >
              <h3 className="category-title">{category.title}</h3>
              <div className="skill-badges-wrapper">
                {category.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="skill-pill">{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="section" id="projects">
        <h2 className="section-title">Featured <span className="highlight">Projects</span></h2>
        <div className="projects-grid">
          {data.projects.map((proj, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="project-card"
            >
              <div className="card-header">
                <h3>{proj.title}</h3>
                <span className="tech-stack">{proj.tech}</span>
              </div>
              <p>{proj.desc}</p>
              <div className="card-links">
                <a href={data.links.github} target="_blank" rel="noreferrer"><FaGithub /> Code</a>
                <a href={data.links.portfolio} target="_blank" rel="noreferrer"><FaExternalLinkAlt /> Live Demo</a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section with Form */}
      <footer className="footer" id="contact">
        <h2>Get In Touch</h2>
        <p className="section-desc" style={{ marginBottom: '40px' }}>
          Currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>

        {/* The New Form */}
        <ContactForm />

        <div className="contact-info">
          <p><FaEnvelope /> {data.contact.email}</p>
          <p><FaPhone /> {data.contact.phone}</p>
          <p><FaMapMarkerAlt /> {data.contact.location}</p>
        </div>
        <p className="copyright">© 2025 Raghava Donga. Made with React & MongoDB.</p>
      </footer>
    </div>
  );
}

export default App;