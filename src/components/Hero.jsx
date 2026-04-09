import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import Typewriter from './Typewriter';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-pattern"></div>
      <div className="container hero-content">
        <div className="hero-text animate-fade-in">
          <h1 className="hero-title">
            ইকরামুল মুসলিমিন <br className="hidden-mobile" />
            <span className="hero-highlight">ফাউন্ডেশন</span>
            <Typewriter 
              words={['মানবতার সেবায়', 'আপনাদের পাশে', 'সুন্দর সমাজ গঠনে']} 
              typingSpeed={100} 
              deletingSpeed={50} 
              pauseDuration={2000} 
            />
          </h1>

          <p className="hero-subtitle">
            আপনার একটি ছোট অনুদান একটি পরিবারের মুখে হাসি ফোটাতে পারে। আমরা বিশ্বাস করি, একসাথে কাজ করলে একটি সুন্দর সমাজ গঠন সম্ভব।
          </p>
          <div className="hero-cta">
            <Link to="/donate" className="btn btn-primary hero-btn">
              <Heart size={18} /> অনুদান দিন
            </Link>
            <Link to="/activities" className="btn btn-secondary hero-btn">
              আমাদের কার্যক্রম <ArrowRight size={18} />
            </Link>
          </div>
        </div>
        
        <div className="hero-media animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="hero-image-wrapper">
            <img 
              src="/images/hero_main.png" 
              alt="Helping hands" 
              className="hero-img main"
            />
            <div className="hero-stat-float glass">
              <div className="stat-float-icon">
                <Heart size={20} color="#10b981" />
              </div>
              <div className="stat-float-text">
                <strong>১০,০০০+</strong>
                <span>মানুষকে সহায়তা</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
