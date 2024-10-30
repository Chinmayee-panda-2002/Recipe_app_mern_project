import React from 'react';

// Custom SVG Icons components
const ChefHatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feature-icon">
    <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/>
    <line x1="6" y1="17" x2="18" y2="17"/>
  </svg>
);

const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feature-icon">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feature-icon">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feature-icon">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const Front = () => {
  return (
    <div className="app-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Discover & Share
            <span className="highlight"> Delicious Recipes</span>
          </h1>
          <p className="hero-description">
          Join our community of food lovers and explore amazing recipes.
          From quick meals to special dishes, find your next favorite here.
          </p>
          <div className="button-group">
            <button className="primary-button">Get Started</button>
            {/* <button className="secondary-button">Browse Recipes</button> */}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2 className="section-title">Why Choose Our Platform?</h2>
        <div className="features-grid">
          <FeatureCard 
            icon={<ChefHatIcon />}
            title="Easy to Follow"
            description="Step-by-step instructions for recipes of all difficulty levels"
          />
          <FeatureCard 
            icon={<BookIcon />}
            title="Save Favorites"
            description="Create your personal cookbook with your favorite recipes"
          />
          <FeatureCard 
            icon={<UsersIcon />}
            title="Community"
            description="Share recipes and connect with other food enthusiasts"
          />
          <FeatureCard 
            icon={<HeartIcon />}
            title="Personalized"
            description="Get recommendations based on your preferences"
          />
        </div>
      </div>

      {/* How It Works Section */}
      <div className="how-it-works-section">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <Step 
            number="1"
            title="Create an Account"
            description="Sign up in seconds and join our cooking community"
          />
          <Step 
            number="2"
            title="Explore Recipes"
            description="Browse through thousands of recipes from various cuisines"
          />
          <Step 
            number="3"
            title="Start Cooking"
            description="Follow easy instructions and create delicious meals"
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <h2 className="cta-title">Ready to Start Your Cooking Journey?</h2>
        <p className="cta-description">Join thousands of food lovers in our community today!</p>
        <button className="cta-button">Join Now - It's Free!</button>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="feature-card">
    <div className="feature-icon-wrapper">
      {icon}
    </div>
    <h3 className="feature-title">{title}</h3>
    <p className="feature-description">{description}</p>
  </div>
);

const Step = ({ number, title, description }) => (
  <div className="step-item">
    <div className="step-number">{number}</div>
    <div className="step-content">
      <h3 className="step-title">{title}</h3>
      <p className="step-description">{description}</p>
    </div>
  </div>
);

export default Front;