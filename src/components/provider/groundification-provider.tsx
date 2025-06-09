'use client';

import React, { useContext, useState, ReactNode } from 'react';
import { GroundificationConfig, GroundificationTheme, GroundificationContextType } from '../../types';
import { GroundificationProviderProps } from '../../types/component-props';
import { GroundificationContext } from '../../hooks';

export const GroundificationProvider: React.FC<GroundificationProviderProps> = ({
  children,
  initialConfig,
  initialTheme,
}) => {
  const [config, setConfig] = useState<GroundificationConfig>(initialConfig || { 
    debugMode: false,
    clusters: [],
  });
  const [theme, setTheme] = useState<GroundificationTheme>(initialTheme || {});

  const contextValue: GroundificationContextType = {
    config,
    setConfig,
    theme,
    setTheme,
  };

  return (
    <GroundificationContext.Provider value={contextValue}>
      {children}
    </GroundificationContext.Provider>
  );
};
