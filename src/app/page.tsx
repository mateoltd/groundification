// app/page.tsx
"use client";

import { useState } from 'react';
import LiquidBackground from '@/components/LiquidBackground';
import { ClusterConfig, BlobData } from '@/utils/blob-generator';

// The final, intuitive, and powerful configuration.
const initialBackgroundConfig: ClusterConfig[] = [
  {
    id: 'top-right-main',
    position: { vertical: 'top', horizontal: 'right' },
    size: 40,
    inclination: 0.5, // A perfect 45-degree cut
    color: '#c1d5d9',
    opacity: 1.0,
    blobCount: 35,
    blobSize: { min: 5, max: 30 },
  },
  {
    id: 'bottom-left-faint',
    position: { vertical: 'bottom', horizontal: 'left' },
    size: 30,
    inclination: 0.5, // A perfect 45-degree cut
    color: '#c1d5d9',
    opacity: 0.4,
    blobCount: 20,
    blobSize: { min: 5, max: 10 },
  },
];

export default function HomePage() {
  const [config, setConfig] = useState(initialBackgroundConfig);

  const handleBlobEnter = (blob: BlobData) => {
    // console.log(`Entered blob:`, blob);
  };
  const handleBlobLeave = (blob: BlobData) => {
    // console.log(`Left blob:`, blob);
  };

  return (
    <main style={{ color: 'white', padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <LiquidBackground
        clusters={config}
        blurAmount={120}
        animationSpeed={220}
        onBlobEnter={handleBlobEnter}
        onBlobLeave={handleBlobLeave}
      />
      
      <h1>Dynamic Liquid Background</h1>
      <p>This background is created entirely with CSS.</p>
    </main>
  );
}