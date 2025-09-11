export function renderMap({ countries, onCountryClick, getFillClass }) {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  // Crop top/bottom by shifting Y and reducing height for a more compact look
  svg.setAttribute('viewBox', '0 30 720 300');
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  svg.setAttribute('class', 'map-svg');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'Simplified world map');

  // Ocean background
  const bg = document.createElementNS(svgNS, 'rect');
  bg.setAttribute('x', '0'); bg.setAttribute('y', '0');
  bg.setAttribute('width', '720'); bg.setAttribute('height', '360');
  bg.setAttribute('fill', '#0b1220');
  svg.appendChild(bg);

  // Lightweight continent outlines (very simplified, aligned to 720x360 equirectangular viewBox)
  // These shapes are intentionally coarse but provide a better geographic cue than rectangles.
  const landGroup = document.createElementNS(svgNS, 'g');
  landGroup.setAttribute('fill', '#94a3b8');
  landGroup.setAttribute('opacity', '0.16');
  landGroup.setAttribute('pointer-events', 'none');

  const continents = [
  // North America (expanded north and inland)
  'M60,60 L110,50 L160,58 L205,70 L245,85 L260,95 L240,110 L215,118 L198,132 L180,150 L155,162 L130,178 L115,190 L100,205 L85,198 L75,175 Z',
    // South America
    'M240,195 L260,200 L280,215 L300,235 L295,260 L285,285 L275,310 L260,330 L245,320 L250,295 L245,275 L235,255 L230,230 Z',
    // Europe
  'M345,98 L370,92 L400,96 L420,105 L435,115 L435,130 L412,140 L392,142 L372,136 L350,122 Z',
    // Africa
    'M410,155 L435,150 L465,155 L485,170 L495,190 L490,215 L480,240 L470,265 L455,285 L440,290 L430,265 L425,245 L420,225 L410,200 Z',
    // Middle East + West Asia (very rough)
    'M450,140 L485,140 L510,145 L515,160 L505,175 L490,175 L470,165 L455,155 Z',
    // Asia
  'M430,85 L470,80 L520,85 L565,95 L600,110 L625,125 L650,140 L665,155 L665,170 L640,178 L600,172 L570,166 L545,160 L520,155 L500,150 L470,140 L445,120 Z',
    // Southeast Asia archipelago (blocky hint)
    'M545,205 L570,205 L590,210 L585,220 L560,220 L545,215 Z',
    // Japan
    'M640,150 L650,155 L650,170 L640,175 Z',
    // Australia
    'M600,255 L635,255 L675,265 L680,285 L650,300 L615,300 L600,285 Z'
  ];

  for (const d of continents) {
    const p = document.createElementNS(svgNS, 'path');
    p.setAttribute('d', d);
    landGroup.appendChild(p);
  }
  svg.appendChild(landGroup);

  countries.forEach(c => {
    const p = document.createElementNS(svgNS, 'path');
    p.setAttribute('d', c.path);
    p.setAttribute('tabindex', '0');
    p.setAttribute('data-id', c.id);
    p.setAttribute('class', `country ${getFillClass ? getFillClass(c.id) : ''}`);
    p.addEventListener('click', () => onCountryClick && onCountryClick(c.id));
    p.addEventListener('keypress', (e) => { if (e.key === 'Enter' || e.key === ' ') onCountryClick && onCountryClick(c.id); });
    svg.appendChild(p);
  });

  return svg;
}
