import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import OnboardingControllerStep from './components/OnboardingControllerStep';

import { Button, Layout, Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import analyticsIcon from './assets/icons/analytics.png';
import glamgradients from "./assets/icons/glamgradients.png"
import onboarding from "./assets/icons/onboarding.png"
import './App.css';

const { Header: AntHeader, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0); // 0 = LandingPage, 1-3 = Onboarding Steps
  const [completedCount, setCompletedCount] = useState<number>(0); // Tracks how many users completed onboarding
  const [selectedKey, setSelectedKey] = useState<string>('1'); // Tracks which menu is selected

  // Start the onboarding process
  const startOnboarding = () => setCurrentStep(1);

  // Go to the next step
  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);

  // Finish onboarding and update the analytics
  const finishOnboarding = () => {
    setCompletedCount((prevCount) => prevCount + 1); // Increment the count
    setCurrentStep(0); // Reset to the landing page

  };

  const handleMenuClick = (e: { key: string }) => {
    setSelectedKey(e.key); // Update selected menu item
    if (e.key === '1') {
      setCurrentStep(0); // Show the landing page / analytics dashboard
    } else {
      setCurrentStep(1); // Go to onboarding steps by default when menu item 2 or 3 is clicked
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          style={{marginTop:"10%"}}
        >
          {/* Using an img tag to display the custom image as the icon */}
          <Menu.Item key="1" icon={<img src={analyticsIcon} alt="Analytics Icon" style={{ width: '20px', height: '20px', filter: 'invert(1) brightness(5)' }} />}>
            Analytics Dashboard
          </Menu.Item>
          <Menu.Item key="2"  icon={<img src={onboarding} alt="Analytics Icon" style={{ width: '20px', height: '20px', filter: 'invert(1) brightness(5)' }} />}>
            Onboarding Steps
          </Menu.Item>
        
        </Menu>
      </Sider>
      <Layout>
      <AntHeader
          style={{
            padding: 0,
            background: `url(${glamgradients}) no-repeat center center`,
            backgroundSize: 'cover',  // Ensures the image covers the header area
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '64px', // Set the height of the header as needed
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </AntHeader>
       
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: '#fff',
          }}
        >
          {/* Conditional rendering based on selected menu item */}
          {selectedKey === '1' && (
            <div className="analytics">
              <h2>Analytics Dashboard</h2>
              <p>Users who completed onboarding: {completedCount}</p>
            </div>
          )}

          {selectedKey === '2' && currentStep === 0 && (
            <LandingPage startOnboarding={startOnboarding} />
          )}

          {selectedKey === '2' && currentStep > 0 && currentStep <= 3 && (
            <OnboardingControllerStep
              step={currentStep}
              onNext={nextStep}
              onFinish={finishOnboarding}
            />
          )}

          {/* You can add more content for other sections if required */}
        </Content>
      </Layout>
 
    </Layout>
  );
};

export default App;
