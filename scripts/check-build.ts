// Checks the production build in dist/ for the installed app (PWA):
//
//   npm run check:build   (builds first, then runs this script)
//
// The manifest must carry the agreed name, short name, display and icons, and
// the service worker must precache the app shell and the Exercise data, but no GIF.

import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const read = (file: string) => readFileSync(path.join(dist, file), 'utf8')

type ManifestIcon = { src: string; sizes: string; type: string; purpose?: string }
type Manifest = Record<string, unknown> & { icons: ManifestIcon[] }

// The manifest
assert.ok(
  existsSync(path.join(dist, 'manifest.webmanifest')),
  'dist/manifest.webmanifest is missing',
)
const manifest = JSON.parse(read('manifest.webmanifest')) as Manifest
assert.equal(manifest.name, 'Home Workout')
assert.equal(manifest.short_name, 'Workout')
assert.equal(manifest.display, 'standalone')
assert.equal(manifest.orientation, undefined, 'the manifest must not lock the orientation')
for (const colour of ['theme_color', 'background_color']) {
  assert.match(String(manifest[colour]), /^#[0-9a-f]{6}$/i, `${colour} must be a hex colour`)
}
const hasIcon = (sizes: string, purpose?: string) =>
  manifest.icons.some((icon) => icon.sizes === sizes && icon.purpose === purpose)
assert.ok(hasIcon('192x192'), 'the manifest needs a 192x192 icon')
assert.ok(hasIcon('512x512'), 'the manifest needs a 512x512 icon')
assert.ok(hasIcon('512x512', 'maskable'), 'the manifest needs a 512x512 maskable icon')
for (const icon of manifest.icons) {
  assert.ok(existsSync(path.join(dist, icon.src)), `icon ${icon.src} is not in the build`)
}

// The page links the manifest, the Apple touch icon and the service worker registration
const html = read('index.html')
assert.match(html, /<link rel="manifest" href="\/manifest\.webmanifest">/)
const appleIcon = html.match(/<link rel="apple-touch-icon" href="\/([^"]+)"/)?.[1]
assert.ok(appleIcon && existsSync(path.join(dist, appleIcon)), 'the Apple touch icon is missing')
assert.match(html, /registerSW\.js/, 'index.html does not register the service worker')

// The service worker
assert.ok(existsSync(path.join(dist, 'sw.js')), 'dist/sw.js is missing')
const sw = read('sw.js')
const precached = [...sw.matchAll(/\{url:"([^"]+)",revision:/g)].map((match) => match[1])
const assetsOfType = (extension: string) =>
  readdirSync(path.join(dist, 'assets')).filter((file) => file.endsWith(extension))

assert.ok(precached.includes('index.html'), 'index.html is not precached')
for (const extension of ['.js', '.css', '.woff2']) {
  const assets = assetsOfType(extension)
  assert.ok(assets.length > 0, `the build has no ${extension} assets`)
  for (const asset of assets) {
    assert.ok(precached.includes(`assets/${asset}`), `assets/${asset} is not precached`)
  }
}
assert.ok(!precached.some((url) => url.endsWith('.gif')), 'GIFs must not be precached')

// The Exercise data is bundled into the scripts: one precached script must hold it.
const records = JSON.parse(
  readFileSync(path.join(root, 'src/library/exercisedb/exercises.json'), 'utf8'),
) as { exerciseId: string }[]
const scripts = assetsOfType('.js').map((file) => read(`assets/${file}`))
for (const { exerciseId } of records) {
  assert.ok(
    scripts.some((script) => script.includes(`"${exerciseId}"`)),
    `Exercise ${exerciseId} is not in any precached script`,
  )
}

assert.match(sw, /NavigationRoute/, 'SPA routes need a navigation fallback offline')
assert.match(sw, /CacheFirst\(\{cacheName:"exercise-gifs"/, 'GIFs must be cached cache-first')
assert.doesNotMatch(sw, /clientsClaim\(\)/, 'a new service worker must not claim open pages')
// Workbox keeps a SKIP_WAITING message listener, which nothing in the app sends.
const skipWaitingListener = /"SKIP_WAITING"===\w+\.data\.type&&self\.skipWaiting\(\)/
assert.doesNotMatch(
  sw.replace(skipWaitingListener, ''),
  /skipWaiting\(\)/,
  'a new service worker must wait for the next open',
)

console.log(
  `Build check passed: manifest "${manifest.name}", ${precached.length} precached files, ${records.length} Exercises.`,
)
