
import { Vector3 } from 'three';

export interface SatelliteData {
  id: string;
  name: string;
  description: string;
  techStack?: string[];
  imageUrl?: string;
  liveUrl?: string;
}

export interface PlanetData {
  id: string;
  name: string;
  color: string;
  emissiveColor: string;
  size: number;
  orbitRadius: number;
  rotationSpeed: number;
  satellites: SatelliteData[];
}

export type FocusTarget = {
  position: Vector3;
  lookAt: Vector3;
} | null;

// Note: The global JSX type augmentation for React Three Fiber has been
// moved to index.tsx to ensure it is correctly applied by TypeScript.
