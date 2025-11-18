// contexts/Play.jsx
import React, { createContext, useContext, useState } from 'react';

const PlayContext = createContext();

export function PlayProvider({ children }) {
  const [play, setPlay] = useState(true); // Start with play true for direct homepage
  const [end, setEnd] = useState(false);

  return (
    <PlayContext.Provider value={{ play, setPlay, end, setEnd }}>
      {children}
    </PlayContext.Provider>
  );
}

export function usePlay() {
  const context = useContext(PlayContext);
  if (!context) {
    throw new Error('usePlay must be used within a PlayProvider');
  }
  return context;
}