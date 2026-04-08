import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ActivityCard.css';

const ActivityCard = ({ activity }) => {
  return (
    <div className="activity-card group">
      <div className="ac-image-container">
        <img src={activity.image} alt={activity.title} className="ac-image" />
        <div className="ac-badge">{activity.category}</div>
      </div>
      <div className="ac-content">
        <h3 className="ac-title">{activity.title}</h3>
        <p className="ac-summary">{activity.summary}</p>
        <Link to="/activities" className="ac-link">
          বিস্তারিত <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default ActivityCard;
