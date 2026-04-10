import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { Target, Eye, ShieldCheck } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="about-page py-16">
      <div className="container">
        <SectionHeader title="আমাদের সম্পর্কে" subtitle="ইকরামুল মুসলিমিন ফাউন্ডেশনের উদ্দেশ্য ও লক্ষ্য" centered />
        
        <div className="about-content">
          <div className="about-text">
            <h3>আমাদের গল্প</h3>
            <p>ইকরামুল মুসলিমিন ফাউন্ডেশন একটি অরাজনৈতিক, অলাভজনক সেবামূলক প্রতিষ্ঠান। সৃষ্টির সেবাই স্রষ্টার সন্তুষ্টি—এই মূলমন্ত্রকে সামনে রেখে সমাজের অবহেলিত, সুবিধা বঞ্চিত মানুষের কল্যাণে আমাদের এ পথচলা।</p>
            <p>আমরা বিশ্বাস করি, সমাজের প্রতিটি মানুষের সমান অধিকার রয়েছে। সেই অধিকার প্রতিষ্ঠায় আমাদের ক্ষুদ্র প্রচেষ্টা অব্যাহত রয়েছে এবং ভবিষ্যতেও থাকবে, ইনশাআল্লাহ।</p>
          </div>
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800" alt="About us" />
          </div>
        </div>

        <div className="mission-vision-grid mt-4">
          <div className="mv-card">
            <Target size={40} className="mv-icon" />
            <h3>আমাদের মিশন</h3>
            <p>শিক্ষা, চিকিৎসা ও মৌলিক চাহিদাপূরণের মাধ্যমে একটি স্বনির্ভর ও মানবিক সমাজ গঠন করা।</p>
          </div>
          <div className="mv-card">
            <Eye size={40} className="mv-icon" />
            <h3>আমাদের ভিশন</h3>
            <p>দারিদ্র্যমুক্ত, আলোকিত ও ইসলামিক মূল্যবোধ সম্পন্ন একটি আদর্শ সমাজ তৈরি করা।</p>
          </div>
          <div className="mv-card">
            <ShieldCheck size={40} className="mv-icon" />
            <h3>আমাদের অঙ্গীকার</h3>
            <p>অনুদানকারীদের আমানত শতভাগ স্বচ্ছতার সাথে সঠিক খাতে এবং প্রকৃত হকদারের কাছে পৌঁছে দেওয়া।</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
