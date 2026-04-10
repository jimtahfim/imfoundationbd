import React, { useState } from 'react';
import { LayoutGrid, Grid3X3, X } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import galleryData from '../data/gallery.json';
import './Gallery.css';

const Gallery = () => {
  const [columns, setColumns] = useState(4);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="gallery-page py-16">
      <div className="container">
        <SectionHeader 
          title="আমাদের গ্যালারী" 
          subtitle="মাঠে ময়দানে আমাদের সেবামূলক কাজের কিছু মুহূর্ত।"
          centered 
        />
        
        <div className="gallery-controls">
          <span className="control-label">ভিউ পরিবর্তন করুন:</span>
          <button 
            className={`view-btn ${columns === 4 ? 'active' : ''}`} 
            onClick={() => setColumns(4)}
            title="View 4 columns"
          >
            <LayoutGrid size={20} />
            <span>৪ কলাম</span>
          </button>
          <button 
            className={`view-btn ${columns === 6 ? 'active' : ''}`} 
            onClick={() => setColumns(6)}
            title="View 6 columns"
          >
            <Grid3X3 size={20} />
            <span>৬ কলাম</span>
          </button>
        </div>

        <div className={`gallery-grid gallery-grid-${columns}`}>
          {galleryData.map(item => (
            <div 
              key={item.id} 
              className="gallery-item group"
              onClick={() => setSelectedItem(item)}
            >
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

      {/* Lightbox / Modal */}
      {selectedItem && (
        <div className="gallery-modal" onClick={() => setSelectedItem(null)}>
          <div className="gallery-modal-content" onClick={e => e.stopPropagation()}>
            <button className="gallery-modal-close" onClick={() => setSelectedItem(null)}>
              <X size={28} />
            </button>
            <div className="gallery-modal-image-wrapper">
              <img src={selectedItem.url} alt={selectedItem.caption} className="gallery-modal-image" />
            </div>
            <div className="gallery-modal-caption">
              <h3>{selectedItem.caption}</h3>
              <p>ইকরামূল মুসলিমীন ফাউন্ডেশন</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
