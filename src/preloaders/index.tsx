import { PreloaderModule } from './types';
import { ChromaBloomPreloader } from './ChromaBloomPreloader';
import { InkTypePreloader } from './InkTypePreloader';
import { PixelAssemblePreloader } from './PixelAssemblePreloader';

export const PRELOADER_MODULES: PreloaderModule[] = [
  {
    id: 'chroma-bloom',
    name: 'Chroma Bloom (Default)',
    durationMs: 3500,
    tokens: ['--bloom-core', '--bloom-glow'],
    component: ChromaBloomPreloader
  },
  {
    id: 'ink-type',
    name: 'Ink Type Fill',
    durationMs: 3200,
    tokens: ['--ink-fill'],
    component: InkTypePreloader
  },
  {
    id: 'pixel-assemble',
    name: 'Pixel Assemble Grid',
    durationMs: 3000,
    tokens: ['--pixel-accent'],
    component: PixelAssemblePreloader
  }
];

export { ChromaBloomPreloader, InkTypePreloader, PixelAssemblePreloader };
