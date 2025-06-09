import { ReactNode } from 'react';
import { ClusterConfig, BlobData } from '../procedural/blobs/blob-generator';

// Temporary interface for LiquidBackgroundProps until its full implementation
// is in place and data is dynamically provided.
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
  disableAnimations?: boolean;
  themeColors?: string[]; // For theming
  onBlobEnter?: (blob: BlobData) => void;
  onBlobLeave?: (blob: BlobData) => void;
  className?: string;
}

export interface GroundificationBackgroundProps {
  /**
   * The content to be rendered on top of the background.
   */
  children?: ReactNode;
  /**
   * Optional Tailwind CSS classes for the main background container.
   */
  className?: string;
  // Add any specific props for background orchestration here in the future
}

export interface GroundificationProviderProps {
  /**
   * The content to be rendered within the provider's scope.
   */
  children: ReactNode;
  /**
   * Initial configuration for the Groundification package.
   */
  initialConfig?: {
    debugMode?: boolean;
    animationSpeed?: number;
    blurAmount?: number;
    clusters?: ClusterConfig[]; // Added for flexible cluster definition
  };
  /**
   * Initial theme for the Groundification package.
   */
  initialTheme?: {
    primaryColor?: string;
    secondaryColor?: string;
  };
}
