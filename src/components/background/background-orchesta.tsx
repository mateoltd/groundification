'use client';

import React from 'react';
import { useGroundification } from '../../hooks';
import { GroundificationBackgroundProps } from '../../types/component-props';
import { LiquidBackground } from '../../components/liquids/liquid-background';
import { orchestrateBackgrounds } from '../../core/orchestration';

export const GroundificationBackground: React.FC<GroundificationBackgroundProps> = ({
  children,
  className,
}) => {
  const { config, theme } = useGroundification();

  // Use the orchestration system to get props for various background components
  const { liquidBackgroundProps } = orchestrateBackgrounds(config, theme);

  return (
    <div className={`groundification-background-container ${className || ''}`}>
      {/* Render background components based on orchestration logic */}
      {liquidBackgroundProps && <LiquidBackground {...liquidBackgroundProps} />}
      {children}
    </div>
  );
};
