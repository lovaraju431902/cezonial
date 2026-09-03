const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '..', 'src', 'app');
const ogPath = path.join(appDir, 'opengraph-image.tsx');
const twitterPath = path.join(appDir, 'twitter-image.tsx');

if (fs.existsSync(ogPath)) {
  fs.unlinkSync(ogPath);
  console.log('Removed opengraph-image.tsx');
}
if (fs.existsSync(twitterPath)) {
  fs.unlinkSync(twitterPath);
  console.log('Removed twitter-image.tsx');
}
console.log('Cleaned up dynamic OG routes so static public/images/og-image.png is used exclusively.');
