const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  name: String,
  title: String,
  contact: { email: String, phone: String, location: String },
  links: { linkedin: String, github: String, portfolio: String },
  summary: String,
  education: [{ degree: String, school: String, year: String }],
  skills: [String],
  experience: [{ role: String, company: String, date: String }],
  projects: [{ title: String, tech: String, desc: String }],
  certifications: [String]
});

module.exports = mongoose.model('Resume', ResumeSchema);