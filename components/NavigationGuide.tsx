
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationGuideProps {
  isVisible: boolean;
}

export function NavigationGuide({ isVisible }: NavigationGuideProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-900/80 border border-gray-700 rounded-lg p-4 text-white text-sm max-w-md shadow-lg"
        >
          <h3 className="font-bold text-base mb-2">Navigation Guide</h3>
          <div className="mb-2">
            <p className="font-semibold">Desktop:</p>
            <ul className="list-disc list-inside ml-2">
              <li>Click on planets/sun/titles to select.</li>
              <li>Click on satellites to view details.</li>
              <li>Click anywhere in the universe to deselect.</li>
              <li>Use mouse to orbit and zoom.</li>
              <li>Use arrow buttons to navigate between planets.</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">Mobile:</p>
            <ul className="list-disc list-inside ml-2">
              <li>Tap on planets/sun/titles to select.</li>
              <li>Tap on satellites to view details.</li>
              <li>Tap anywhere in the universe to deselect.</li>
              <li>Use touch gestures to orbit and zoom.</li>
              <li>Use arrow buttons to navigate between planets.</li>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
