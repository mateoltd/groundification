// components/LiquidBackground.tsx
import React, { useMemo } from 'react';
import { generateBlobsForCluster, ClusterConfig, BlobData } from '../utils/blob-generator';
import styles from './LiquidBackground.module.css';

interface LiquidBackgroundProps {
  clusters: ClusterConfig[];
  animationSpeed?: number;
  blurAmount?: number;
  // --- Placeholder functions for future development ---
  onBlobEnter?: (blob: BlobData) => void;
  onBlobLeave?: (blob: BlobData) => void;
}

const LiquidBackground: React.FC<LiquidBackgroundProps> = ({
  clusters,
  animationSpeed = 200,
  blurAmount = 120,
  onBlobEnter = () => {}, // Default empty function
  onBlobLeave = () => {}, // Default empty function
}) => {
  const allBlobs = useMemo(() => {
    return clusters.flatMap(generateBlobsForCluster);
  }, [clusters]);

  const containerStyle: React.CSSProperties & { [key: string]: any } = {
    '--animation-speed': `${animationSpeed}s`,
    '--blur-amount': `${blurAmount}px`,
  };

  return (
    <div className={styles.container} style={containerStyle}>
      <div className={styles.blurWrapper}>
        {allBlobs.map((blob) => (
          <div
            key={blob.id}
            className={styles.blob}
            style={blob.style}
            
          />
        ))}
      </div>
      <div className={styles.grainOverlay}></div>
    </div>
  );
};

export default LiquidBackground;