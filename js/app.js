/* app.js · Interfaz: render, formulario, acciones y feedback visual */
(function () {
  'use strict';

  var APP_VERSION = 'v1.1.1';
  var $ = function (s) { return document.querySelector(s); };

  var lista = $('#lista');
  var modal = $('#modal-incidencia');
  var form = $('#form-incidencia');

  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function fecha(iso) {
    return new Date(iso).toLocaleDateString('es-EC', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  function toast(msg, tipo) {
    var el = document.createElement('div');
    el.className = 'toast' + (tipo ? ' toast--' + tipo : '');
    el.textContent = msg;
    $('#toasts').appendChild(el);
    setTimeout(function () { el.remove(); }, 3200);
  }

  function tarjeta(i) {
    var resuelta = i.estado === 'Resuelta';
    return '<article class="card" data-prioridad="' + esc(i.prioridad) + '">' +
      '<div class="card__top"><span class="card__id">INC-' + String(i.id).padStart(3, '0') + '</span>' +
      '<span class="badge" data-estado="' + esc(i.estado) + '">' + esc(i.estado) + '</span></div>' +
      '<h3 class="card__title">' + esc(i.titulo) + '</h3>' +
      '<p class="card__desc">' + esc(i.descripcion) + '</p>' +
      '<div class="card__meta"><span class="chip chip--prio">Prioridad ' + esc(i.prioridad) + '</span>' +
      '<span class="chip">' + esc(i.categoria) + '</span></div>' +
      '<div class="card__foot"><span class="card__who">' + esc(i.reportante) + ' · ' + fecha(i.creada) + '</span>' +
      '<div class="card__actions">' +
      (resuelta ? '' : '<button class="btn btn--ghost btn--sm" data-accion="avanzar" data-id="' + i.id + '">Avanzar</button>') +
      '<button class="btn btn--ghost btn--danger btn--sm" data-accion="eliminar" data-id="' + i.id + '" aria-label="Eliminar">Eliminar</button>' +
      '</div></div></article>';
  }

  function render() {
    var datos = Store.listar();
    var c = Store.contar(datos);
    $('#stat-total').textContent = c.total;
    $('#stat-pendiente').textContent = c.pendiente;
    $('#stat-proceso').textContent = c.proceso;
    $('#stat-resuelta').textContent = c.resuelta;
    $('#list-summary').textContent = c.total ? c.total + ' incidencia(s) registradas.' : 'Aún no hay registros.';

    lista.innerHTML = datos.length
      ? datos.map(tarjeta).join('')
      : (c.total
        ? '<div class="empty"><div class="empty__icon">🔍</div><strong>Sin resultados</strong>No hay incidencias que coincidan con el filtro o la búsqueda.</div>'
        : '<div class="empty"><div class="empty__icon">📭</div><strong>Sin incidencias todavía</strong>Pulsa «Nueva incidencia» para registrar la primera.</div>');
  }

  /* ---------- Modal y formulario ---------- */
  function abrir() { form.reset(); limpiarErrores(); modal.showModal(); $('#titulo').focus(); }
  function cerrar() { modal.close(); }

  function limpiarErrores() {
    form.querySelectorAll('.field__error').forEach(function (e) { e.textContent = ''; });
    form.querySelectorAll('[aria-invalid]').forEach(function (e) { e.removeAttribute('aria-invalid'); });
  }

  function validar(d) {
    var errores = {};
    if (d.titulo.trim().length < 5) errores.titulo = 'El título debe tener al menos 5 caracteres.';
    if (d.descripcion.trim().length < 10) errores.descripcion = 'Describe el problema (mín. 10 caracteres).';
    if (!d.reportante.trim()) errores.reportante = 'Indica quién reporta la incidencia.';
    return errores;
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    limpiarErrores();
    var d = Object.fromEntries(new FormData(form));
    var errores = validar(d);
    var campos = Object.keys(errores);
    if (campos.length) {
      campos.forEach(function (k) {
        form.querySelector('[data-error-for="' + k + '"]').textContent = errores[k];
        form.elements[k].setAttribute('aria-invalid', 'true');
      });
      form.elements[campos[0]].focus();
      return;
    }
    var inc = Store.crear(d);
    cerrar();
    render();
    toast('Incidencia INC-' + String(inc.id).padStart(3, '0') + ' registrada');
  });

  lista.addEventListener('click', function (ev) {
    var btn = ev.target.closest('button[data-accion]');
    if (!btn) return;
    var id = Number(btn.dataset.id);
    if (btn.dataset.accion === 'avanzar') {
      var inc = Store.avanzarEstado(id);
      render();
      toast('Estado actualizado a «' + inc.estado + '»', 'info');
    } else if (btn.dataset.accion === 'eliminar') {
      if (!confirm('¿Eliminar esta incidencia?')) return;
      Store.eliminar(id);
      render();
      toast('Incidencia eliminada', 'danger');
    }
  });

  $('#filtros').addEventListener('click', function (ev) {
    var btn = ev.target.closest('.filter');
    if (!btn) return;
    filtroActual = btn.dataset.filter;
    document.querySelectorAll('.filter').forEach(function (b) {
      var activo = b === btn;
      b.classList.toggle('is-active', activo);
      b.setAttribute('aria-pressed', String(activo));
    });
    render();
  });

  $('#buscar').addEventListener('input', function (ev) { textoBusqueda = ev.target.value; render(); });

  $('#btn-nueva').addEventListener('click', abrir);
  $('#btn-cerrar').addEventListener('click', cerrar);
  $('#btn-cancelar').addEventListener('click', cerrar);
  modal.addEventListener('click', function (ev) { if (ev.target === modal) cerrar(); });

  $('#app-version').textContent = APP_VERSION;
  render();
})();
