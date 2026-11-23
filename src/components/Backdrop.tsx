import React, { useCallback } from 'react';
import { Container, Graphics } from '@pixi/react';
import * as PIXI from 'pixi.js';

interface BackdropProps {
  frame: number;
  scene: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Backdrop: React.FC<BackdropProps> = ({ frame, scene }) => {
  const isSunset = scene >= 4;
  const flicker = Math.sin(frame * 0.45);
  const flicker2 = Math.cos(frame * 0.6);

  const drawEnvironment = useCallback((g: PIXI.Graphics) => {
    g.clear();

    // 1. Gökyüzü (Sahne 4-6 arası sıcak gün batımı tonu)
    g.beginFill(isSunset ? 0xf7c57c : 0xcce8f4);
    g.drawRect(0, 0, 1920, 620);
    g.endFill();

    g.beginFill(isSunset ? 0xfbe0a6 : 0xe6f4ea, 0.7);
    g.drawRect(0, 320, 1920, 300);
    g.endFill();

    // 2. Güneş ve Işınları
    const sunX = 1380;
    const sunY = isSunset ? 340 : 240;
    g.beginFill(0xfff5cc, 0.22);
    g.drawCircle(sunX, sunY, 240 + Math.sin(frame * 0.05) * 10);
    g.endFill();

    g.beginFill(isSunset ? 0xffd166 : 0xfff3b0);
    g.drawCircle(sunX, sunY, 95);
    g.endFill();

    // 3. Uzak Tepeler
    g.beginFill(isSunset ? 0x8fa868 : 0x9bbd76);
    g.moveTo(0, 480);
    g.quadraticCurveTo(450, 310, 960, 440);
    g.quadraticCurveTo(1480, 320, 1920, 430);
    g.lineTo(1920, 650);
    g.lineTo(0, 650);
    g.endFill();

    g.beginFill(isSunset ? 0x769454 : 0x82ab5e);
    g.moveTo(0, 520);
    g.quadraticCurveTo(600, 420, 1200, 510);
    g.quadraticCurveTo(1600, 440, 1920, 500);
    g.lineTo(1920, 680);
    g.lineTo(0, 680);
    g.endFill();

    // 4. Ahşap Çitler
    g.lineStyle(3, 0x4a3219, 1);
    g.beginFill(0x8c6239);
    g.drawRect(140, 470, 520, 14);
    g.drawRect(140, 520, 520, 14);
    g.drawRect(1280, 480, 520, 14);
    g.drawRect(1280, 525, 520, 14);
    for (let x = 180; x <= 620; x += 110) {
      g.drawRoundedRect(x, 435, 22, 135, 4);
    }
    for (let x = 1320; x <= 1760; x += 110) {
      g.drawRoundedRect(x, 445, 22, 130, 4);
    }
    g.endFill();

    // 5. Çimen ve Toprak Zemin
    g.lineStyle(0);
    g.beginFill(0x6d9946);
    g.drawRect(0, 560, 1920, 520);
    g.endFill();

    // Toprak Patika / Çalışma Alanı
    g.beginFill(0xb08456);
    g.moveTo(0, 720);
    g.quadraticCurveTo(960, 660, 1920, 740);
    g.lineTo(1920, 960);
    g.quadraticCurveTo(960, 910, 0, 950);
    g.endFill();

    // 6. Sol ve Sağ Büyük Ağaçlar
    // Sol Ağaç Gövdesi
    g.lineStyle(4, 0x3d2814, 1);
    g.beginFill(0x734d29);
    g.drawRect(60, 180, 110, 460);
    g.endFill();
    // Sol Ağaç Yaprakları
    g.beginFill(0x4f7d32);
    g.drawCircle(110, 160, 190);
    g.drawCircle(240, 210, 140);
    g.drawCircle(390, 310, 115);
    g.endFill();

    // Sağ Ağaç
    g.beginFill(0x734d29);
    g.drawRect(1720, 320, 45, 250);
    g.endFill();
    g.beginFill(0x588738);
    g.drawCircle(1740, 280, 115);
    g.endFill();

    // 7. Sağ Taraftaki Sırıklı Domates ve Salatalık Tarlası
    if (scene !== 3) {
      // Toprak arkları
      g.lineStyle(0);
      g.beginFill(0x7d5836);
      g.drawRoundedRect(1240, 620, 620, 170, 20);
      g.endFill();

      // Domates sırıkları ve kırmızı domatesler
      for (let i = 0; i < 3; i++) {
        const sx = 1290 + i * 95;
        g.lineStyle(3, 0x4a3219, 1);
        g.beginFill(0x8c6239);
        g.drawRect(sx, 500, 10, 170);
        g.endFill();

        g.beginFill(0x47782c);
        g.drawCircle(sx + 5, 550, 34);
        g.drawCircle(sx - 10, 595, 36);
        g.drawCircle(sx + 18, 610, 32);
        g.endFill();

        // Kırmızı Domatesler
        g.lineStyle(2, 0x5c140e, 1);
        g.beginFill(0xd93829);
        g.drawCircle(sx - 12, 560, 13);
        g.drawCircle(sx + 18, 580, 14);
        g.drawCircle(sx - 6, 618, 13);
        g.endFill();
      }

      // Salatalık sırıkları ve yeşil salatalıklar
      for (let i = 0; i < 3; i++) {
        const cx = 1580 + i * 90;
        g.lineStyle(3, 0x4a3219, 1);
        g.beginFill(0x8c6239);
        g.drawRect(cx, 510, 10, 170);
        g.endFill();

        g.beginFill(0x528733);
        g.drawCircle(cx + 5, 555, 35);
        g.drawCircle(cx - 8, 605, 38);
        g.endFill();

        // Salatalıklar
        g.lineStyle(2, 0x1e3b12, 1);
        g.beginFill(0x3b7a24);
        g.drawRoundedRect(cx - 16, 575, 13, 38, 6);
        g.drawRoundedRect(cx + 12, 595, 13, 40, 6);
        g.endFill();
      }
    }

    // 8. Patates Fideleri (Sahne 1, 2, 4, 5, 6)
    if (scene === 1 || scene === 2) {
      const bushPositions = [340, 520, 1060, 1450];
      bushPositions.forEach((bx) => {
        g.lineStyle(3, 0x264217, 1);
        g.beginFill(0x4c7d2f);
        g.drawCircle(bx, 680, 48);
        g.drawCircle(bx - 35, 700, 38);
        g.drawCircle(bx + 35, 700, 38);
        g.endFill();
        // Beyaz patates çiçekleri
        g.lineStyle(0);
        g.beginFill(0xffffff);
        g.drawCircle(bx - 15, 665, 6);
        g.drawCircle(bx + 20, 680, 6);
        g.endFill();
      });
    }
  }, [frame, isSunset, scene]);

  const drawSceneProps = useCallback((g: PIXI.Graphics) => {
    g.clear();

    // SAHNE 2: Sökülmüş Patates Fidanı ve Kürek
    if (scene === 2) {
      const pullBounce = Math.sin(frame * 0.25) * 6;
      // Kürek
      g.lineStyle(3, 0x3d2814, 1);
      g.beginFill(0x9e6b3b);
      g.drawRoundedRect(1020, 860, 55, 16, 6);
      g.beginFill(0xb0b8c1);
      g.moveTo(965, 868);
      g.lineTo(1020, 852);
      g.lineTo(1020, 884);
      g.closePath();
      g.endFill();

      // Sökülen Fidan ve Kökündeki Patatesler
      const px = 670;
      const py = 740 + pullBounce;
      g.lineStyle(3, 0x264217, 1);
      g.beginFill(0x4c7d2f);
      g.drawCircle(px, py - 50, 45);
      g.drawCircle(px - 35, py - 30, 35);
      g.drawCircle(px + 35, py - 30, 35);
      g.endFill();

      // Kökler ve Patatesler
      g.lineStyle(3, 0x6e4e2e, 1);
      g.moveTo(px, py - 10);
      g.lineTo(px - 25, py + 35);
      g.moveTo(px, py - 10);
      g.lineTo(px + 25, py + 35);

      g.lineStyle(3, 0x5a3e1a, 1);
      g.beginFill(0xc99e63);
      g.drawEllipse(px - 28, py + 42, 22, 16);
      g.drawEllipse(px + 28, py + 45, 24, 17);
      g.drawEllipse(px, py + 62, 20, 14);
      g.endFill();
    }

    // SAHNE 3: Ahşap Masa, Tabure ve Uzun Patates Kabukları
    if (scene === 3) {
      // Tabure
      g.lineStyle(3, 0x3d2814, 1);
      g.beginFill(0x8c5e35);
      g.drawRect(670, 740, 120, 22);
      g.drawRect(685, 762, 18, 120);
      g.drawRect(755, 762, 18, 120);
      g.endFill();

      // Ahşap Masa
      g.beginFill(0x9c6b3e);
      g.drawRoundedRect(860, 680, 560, 36, 8);
      g.beginFill(0x7d532d);
      g.drawRect(895, 716, 28, 190);
      g.drawRect(1355, 716, 28, 190);
      g.endFill();

      // Masadaki Patates Kasesi
      g.beginFill(0x82552c);
      g.drawEllipse(1270, 655, 75, 32);
      g.beginFill(0xc99e63);
      g.drawEllipse(1245, 635, 24, 17);
      g.drawEllipse(1285, 632, 26, 18);
      g.drawEllipse(1265, 620, 24, 16);
      // Masada soyulmuş patates
      g.beginFill(0xf7e39c);
      g.drawEllipse(1090, 665, 28, 18);
      g.endFill();

      // Masadan yere sarkan uzun patates kabuğu şeritleri
      const peelWave = Math.sin(frame * 0.2) * 8;
      g.lineStyle(3, 0x5a3e1a, 1);
      g.beginFill(0xdba858);
      g.drawRoundedRect(970, 680, 14, 210 + peelWave, 6);
      g.drawRoundedRect(1020, 680, 14, 200 - peelWave, 6);
      // Yerde biriken kabuk halkaları
      g.drawEllipse(840, 880, 75, 14);
      g.drawEllipse(940, 895, 85, 14);
      g.drawEllipse(780, 900, 65, 12);
      g.endFill();
    }

    // SAHNE 4, 5, 6: Taş Ateş Ocağı
    if (scene === 4 || scene === 5 || scene === 6) {
      const fireX = 1280;
      const fireY = 820;

      // Odunlar
      g.lineStyle(3, 0x3d2814, 1);
      g.beginFill(0x7a4e28);
      g.drawRoundedRect(fireX - 65, fireY - 18, 130, 18, 6);
      g.drawRoundedRect(fireX - 50, fireY - 30, 110, 16, 6);
      g.endFill();

      // Alevler (Sahne 4'te küçük kıvılcım, Sahne 5-6'da gür ateş)
      const fireScale = scene === 4 ? 0.55 : 1.15;
      g.lineStyle(0);
      g.beginFill(0xff6b1a, 0.9);
      g.drawEllipse(fireX, fireY - 35 * fireScale, 48 * fireScale, (55 + flicker * 8) * fireScale);
      g.endFill();

      g.beginFill(0xffd13b, 0.95);
      g.drawEllipse(fireX + flicker2 * 4, fireY - 28 * fireScale, 28 * fireScale, (38 + flicker2 * 6) * fireScale);
      g.endFill();

      // Duman halkaları
      const smokeOffset = (frame * 1.5) % 90;
      g.beginFill(0xffffff, 0.35 * (1 - smokeOffset / 90));
      g.drawCircle(fireX + Math.sin(frame * 0.1) * 15, fireY - 80 - smokeOffset, 18);
      g.drawCircle(fireX - 15 + Math.cos(frame * 0.1) * 15, fireY - 120 - smokeOffset, 24);
      g.endFill();

      // Taş Çember
      g.lineStyle(3, 0x3b3b3b, 1);
      const stones = [
        [-95, 10], [-65, 28], [-20, 35], [25, 35],
        [70, 26], [98, 8], [80, -14], [-80, -14],
      ];
      stones.forEach(([sx, sy]) => {
        g.beginFill(0x8c8c8c);
        g.drawEllipse(fireX + sx, fireY + sy, 28, 18);
        g.endFill();
      });

      // SAHNE 5: Ateş Üzerinde Tava ve Kızaran Patatesler
      if (scene === 5) {
        // Tava sapı ve gövdesi
        g.lineStyle(4, 0x222222, 1);
        g.beginFill(0x4a4a4a);
        g.drawRoundedRect(fireX - 240, fireY - 82, 140, 14, 6);
        g.drawEllipse(fireX, fireY - 75, 115, 32);
        g.endFill();

        // Kızaran yağ ve patates dilimleri
        g.lineStyle(0);
        g.beginFill(0xf5b82e);
        g.drawEllipse(fireX, fireY - 77, 98, 22);
        g.endFill();

        g.lineStyle(2, 0x9c6615, 1);
        g.beginFill(0xffe066);
        for (let i = -3; i <= 3; i++) {
          const bounce = Math.sin(frame * 0.35 + i) * 3;
          g.drawEllipse(fireX + i * 24, fireY - 78 + bounce, 16, 9);
        }
        g.endFill();
      }
    }

    // SAHNE 6: Final Masası (Patates Kızartması Kasesi, Ketçap ve Mayonez)
    if (scene === 6) {
      // Ahşap Masa (Sol tarafta)
      g.lineStyle(3, 0x3d2814, 1);
      g.beginFill(0x9c6b3e);
      g.drawRoundedRect(380, 690, 440, 34, 8);
      g.beginFill(0x7d532d);
      g.drawRect(410, 724, 24, 175);
      g.drawRect(765, 724, 24, 175);
      g.endFill();

      // Büyük Patates Kızartması Kasesi
      g.beginFill(0x82552c);
      g.drawEllipse(530, 668, 85, 35);
      g.endFill();

      // Çıtır Altın Sarısı Patates Çubukları
      g.lineStyle(2, 0x9c6615, 1);
      g.beginFill(0xffd43b);
      for (let i = -5; i <= 5; i++) {
        g.drawRoundedRect(525 + i * 11, 610 + Math.abs(i) * 3, 12, 48, 4);
      }
      g.endFill();

      // Ketçap Kasesi
      g.lineStyle(2, 0x444444, 1);
      g.beginFill(0xffffff);
      g.drawEllipse(655, 678, 34, 14);
      g.lineStyle(0);
      g.beginFill(0xd92b2b);
      g.drawEllipse(655, 673, 26, 9);
      g.endFill();

      // Mayonez Kasesi
      g.lineStyle(2, 0x444444, 1);
      g.beginFill(0xffffff);
      g.drawEllipse(745, 678, 34, 14);
      g.lineStyle(0);
      g.beginFill(0xfff8dc);
      g.drawEllipse(745, 673, 26, 9);
      g.endFill();
    }
  }, [flicker, flicker2, frame, scene]);

  return (
    <Container>
      <Graphics draw={drawEnvironment} />
      <Graphics draw={drawSceneProps} />
    </Container>
  );
};
    
