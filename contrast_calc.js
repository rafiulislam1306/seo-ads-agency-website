function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function getLuminance(rgb) {
  var a = [rgb.r, rgb.g, rgb.b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrastRatio(hex1, hex2) {
  var rgb1 = hexToRgb(hex1);
  var rgb2 = hexToRgb(hex2);
  var l1 = getLuminance(rgb1);
  var l2 = getLuminance(rgb2);
  var brighter = Math.max(l1, l2);
  var darker = Math.min(l1, l2);
  return (brighter + 0.05) / (darker + 0.05);
}

const colorPairs = [
  { text: '#94A3B8', bg: '#1E293B', name: 'Map listing rating/meta text (#94A3B8) on map listing background (#1E293B)' },
  { text: '#FFFFFF', bg: '#1E293B', name: 'Map listing title (#FFFFFF) on map listing background (#1E293B)' },
  { text: '#9CA3AF', bg: '#0F172A', name: 'Map View label (#9CA3AF) on header background (#0F172A)' },
  { text: '#9CA3AF', bg: '#1E293B', name: '--text-secondary (#9CA3AF) on map listing background (#1E293B)' },
  { text: '#60A5FA', bg: '#1E293B', name: '--accent-indigo (#60A5FA) on map listing background (#1E293B)' },
  { text: '#10B981', bg: '#1E293B', name: '--accent-emerald (#10B981) on map listing background (#1E293B)' },
  { text: '#FFFFFF', bg: '#064E3B', name: 'Ranked-up Title/Rating text (#FFFFFF) on Dark Green background (#064E3B)' },
  { text: '#F1F5F9', bg: '#064E3B', name: 'Ranked-up Meta text (#F1F5F9) on Dark Green background (#064E3B)' },
  { text: '#064E3B', bg: '#FFFFFF', name: 'Ranked-up Rank/Action icon (#064E3B) on White background (#FFFFFF)' },
  { text: '#F9FAFB', bg: '#080C14', name: '--text-primary (#F9FAFB) on --bg-primary (#080C14)' },
  { text: '#9CA3AF', bg: '#080C14', name: '--text-secondary (#9CA3AF) on --bg-primary (#080C14)' },
  { text: '#6B7280', bg: '#080C14', name: '--text-muted (#6B7280) on --bg-primary (#080C14)' },
  { text: '#fbbf24', bg: '#1E293B', name: 'Rating stars (#fbbf24) on map listing background (#1E293B)' },
  { text: '#fbbf24', bg: '#064E3B', name: 'Rating stars (#fbbf24) on Dark Green background (#064E3B)' }
];

console.log("=== Contrast Ratio Calculations ===");
colorPairs.forEach(pair => {
  const ratio = getContrastRatio(pair.text, pair.bg);
  const status = ratio >= 4.5 ? "PASS" : (ratio >= 3.0 ? "PASS (Large text only)" : "FAIL");
  console.log(`${pair.name}:\n  Ratio: ${ratio.toFixed(2)}:1 | Status: ${status}`);
});
