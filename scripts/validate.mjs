// Validación previa al despliegue. Sin dependencias: solo Node.js >= 18.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

let fallos = 0;
const ok = (m) => console.log('  ✔ ' + m);
const ko = (m) => { console.error('  ✖ ' + m); fallos++; };

console.log('1) Estructura de archivos');
['index.html', 'css/base.css', 'css/components.css', 'js/storage.js', 'js/app.js', 'README.md', 'CHANGELOG.md', 'package.json']
  .forEach((f) => (existsSync(f) ? ok(f) : ko('Falta ' + f)));

console.log('2) Referencias del HTML');
const html = readFileSync('index.html', 'utf8');
[...html.matchAll(/(?:src|href)="((?:css|js)\/[^"]+)"/g)].forEach(([, ruta]) =>
  existsSync(ruta) ? ok('Referencia válida: ' + ruta) : ko('Referencia rota: ' + ruta));

console.log('3) Sintaxis JavaScript');
for (const f of readdirSync('js').filter((n) => n.endsWith('.js'))) {
  const r = spawnSync(process.execPath, ['--check', 'js/' + f]);
  r.status === 0 ? ok('js/' + f) : ko('Error de sintaxis en js/' + f + '\n' + r.stderr);
}

console.log('4) Coherencia de versión');
const pkg = JSON.parse(readFileSync('package.json', 'utf8')).version;
const app = (readFileSync('js/app.js', 'utf8').match(/APP_VERSION = 'v([^']+)'/) || [])[1];
const log = (readFileSync('CHANGELOG.md', 'utf8').match(/^## \[(\d+\.\d+\.\d+)\]/m) || [])[1];
console.log(`     package.json=${pkg} · app.js=${app} · CHANGELOG=${log}`);
pkg && pkg === app && pkg === log ? ok('Versión coherente: v' + pkg) : ko('Las versiones no coinciden');

console.log('5) Pruebas unitarias');
const pruebas = existsSync('tests') ? readdirSync('tests').filter((n) => n.endsWith('.test.js')).map((n) => 'tests/' + n) : [];
if (pruebas.length) {
  const r = spawnSync(process.execPath, ['--test', ...pruebas], { stdio: 'inherit' });
  r.status === 0 ? ok('Pruebas superadas') : ko('Pruebas fallidas');
} else ok('Sin pruebas definidas todavía');

if (fallos) { console.error(`\nValidación FALLIDA (${fallos} problema/s)`); process.exit(1); }
console.log('\nValidación correcta ✔');
