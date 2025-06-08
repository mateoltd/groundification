# Groundification

`groundification` is a React component library for creating dynamic and animated backgrounds, starting with a liquid blob effect. This package provides a highly customizable `LiquidBackground` component that can be easily integrated into any React or Next.js application.

## Installation

Install the package using npm or yarn:

```bash
npm install groundification
# or
yarn add groundification
```

## Usage

Here's a basic example of how to use the `LiquidBackground` component in your React or Next.js application:

```tsx
// app/page.tsx or any React component
"use client";

import { useState } from 'react';
import { LiquidBackground, ClusterConfig, BlobData } from 'groundification';

const initialBackgroundConfig: ClusterConfig[] = [
  {
    id: 'top-right-main',
    position: { vertical: 'top', horizontal: 'right' },
    size: 40,
    inclination: 0.5,
    color: '#c1d5d9',
    opacity: 1.0,
    blobCount: 35,
    blobSize: { min: 5, max: 30 },
  },
  {
    id: 'bottom-left-faint',
    position: { vertical: 'bottom', horizontal: 'left' },
    size: 30,
    inclination: 0.5,
    color: '#c1d5d9',
    opacity: 0.4,
    blobCount: 20,
    blobSize: { min: 5, max: 10 },
  },
];

export default function HomePage() {
  const [config, setConfig] = useState(initialBackgroundConfig);

  const handleBlobEnter = (blob: BlobData) => {
    console.log(`Entered blob:`, blob);
  };
  const handleBlobLeave = (blob: BlobData) => {
    console.log(`Left blob:`, blob);
  };

  const handleBlobClick = (blob: BlobData) => {
    console.log(`Clicked blob:`, blob);
  };

  const handleBlobHover = (blob: BlobData) => {
    // This will fire on both enter and leave, you might want to differentiate based on your needs
    console.log(`Hovered blob:`, blob);
  };

  return (
    <main style={{ color: 'white', padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <LiquidBackground
        clusters={config}
        blurAmount={120}
        animationSpeed={220}
        onBlobEnter={handleBlobEnter}
        onBlobLeave={handleBlobLeave}
        onBlobClick={handleBlobClick}
        onBlobHover={handleBlobHover}
        containerClassName="my-custom-container"
        blurWrapperClassName="my-custom-blur-wrapper"
        blobClassName="my-custom-blob"
        grainOverlayClassName="my-custom-grain-overlay"
        animationPreset="energetic"
        maxBlobCount={50}
        disableAnimations={false}
        themeColors={['#ff0000', '#00ff00', '#0000ff']}
      />
      
      <h1>Dynamic Liquid Background</h1>
      <p>This background is created entirely with CSS.</p>
    </main>
  );
}
```

## API Reference

### `LiquidBackgroundProps`

Interface for the `LiquidBackground` component's props:

```typescript
interface LiquidBackgroundProps {
  clusters: ClusterConfig[];
  animationSpeed?: number; // Default: 200 (seconds)
  blurAmount?: number;    // Default: 120 (pixels)
  containerClassName?: string; // Tailwind CSS classes for the main container div
  blurWrapperClassName?: string; // Tailwind CSS classes for the blur wrapper div
  blobClassName?: string; // Tailwind CSS classes for individual blob divs
  grainOverlayClassName?: string; // Tailwind CSS classes for the grain overlay div
  animationPreset?: "subtle" | "energetic"; // Predefined animation variations. Default: "subtle"
  onBlobClick?: (blob: BlobData) => void; // Callback when a blob is clicked
  onBlobHover?: (blob: BlobData) => void; // Callback when mouse enters/leaves a blob
  maxBlobCount?: number; // Limits the total number of blobs for performance control
  disableAnimations?: boolean; // If true, animations will be disabled. Default: false
  themeColors?: string[]; // An array of color strings to randomly assign to blobs. Overrides `ClusterConfig.color`.
  onBlobEnter?: (blob: BlobData) => void; // Callback when mouse enters a blob (original from component)
  onBlobLeave?: (blob: BlobData) => void; // Callback when mouse leaves a blob (original from component)
}
```

### `ClusterConfig`

Interface for configuring a blob cluster:

```typescript
export interface ClusterConfig {
  id: string | number;
  position: { vertical: 'top' | 'bottom'; horizontal: 'left' | 'right' };
  size: number;
  inclination: number; // 0 to 1, where 0.5 is a 45-degree cut.
  color: string;
  opacity: number;
  blobCount: number;
  blobSize: { min: number; max: number };
}
```

### `BlobData`

Interface for individual blob data:

```typescript
export interface BlobData {
  id: string;
  configId: string | number;
  style: React.CSSProperties;
}
```

### `generateBlobsForCluster` function

This utility function generates an array of `BlobData` objects based on a `ClusterConfig`. It is primarily used internally by `LiquidBackground` but is exported for advanced use cases.

```typescript
export const generateBlobsForCluster = (config: ClusterConfig): BlobData[] => { /* ... */ };
```

## Styling with Tailwind CSS

The `LiquidBackground` component is designed to be easily customizable with Tailwind CSS. You can pass Tailwind utility classes to the `containerClassName`, `blurWrapperClassName`, `blobClassName`, and `grainOverlayClassName` props to override or extend the default styles.

For example:

```tsx
<LiquidBackground
  // ... other props
  containerClassName="bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg shadow-xl"
  blobClassName="!rounded-full transition-transform duration-300 hover:scale-110"
/>
```

Note the `!` prefix in `!rounded-full`. This is important for overriding the default CSS module styles with Tailwind classes due to CSS specificity.

## Development & Testing

This project uses a Next.js `test-app` for development and testing the `groundification` package locally. 

To run the `test-app`:

1.  Build the `groundification` package:
    ```bash
    npm run build:package
    ```
2.  Install dependencies in `test-app` and link the package:
    ```bash
    cd test-app
    npm install
    npm link ../
    cd ..
    ```
3.  Run the Next.js development server:
    ```bash
    npm run dev
    ```

This will start the `test-app` development server, allowing you to see changes to `LiquidBackground` in real-time. 