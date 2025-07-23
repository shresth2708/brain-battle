import '../styles/Contact.css';
import { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      await addDoc(collection(db, 'messages'), {
        ...form,
        timestamp: serverTimestamp(),
      });
      setSuccess('Message sent successfully! We\'ll get back to you soon.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="hero-content">
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="contact-content">
        <div className="contact-grid">
          {/* Contact Information */}
          <div className="contact-info">
            <h2>Contact Information</h2>
            <p>Reach out to us through any of these channels</p>
            
            <div className="contact-cards">
              <div className="contact-card">
                <div className="contact-icon email-icon">📧</div>
                <h3>Email</h3>
                <p>support@triviamaster.com</p>
                <span>We'll respond within 24 hours</span>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon phone-icon">📞</div>
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
                <span>Mon-Fri 9AM-6PM EST</span>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon location-icon">📍</div>
                <h3>Office</h3>
                <p>123 Quiz Street<br />Knowledge City, KC 12345</p>
                <span>Visit us anytime</span>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
            <div className="form-header">
              <h2>Send us a Message</h2>
              <p>Fill out the form below and we'll get back to you shortly</p>
            </div>
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Enter your full name"
                    required 
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="Enter your email"
                    required 
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  placeholder="What's this about?"
                  required 
                  value={form.subject}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="6" 
                  placeholder="Tell us more about your inquiry..."
                  required 
                  value={form.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              {success && (
                <div className="success-message">
                  <div className="success-icon">✅</div>
                  <div>{success}</div>
                </div>
              )}
              
              {error && (
                <div className="error-message">
                  <div className="error-icon">❌</div>
                  <div>{error}</div>
                </div>
              )}
              
              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <div className="faq-content">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How quickly will you respond?</h3>
              <p>We typically respond to all inquiries within 24 hours during business days.</p>
            </div>
            <div className="faq-item">
              <h3>Can I suggest new quiz categories?</h3>
              <p>Absolutely! We love hearing suggestions for new quiz topics and categories.</p>
            </div>
            <div className="faq-item">
              <h3>Is there technical support available?</h3>
              <p>Yes, our technical support team is available to help with any issues you encounter.</p>
            </div>
            <div className="faq-item">
              <h3>How can I report a bug?</h3>
              <p>Please use the contact form above with "Bug Report" in the subject line and describe the issue in detail.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
