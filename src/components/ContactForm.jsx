import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/ContactForm.css';

const ContactForm = () => {
  const formRef = useRef();
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    try {
      // Initialize EmailJS with your public key
      emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY);

      await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formRef.current
      );

      setFormStatus({
        type: 'success',
        message: 'Message sent successfully! I will get back to you soon.'
      });
      formRef.current.reset();
    } catch (error) {
      console.error('EmailJS error:', error);
      setFormStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResumeDownload = () => {
    // Replace with your actual resume file path
    const resumeUrl = '/resume.pdf';
    window.open(resumeUrl, '_blank');
  };

  return (
    <div className="contact-container">
      <div className="contact-info">
        <h3>Let's Connect!</h3>
        <p>Feel free to reach out for opportunities or just to say hello!</p>
        <div className="contact-links">
          <a href="mailto:akshita.as02@gmail.com" className="contact-link">
            <i className="fas fa-envelope"></i> akshita.as02@gmail.com
          </a>
          <a href="https://www.linkedin.com/in/akshita-singh-as/" target="_blank" rel="noopener noreferrer" className="contact-link">
            <i className="fab fa-linkedin"></i> LinkedIn
          </a>
          <button onClick={handleResumeDownload} className="resume-button">
            <i className="fas fa-download"></i> Download Resume
          </button>
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="message"
            placeholder="Your Message"
            required
          ></textarea>
        </div>
        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
        {formStatus.message && (
          <div className={`form-status ${formStatus.type}`}>
            {formStatus.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm; 