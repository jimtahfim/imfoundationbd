import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Layers, Network } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import categoryData from '../data/imf_categories_react.json';
import categoryBeneficiaries from '../data/categoryBeneficiaries.json';
import { categoryImages, getCategoryIcon } from '../data/categoryPresentation';
import { buildCategoryPath, findCategoryBySlug, getCategoryName, toBanglaNumber } from '../utils/categoryTree';
import './Categories.css';

const getBeneficiaryCount = (slug) => (
  categoryBeneficiaries.find((item) => item.slug === slug)?.beneficiaries || 0
);

const renderChildren = (items, level = 1) => {
  if (!items?.length) {
    return <p className="category-empty">এই কার্যক্রমে এখনো কোনো উপ-কার্যক্রম যুক্ত করা হয়নি।</p>;
  }

  return (
    <div className={`category-children level-${level}`}>
      {items.map((item) => (
        <article key={item.id} className="category-node">
          <div className="category-node-main">
            <span className="category-node-icon"><Layers size={18} /></span>
            <div>
              <h3>{getCategoryName(item)}</h3>
              {item.children?.length > 0 && <p>{toBanglaNumber(item.children.length)}টি উপ-কার্যক্রম</p>}
            </div>
          </div>
          {item.children?.length > 0 && renderChildren(item.children, level + 1)}
        </article>
      ))}
    </div>
  );
};

const Categories = () => {
  const { slug } = useParams();
  const categories = categoryData.categories || [];
  const visibleCategories = categories.filter((category) => category.slug !== 'donation');
  const [filter, setFilter] = useState('all');
  const selectedCategory = slug ? findCategoryBySlug(categories, slug) : null;
  const categoryPath = slug ? buildCategoryPath(categories, slug) : [];
  const filteredCategories = filter === 'all'
    ? visibleCategories
    : visibleCategories.filter((category) => category.slug === filter);

  if (slug && !selectedCategory) {
    return (
      <div className="categories-page py-16">
        <div className="container">
          <SectionHeader title="কার্যক্রম পাওয়া যায়নি" subtitle="এই নামে কোনো কার্যক্রম বর্তমানে যুক্ত নেই।" centered />
          <div className="category-actions">
            <Link to="/activities" className="btn btn-primary">সব কার্যক্রমে ফিরে যান</Link>
          </div>
        </div>
      </div>
    );
  }

  if (selectedCategory) {
    const beneficiaryCount = getBeneficiaryCount(selectedCategory.slug);

    return (
      <div className="categories-page py-16">
        <div className="container">
          <div className="category-breadcrumb">
            <Link to="/activities">সব কার্যক্রম</Link>
            {categoryPath.map((item) => (
              <React.Fragment key={item.id}>
                <span>/</span>
                <Link to={`/activities/${item.slug}`}>{getCategoryName(item)}</Link>
              </React.Fragment>
            ))}
          </div>

          <section className="category-detail-hero">
            <div>
              <span className="category-kicker">আইএমএফ কার্যক্রম</span>
              <h1>{getCategoryName(selectedCategory)}</h1>
              <p>
                এই কার্যক্রমের অধীনে থাকা উপ-কার্যক্রম এবং বিস্তারিত সেবার ক্ষেত্রগুলো দেখুন।
              </p>
            </div>
            {beneficiaryCount > 0 && (
              <div className="category-detail-stat">
                <strong>{toBanglaNumber(beneficiaryCount)}+</strong>
                <span>জন উপকারভোগী</span>
              </div>
            )}
          </section>

          <div className="category-detail-layout single">
            <section className="category-tree-panel">
              <div className="category-panel-title">
                <Network size={22} />
                <h2>উপ-কার্যক্রমের কাঠামো</h2>
              </div>
              {renderChildren(selectedCategory.children || [])}
            </section>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="categories-page py-16">
      <div className="container">
        <SectionHeader
          title="কার্যক্রম"
          subtitle="ইকরামুল মুসলিমিন ফাউন্ডেশনের প্রধান কার্যক্রমসমূহ এবং প্রতিটি কার্যক্রমের অধীনে থাকা উপ-কার্যক্রম।"
          centered
        />

        <div className="category-filter-bar" aria-label="কার্যক্রম ফিল্টার">
          <button
            className={`category-filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            সকল কার্যক্রম
          </button>
          {visibleCategories.map((category) => (
            <button
              key={category.id}
              className={`category-filter-btn ${filter === category.slug ? 'active' : ''}`}
              onClick={() => setFilter(category.slug)}
            >
              {getCategoryName(category)}
            </button>
          ))}
        </div>

        <div className="category-index-grid activities-grid">
          {filteredCategories.map((category) => {
            const Icon = getCategoryIcon(category.slug);
            const categoryImage = categoryImages[category.slug];

            return (
            <article className="category-card activity-card" key={category.id}>
              <div className="category-card-image ac-image-container">
                <img src={categoryImage || '/images/hero_main.png'} alt={getCategoryName(category)} className="ac-image" />
                {category.children?.length > 0 && (
                  <div className="ac-badge">{toBanglaNumber(category.children.length)} উপ-কার্যক্রম</div>
                )}
              </div>
              <div className="category-card-body ac-content">
                <div className="category-card-title-row">
                  <span className="category-card-icon"><Icon size={24} /></span>
                  <h2 className="ac-title">{getCategoryName(category)}</h2>
                </div>
                <p className="ac-summary">
                  {toBanglaNumber(getBeneficiaryCount(category.slug))}+ জন উপকারভোগী এই কার্যক্রমের মাধ্যমে সেবা পেয়েছেন।
                </p>
                <Link to={`/activities/${category.slug}`} className="ac-link">
                  বিস্তারিত দেখুন <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          )})}
        </div>
      </div>
    </div>
  );
};

export default Categories;
