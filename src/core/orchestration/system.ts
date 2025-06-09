import { GroundificationConfig, GroundificationTheme } from '../../types';
import { LiquidBackgroundProps } from '../../types/component-props';

export interface OrchestrationSystemOutput {
  // Define the output structure that the GroundificationBackground component expects
  // For now, it will primarily provide props for LiquidBackground
  liquidBackgroundProps?: LiquidBackgroundProps;
  // In the future, this might include props for other background types
  // otherBackgroundProps?: OtherBackgroundProps;
}

export function orchestrateBackgrounds(
  config: GroundificationConfig,
  theme: GroundificationTheme,
  // Add any other inputs needed for orchestration (e.g., component-specific props)
): OrchestrationSystemOutput {
  // This is where the logic for blending different background styles will live.
  // For now, we will simply return props for the LiquidBackground based on the theme.

  const liquidBackgroundProps: LiquidBackgroundProps = {
    clusters: [
      // These clusters will eventually be dynamically generated or derived from theme/config
      {
        id: 'orchestra-cluster-1',
        position: { vertical: 'top', horizontal: 'left' },
        size: 45,
        inclination: 0.3,
        color: theme.primaryColor || '#007bff',
        opacity: 0.7,
        blobCount: 6,
        blobSize: { min: 6, max: 16 },
      },
      {
        id: 'orchestra-cluster-2',
        position: { vertical: 'bottom', horizontal: 'right' },
        size: 40,
        inclination: 0.7,
        color: theme.secondaryColor || '#6f42c1',
        opacity: 0.6,
        blobCount: 5,
        blobSize: { min: 8, max: 20 },
      },
    ],
    animationSpeed: config.animationSpeed || 200, // Example of using config
    blurAmount: config.blurAmount || 120, // Example of using config
    // ... other props derived from config or theme
  };

  return {
    liquidBackgroundProps,
  };
} 