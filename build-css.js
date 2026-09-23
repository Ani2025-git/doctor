const path = require('path');

process.argv = [
  process.argv[0],
  'tailwindcss',
  '-i', path.resolve(__dirname, 'css/input.css'),
  '-o', path.resolve(__dirname, 'css/tailwind.min.css'),
  '--minify'
];

require('./node_modules/tailwindcss/lib/cli.js');
