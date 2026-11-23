import React, { useCallback } from 'react';
import { Container, Graphics } from '@pixi/react';
import * as PIXI from 'pixi.js';

interface PatatoProps {
  frame: number;
  action: 'walk' | 'fall' | 'peel' | 'crouch' | 'fry' | 'dance';
  x: number;
  y: number;
  scale?: number;
}

export const Patato: React.FC<PatatoProps> = ({ frame, action, x, y, scale = 1 }) => {
  const pulse = Math.sin(frame * 0.15);
  const quickPulse = Math.sin(frame * 0.3);

  let bodyYOffset = 0;
  let bodySquash = 1;
  let bodyStretch = 1;
  let hatRotation = 0;
  let hatY = 0;
  let leftArmRotation = 0;
  let rightArmRotation = 0;
  let leftLegY = 0;
  let rightLegY = 0;
  let eyeScaleY = 1;
  let isFalling = false;
  let fallRotation = 0;
  let mouthSize = 1;

  // Doğal göz kırpma (her 120 karede bir)
  if (frame % 120 > 115) {
    eyeScaleY = 0.1;
  }

  switch (action) {
    case 'walk':
      bodyYOffset = Math.abs(quickPulse) * -8;
      bodySquash = 1 + Math.abs(quickPulse) * 0.03;
      bodyStretch = 1 - Math.abs(quickPulse) * 0.03;
      hatRotation = quickPulse * 0.05;
      leftArmRotation = Math.sin(frame * 0.2) * 0.5;
      rightArmRotation = -Math.sin(frame * 0.2) * 0.5;
      leftLegY = Math.sin(frame * 0.2) * 10;
      rightLegY = -Math.sin(frame * 0.2) * 10;
      break;

    case 'fall':
      isFalling = true;
      fallRotation = -Math.min(frame * 0.05, 1.2);
      bodyYOffset = Math.sin(frame * 0.1) * 15;
      hatY = -Math.min(frame * 4, 120);
      hatRotation = frame * 0.05;
      leftArmRotation = -2 + Math.sin(frame * 0.5) * 0.5;
      rightArmRotation = 2 + Math.cos(frame * 0.5) * 0.5;
      mouthSize = 2.2;
      break;

    case 'peel':
      bodySquash = 1 + pulse * 0.01;
      leftArmRotation = 0.5 + Math.sin(frame * 0.25) * 0.3;
      rightArmRotation = -0.2;
      break;

    case 'crouch':
      bodyYOffset = 45;
      bodySquash = 0.85;
      bodyStretch = 1.15;
      hatRotation = 0.1;
      leftArmRotation = 1.0 + Math.sin(frame * 0.1) * 0.1;
      rightArmRotation = 0.5;
      break;

    case 'fry':
      bodyYOffset = pulse * -2;
      rightArmRotation = -0.5 + Math.sin(frame * 0.2) * 0.4;
      leftArmRotation = 0.2;
      break;

    case 'dance':
      bodyYOffset = -15 + Math.sin(frame * 0.3) * -20;
      bodySquash = 1 + quickPulse * 0.08;
      hatRotation = quickPulse * 0.15;
      leftArmRotation = -1.5 + Math.sin(frame * 0.4) * 0.8;
      rightArmRotation = 1.5 + Math.cos(frame * 0.4) * 0.8;
      leftLegY = Math.sin(frame * 0.3) * 15;
      rightLegY = -Math.sin(frame * 0.3) * 15;
      mouthSize = 1.8;
      break;
  }

  const drawBody = useCallback((g: PIXI.Graphics) => {
    g.clear();

    // Bacaklar & Kahverengi Çizmeler
    g.beginFill(0x4a2e1b);
    g.drawRoundedRect(-35, 90 + leftLegY, 22, 25, 6);
    g.drawRoundedRect(13, 90 + rightLegY, 22, 25, 6);
    g.endFill();

    g.beginFill(0x6e473b);
    g.drawRect(-30, 75 + leftLegY, 12, 20);
    g.drawRect(18, 75 + rightLegY, 12, 20);
    g.endFill();

    // Tombul Patates Gövdesi
    g.beginFill(0xc29661);
    g.lineStyle(4, 0x5a3e1a, 1);
    g.drawEllipse(0, 0, 75 * bodySquash, 90 * bodyStretch + bodyYOffset);
    g.endFill();

    // Doğal Benekler
    g.lineStyle(0);
    g.beginFill(0xa67c48, 0.5);
    g.drawCircle(-40, -10, 4);
    g.drawCircle(-35, 30, 3);
    g.drawCircle(45, -20, 5);
    g.drawCircle(30, 40, 4);
    g.endFill();

    // Yeşil Bahçıvan Tulumu
    g.beginFill(0x4a6e41);
    g.lineStyle(3, 0x22361d, 1);
    g.drawRect(-55, 10, 110, 70);
    g.drawRoundedRect(-60, 40, 120, 40, 10);
    g.drawRect(-48, -25, 15, 40);
    g.drawRect(33, -25, 15, 40);
    g.endFill();

    // Düğmeler ve Ön Cep
    g.lineStyle(0);
    g.beginFill(0xf7d070);
    g.drawCircle(-40, 15, 5);
    g.drawCircle(40, 15, 5);
    g.endFill();

    g.lineStyle(2, 0x22361d, 1);
    g.beginFill(0x3d5a35);
    g.drawRoundedRect(-20, 35, 40, 30, 5);
    g.endFill();

    // Gözler
    g.lineStyle(0);
    g.beginFill(0xffffff);
    g.drawEllipse(-20, -25, 12, 16 * eyeScaleY);
    g.drawEllipse(20, -25, 12, 16 * eyeScaleY);
    g.endFill();

    g.beginFill(0x2b1e10);
    g.drawCircle(-18, -25, 6 * eyeScaleY);
    g.drawCircle(18, -25, 6 * eyeScaleY);
    g.endFill();

    g.beginFill(0xffffff);
    g.drawCircle(-21, -28, 2.5 * eyeScaleY);
    g.drawCircle(15, -28, 2.5 * eyeScaleY);
    g.endFill();

    // Kaşlar
    g.lineStyle(3, 0x2b1e10, 1);
    const browOffset = action === 'fall' ? -5 : 0;
    g.moveTo(-33, -48 + browOffset);
    g.quadraticCurveTo(-20, -51, -8, -46);
    g.moveTo(8, -46);
    g.quadraticCurveTo(20, -51, 33, -48 + browOffset);

    // Burun
    g.lineStyle(0);
    g.beginFill(0xa67c48);
    g.drawEllipse(0, -14, 8, 5);
    g.endFill();

    // Ağız
    g.lineStyle(3, 0x2b1e10, 1);
    if (action === 'dance') {
      g.beginFill(0x8a1c14);
      g.drawCircle(0, 10, 10 * mouthSize);
      g.endFill();
    } else if (action === 'fall') {
      g.beginFill(0x2b1e10);
      g.drawEllipse(0, 15, 8, 14);
      g.endFill();
    } else {
      g.moveTo(-15, 3);
      g.quadraticCurveTo(0, 15, 15, 3);
    }

    // Yanaklar
    g.lineStyle(0);
    g.beginFill(0xe2856a, 0.4);
    g.drawCircle(-40, -10, 10);
    g.drawCircle(40, -10, 10);
    g.endFill();
  }, [action, bodySquash, bodyStretch, bodyYOffset, eyeScaleY, leftLegY, mouthSize, rightLegY]);

  const drawLeftArm = useCallback((g: PIXI.Graphics) => {
    g.clear();
    g.lineStyle(4, 0x5a3e1a, 1);
    g.beginFill(0xc29661);
    g.drawRoundedRect(-25, -7, 30, 14, 7);
    g.endFill();
  }, []);

  const drawRightArm = useCallback((g: PIXI.Graphics) => {
    g.clear();
    g.lineStyle(4, 0x5a3e1a, 1);
    g.beginFill(0xc29661);
    g.drawRoundedRect(-5, -7, 30, 14, 7);
    g.endFill();
  }, []);

  const drawHat = useCallback((g: PIXI.Graphics) => {
    g.clear();
    g.lineStyle(3, 0x4a3411, 1);
    g.beginFill(0xdfaf66);
    g.drawEllipse(0, 5, 85, 15);
    g.drawRoundedRect(-40, -35, 80, 42, 10);
    g.endFill();
    g.lineStyle(0);
    g.beginFill(0x8a1c14);
    g.drawRect(-40, 0, 80, 6);
    g.endFill();
  }, []);

  const drawShadow = useCallback((g: PIXI.Graphics) => {
    g.clear();
    if (!isFalling) {
      g.beginFill(0x000000, 0.15);
      g.drawEllipse(0, 110, 70 * bodySquash, 15);
      g.endFill();
    }
  }, [bodySquash, isFalling]);

  return (
    <Container position={[x, y]} scale={scale}>
      <Graphics draw={drawShadow} />
      <Container rotation={fallRotation}>
        <Graphics draw={drawBody} />
        <Container position={[-65, 0]} rotation={leftArmRotation}>
          <Graphics draw={drawLeftArm} />
        </Container>
        <Container position={[65, 0]} rotation={rightArmRotation}>
          <Graphics draw={drawRightArm} />
        </Container>
        <Container position={[0, -78 + hatY]} rotation={hatRotation}>
          <Graphics draw={drawHat} />
        </Container>
      </Container>
    </Container>
  );
};
    
