import fs from 'fs';
import path from 'path';

// Load catalog
import { REAL_STYLES_CATALOG } from '../src/library/catalog.js';

// Helper to normalize CSS (strip colors, numbers, whitespace)
function normalizeCss(css) {
  if (!css) return '';
  return css
    .replace(/#([0-9a-fA-F]{3,8})/g, 'COLOR')
    .replace(/rgba?\([^)]+\)/g, 'COLOR')
    .replace(/\b\d+(\.\d+)?(px|rem|em|deg|ms|s)?\b/g, 'NUM')
    .replace(/\s+/g, ' ')
    .trim();
}

const auditData = REAL_STYLES_CATALOG.map(item => {
  const normalized = normalizeCss(item.css);
  return {
    id: item.id,
    name: item.name,
    group: item.group,
    technique: item.technique || 'backdrop-filter', // default or custom
    normalizedCss: normalized,
    rawCss: item.css
  };
});

// Cluster by normalized CSS similarity or technique
const clusters = {};
auditData.forEach(item => {
  const key = item.normalizedCss.slice(0, 40) || 'default';
  if (!clusters[key]) {
    clusters[key] = [];
  }
  clusters[key].push(item);
});

console.log('=== CSS STYLE AUDIT & CLUSTER REPORT ===');
let clusterId = 1;
const clusterTable = [];

Object.entries(clusters).forEach(([key, members]) => {
  const cId = `CLUSTER-${clusterId++}`;
  const memberNames = members.map(m => m.name).join(', ');
  const sharedTechnique = members[0].technique;
  clusterTable.push({
    clusterId: cId,
    members: memberNames,
    sharedTechnique,
    count: members.length
  });
});

console.table(clusterTable);
console.log(`Total styles: ${auditData.length}, Unique clusters: ${Object.keys(clusters).length}`);

// Dump to JSON
fs.writeFileSync('styles-audit-report.json', JSON.stringify({ clusterTable, auditData }, null, 2));
console.log('Audit JSON dumped to styles-audit-report.json successfully.');
