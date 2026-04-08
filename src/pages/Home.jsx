import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, RefreshCcw, HeartHandshake, Mic } from 'lucide-react';
import Hero from '../components/Hero';
import StatCard from '../components/StatCard';
import SectionHeader from '../components/SectionHeader';
import ActivityCard from '../components/ActivityCard';
import statsData from '../data/stats.json';
import activitiesData from '../data/activities.json';
import siteSettings from '../data/siteSettings.json';
import galleryData from '../data/gallery.json';
import supportOptions from '../data/supportOptions.json';
import donationFunds from '../data/donationFunds.json';
import './Home.css';

const Home = () => {
  const latestActivities = activitiesData.slice(0, 3);
  const homeGallery = galleryData.slice(0, 4);

  return (
    <div className="home-page">
      <Hero />

      {/* Impact Stats */}
      <section className="stats-section bg-white py-16">
        <div className="container">
          <div className="stats-grid">
            {statsData.map(stat => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="values-section py-16">
        <div className="container">
          <SectionHeader 
            title="আমাদের মূল লক্ষ্য" 
            subtitle="ইসলামিক মূল্যবোধের ভিত্তিতে একটি সুন্দর ও মানবিক সমাজ গঠনে আমরা কাজ করে যাচ্ছি।"
            centered 
          />
          <div className="values-grid">
            <div className="value-card">
              <div className="vc-icon"><BookOpen size={32} /></div>
              <h3>শিক্ষা</h3>
              <p>দরিদ্র ও মেধাবী শিক্ষার্থীদের আলোকিত ভবিষ্যৎ গড়তে শিক্ষা উপকরণ ও বৃত্তি প্রদান।</p>
            </div>
            <div className="value-card">
              <div className="vc-icon"><RefreshCcw size={32} /></div>
              <h3>আত্মশুদ্ধি</h3>
              <p>কুরআন সুন্নাহর আলোকে চরিত্র গঠন ও নৈতিক মূল্যবোধ জাগ্রত করা।</p>
            </div>
            <div className="value-card">
              <div className="vc-icon"><HeartHandshake size={32} /></div>
              <h3>সেবা</h3>
              <p>অসহায়, ইয়াতীম, ও সুবিধা বঞ্চিত মানুষের স্বাস্থ্যসেবা ও জীবনমান উন্নয়ন।</p>
            </div>
            <div className="value-card">
              <div className="vc-icon"><Mic size={32} /></div>
              <h3>দাওয়াহ</h3>
              <p>ইসলামের শ্বাশত শান্তির বাণী সমাজের সর্বস্তরে পৌঁছে দেওয়া।</p>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Preview */}
      <section className="activities-preview section-light py-16">
        <div className="container">
          <SectionHeader 
            title="চলমান কার্যক্রমসমূহ" 
            subtitle="আমাদের নিয়মিত সেবা ও উন্নয়নমূলক কাজ সম্পর্কে জানুন।"
          />
          <div className="activities-grid">
            {latestActivities.map(activity => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/activities" className="btn btn-secondary">সব কার্যক্রম দেখুন</Link>
          </div>
        </div>
      </section>

      {/* Overview Video Section */}
      <section className="video-section py-16">
        <div className="container">
          <SectionHeader 
            title="এক নজরে আমাদের কার্যক্রম" 
            subtitle={siteSettings.overallVideo.description}
            centered
          />
          <div className="video-container glass">
            <div className="video-wrapper">
              <iframe 
                src={siteSettings.overallVideo.videoUrl} 
                title="এক নজরে আমাদের কার্যক্রম" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to Support */}
      <section className="support-section py-16">
        <div className="container">
          <SectionHeader 
            title="আপনি যেভাবে যুক্ত হতে পারেন" 
            subtitle="মানবতার এ যাত্রায় আপনার অংশগ্রহণ আমাদের অনেক দূর এগিয়ে নিতে পারে।"
            centered
          />
          <div className="support-grid">
            {supportOptions.map(option => (
              <div key={option.id} className={`support-card ${option.isPrimary ? 'primary' : ''}`}>
                <h3>{option.title}</h3>
                <p>{option.description}</p>
                <Link to={option.url} className={`btn ${option.isPrimary ? 'btn-primary' : 'btn-secondary'} mt-4`}>
                  যুক্ত হোন
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Funds */}
      <section className="donation-funds section-light py-16">
        <div className="container">
          <SectionHeader title="আমাদের তহবিলসমূহ" subtitle="যে খাতে আপনি অনুদান দিতে পারেন" />
          <div className="funds-grid">
            {donationFunds.map(fund => (
              <div key={fund.id} className="fund-card glass">
                <h3>{fund.title}</h3>
                <p>{fund.description}</p>
                <Link to={fund.url} className="btn-link">অনুদান দিন &rarr;</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
