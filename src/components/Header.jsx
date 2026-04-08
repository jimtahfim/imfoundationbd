import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Heart, Menu, X } from 'lucide-react';
import siteSettings from '../data/siteSettings.json';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
      {/* Top Banner */}
      <div className="top-banner">
        <div className="container top-banner-inner">
          <div className="top-info">
            <span className="info-item">
              <Phone size={14} /> {siteSettings.contact.phone}
            </span>
            <span className="info-item hidden-mobile">
              <Mail size={14} /> {siteSettings.contact.email}
            </span>
          </div>
          <div className="top-info">
            <span className="info-item">
              <MapPin size={14} /> {siteSettings.contact.address}
            </span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className={`main-nav ${isScrolled ? 'scrolled glass shadow' : ''}`}>
        <div className="container nav-inner">
          <Link to="/" className="logo-brand">
            <div className="logo-icon"><Heart size={24} color="#f8fafc" /></div>
            <span className="brand-name">IMF<span className="brand-accent">bd</span></span>
          </Link>

          {/* Desktop Links */}
          <div className="desktop-nav">
            <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>হোম</NavLink>
            <NavLink to="/about" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>আমাদের সম্পর্কে</NavLink>
            <NavLink to="/activities" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>কার্যক্রম</NavLink>
            <NavLink to="/gallery" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>গ্যালারী</NavLink>
            <NavLink to="/contact" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>যোগাযোগ</NavLink>
            <Link to="/donate" className="btn btn-primary nav-donate-btn">
              <Heart size={16} /> অনুদান দিন
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu glass">
            <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className="mobile-link">হোম</NavLink>
            <NavLink to="/about" onClick={() => setIsMobileMenuOpen(false)} className="mobile-link">আমাদের সম্পর্কে</NavLink>
            <NavLink to="/activities" onClick={() => setIsMobileMenuOpen(false)} className="mobile-link">কার্যক্রম</NavLink>
            <NavLink to="/gallery" onClick={() => setIsMobileMenuOpen(false)} className="mobile-link">গ্যালারী</NavLink>
            <NavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="mobile-link">যোগাযোগ</NavLink>
            <Link to="/donate" onClick={() => setIsMobileMenuOpen(false)} className="btn btn-primary mobile-donate-btn">
              <Heart size={16} /> অনুদান দিন
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
