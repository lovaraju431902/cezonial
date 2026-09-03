const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Create PNG buffer from raw RGBA pixel data
function createPng(width, height, rgbaBuffer) {
  // PNG signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // Bit depth: 8
  ihdr[9] = 6; // Color type: 6 (RGBA)
  ihdr[10] = 0; // Compression method: 0
  ihdr[11] = 0; // Filter method: 0
  ihdr[12] = 0; // Interlace method: 0

  const ihdrChunk = makeChunk('IHDR', ihdr);

  // Raw image data with filter byte 0 at start of each scanline
  const scanlineLength = width * 4;
  const rawData = Buffer.alloc((scanlineLength + 1) * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * (scanlineLength + 1);
    rawData[rowOffset] = 0; // Filter byte 0 (None)
    rgbaBuffer.copy(rawData, rowOffset + 1, y * scanlineLength, (y + 1) * scanlineLength);
  }

  const compressedData = zlib.deflateSync(rawData, { level: 9 });
  const idatChunk = makeChunk('IDAT', compressedData);

  // IEND chunk
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// CRC32 table & helper
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);

  const crcPayload = Buffer.concat([typeBuf, data]);
  const crcVal = crc32(crcPayload);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crcVal, 0);

  return Buffer.concat([lenBuf, crcPayload, crcBuf]);
}

// ----------------------------------------------------
// Drawing Engine
// ----------------------------------------------------
const W = 1200;
const H = 630;
const pixels = Buffer.alloc(W * H * 4);

function setPixel(x, y, r, g, b, a = 255) {
  x = Math.round(x);
  y = Math.round(y);
  if (x < 0 || x >= W || y < 0 || y >= H) return;
  const idx = (y * W + x) * 4;
  if (a === 255) {
    pixels[idx] = r;
    pixels[idx + 1] = g;
    pixels[idx + 2] = b;
    pixels[idx + 3] = 255;
  } else {
    const alpha = a / 255;
    const bgR = pixels[idx];
    const bgG = pixels[idx + 1];
    const bgB = pixels[idx + 2];
    pixels[idx] = Math.round(r * alpha + bgR * (1 - alpha));
    pixels[idx + 1] = Math.round(g * alpha + bgG * (1 - alpha));
    pixels[idx + 2] = Math.round(b * alpha + bgB * (1 - alpha));
    pixels[idx + 3] = 255;
  }
}

function fillRect(x1, y1, w, h, r, g, b, a = 255) {
  for (let y = y1; y < y1 + h; y++) {
    for (let x = x1; x < x1 + w; x++) {
      setPixel(x, y, r, g, b, a);
    }
  }
}

function fillRoundRect(x1, y1, w, h, radius, r, g, b, a = 255) {
  for (let y = y1; y < y1 + h; y++) {
    for (let x = x1; x < x1 + w; x++) {
      const rx = Math.max(Math.abs(x - (x1 + radius)), Math.abs(x - (x1 + w - radius - 1)));
      const ry = Math.max(Math.abs(y - (y1 + radius)), Math.abs(y - (y1 + h - radius - 1)));
      const insideCorner = rx <= radius || ry <= radius || ((rx - radius) ** 2 + (ry - radius) ** 2 <= radius ** 2);
      if (insideCorner) {
        setPixel(x, y, r, g, b, a);
      }
    }
  }
}

function strokeRoundRect(x1, y1, w, h, radius, borderW, r, g, b, a = 255) {
  for (let y = y1; y < y1 + h; y++) {
    for (let x = x1; x < x1 + w; x++) {
      const isOuter = x >= x1 && x < x1 + w && y >= y1 && y < y1 + h;
      const isInner = x >= x1 + borderW && x < x1 + w - borderW && y >= y1 + borderW && y < y1 + h - borderW;
      if (isOuter && !isInner) {
        setPixel(x, y, r, g, b, a);
      }
    }
  }
}

// ----------------------------------------------------
// Simple 5x7 & 8x12 Font Rasterizer
// ----------------------------------------------------
const FONT_MAP = {
  'A': [0x1C, 0x22, 0x22, 0x3E, 0x22, 0x22, 0x22],
  'B': [0x3C, 0x22, 0x22, 0x3C, 0x22, 0x22, 0x3C],
  'C': [0x1E, 0x20, 0x20, 0x20, 0x20, 0x20, 0x1E],
  'D': [0x38, 0x24, 0x22, 0x22, 0x22, 0x24, 0x38],
  'E': [0x3E, 0x20, 0x20, 0x3C, 0x20, 0x20, 0x3E],
  'F': [0x3E, 0x20, 0x20, 0x3C, 0x20, 0x20, 0x20],
  'G': [0x1E, 0x20, 0x20, 0x2E, 0x22, 0x22, 0x1E],
  'H': [0x22, 0x22, 0x22, 0x3E, 0x22, 0x22, 0x22],
  'I': [0x1C, 0x08, 0x08, 0x08, 0x08, 0x08, 0x1C],
  'J': [0x07, 0x02, 0x02, 0x02, 0x02, 0x22, 0x1C],
  'K': [0x22, 0x24, 0x28, 0x30, 0x28, 0x24, 0x22],
  'L': [0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x3E],
  'M': [0x22, 0x36, 0x2A, 0x22, 0x22, 0x22, 0x22],
  'N': [0x22, 0x32, 0x2A, 0x26, 0x22, 0x22, 0x22],
  'O': [0x1C, 0x22, 0x22, 0x22, 0x22, 0x22, 0x1C],
  'P': [0x3C, 0x22, 0x22, 0x3C, 0x20, 0x20, 0x20],
  'Q': [0x1C, 0x22, 0x22, 0x22, 0x2A, 0x24, 0x1A],
  'R': [0x3C, 0x22, 0x22, 0x3C, 0x28, 0x24, 0x22],
  'S': [0x1E, 0x20, 0x20, 0x1C, 0x02, 0x02, 0x3C],
  'T': [0x3E, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08],
  'U': [0x22, 0x22, 0x22, 0x22, 0x22, 0x22, 0x1C],
  'V': [0x22, 0x22, 0x22, 0x22, 0x22, 0x14, 0x08],
  'W': [0x22, 0x22, 0x22, 0x22, 0x2A, 0x36, 0x22],
  'X': [0x22, 0x22, 0x14, 0x08, 0x14, 0x22, 0x22],
  'Y': [0x22, 0x22, 0x14, 0x08, 0x08, 0x08, 0x08],
  'Z': [0x3E, 0x02, 0x04, 0x08, 0x10, 0x20, 0x3E],
  'a': [0x00, 0x00, 0x1C, 0x02, 0x1E, 0x22, 0x1B],
  'b': [0x20, 0x20, 0x3C, 0x22, 0x22, 0x22, 0x3C],
  'c': [0x00, 0x00, 0x1E, 0x20, 0x20, 0x20, 0x1E],
  'd': [0x02, 0x02, 0x1E, 0x22, 0x22, 0x22, 0x1B],
  'e': [0x00, 0x00, 0x1C, 0x22, 0x3E, 0x20, 0x1E],
  'f': [0x0C, 0x12, 0x10, 0x3C, 0x10, 0x10, 0x10],
  'g': [0x00, 0x00, 0x1B, 0x22, 0x22, 0x1E, 0x02, 0x1C],
  'h': [0x20, 0x20, 0x3C, 0x22, 0x22, 0x22, 0x22],
  'i': [0x08, 0x00, 0x18, 0x08, 0x08, 0x08, 0x1C],
  'j': [0x04, 0x00, 0x0C, 0x04, 0x04, 0x04, 0x24, 0x18],
  'k': [0x20, 0x20, 0x24, 0x28, 0x30, 0x28, 0x24],
  'l': [0x18, 0x08, 0x08, 0x08, 0x08, 0x08, 0x1C],
  'm': [0x00, 0x00, 0x36, 0x2A, 0x2A, 0x22, 0x22],
  'n': [0x00, 0x00, 0x3C, 0x22, 0x22, 0x22, 0x22],
  'o': [0x00, 0x00, 0x1C, 0x22, 0x22, 0x22, 0x1C],
  'p': [0x00, 0x00, 0x3C, 0x22, 0x22, 0x3C, 0x20, 0x20],
  'q': [0x00, 0x00, 0x1E, 0x22, 0x22, 0x1E, 0x02, 0x02],
  'r': [0x00, 0x00, 0x2E, 0x30, 0x20, 0x20, 0x20],
  's': [0x00, 0x00, 0x1E, 0x20, 0x1C, 0x02, 0x3C],
  't': [0x10, 0x10, 0x3C, 0x10, 0x10, 0x12, 0x0C],
  'u': [0x00, 0x00, 0x22, 0x22, 0x22, 0x26, 0x1B],
  'v': [0x00, 0x00, 0x22, 0x22, 0x22, 0x14, 0x08],
  'w': [0x00, 0x00, 0x22, 0x22, 0x2A, 0x2A, 0x14],
  'x': [0x00, 0x00, 0x22, 0x14, 0x08, 0x14, 0x22],
  'y': [0x00, 0x00, 0x22, 0x22, 0x22, 0x1E, 0x02, 0x1C],
  'z': [0x00, 0x00, 0x3E, 0x04, 0x08, 0x10, 0x3E],
  '0': [0x1C, 0x26, 0x2A, 0x32, 0x22, 0x22, 0x1C],
  '1': [0x08, 0x18, 0x08, 0x08, 0x08, 0x08, 0x1C],
  '2': [0x1C, 0x22, 0x02, 0x0C, 0x10, 0x20, 0x3E],
  '3': [0x3E, 0x04, 0x08, 0x0C, 0x02, 0x22, 0x1C],
  '4': [0x04, 0x0C, 0x14, 0x24, 0x3E, 0x04, 0x04],
  '5': [0x3E, 0x20, 0x3C, 0x02, 0x02, 0x22, 0x1C],
  '6': [0x1C, 0x20, 0x20, 0x3C, 0x22, 0x22, 0x1C],
  '7': [0x3E, 0x02, 0x04, 0x08, 0x10, 0x10, 0x10],
  '8': [0x1C, 0x22, 0x22, 0x1C, 0x22, 0x22, 0x1C],
  '9': [0x1C, 0x22, 0x22, 0x1E, 0x02, 0x02, 0x1C],
  '.': [0x00, 0x00, 0x00, 0x00, 0x00, 0x18, 0x18],
  ',': [0x00, 0x00, 0x00, 0x00, 0x00, 0x18, 0x18, 0x10],
  '-': [0x00, 0x00, 0x00, 0x3E, 0x00, 0x00, 0x00],
  ':': [0x00, 0x18, 0x18, 0x00, 0x18, 0x18, 0x00],
  '•': [0x00, 0x00, 0x18, 0x3C, 0x3C, 0x18, 0x00],
  '&': [0x18, 0x24, 0x18, 0x35, 0x22, 0x26, 0x19],
  '★': [0x08, 0x08, 0x3E, 0x1C, 0x1C, 0x22, 0x22],
  ' ': [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
};

function drawChar(ch, startX, startY, scale, r, g, b, a = 255) {
  const glyph = FONT_MAP[ch] || FONT_MAP[' '];
  const rows = glyph.length;
  for (let row = 0; row < rows; row++) {
    const rowBits = glyph[row];
    for (let col = 0; col < 6; col++) {
      if ((rowBits >> (5 - col)) & 1) {
        fillRect(startX + col * scale, startY + row * scale, scale, scale, r, g, b, a);
      }
    }
  }
  return 7 * scale;
}

function drawText(str, x, y, scale, r, g, b, a = 255, letterSpacing = 0) {
  let curX = x;
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    const width = drawChar(ch, curX, y, scale, r, g, b, a);
    curX += width + letterSpacing;
  }
  return curX;
}

function measureText(str, scale, letterSpacing = 0) {
  return str.length * 7 * scale + (str.length - 1) * letterSpacing;
}

// ----------------------------------------------------
// Draw Cezonal OG Image
// ----------------------------------------------------
console.log('Rendering background...');

// 1. Background gradient
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    // Dark background base
    let r = 8 + (y / H) * 8;
    let g = 12 + (y / H) * 10;
    let b = 22 + (y / H) * 14;

    // Cyan glow at top-left (x: 250, y: 150)
    const distCyan = Math.hypot(x - 250, y - 150);
    if (distCyan < 550) {
      const factor = (1 - distCyan / 550) * 0.35;
      r += 56 * factor;
      g += 189 * factor;
      b += 248 * factor;
    }

    // Purple glow at bottom-right (x: 950, y: 480)
    const distPurple = Math.hypot(x - 950, y - 480);
    if (distPurple < 600) {
      const factor = (1 - distPurple / 600) * 0.4;
      r += 134 * factor;
      g += 79 * factor;
      b += 254 * factor;
    }

    setPixel(x, y, Math.min(255, r), Math.min(255, g), Math.min(255, b));
  }
}

// 2. Main Glass Card Container (padding 44px)
const CARD_X = 50;
const CARD_Y = 45;
const CARD_W = 1100;
const CARD_H = 540;
fillRoundRect(CARD_X, CARD_Y, CARD_W, CARD_H, 24, 15, 23, 42, 220); // bg-slate-900 / 85%
strokeRoundRect(CARD_X, CARD_Y, CARD_W, CARD_H, 24, 2, 56, 189, 248, 80); // cyan border

// 3. Cezonal Logo (Top Left)
const LOGO_X = 100;
const LOGO_Y = 85;

// Symbol
// Green square
fillRoundRect(LOGO_X + 42, LOGO_Y + 4, 14, 14, 3, 34, 197, 94); // #22C55E
// Blue square
fillRoundRect(LOGO_X + 28, LOGO_Y + 18, 14, 14, 3, 59, 130, 246); // #3B82F6
// C path (Sky blue #38BDF8)
fillRoundRect(LOGO_X + 4, LOGO_Y + 12, 24, 12, 3, 56, 189, 248);
fillRoundRect(LOGO_X + 4, LOGO_Y + 12, 12, 42, 3, 56, 189, 248);
fillRoundRect(LOGO_X + 4, LOGO_Y + 42, 38, 12, 3, 56, 189, 248);
fillRoundRect(LOGO_X + 30, LOGO_Y + 30, 12, 24, 3, 56, 189, 248);

// Logo Text
drawText('Cezonal', LOGO_X + 70, LOGO_Y + 6, 4, 255, 255, 255, 255, 2);
drawText('SOLUTIONS', LOGO_X + 72, LOGO_Y + 40, 2, 56, 189, 248, 255, 4);

// 4. Rating Badge (Top Right)
const BADGE_X = 840;
const BADGE_Y = 92;
fillRoundRect(BADGE_X, BADGE_Y, 260, 42, 21, 34, 197, 94, 35);
strokeRoundRect(BADGE_X, BADGE_Y, 260, 42, 21, 1, 34, 197, 94, 90);
drawText('5.0 Rated Agency', BADGE_X + 28, BADGE_Y + 13, 2, 74, 222, 128, 255, 2);

// 5. Hero Main Headline
const HEADLINE_1 = 'Empowering Businesses With';
const HEADLINE_2 = 'Scalable Web & Mobile Apps';

const h1Width = measureText(HEADLINE_1, 5, 2);
drawText(HEADLINE_1, Math.round((W - h1Width) / 2), 200, 5, 255, 255, 255, 255, 2);

const h2Width = measureText(HEADLINE_2, 5, 2);
drawText(HEADLINE_2, Math.round((W - h2Width) / 2), 255, 5, 56, 189, 248, 255, 2);

// 6. Subtitle
const SUBTITLE = 'Custom Software • iOS & Android Apps • Cloud Architecture';
const subWidth = measureText(SUBTITLE, 2, 3);
drawText(SUBTITLE, Math.round((W - subWidth) / 2), 345, 2, 148, 163, 184, 255, 3);

// 7. Divider Line
fillRect(100, 435, 1000, 1, 148, 163, 184, 40);

// 8. Bottom Feature Pills & Website
// Pill 1: Mobile Apps
fillRoundRect(100, 465, 150, 40, 10, 56, 189, 248, 30);
strokeRoundRect(100, 465, 150, 40, 10, 1, 56, 189, 248, 80);
drawText('Mobile Apps', 120, 477, 2, 56, 189, 248, 255, 1);

// Pill 2: Web Solutions
fillRoundRect(270, 465, 165, 40, 10, 134, 79, 254, 30);
strokeRoundRect(270, 465, 165, 40, 10, 1, 134, 79, 254, 80);
drawText('Web Solutions', 288, 477, 2, 167, 139, 250, 255, 1);

// Pill 3: Enterprise Software
fillRoundRect(455, 465, 210, 40, 10, 34, 197, 94, 30);
strokeRoundRect(455, 465, 210, 40, 10, 1, 34, 197, 94, 80);
drawText('Enterprise Software', 472, 477, 2, 74, 222, 128, 255, 1);

// Website Domain Text
drawText('cezonialsolutions.netlify.app', 750, 477, 2, 203, 213, 225, 255, 2);

console.log('Encoding PNG...');
const pngBuffer = createPng(W, H, pixels);

// Ensure output directories exist
const publicImagesDir = path.join(__dirname, '..', 'public', 'images');
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
}

fs.writeFileSync(path.join(publicImagesDir, 'og-image.png'), pngBuffer);
fs.writeFileSync(path.join(publicDir, 'og-image.png'), pngBuffer);
console.log('Successfully saved to public/images/og-image.png and public/og-image.png! Size:', pngBuffer.length, 'bytes');
