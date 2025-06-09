import { GroundificationConfig, GroundificationTheme } from '../../types';
import { LiquidBackgroundProps } from '../../types/component-props';
import { ClusterConfig } from '../../procedural/blobs/blob-generator';

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
  // Add any other inputs needed for orchestration (i.e component-specific props)
): OrchestrationSystemOutput {
  // Determine effective maxBlobCount, prioritizing user config
  const effectiveMaxBlobCount = config.maxBlobCount !== undefined 
    ? config.maxBlobCount 
    : 60; // Default max blobs for the entire background

  // Adjust blob counts for default clusters based on effectiveMaxBlobCount
  const defaultClusters: ClusterConfig[] = [
    {
      id: 'default-cluster-1',
      position: { vertical: 'top', horizontal: 'left' },
      size: 45,
      inclination: 0.3,
      color: theme.primaryColor || '#007bff',
      opacity: 0.7,
      blobCount: Math.floor(effectiveMaxBlobCount * 0.6), // Distribute based on total max
      blobSize: { min: 6, max: 16 },
    },
    {
      id: 'default-cluster-2',
      position: { vertical: 'bottom', horizontal: 'right' },
      size: 40,
      inclination: 0.7,
      color: theme.secondaryColor || '#6f42c1',
      opacity: 0.6,
      blobCount: Math.floor(effectiveMaxBlobCount * 0.4), // Distribute based on total max
      blobSize: { min: 8, max: 20 },
    },
  ];

  // Use the clusters provided in the config, or fall back to adjusted defaults
  const effectiveClusters = config.clusters && config.clusters.length > 0
    ? config.clusters
    : defaultClusters;

  const liquidBackgroundProps: LiquidBackgroundProps = {
    clusters: effectiveClusters,
    animationSpeed: config.animationSpeed || 200,
    blurAmount: config.blurAmount || 120,
    disableAnimations: config.disableAnimations || false, // Pass disableAnimations
    maxBlobCount: effectiveMaxBlobCount, // Pass overall maxBlobCount to LiquidBackground
    themeColors: [theme.primaryColor || '#007bff', theme.secondaryColor || '#6f42c1'],
  };

  return {
    liquidBackgroundProps,
  };
} 