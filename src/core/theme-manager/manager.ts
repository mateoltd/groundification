import { GroundificationTheme, GroundificationConfig } from '../../types';

interface CustomCSSProperties extends React.CSSProperties {
  [key: `--groundification-${string}`]: string;
}

/**
 * Applies and consolidates theme properties.
 * This function can be expanded to handle complex theme logic, 
 * e.g., merging default themes with user-provided overrides.
 */
export function applyTheme(
  currentTheme: GroundificationTheme,
  newTheme: GroundificationTheme,
  config: GroundificationConfig
): GroundificationTheme {
  // For now, a simple merge. Future logic can include deep merges, 
  // validation, or specific theme preset applications.
  return { ...currentTheme, ...newTheme };
}

/**
 * Generates theme-specific styles or variables based on the active theme.
 * This could return CSS variables, Tailwind classes, or style objects.
 */
export function getThemeStyles(theme: GroundificationTheme): CustomCSSProperties {
  return {
    '--groundification-primary-color': theme.primaryColor || '#007bff',
    '--groundification-secondary-color': theme.secondaryColor || '#6f42c1',
    // Add more theme-related CSS variables here
  };
}
