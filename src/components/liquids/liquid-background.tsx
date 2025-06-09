'use client';

import React, { useMemo } from 'react';
import { generateBlobsForCluster, ClusterConfig, BlobData } from '../../procedural/blobs/blob-generator';
import styles from './liquid-background.module.css';
import { LiquidBackgroundProps } from '../../types/component-props';

export const LiquidBackground: React.FC<LiquidBackgroundProps> = ({
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
  onBlobEnter = () => {}, // TODO: Default empty function
  onBlobLeave = () => {}, // TODO: Default empty function
  className,
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
    <div 
      className={`${styles.blobsContainer} ${containerClassName} ${className || ''}`} 
      style={{
        ...containerStyle
      }}
    >
      <div className={`${styles.blurWrapper} ${blurWrapperClassName}`}>
        {allBlobs.map((blob) => (
          <div
            key={blob.id}
            className={`${styles.blob} ${blobClassName} ${disableAnimations ? styles.noAnimation : ''}`}
            style={{
              ...blob.style,
              // themeColors are now handled by blob-generator based on ClusterConfig if needed.
              // If a more dynamic, theme-driven color override is desired here, 
              // it needs to be deterministic (e.g., based on blob.id or a deterministic hash).
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

