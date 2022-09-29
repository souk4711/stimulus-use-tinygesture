import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

import { version } from './package.json'
const banner = `/*\nStimulusUseTinyGesture ${version}\n*/`

export default [
  {
    external: ['@hotwired/stimulus', 'tinygesture'],
    input: 'src/index.ts',
    output: [
      {
        name: 'StimulusUseTinyGesture',
        file: 'dist/index.umd.js',
        format: 'umd',
        banner,
        globals: {
          '@hotwired/stimulus': 'Stimulus',
          tinygesture: 'TinyGesture'
        }
      },
      {
        file: 'dist/index.js',
        format: 'es',
        banner
      }
    ],
    plugins: [resolve(), typescript()],
    watch: {
      include: 'src/**'
    }
  }
]
