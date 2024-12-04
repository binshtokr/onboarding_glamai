import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import OnboardingControllerStep from './components/OnboardingControllerStep';

import { Button, Layout, Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import analyticsIcon from './assets/icons/analytics.png';
import glamgradients from "./assets/icons/glamgradients.png"
import onboarding from "./assets/icons/onboarding.png"
import './App.css';

const { Header: AntHeader, Sider, Content, Footer } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [selectedKey, setSelectedKey] = useState<string>('1');


  const startOnboarding = () => setCurrentStep(1);


  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);


  const finishOnboarding = () => {
    setCompletedCount((prevCount) => prevCount + 1);
    setCurrentStep(0);

  };

  const handleMenuClick = (e: { key: string }) => {
    setSelectedKey(e.key);
    if (e.key === '1') {
      setCurrentStep(0);
    } else {
      setCurrentStep(1);
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
          style={{ marginTop: "10%" }}
        >

          <Menu.Item key="1" icon={<img src={analyticsIcon} alt="Analytics Icon" style={{ width: '20px', height: '20px', filter: 'invert(1) brightness(5)' }} />}>
            Analytics Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<img src={onboarding} alt="Analytics Icon" style={{ width: '20px', height: '20px', filter: 'invert(1) brightness(5)' }} />}>
            Onboarding Steps
          </Menu.Item>

        </Menu>
      </Sider>
      <Layout>
        <AntHeader
          style={{
            padding: 0,
            background: `url(${glamgradients}) no-repeat center center`,
            backgroundSize: 'cover',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '64px',
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

        </Content>

        <Footer     style={{
            padding: 0,
            background: `url(${glamgradients}) no-repeat center center`,
            backgroundSize: 'cover',
            display: 'flex',
           
            alignItems: 'center',
            justifyContent:"center",
            height: "10vh",
            textAlign:"center"
          }} >
          GLAM  ©{new Date().getFullYear()} Created by Roman Binshtok
        </Footer>
      </Layout>

    </Layout>
  );
};

export default App;
