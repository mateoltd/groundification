// --- Type Definitions (Now with `inclination`) ---

type VerticalPosition = 'top' | 'bottom';
type HorizontalPosition = 'left' | 'right';

export interface ClusterConfig {
  id: string | number;
  position: { vertical: VerticalPosition; horizontal: HorizontalPosition };
  size: number;
  inclination: number; // The new key property! 0 to 1, where 0.5 is a 45-degree cut.
  color: string;
  opacity: number;
  blobCount: number;
  blobSize: { min: number; max: number };
}

export interface BlobData {
  id: string;
  configId: string | number;
  style: React.CSSProperties;
}


// ======================================================================
// THE HYDRATION FIX: A SEEDED PSEUDO-RANDOM NUMBER GENERATOR (PRNG)
// ======================================================================
// This function creates a deterministic "random" number generator.
// Given the same seed, it will always produce the same sequence of numbers.
const createSeededRandom = (seed: number) => {
  let state = seed;
  return () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
};

// Simple hash function to convert a string ID into a number seed.
const stringToSeed = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};


// --- THE NEW, ROBUST, AND DETERMINISTIC ALGORITHM ---

export const generateBlobsForCluster = (config: ClusterConfig): BlobData[] => {
  const blobs: BlobData[] = [];
  const { id, position, size, inclination } = config;

  // 1. Create a deterministic random generator seeded by the cluster's ID.
  const seed = typeof id === 'string' ? stringToSeed(id) : id;
  const random = createSeededRandom(seed);

  // 2. Define the cluster's bounding box.
  const bbox = {
    x: position.horizontal === 'left' ? 0 : 100 - size,
    y: position.vertical === 'top' ? 0 : 100 - size,
    width: size,
    height: size,
  };

  // 3. Define the diagonal line using the new `inclination` property.
  const p1 = {
    x: bbox.x + (position.horizontal === 'left' ? bbox.width * inclination : bbox.width * (1 - inclination)),
    y: bbox.y,
  };
  const p2 = {
    x: bbox.x,
    y: bbox.y + (position.vertical === 'top' ? bbox.height * (1 - inclination) : bbox.height * inclination),
  };
  
  // Adjust for bottom-right and top-left corners to maintain consistent angle direction
  if ((position.horizontal === 'right' && position.vertical === 'top') || (position.horizontal === 'left' && position.vertical === 'bottom')) {
    [p1.y, p2.y] = [p2.y, p1.y];
  }

  // 4. Derive the standard line equation Ax + By + C = 0.
  const A = p1.y - p2.y;
  const B = p2.x - p1.x;
  const C = -A * p1.x - B * p1.y;

  // 5. The reference point (the corner) is guaranteed to be inside.
  const refPoint = { x: position.horizontal === 'left' ? 0 : 100, y: position.vertical === 'top' ? 0 : 100 };
  const refSide = A * refPoint.x + B * refPoint.y + C;

  // 6. Generate blobs, ensuring they are on the correct side of the line.
  for (let i = 0; i < config.blobCount; i++) {
    let x, y;
    do {
      // Use our seeded PRNG for all random values.
      x = bbox.x + random() * bbox.width;
      y = bbox.y + random() * bbox.height;
      const pointSide = A * x + B * y + C;
      if (pointSide * refSide >= 0) break; // Check if on the same side as the corner.
    } while (true);

    const blobSize = random() * (config.blobSize.max - config.blobSize.min) + config.blobSize.min;
    
    blobs.push({
      id: `${id}-${i}`,
      configId: id,
      style: {
        top: `${y}vh`,
        left: `${x}vw`,
        width: `${blobSize}vw`,
        height: `${blobSize}vw`,
        backgroundColor: config.color,
        opacity: config.opacity,
        animationDelay: `-${random() * 5}s`, // Also deterministic
      },
    });
  }
  return blobs;
};