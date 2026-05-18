import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { MessageCircle, Phone, Mail, MapPin, Send } from 'lucide-react';
import siteSettings from '../data/siteSettings.json';
import './Contact.css';

const Contact = () => {
  const whatsappMessage = 'আসসালামু আলাইকুম। আমি ইকরামুল মুসলিমিন ফাউন্ডেশনের কার্যক্রম সম্পর্কে জানতে চাই।';
  const telegramMessage = 'আসসালামু আলাইকুম। আমি ইকরামুল মুসলিমিন ফাউন্ডেশনের সাথে যোগাযোগ করতে চাই।';
  const whatsappNumber = siteSettings.contact.whatsapp.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  const telegramUrl = `https://t.me/+${whatsappNumber}`;

  return (
    <div className="contact-page py-16">
      <div className="container">
        <SectionHeader 
          title="যোগাযোগ করুন" 
          subtitle="যেকোনো তথ্যের জন্য আমাদের সাথে যোগাযোগ করতে পারেন।"
          centered 
        />

        <div className="contact-wrapper">
          <div className="contact-info-cards">
            <div className="info-card">
              <div className="ic-icon"><MapPin size={24} /></div>
              <div>
                <h4>ঠিকানা</h4>
                <p>{siteSettings.contact.address}</p>
              </div>
            </div>
            <div className="info-card">
              <div className="ic-icon"><Phone size={24} /></div>
              <div>
                <h4>ফোন ও হোয়াটসঅ্যাপ</h4>
                <p>{siteSettings.contact.phone}</p>
              </div>
            </div>
            <div className="info-card">
              <div className="ic-icon"><Mail size={24} /></div>
              <div>
                <h4>ইমেইল</h4>
                <p>{siteSettings.contact.email}</p>
              </div>
            </div>
            <div className="info-card bg-emerald-light">
              <h4>অফিস সময়:</h4>
              <p>{siteSettings.contact.workingHours}</p>
            </div>

            <div className="quick-contact-grid">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="quick-contact-card whatsapp">
                <span className="quick-contact-icon"><MessageCircle size={24} /></span>
                <span>
                  <strong>হোয়াটসঅ্যাপ যোগাযোগ</strong>
                  <small>{whatsappMessage}</small>
                </span>
              </a>
              <a href={telegramUrl} target="_blank" rel="noreferrer" className="quick-contact-card telegram">
                <span className="quick-contact-icon"><Send size={24} /></span>
                <span>
                  <strong>টেলিগ্রাম যোগাযোগ</strong>
                  <small>{telegramMessage}</small>
                </span>
              </a>
            </div>
          </div>

          <div className="contact-form-container glass">
            <h3 className="form-title">মেসেজ পাঠান</h3>
            <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert("বার্তা সফলভাবে পাঠানো হয়েছে!"); }}>
              <div className="form-group">
                <label>আপনার নাম</label>
                <input type="text" placeholder="নাম লিখুন..." required />
              </div>
              <div className="form-group">
                <label>ইমেইল বা ফোন নম্বর</label>
                <input type="text" placeholder="ইমেইল বা ফোন..." required />
              </div>
              <div className="form-group">
                <label>বিষয়</label>
                <input type="text" placeholder="বিষয়..." required />
              </div>
              <div className="form-group">
                <label>আপনার বার্তা</label>
                <textarea rows="4" placeholder="বার্তা লিখুন..." required></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full">
                <Send size={18} /> বার্তা পাঠান
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
