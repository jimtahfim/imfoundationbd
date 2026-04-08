import React from 'react';
import './SectionHeader.css';

const SectionHeader = ({ title, subtitle, centered = false }) => {
  return (
    <div className={`section-header ${centered ? 'centered' : ''}`}>
      <h2 className="sh-title">{title}</h2>
      {subtitle && <p className="sh-subtitle">{subtitle}</p>}
      <div className="sh-divider"></div>
    </div>
  );
};

export default SectionHeader;
