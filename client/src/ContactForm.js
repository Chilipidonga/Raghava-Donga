import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import './ContactForm.css';

const ContactForm = () => {
  const form = useRef();
  const [status, setStatus] = useState(''); // 'sending', 'success', 'error'

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    // IMPORTANT: Ee values manam Vercel Settings lo add cheyali
    emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      form.current,
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    )
      .then((result) => {
          console.log(result.text);
          setStatus('success');
          form.current.reset();
          // Success ayyaka message konchem sepu undi potundi
          setTimeout(() => setStatus(''), 5000);
      }, (error) => {
          console.log(error.text);
          setStatus('error');
      });
  };

  return (
    <div className="contact-form-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="form-wrapper"
      >
        <h3 className="form-title">Send me a Message</h3>
        
        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <div className="form-group">
            <input type="text" name="user_name" placeholder="Your Name" required />
          </div>
          
          <div className="form-group">
            <input type="email" name="user_email" placeholder="Your Email" required />
          </div>
          
          <div className="form-group">
            <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
          </div>

          <button type="submit" className="btn-submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && <p className="msg-success">Message sent successfully! 🚀</p>}
          {status === 'error' && <p className="msg-error">Failed to send. Please try again.</p>}
        </form>
      </motion.div>
    </div>
  );
};

export default ContactForm;