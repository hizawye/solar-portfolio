
import React, { useState, useCallback, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Scene } from './components/Scene';
import { UI } from './components/UI';
import { Loader } from './components/Loader';
import { SatelliteData } from './types';
import { PORTFOLIO_DATA } from './constants';

export default function App() {
  const [focusedPlanetIndex, setFocusedPlanetIndex] = useState<number | null>(null);
  const [selectedSatellite, setSelectedSatellite] = useState<SatelliteData | null>(null);
  const [isBioOpen, setBioOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 5000); // Cinematic intro duration
    return () => clearTimeout(timer);
  }, []);

  const handlePlanetClick = useCallback((index: number | null) => {
    setFocusedPlanetIndex(currentIndex => (currentIndex === index ? null : index));
    setSelectedSatellite(null);
    setBioOpen(false);
  }, []);

  const handleSunClick = useCallback(() => {
    setFocusedPlanetIndex(null);
    setSelectedSatellite(null);
    setBioOpen(true);
  }, []);
  
  const handleSatelliteClick = useCallback((satellite: SatelliteData) => {
    setSelectedSatellite(satellite);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedSatellite(null);
    setBioOpen(false);
  }, []);

  const navigate = (direction: 'next' | 'prev') => {
    const numPlanets = PORTFOLIO_DATA.length;
    if (direction === 'next') {
      setFocusedPlanetIndex(prev => (prev === null ? 0 : (prev + 1) % numPlanets));
    } else {
      setFocusedPlanetIndex(prev => (prev === null ? numPlanets - 1 : (prev - 1 + numPlanets) % numPlanets));
    }
    setSelectedSatellite(null);
    setBioOpen(false);
  };

  return (
    <div className="w-screen h-screen bg-black text-white font-sans">
      <Suspense fallback={<Loader />}>
        <Canvas camera={{ fov: 45, position: [0, 20, 85] }}>
          <Scene
            focusedPlanetIndex={focusedPlanetIndex}
            onPlanetClick={handlePlanetClick}
            onSunClick={handleSunClick}
            onSatelliteClick={handleSatelliteClick}
            showIntro={showIntro}
          />
        </Canvas>
      </Suspense>
      <UI
        focusedPlanetIndex={focusedPlanetIndex}
        selectedSatellite={selectedSatellite}
        isBioOpen={isBioOpen}
        onCloseModal={handleCloseModal}
        onNavigate={navigate}
        onSatelliteSelect={handleSatelliteClick}
      />
    </div>
  );
}