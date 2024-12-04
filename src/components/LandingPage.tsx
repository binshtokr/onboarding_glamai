// src/components/LandingPage.tsx
import React from "react";

interface LandingPageProps {
  startOnboarding: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ startOnboarding }) => {
  return (
    <div className="landing-page">
      <h1>Welcome to GLAM</h1>
      <button onClick={startOnboarding}>Get Started</button>
    </div>
  );
};

export default LandingPage;
