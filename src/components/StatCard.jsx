import React from 'react';
import './StatCard.css';

const StatCard = ({ stat }) => {
  return (
    <div className="stat-card">
      <h3 className="stat-value">{stat.value.toLocaleString()}+</h3>
      <p className="stat-label">{stat.label}</p>
    </div>
  );
};

export default StatCard;
