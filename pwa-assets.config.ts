// Generates the app's icons from public/icon.svg: `npm run generate-pwa-assets`.
// The PNGs and favicon.ico it writes next to the SVG are committed.
import { defineConfig, type Preset } from '@vite-pwa/assets-generator/config'

// The app's primary colour (oklch(0.205 0 0) in src/index.css): the icon's own
// background, also used to fill the padding around the maskable and Apple icons.
const iconColour = '#171717'

const preset: Preset = {
  transparent: {
    sizes: [64, 192, 512],
    favicons: [[48, 'favicon.ico']],
    padding: 0,
  },
  maskable: {
    // Android crops a maskable icon to a circle 80% of its width; the padding
    // keeps the dumbbell well inside that safe zone.
    sizes: [512],
    padding: 0.3,
    resizeOptions: { background: iconColour },
  },
  apple: {
    // iOS rounds the corners itself and shows no transparency.
    sizes: [180],
    padding: 0.2,
    resizeOptions: { background: iconColour },
  },
}

export default defineConfig({
  headLinkOptions: { preset: '2023' },
  preset,
  images: ['public/icon.svg'],
})
