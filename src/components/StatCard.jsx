import React, { useState, useEffect, useRef } from 'react';
import './StatCard.css';

const StatCard = ({ stat }) => {
  const [count, setCount] = useState(0);
  const cardRef = useRef(null);

  useEffect(() => {
    let observer;
    let frameId;
    let startTime;
    let isStarted = false;
    
    // Duration in milliseconds for the animation
    const duration = 2000;
    const target = stat.value;

    const startCounting = () => {
      isStarted = true;
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        
        // Calculate the percentage completion
        const percentage = Math.min(progress / duration, 1);
        
        // Ease-out function to slow down at the end
        const easeOut = 1 - Math.pow(1 - percentage, 4);
        
        setCount(Math.floor(target * easeOut));

        if (percentage < 1) {
          frameId = requestAnimationFrame(animate);
        } else {
          setCount(target); // Ensure it ends exactly on the target
        }
      };
      
      frameId = requestAnimationFrame(animate);
    };

    // Use IntersectionObserver to start counting only when the element is visible
    observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isStarted) {
        startCounting();
      }
    }, { threshold: 0.1 });

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      if (observer && cardRef.current) observer.unobserve(cardRef.current);
    };
  }, [stat.value]);

  return (
    <div className="stat-card" ref={cardRef}>
      <h3 className="stat-value">{count.toLocaleString()}+</h3>
      <p className="stat-label">{stat.label}</p>
    </div>
  );
};

export default StatCard;
