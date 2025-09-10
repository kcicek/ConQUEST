// Simplified set of major countries with approximate SVG paths.
// Shapes are rough abstractions for educational gameplay.

export const majorCountries = [
  {
    id: 'usa', name: 'United States', capital: 'Washington, D.C.', flag: '🇺🇸', flagCode: 'us', isMajor: true,
    path: 'M120,120 h90 v30 h-20 v20 h-40 v-10 h-30 z'
  },
  {
    id: 'can', name: 'Canada', capital: 'Ottawa', flag: '🇨🇦', flagCode: 'ca', isMajor: true,
    path: 'M110,80 h110 v30 h-110 z'
  },
  {
    id: 'mex', name: 'Mexico', capital: 'Mexico City', flag: '🇲🇽', flagCode: 'mx', isMajor: true,
    path: 'M140,170 h40 v20 h-20 v10 h-20 z'
  },
  {
    id: 'bra', name: 'Brazil', capital: 'Brasília', flag: '🇧🇷', flagCode: 'br', isMajor: true,
    path: 'M240,220 h40 v20 h-10 v20 h-30 z'
  },
  {
    id: 'arg', name: 'Argentina', capital: 'Buenos Aires', flag: '🇦🇷', flagCode: 'ar', isMajor: true,
    path: 'M250,270 h20 v30 h-20 z'
  },
  {
    id: 'uk', name: 'United Kingdom', capital: 'London', flag: '🇬🇧', flagCode: 'gb', isMajor: true,
    path: 'M380,115 h10 v10 h-10 z'
  },
  {
    id: 'fra', name: 'France', capital: 'Paris', flag: '🇫🇷', flagCode: 'fr', isMajor: true,
    path: 'M390,130 h20 v15 h-20 z'
  },
  {
    id: 'deu', name: 'Germany', capital: 'Berlin', flag: '🇩🇪', flagCode: 'de', isMajor: true,
    path: 'M410,120 h18 v16 h-18 z'
  },
  {
    id: 'esp', name: 'Spain', capital: 'Madrid', flag: '🇪🇸', flagCode: 'es', isMajor: true,
    path: 'M375,145 h25 v12 h-25 z'
  },
  {
    id: 'ita', name: 'Italy', capital: 'Rome', flag: '🇮🇹', flagCode: 'it', isMajor: true,
    path: 'M420,145 h10 v20 h-10 z'
  },
  {
    id: 'rus', name: 'Russia', capital: 'Moscow', flag: '🇷🇺', flagCode: 'ru', isMajor: true,
    path: 'M420,80 h150 v30 h-150 z'
  },
  {
    id: 'tur', name: 'Turkey', capital: 'Ankara', flag: '🇹🇷', flagCode: 'tr', isMajor: true,
    path: 'M440,150 h40 v12 h-40 z'
  },
  {
    id: 'egy', name: 'Egypt', capital: 'Cairo', flag: '🇪🇬', flagCode: 'eg', isMajor: true,
    path: 'M450,180 h25 v18 h-25 z'
  },
  {
    id: 'zaf', name: 'South Africa', capital: 'Pretoria', flag: '🇿🇦', flagCode: 'za', isMajor: true,
    path: 'M470,270 h30 v20 h-30 z'
  },
  {
    id: 'nga', name: 'Nigeria', capital: 'Abuja', flag: '🇳🇬', flagCode: 'ng', isMajor: true,
    path: 'M430,210 h25 v18 h-25 z'
  },
  {
    id: 'ind', name: 'India', capital: 'New Delhi', flag: '🇮🇳', flagCode: 'in', isMajor: true,
    path: 'M520,180 h40 v25 h-40 z'
  },
  {
    id: 'chn', name: 'China', capital: 'Beijing', flag: '🇨🇳', flagCode: 'cn', isMajor: true,
    path: 'M560,150 h70 v30 h-70 z'
  },
  {
    id: 'jpn', name: 'Japan', capital: 'Tokyo', flag: '🇯🇵', flagCode: 'jp', isMajor: true,
    path: 'M645,160 h12 v18 h-12 z'
  },
  {
    id: 'aus', name: 'Australia', capital: 'Canberra', flag: '🇦🇺', flagCode: 'au', isMajor: true,
    path: 'M620,260 h60 v25 h-60 z'
  },
  {
    id: 'idn', name: 'Indonesia', capital: 'Jakarta', flag: '🇮🇩', flagCode: 'id', isMajor: true,
    path: 'M560,230 h45 v10 h-45 z'
  },
  {
    id: 'sau', name: 'Saudi Arabia', capital: 'Riyadh', flag: '🇸🇦', flagCode: 'sa', isMajor: true,
    path: 'M480,180 h28 v18 h-28 z'
  },
  {
    id: 'irn', name: 'Iran', capital: 'Tehran', flag: '🇮🇷', flagCode: 'ir', isMajor: true,
    path: 'M500,165 h30 v18 h-30 z'
  },
  {
    id: 'kor', name: 'South Korea', capital: 'Seoul', flag: '🇰🇷', flagCode: 'kr', isMajor: true,
    path: 'M635,155 h8 v12 h-8 z'
  },
  {
    id: 'pak', name: 'Pakistan', capital: 'Islamabad', flag: '🇵🇰', flagCode: 'pk', isMajor: true,
    path: 'M510,175 h20 v15 h-20 z'
  },
  {
    id: 'ukr', name: 'Ukraine', capital: 'Kyiv', flag: '🇺🇦', flagCode: 'ua', isMajor: true,
    path: 'M440,110 h28 v16 h-28 z'
  },
  // Additional Europe
  {
    id: 'prt', name: 'Portugal', capital: 'Lisbon', flag: '🇵🇹', flagCode: 'pt', isMajor: true,
    path: 'M365,147 h8 v12 h-8 z'
  },
  {
    id: 'bel', name: 'Belgium', capital: 'Brussels', flag: '🇧🇪', flagCode: 'be', isMajor: true,
    path: 'M405,125 h8 v10 h-8 z'
  },
  {
    id: 'nld', name: 'Netherlands', capital: 'Amsterdam', flag: '🇳🇱', flagCode: 'nl', isMajor: true,
    path: 'M405,115 h10 v8 h-10 z'
  },
  {
    id: 'pol', name: 'Poland', capital: 'Warsaw', flag: '🇵🇱', flagCode: 'pl', isMajor: true,
    path: 'M430,115 h20 v12 h-20 z'
  },
  {
    id: 'swe', name: 'Sweden', capital: 'Stockholm', flag: '🇸🇪', flagCode: 'se', isMajor: true,
    path: 'M405,95 h16 v14 h-16 z'
  },
  {
    id: 'nor', name: 'Norway', capital: 'Oslo', flag: '🇳🇴', flagCode: 'no', isMajor: true,
    path: 'M390,95 h14 v14 h-14 z'
  },
  {
    id: 'rou', name: 'Romania', capital: 'Bucharest', flag: '🇷🇴', flagCode: 'ro', isMajor: true,
    path: 'M435,135 h18 v12 h-18 z'
  },
  {
    id: 'grc', name: 'Greece', capital: 'Athens', flag: '🇬🇷', flagCode: 'gr', isMajor: true,
    path: 'M430,160 h14 v10 h-14 z'
  },
  // North Africa & Africa
  {
    id: 'mar', name: 'Morocco', capital: 'Rabat', flag: '🇲🇦', flagCode: 'ma', isMajor: true,
    path: 'M400,170 h18 v12 h-18 z'
  },
  {
    id: 'dza', name: 'Algeria', capital: 'Algiers', flag: '🇩🇿', flagCode: 'dz', isMajor: true,
    path: 'M420,180 h28 v18 h-28 z'
  },
  {
    id: 'eth', name: 'Ethiopia', capital: 'Addis Ababa', flag: '🇪🇹', flagCode: 'et', isMajor: true,
    path: 'M470,210 h18 v14 h-18 z'
  },
  {
    id: 'ken', name: 'Kenya', capital: 'Nairobi', flag: '🇰🇪', flagCode: 'ke', isMajor: true,
    path: 'M485,220 h16 v12 h-16 z'
  },
  {
    id: 'cod', name: 'DR Congo', capital: 'Kinshasa', flag: '🇨🇩', flagCode: 'cd', isMajor: true,
    path: 'M460,230 h24 v18 h-24 z'
  },
  {
    id: 'tza', name: 'Tanzania', capital: 'Dodoma', flag: '🇹🇿', flagCode: 'tz', isMajor: true,
    path: 'M480,235 h18 v16 h-18 z'
  },
  {
    id: 'mar2', name: 'Tunisia', capital: 'Tunis', flag: '🇹🇳', flagCode: 'tn', isMajor: true,
    path: 'M430,175 h10 v10 h-10 z'
  },
  // Americas
  {
    id: 'col', name: 'Colombia', capital: 'Bogotá', flag: '🇨🇴', flagCode: 'co', isMajor: true,
    path: 'M230,200 h18 v14 h-18 z'
  },
  {
    id: 'ven', name: 'Venezuela', capital: 'Caracas', flag: '🇻🇪', flagCode: 've', isMajor: true,
    path: 'M248,198 h20 v12 h-20 z'
  },
  {
    id: 'per', name: 'Peru', capital: 'Lima', flag: '🇵🇪', flagCode: 'pe', isMajor: true,
    path: 'M240,240 h18 v22 h-18 z'
  },
  {
    id: 'chl', name: 'Chile', capital: 'Santiago', flag: '🇨🇱', flagCode: 'cl', isMajor: true,
    path: 'M235,265 h10 v35 h-10 z'
  },
  {
    id: 'bol', name: 'Bolivia', capital: 'Sucre', flag: '🇧🇴', flagCode: 'bo', isMajor: true,
    path: 'M258,240 h16 v16 h-16 z'
  },
  {
    id: 'arg2', name: 'Uruguay', capital: 'Montevideo', flag: '🇺🇾', flagCode: 'uy', isMajor: true,
    path: 'M265,285 h12 v10 h-12 z'
  },
  // Middle East & Central Asia
  {
    id: 'irq', name: 'Iraq', capital: 'Baghdad', flag: '🇮🇶', flagCode: 'iq', isMajor: true,
    path: 'M490,160 h16 v12 h-16 z'
  },
  {
    id: 'isr', name: 'Israel', capital: 'Jerusalem', flag: '🇮🇱', flagCode: 'il', isMajor: true,
    path: 'M470,170 h6 v10 h-6 z'
  },
  {
    id: 'kaz', name: 'Kazakhstan', capital: 'Astana', flag: '🇰🇿', flagCode: 'kz', isMajor: true,
    path: 'M500,130 h40 v16 h-40 z'
  },
  {
    id: 'mng', name: 'Mongolia', capital: 'Ulaanbaatar', flag: '🇲🇳', flagCode: 'mn', isMajor: true,
    path: 'M560,130 h30 v14 h-30 z'
  },
  // South & Southeast Asia
  {
    id: 'bgd', name: 'Bangladesh', capital: 'Dhaka', flag: '🇧🇩', flagCode: 'bd', isMajor: true,
    path: 'M545,190 h10 v8 h-10 z'
  },
  {
    id: 'tha', name: 'Thailand', capital: 'Bangkok', flag: '🇹🇭', flagCode: 'th', isMajor: true,
    path: 'M550,200 h12 v12 h-12 z'
  },
  {
    id: 'vnm', name: 'Vietnam', capital: 'Hanoi', flag: '🇻🇳', flagCode: 'vn', isMajor: true,
    path: 'M565,200 h10 v16 h-10 z'
  },
  {
    id: 'phl', name: 'Philippines', capital: 'Manila', flag: '🇵🇭', flagCode: 'ph', isMajor: true,
    path: 'M590,200 h10 v16 h-10 z'
  },
  {
    id: 'mys', name: 'Malaysia', capital: 'Kuala Lumpur', flag: '🇲🇾', flagCode: 'my', isMajor: true,
    path: 'M555,215 h14 v10 h-14 z'
  },
  {
    id: 'mmr', name: 'Myanmar', capital: 'Naypyidaw', flag: '🇲🇲', flagCode: 'mm', isMajor: true,
    path: 'M540,190 h12 v14 h-12 z'
  },
  // Oceania
  {
    id: 'nzl', name: 'New Zealand', capital: 'Wellington', flag: '🇳🇿', flagCode: 'nz', isMajor: true,
    path: 'M690,285 h12 v18 h-12 z'
  },
];
