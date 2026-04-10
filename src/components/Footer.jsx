import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import siteSettings from '../data/siteSettings.json';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-area">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src="/images/logo.png" alt="IMFbd Logo" className="footer-logo-img" />
          </Link>
          <p className="footer-desc">
            {siteSettings.tagline}. আমরা কাজ করছি সুবিধাবঞ্চিত মানুষের জীবনমান উন্নয়নে।
          </p>
          <div className="footer-social">
            <a href={siteSettings.socialUrls.facebook} target="_blank" rel="noreferrer" className="social-icon" title="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href={siteSettings.socialUrls.youtube} target="_blank" rel="noreferrer" className="social-icon" title="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
            <a href={siteSettings.socialUrls.whatsapp} target="_blank" rel="noreferrer" className="social-icon" title="WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            </a>
            <a href={siteSettings.socialUrls.telegram} target="_blank" rel="noreferrer" className="social-icon" title="Telegram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'translate(-1px, 1px)' }}><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </a>
            <a href={siteSettings.socialUrls.twitter} target="_blank" rel="noreferrer" className="social-icon" title="Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
          </div>
        </div>

        <div className="footer-links">
          <h4>কুইক লিংক</h4>
          <ul>
            <li><Link to="/about">আমাদের সম্পর্কে</Link></li>
            <li><Link to="/activities">কার্যক্রম</Link></li>
            <li><Link to="/gallery">গ্যালারী</Link></li>
            <li><Link to="/contact">যোগাযোগ</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>যোগাযোগের ঠিকানা</h4>
          <ul>
            <li><MapPin size={18} /> {siteSettings.contact.address}</li>
            <li><Phone size={18} /> {siteSettings.contact.phone}</li>
            <li><Mail size={18} /> {siteSettings.contact.email}</li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h4>নিউজলেটার</h4>
          <p>আমাদের সর্বশেষ খবর পেতে ইমেইল সাবস্ক্রাইব করুন।</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="আপনার ইমেইল..." required />
            <button type="submit" className="btn btn-primary">সাবস্ক্রাইব</button>
          </form>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} {siteSettings.siteName}. সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="footer-developer">
            উন্নয়নে <Heart size={16} className="pulsating-heart" /> IMFbd টিম
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
