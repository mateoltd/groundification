'use client';

import React from 'react';
import { useGroundification } from '../../hooks';
import { GroundificationBackgroundProps } from '../../types/component-props';
import { LiquidBackground } from '../../components/liquids/liquid-background';
import { orchestrateBackgrounds } from '../../core/orchestration';
import { getThemeStyles } from '../../core/theme-manager';
import styles from '../../components/liquids/liquid-background.module.css';

export const GroundificationBackground: React.FC<GroundificationBackgroundProps> = ({
  children,
  className,
}) => {
  const { config, theme } = useGroundification();

  // Use the orchestration system to get props for various background components
  const { liquidBackgroundProps } = orchestrateBackgrounds(config, theme);
  
  // Get theme-specific CSS variables to apply to the container
  const themeStyles = getThemeStyles(theme);

  return (
    <div className={`${styles.mainBackgroundContainer} ${className || ''}`} style={themeStyles}>
      {/* SVG filter for the goo effect */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Render background components based on orchestration logic */}
      {liquidBackgroundProps && <LiquidBackground {...liquidBackgroundProps} />}
      {children}
    </div>
  );
};
