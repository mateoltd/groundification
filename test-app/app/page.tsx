"use client";

import { GroundificationBackground, GroundificationProvider } from 'groundification';

export default function HomePage() {
  // Define initial configuration and theme for the GroundificationProvider
  // These values will be consumed by the orchestration system within the package.
  const initialConfig = {
    debugMode: true,
    animationSpeed: 200,
    blurAmount: 120,
  };

  const initialTheme = {
    primaryColor: '#ff6b6b',
    secondaryColor: '#4ecdc4',
  };

  return (
    <GroundificationProvider initialConfig={initialConfig} initialTheme={initialTheme}>
      <GroundificationBackground className="absolute inset-0 z-0">
        <main style={{ color: 'white', padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
          <h1>Dynamic Liquid Background</h1>
          <p>This background is created entirely with CSS.</p>
        </main>
      </GroundificationBackground>
    </GroundificationProvider>
  );
}