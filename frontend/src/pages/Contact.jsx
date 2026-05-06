import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, MapPin, Send } from 'lucide-react';
import { contactService } from '../services/api';
import './Contact.css';

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const onSubmit = async (data) => {
    try {
      setSubmitStatus({ type: '', message: '' });
      await contactService.sendMessage(data);
      setSubmitStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
      reset();
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please try again later.' 
      });
    }
  };

  return (
    <motion.div 
      className="contact-page section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Get In <span className="text-gradient">Touch</span>
        </motion.h2>

        <div className="contact-container">
          <motion.div 
            className="contact-info"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3>Let's talk about your next project!</h3>
            <p className="contact-description">
              I'm currently available for freelance work and open to new opportunities. 
              Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon glass-panel">
                  <Mail size={24} />
                </div>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:hassan@example.com">hassan@example.com</a>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon glass-panel">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4>Location</h4>
                  <span>Global (Remote)</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="contact-form-container glass-panel"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
              {submitStatus.message && (
                <div className={`status-message ${submitStatus.type}`}>
                  {submitStatus.message}
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  id="name"
                  type="text" 
                  className={errors.name ? 'error-input' : ''}
                  {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Name must be at least 2 characters' } })}
                  placeholder="John Doe"
                />
                {errors.name && <span className="error-text">{errors.name.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  id="email"
                  type="email" 
                  className={errors.email ? 'error-input' : ''}
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  placeholder="john@example.com"
                />
                {errors.email && <span className="error-text">{errors.email.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message"
                  rows="5"
                  className={errors.message ? 'error-input' : ''}
                  {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'Message must be at least 10 characters' } })}
                  placeholder="Hello, I'd like to talk about..."
                ></textarea>
                {errors.message && <span className="error-text">{errors.message.message}</span>}
              </div>

              <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : (
                  <>Send Message <Send size={18} /></>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
