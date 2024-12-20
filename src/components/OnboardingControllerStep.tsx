
import React from "react";

interface OnboardingControllerStepProps {
  step: number;
  onNext: () => void;
  onFinish: () => void;
}

const videoStyle: React.CSSProperties = {
  maxWidth: "20vw",
  display: "block",
  margin: "0 auto",
};

const textStyle: React.CSSProperties = {
  fontSize: "2rem",
  textAlign: "center",
  marginBottom: "20px",
  fontWeight: "bold",
};

const OnboardingControllerStep: React.FC<OnboardingControllerStepProps> = ({
  step,
  onNext,
  onFinish,
}) => {
  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <p style={textStyle}>Welcome to Glam!</p>
            <video
              src="https://cdn.getglam.app/content/paywalls/240515_web2web_video1_v04.mp4"
              autoPlay
              muted
              loop
              style={videoStyle}
            />
          </div>
        );
      case 2:
        return (
          <div>
            <p style={textStyle}>Match your Aesthetic</p>
            <video
              src="https://cdn.getglam.app/content/paywalls/240515_web2web_video2_v01.mp4"
              autoPlay
              muted
              loop
              style={videoStyle}
            />
          </div>
        );
      case 3:
        return (
          <div>
            <p style={textStyle}>Explore 100+ Styles</p>
            <video
              src="https://cdn.getglam.app/content/paywalls/240515_web2web_video3_v01.mp4"
              autoPlay
              muted
              loop
              style={videoStyle}
            />
          </div>
        );
      default:
        return <p>Unknown step.</p>;
    }
  };

  return (
    <div className="onboarding-step" style={{ textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
      {renderContent()}
      {step < 3 && <button onClick={onNext} style={{ marginTop: "20px" }}>Next</button>}
      {step === 3 && <button onClick={onFinish} style={{ marginTop: "20px" }}>Finish</button>}
    </div>
  );
};

export default OnboardingControllerStep;
