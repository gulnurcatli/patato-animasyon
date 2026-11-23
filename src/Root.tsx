import React from 'react';
import { Composition } from 'remotion';
import { Main } from './Main';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PatatoHikayesi"
        component={Main}
        durationInFrames={1800}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
