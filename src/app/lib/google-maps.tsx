'use client';

import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useRef } from 'react';

export default function GoogleMaps() {
  const ref = useRef<HTMLDivElement>(null);

  const initialize = async () => {
    const loader = new Loader({
      apiKey: 'AIzaSyDtXw1WfGfd1FdKBdlEI3QIFDumRG7n3ig',
      version: 'quarterly',
      libraries: ['places'],
    });

    const options: google.maps.MapOptions = {
      mapId: 'google-maps',
      center: {
        lat: 10.837203876678675,
        lng: 106.70227296739414,
      },
      zoom: 11,
    };

    const { Map } = await loader.importLibrary('maps');

    const map = new Map(ref.current as HTMLDivElement, options);
  };

  useEffect(() => {
    initialize();
  }, []);

  return <div className="" ref={ref}></div>;
}
