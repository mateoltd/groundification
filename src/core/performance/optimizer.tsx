import { ReactNode, lazy, Suspense } from 'react';

/**
 * Dynamically imports a component to improve initial load performance.
 * Use for components that are not critical for the initial render.
 * @param componentPath The path to the component to import.
 */
export function dynamicImportComponent<T extends React.ComponentType<any>>(
  componentLoader: () => Promise<{ default: T }>,
  fallback: ReactNode = null
) {
  const LazyComponent = lazy(componentLoader);
  
  // Return a new functional component that renders the LazyComponent inside Suspense
  const DynamicComponent: React.FC<React.ComponentProps<T>> = (props) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );

  return DynamicComponent;
}

/**
 * Helper to determine if animations should be disabled based on user preferences
 * or configuration.
 * @param disableAnimationsConfig A boolean from the GroundificationConfig.
 * @returns boolean - true if animations should be disabled.
 */
export function shouldDisableAnimations(disableAnimationsConfig?: boolean): boolean {
  if (disableAnimationsConfig) {
    return true;
  }
  // Check for prefers-reduced-motion in a client-side environment
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
} 