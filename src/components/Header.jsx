import React from 'react';
import './Header.css';
import './Header.mobile.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/images/logo.png" alt="Veg Recipes" />
      </div>
      <nav className="desktop-nav">
        <a href="/">Home</a>
        <a href="/recipe-index">Recipe Index</a>
        <a href="/search">
          <span className="search-icon">🔍</span>
        </a>
      </nav>
      <div className="mobile-nav">
        <span className="search-icon">🔍</span>
        <span className="menu-icon">☰</span>
      </div>
    </header>
  );
};

export default Header; 