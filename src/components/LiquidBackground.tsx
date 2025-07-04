import React, { useMemo } from 'react';
import { generateBlobsForCluster, ClusterConfig, BlobData } from '../utils/blob-generator';
import styles from './LiquidBackground.module.css';

export interface LiquidBackgroundProps {
  clusters: ClusterConfig[];
  animationSpeed?: number;
  blurAmount?: number;
  containerClassName?: string; // For the main container div
  blurWrapperClassName?: string; // For the blur wrapper div
  blobClassName?: string; // For individual blob divs
  grainOverlayClassName?: string; // For the grain overlay div
  animationPreset?: "subtle" | "energetic"; // For animation variations
  onBlobClick?: (blob: BlobData) => void; // For blob click interaction
  onBlobHover?: (blob: BlobData) => void; // For blob hover interaction
  maxBlobCount?: number; // For performance control
  disableAnimations?: boolean; // For performance control
  themeColors?: string[]; // For theming
  // TODO: Placeholder functions for future development
  onBlobEnter?: (blob: BlobData) => void;
  onBlobLeave?: (blob: BlobData) => void;
}

const LiquidBackground: React.FC<LiquidBackgroundProps> = ({
  clusters,
  animationSpeed = 200,
  blurAmount = 120,
  containerClassName = '',
  blurWrapperClassName = '',
  blobClassName = '',
  grainOverlayClassName = '',
  animationPreset = 'subtle',
  onBlobClick,
  onBlobHover,
  maxBlobCount,
  disableAnimations = false,
  themeColors,
  // TODO: onBlobEnter = () => {}, 
  // TODO: onBlobLeave = () => {},
}) => {
  const allBlobs = useMemo(() => {
    const effectiveClusters = maxBlobCount ? 
      clusters.map(cluster => ({ ...cluster, blobCount: Math.min(cluster.blobCount, maxBlobCount / clusters.length) }))
      : clusters;
    return effectiveClusters.flatMap(generateBlobsForCluster);
  }, [clusters, maxBlobCount]);

  const containerStyle: React.CSSProperties & { [key: string]: any } = {
    '--animation-speed': `${animationSpeed}s`,
    '--blur-amount': `${blurAmount}px`,
    ...(disableAnimations && { 'animation': 'none', 'transition': 'none' }),
  };

  return (
    <div className={`${styles.container} ${containerClassName}`} style={containerStyle}>
      <div className={`${styles.blurWrapper} ${blurWrapperClassName}`}>
        {allBlobs.map((blob) => (
          <div
            key={blob.id}
            className={`${styles.blob} ${blobClassName} ${disableAnimations ? styles.noAnimation : ''}`}
            style={{
              ...blob.style,
              ...(themeColors && { backgroundColor: themeColors[Math.floor(Math.random() * themeColors.length)] }),
            }}
            onMouseEnter={() => onBlobHover && onBlobHover(blob)}
            onMouseLeave={() => onBlobHover && onBlobHover(blob)}
            onClick={() => onBlobClick && onBlobClick(blob)}
          />
        ))}
      </div>
      <div className={`${styles.grainOverlay} ${grainOverlayClassName}`}></div>
    </div>
  );
};

export { LiquidBackground };