import React from 'react';
import SectionHeader from '../components/SectionHeader';
import galleryData from '../data/gallery.json';
import './Gallery.css';

const Gallery = () => {
  return (
    <div className="gallery-page py-16">
      <div className="container">
        <SectionHeader 
          title="আমাদের গ্যালারী" 
          subtitle="মাঠে ময়দানে আমাদের সেবামূলক কাজের কিছু মুহূর্ত।"
          centered 
        />
        
        <div className="gallery-grid">
          {galleryData.map(item => (
            <div key={item.id} className="gallery-item group">
              <div className="gi-image-wrapper">
                <img src={item.url} alt={item.caption} />
                <div className="gi-overlay">
                  <p>{item.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
