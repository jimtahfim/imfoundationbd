import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import ActivityCard from '../components/ActivityCard';
import activitiesData from '../data/activities.json';
import './Activities.css';

const Activities = () => {
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'সকল কার্যক্রম' },
    { id: 'education', label: 'শিক্ষা' },
    { id: 'health', label: 'চিকিৎসা' },
    { id: 'relief', label: 'ত্রাণ' },
    { id: 'dawah', label: 'দাওয়াহ' }
  ];

  const filteredActivities = filter === 'all' 
    ? activitiesData 
    : activitiesData.filter(item => item.category === filter);

  return (
    <div className="activities-page py-16">
      <div className="container">
        <SectionHeader 
          title="আমাদের সকল কার্যক্রম" 
          subtitle="মানুষের কল্যাণে ইকরামুল মুসলিমিন ফাউন্ডেশনের বহুমুখী উদ্যোগ।"
          centered 
        />

        <div className="filter-buttons">
          {categories.map(cat => (
            <button 
              key={cat.id}
              className={`filter-btn ${filter === cat.id ? 'active' : ''}`}
              onClick={() => setFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="activities-grid">
          {filteredActivities.map(activity => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activities;
