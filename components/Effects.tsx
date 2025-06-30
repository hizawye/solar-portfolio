
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import React from 'react';

export function Effects() {
  return (
    <EffectComposer>
      <Bloom 
        intensity={0.6} 
        luminanceThreshold={0.3} 
        luminanceSmoothing={0.9} 
        height={300} 
      />
      <Vignette eskil={false} offset={0.1} darkness={0.6} />
    </EffectComposer>
  );
}
