const test = require('node:test');
const assert = require('node:assert');
const Store = require('../js/storage.js');

const datos = [
  { id: 1, titulo: 'Login falla', reportante: 'Ana', estado: 'Pendiente' },
  { id: 2, titulo: 'Botón guardar', reportante: 'Luis', estado: 'En proceso' },
  { id: 3, titulo: 'Texto cortado', reportante: 'Ana', estado: 'Resuelta' }
];

test('slug convierte el estado en el valor usado por los botones de filtro', () => {
  assert.strictEqual(Store.slug('Pendiente'), 'pendiente');
  assert.strictEqual(Store.slug('En proceso'), 'en-proceso');
  assert.strictEqual(Store.slug('Resuelta'), 'resuelta');
});

test('filtrar "todas" devuelve todo', () => {
  assert.strictEqual(Store.filtrar(datos, 'todas').length, 3);
});

test('filtrar por cada estado devuelve solo ese estado (Issue #1)', () => {
  assert.deepStrictEqual(Store.filtrar(datos, 'pendiente').map((i) => i.id), [1]);
  assert.deepStrictEqual(Store.filtrar(datos, 'en-proceso').map((i) => i.id), [2]);
  assert.deepStrictEqual(Store.filtrar(datos, 'resuelta').map((i) => i.id), [3]);
});

test('filtrar combina estado y texto', () => {
  assert.strictEqual(Store.filtrar(datos, 'todas', 'ana').length, 2);
  assert.strictEqual(Store.filtrar(datos, 'resuelta', 'ana').length, 1);
  assert.strictEqual(Store.filtrar(datos, 'en-proceso', 'ana').length, 0);
});

