'use client';

import { useContext } from 'react';
import { GroundificationContextType } from '../types';
import { createContext } from 'react';

// Create the context with a default undefined value,
// which will be set by the provider.
export const GroundificationContext = createContext<GroundificationContextType | undefined>(undefined);

export const useGroundification = () => {
  const context = useContext(GroundificationContext);
  if (context === undefined) {
    throw new Error('useGroundification must be used within a GroundificationProvider');
  }
  return context;
};
