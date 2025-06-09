"use client";

import { GroundificationBackground, GroundificationProvider, GroundificationConfig } from 'groundification';

export default function HomePage() {
  // Define a comprehensive initial configuration for the GroundificationProvider
  const initialConfig: GroundificationConfig = {
    debugMode: true,
    animationSpeed: 100, 
    blurAmount: 100,      

    // Define multiple clusters for diverse blob personalization
    clusters: [
      {
        id: 'primary-cluster',
        position: { vertical: 'bottom', horizontal: 'left' },
        size: 0.1, 
        inclination: 0.2,
        color: '#fff', 
        opacity: 0.8,
        blobCount: 7,
        blobSize: { min: 8, max: 25 },
      },
      {
        id: 'secondary-cluster',
        position: { vertical: 'top', horizontal: 'left' },
        size: 1, 
        inclination: 0.8,
        color: '#4ecdc4', 
        opacity: 0.7,
        blobCount: 5,
        blobSize: { min: 10, max: 30 },
      },
      {
        id: 'accent-cluster',
        position: { vertical: 'top', horizontal: 'right' },
        size: 1, 
        inclination: 0.4,
        color: '#fed766', 
        opacity: 0.6,
        blobCount: 4,
        blobSize: { min: 7, max: 20 },
      },
    ],
    animationPreset: "energetic", 
  };

  const initialTheme = {
    primaryColor: '#ff6f61',
    secondaryColor: '#4ecdc4',
  };

  return (
    <GroundificationProvider initialConfig={initialConfig} initialTheme={initialTheme}>
      <GroundificationBackground className="">
        <main style={{ color: 'white', padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
          <h1>Dynamic Liquid Background</h1>
          <p>This background is created entirely with CSS.</p>
        </main>
      </GroundificationBackground>
    </GroundificationProvider>
  );
}