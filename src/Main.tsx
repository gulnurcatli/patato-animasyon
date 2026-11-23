import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { Stage } from '@pixi/react';
import { Backdrop } from './components/Backdrop';
import { Patato } from './characters/Patato';

export const Main: React.FC = () => {
  const frame = useCurrentFrame();

  // Her sahne 300 kare (30 FPS ile 10 saniye) sürer — toplam 60 saniye
  const sceneIndex = Math.min(Math.floor(frame / 300) + 1, 6) as 1 | 2 | 3 | 4 | 5 | 6;
  const localFrame = frame % 300;

  let action: 'walk' | 'fall' | 'peel' | 'crouch' | 'fry' | 'dance' = 'walk';
  let patatoX = 520;
  let patatoY = 755;
  let patatoFrame = localFrame;

  switch (sceneIndex) {
    case 1:
      // Sahne 1: Tarlaların yanındaki yolda neşeyle yürüyüş
      action = 'walk';
      patatoX = interpolate(localFrame, [0, 300], [280, 960], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
      patatoY = 755;
      break;

    case 2:
      // Sahne 2: Patates fidanını çekerken dengesini kaybedip düşme
      action = 'fall';
      patatoX = 790;
      patatoY = 760;
      patatoFrame = Math.max(0, localFrame - 45);
      break;

    case 3:
      // Sahne 3: Ahşap masada tabureye oturup patates soyma
      action = 'peel';
      patatoX = 730;
      patatoY = 665;
      break;

    case 4:
      // Sahne 4: Taş ateş ocağının önünde çömelip kibritle ateş yakma
      action = 'crouch';
      patatoX = 1040;
      patatoY = 765;
      break;

    case 5:
      // Sahne 5: Yanan ocağın üzerindeki tavada patates kızartma
      action = 'fry';
      patatoX = 1015;
      patatoY = 755;
      break;

    case 6:
      // Sahne 6: Final — Ketçap ve mayonezli patateslerle mutluluk dansı
      action = 'dance';
      patatoX = 960;
      patatoY = 755;
      break;
  }

  return (
    <Stage
      width={1920}
      height={1080}
      options={{ backgroundColor: 0xcce8f4, antialias: true }}
    >
      <Backdrop frame={localFrame} scene={sceneIndex} />
      <Patato
        frame={patatoFrame}
        action={action}
        x={patatoX}
        y={patatoY}
        scale={1.15}
      />
    </Stage>
  );
};
