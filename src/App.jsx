import React from 'react';
import { BrowserRouter as Router, Navigate, Routes, Route, useParams } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Donate from './pages/Donate';
import Contact from './pages/Contact';
import Categories from './pages/Categories';
import Admin from './pages/Admin';
import ScrollToTop from './components/ScrollToTop';

const LegacyCategoryRedirect = () => {
  const { slug } = useParams();
  return <Navigate to={slug ? `/activities/${slug}` : '/activities'} replace />;
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/activities" element={<Categories />} />
            <Route path="/activities/:slug" element={<Categories />} />
            <Route path="/categories" element={<LegacyCategoryRedirect />} />
            <Route path="/categories/:slug" element={<LegacyCategoryRedirect />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;
