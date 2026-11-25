const test = require('node:test');
const assert = require('node:assert');

const catalog = [
  { id: 'liquid-glass', name: 'Liquid Glassmorphism', css: `[data-style="liquid-glass"] { background: rgba(255,255,255,var(--glass-opacity)); backdrop-filter: blur(var(--glass-blur)); border-radius: var(--glass-radius); }`, params: [{ id: 'glass-blur' }, { id: 'glass-opacity' }, { id: 'glass-radius' }] },
  { id: 'cyber-glow', name: 'Cyberpunk Neon Glow', css: `[data-style="cyber-glow"] { border: 1px solid var(--glow-color); box-shadow: 0 0 var(--glow-spread) var(--glow-color); }`, params: [{ id: 'glow-color' }, { id: 'glow-spread' }] },
  { id: 'neo-brutalist', name: 'Neo-Brutalist Raw', css: `[data-style="neo-brutalist"] { background: var(--brut-bg); border: var(--brut-border) solid #000; }`, params: [{ id: 'brut-bg' }, { id: 'brut-border' }] },
  { id: 'soft-neumorph', name: 'Soft Neumorphism', css: `[data-style="soft-neumorph"] { box-shadow: var(--neu-distance) var(--neu-distance) 16px #07070a; }`, params: [{ id: 'neu-distance' }] },
  { id: 'gradient-border', name: 'Luminous Gradient Border', css: `[data-style="gradient-border"] { background: linear-gradient(var(--grad-angle), #12121a, #08080c); }`, params: [{ id: 'grad-angle' }] },
  { id: 'tech-blueprint', name: 'Technical Blueprint', css: `[data-style="tech-blueprint"] { background-size: var(--grid-size) var(--grid-size); }`, params: [{ id: 'grid-size' }] }
];

test('CSS Validator & Linter: verify parameter CSS variables', () => {
  let passCount = 0;
  let failCount = 0;
  const results = [];

  catalog.forEach(style => {
    let stylePass = true;
    style.params.forEach(param => {
      const expectedVar = `--${param.id}`;
      if (!style.css.includes(expectedVar)) {
        stylePass = false;
      }
    });

    if (stylePass) {
      passCount++;
      results.push({ name: style.name, status: 'PASS' });
    } else {
      failCount++;
      results.push({ name: style.name, status: 'FAIL' });
    }
  });

  console.table(results);
  assert.strictEqual(failCount, 0, 'All catalog styles must pass CSS variable validation.');
});
