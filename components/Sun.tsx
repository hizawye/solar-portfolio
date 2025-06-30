
import React from 'react';
import { Html } from '@react-three/drei';

interface SunProps {
  onClick: () => void;
}

export function Sun({ onClick }: SunProps) {
  return (
    <group onClick={onClick} position={[0, 0, 0]}>
      <mesh>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <mesh>
      <sphereGeometry args={[4, 32, 32]} />
      <meshStandardMaterial
        color="#FFDDBB"
        emissive="#FF9900"
        emissiveIntensity={2}
        toneMapped={false}
      />
      </mesh>
      <Html position={[0, 4.5, 0]} center distanceFactor={10}>
        <div className="bg-black/50 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap select-none">
          Bio
        </div>
      </Html>
    </group>
  );
}
