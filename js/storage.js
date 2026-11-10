/* storage.js · Capa de datos (localStorage) y lógica pura, sin dependencias del DOM */
(function (root) {
  'use strict';

  var KEY = 'incidencias.registro';
  var ESTADOS = ['Pendiente', 'En proceso', 'Resuelta'];

  function memoryStore() {
    var m = {};
    return { getItem: function (k) { return k in m ? m[k] : null; }, setItem: function (k, v) { m[k] = String(v); } };
  }
  var storage = (function () {
    try { return root.localStorage || memoryStore(); } catch (e) { return memoryStore(); }
  })();

  function listar() {
    try { return JSON.parse(storage.getItem(KEY)) || []; } catch (e) { return []; }
  }
  function guardar(lista) { storage.setItem(KEY, JSON.stringify(lista)); }

  function crear(datos) {
    var lista = listar();
    var siguiente = lista.reduce(function (max, i) { return Math.max(max, i.id); }, 0) + 1;
    var inc = {
      id: siguiente,
      titulo: datos.titulo.trim(),
      descripcion: datos.descripcion.trim(),
      reportante: datos.reportante.trim(),
      categoria: datos.categoria || 'Error',
      prioridad: datos.prioridad || 'Media',
      estado: 'Pendiente',
      creada: new Date().toISOString()
    };
    lista.unshift(inc);
    guardar(lista);
    return inc;
  }

  function avanzarEstado(id) {
    var lista = listar();
    var inc = lista.filter(function (i) { return i.id === id; })[0];
    if (!inc) return null;
    var idx = ESTADOS.indexOf(inc.estado);
    inc.estado = ESTADOS[Math.min(idx + 1, ESTADOS.length - 1)];
    guardar(lista);
    return inc;
  }

  function eliminar(id) {
    guardar(listar().filter(function (i) { return i.id !== id; }));
  }

  function contar(lista) {
    return {
      total: lista.length,
      pendiente: lista.filter(function (i) { return i.estado === 'Pendiente'; }).length,
      proceso: lista.filter(function (i) { return i.estado === 'En proceso'; }).length,
      resuelta: lista.filter(function (i) { return i.estado === 'Resuelta'; }).length
    };
  }

  /* v1.1.0 · Filtrado por estado y texto */
  function slug(estado) { return estado.toLowerCase().replace(/\s+/g, '-'); }

  function filtrar(lista, filtro, texto) {
    var q = (texto || '').trim().toLowerCase();
    return lista.filter(function (i) {
      var porEstado = !filtro || filtro === 'todas' || slug(i.estado) === filtro;
      var porTexto = !q || i.titulo.toLowerCase().indexOf(q) !== -1 || i.reportante.toLowerCase().indexOf(q) !== -1;
      return porEstado && porTexto;
    });
  }

  var Store = { ESTADOS: ESTADOS, listar: listar, crear: crear, avanzarEstado: avanzarEstado, eliminar: eliminar, contar: contar, slug: slug, filtrar: filtrar };

  if (typeof module !== 'undefined' && module.exports) module.exports = Store;
  else root.Store = Store;
})(typeof window !== 'undefined' ? window : globalThis);
