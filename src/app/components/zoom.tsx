'use client';

import React from 'react';
import Zoom, { UncontrolledProps } from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const MediumZoom: React.FC<UncontrolledProps> = ({ ...props }) => {
  const IconUnzoom: React.FC = () => (
    <span className="text-base material-symbols-outlined">
      close_fullscreen
    </span>
  );

  return (
    <Zoom {...props} classDialog="medium-zoom" IconUnzoom={IconUnzoom}></Zoom>
  );
};

export default MediumZoom;
