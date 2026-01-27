const mongoose = require('mongoose');
const Resume = require('./models/Resume');

// Connect to MongoDB
// Connect to MongoDB (Updated)
mongoose.connect('mongodb://127.0.0.1:27017/my_portfolio')
  .then(() => console.log("MongoDB Connected for Seeding"))
  .catch(err => console.log(err));

// Clean Resume Data
const resumeData = {
  name: "Donga Sai Raghava",
  title: "Full Stack AI Developer | Gen AI Engineer | MERN Stack & Python",
  contact: {
    email: "raghavadonga4@gmail.com",
    phone: "+919059088334",
    location: "Narsapuram, Andhra Pradesh"
  },
  links: {
    linkedin: "https://www.linkedin.com/in/raghava-donga-207288330",
    github: "https://github.com/Chilipidonga",
    portfolio: "https://raghava-web-forge.lovable.app"
  },
  summary: "Full Stack AI Developer building the intersection of web and AI. Expert in MERN stack, Python, and Generative AI integrations. Turning code into intelligent, user-centric solutions.",
  education: [
    { 
      degree: "Bachelor of Engineering: Information Technology", 
      school: "Swarnandra College Of Engineering And Technology", 
      year: "Expected July 2026" 
    }
  ],
  skills: [
    "ServiceNow (App Engine, Scripting, Flow Designer)",
    "MERN Stack (MongoDB, Express, React, Node)",
    "Generative AI (LLMs, Gemini API)",
    "Databases (SQL, MongoDB, AWS EC2)"
  ],
  experience: [
    {
      role: "Generative AI Intern",
      company: "Grn AI",
      date: "Nov 2025 – Dec 2025"
    },
    {
      role: "Freelance Web Developer",
      company: "Self-Employed",
      date: "Oct 2025 – Present"
    }
  ],
  projects: [
    {
      title: "Resume Analyzer AI",
      tech: "MERN, Gemini AI",
      desc: "Real-time Resume Analyzer with AI capabilities."
    },
    {
      title: "TastyGo",
      tech: "MERN Stack",
      desc: "Full-stack food delivery platform."
    },
    {
      title: "SAPAAS",
      tech: "Python, Django",
      desc: "Student Academic Performance & Attendance Analysis System."
    }
  ],
  certifications: [
    "Certified Application Developer (CAD) – ServiceNow [Nov 2025]",
    "Generative AI Certification – Grn AI [Dec 2025]"
  ]
};

const seedDB = async () => {
  try {
    await Resume.deleteMany({}); // Clear old data
    await Resume.create(resumeData); // Insert new data
    console.log("Database Seeded Successfully!");
  } catch (err) {
    console.log("Seeding Error:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();