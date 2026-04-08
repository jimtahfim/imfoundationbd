import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { Heart, Banknote, CreditCard, Landmark } from 'lucide-react';
import donationFunds from '../data/donationFunds.json';
import './Donate.css';

const Donate = () => {
  return (
    <div className="donate-page py-16">
      <div className="container">
        <SectionHeader 
          title="আপনার অনুদান পৌঁছে দিন" 
          subtitle="সঠিক খাতে আপনার দান পৌঁছে দিতে আমরা অঙ্গীকারবদ্ধ।"
          centered 
        />

        <div className="donate-methods-grid">
          <div className="method-card">
            <Landmark size={40} className="method-icon" />
            <h3>ব্যাংক একাউন্ট</h3>
            <p>Ikramul Muslimin Foundation</p>
            <p>একাউন্ট নং: 2050XXXXXXXXX</p>
            <p>Islami Bank Bangladesh PLC</p>
            <p>শাখা: ঢাকা</p>
          </div>
          <div className="method-card">
            <Banknote size={40} className="method-icon" />
            <h3>বিকাশ / নগদ (মার্চেন্ট)</h3>
            <p className="method-number">০১৭XX-XXXXXX</p>
            <p className="text-muted text-sm">(পেমেন্ট করুন)</p>
          </div>
          <div className="method-card">
            <CreditCard size={40} className="method-icon" />
            <h3>অনলাইন পেমেন্ট</h3>
            <p>ভিসা, মাস্টারকার্ড, এবং অন্যান্য অনলাইন পেমেন্ট খুব শিগ্রই আসছে।</p>
          </div>
        </div>

        <div className="funds-list mt-8">
          <h3 className="text-center font-bold text-2xl mb-6 text-deep-green">আমাদের অনুদান খাতসমূহ</h3>
          <div className="funds-grid">
            {donationFunds.map(fund => (
              <div key={fund.id} className="fund-card bg-white">
                <h4>{fund.title}</h4>
                <p>{fund.description}</p>
                <button className="btn btn-primary mt-4 w-full">এই খাতে দান করুন <Heart size={16} /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
