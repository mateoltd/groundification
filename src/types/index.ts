import { ClusterConfig } from '../procedural/blobs/blob-generator';

export * from './index';
export * from './component-props';

export interface GroundificationConfig {
  // Add global configuration properties here
  // e.g., animation speed, default themes, etc.
  debugMode?: boolean;
  animationSpeed?: number;
  blurAmount?: number;
  clusters?: ClusterConfig[];
  animationPreset?: "subtle" | "energetic";
  maxBlobCount?: number;
  disableAnimations?: boolean;
}

export interface GroundificationTheme {
  // Define theme properties here
  primaryColor?: string;
  secondaryColor?: string;
  // blobColors: string[];
  // backgroundColor: string;
}

export interface GroundificationContextType {
  config: GroundificationConfig;
  theme: GroundificationTheme;
  // Add methods or state setters exposed by the provider
  setTheme: (theme: GroundificationTheme) => void;
  setConfig: (config: GroundificationConfig) => void;
}
