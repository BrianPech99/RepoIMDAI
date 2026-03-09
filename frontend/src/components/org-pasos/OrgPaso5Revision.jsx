export default function OrgPaso5Revision({ datos, actualizar }) {

  // ── Sección de Cambios ─────────────────────────────────────────────────────
  const agregarCambio = () =>
    actualizar({ cambios: [...(datos.cambios || []), { revision_anterior: '', revision_actual: '', razon: '', fecha: '' }] })
  const actualizarCambio = (i, campo, val) => {
    const c = [...datos.cambios]; c[i] = { ...c[i], [campo]: val }; actualizar({ cambios: c })
  }
  const eliminarCambio = (i) =>
    actualizar({ cambios: datos.cambios.filter((_, idx) => idx !== i) })

  const resumenItem = (label, val) => (
    <div style={{
      padding: '12px 16px', background: '#fdf8f9',
      borderRadius: '9px', border: '1px solid #f5e8ea'
    }}>
      <div style={{ fontSize: '.68rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#c9a0a8', fontWeight: '600', marginBottom: '3px' }}>{label}</div>
      <div style={{ fontSize: '.84rem', fontWeight: '600', color: '#1a0a0f' }}>{val || '—'}</div>
    </div>
  )

  const badge = (count, label, color) => (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '16px', borderRadius: '10px',
      background: color + '15', border: `1.5px solid ${color}40`
    }}>
      <div style={{ fontSize: '1.6rem', fontWeight: '700', color }}>{count}</div>
      <div style={{ fontSize: '.7rem', color: '#7a3a4a', textAlign: 'center', marginTop: '2px' }}>{label}</div>
    </div>
  )

  return (
    <div className="paso-container">
      <h3 className="paso-titulo">Revisión Final</h3>
      <p className="paso-sub">Verifica la información antes de guardar. El manual quedará en estado Borrador.</p>

      {/* Resumen de datos generales */}
      <div style={{
        marginBottom: '20px', padding: '16px 18px',
        background: 'white', borderRadius: '12px',
        border: '1.5px solid rgba(225,29,72,.08)',
        boxShadow: '0 2px 10px rgba(190,18,60,.04)'
      }}>
        <div style={{ fontSize: '.75rem', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', color: '#be123c', marginBottom: '14px' }}>
          📋 Datos Generales
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {resumenItem('Código del Manual', datos.codigo)}
          {resumenItem('Dependencia', datos.dependencia)}
          {resumenItem('Versión', datos.version)}
          {resumenItem('Fecha de Elaboración', datos.fecha_elaboracion)}
          {resumenItem('Elaboró', datos.elaboro_nombre ? `${datos.elaboro_nombre} — ${datos.elaboro_cargo}` : '')}
          {resumenItem('Autorizó', datos.autorizo_nombre ? `${datos.autorizo_nombre} — ${datos.autorizo_cargo}` : '')}
        </div>
      </div>

      {/* Indicadores de contenido */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginBottom: '20px'
      }}>
        {badge(datos.marco_normativo.length, 'Normas', '#3b82f6')}
        {badge(datos.principios.length + datos.valores.length, 'Principios y Valores', '#8b5cf6')}
        {badge(datos.politicas_operacion.length, 'Políticas de Operación', '#f59e0b')}
        {badge(datos.inventario_puestos.length, 'Puestos en Inventario', '#10b981')}
        {badge(datos.puestos.length, 'Puestos Descritos', '#e11d48')}
      </div>

      {/* Verificación del organigrama */}
      <div style={{
        marginBottom: '20px', padding: '14px 18px',
        borderRadius: '10px',
        background: datos.organigrama_general ? '#f0fdf4' : '#fff7ed',
        border: `1px solid ${datos.organigrama_general ? '#bbf7d0' : '#fed7aa'}`
      }}>
        <div style={{ fontSize: '.78rem', color: datos.organigrama_general ? '#14532d' : '#9a3412' }}>
          {datos.organigrama_general
            ? `✓ Organigrama general cargado: ${datos.organigrama_general.name}`
            : '⚠️ No se ha cargado el organigrama general. Puedes hacerlo en el Paso 3.'}
        </div>
        {datos.organigramas_especificos.length > 0 && (
          <div style={{ fontSize: '.75rem', color: '#14532d', marginTop: '4px' }}>
            ✓ {datos.organigramas_especificos.length} organigrama(s) específico(s) cargado(s).
          </div>
        )}
      </div>

      {/* 4.5 Sección de Cambios */}
      <div style={{
        padding: '16px 18px', background: 'white', borderRadius: '12px',
        border: '1.5px solid rgba(225,29,72,.08)', boxShadow: '0 2px 10px rgba(190,18,60,.04)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <div style={{ fontSize: '.75rem', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', color: '#be123c' }}>
              4.5 Sección de Cambios
            </div>
            <div style={{ fontSize: '.73rem', color: '#a78a8f', marginTop: '2px' }}>
              Versiones anteriores y razones de modificación del documento.
            </div>
          </div>
          <button className="btn-agregar" onClick={agregarCambio}>+ Agregar Cambio</button>
        </div>

        {(!datos.cambios || datos.cambios.length === 0) ? (
          <p className="campo-vacio">Sin cambios registrados. Para una versión inicial, no es obligatorio.</p>
        ) : (
          <table className="inv-table">
            <thead>
              <tr>
                <th>Revisión Anterior</th>
                <th>Revisión Actual</th>
                <th>Razón de la Última Modificación</th>
                <th>Fecha de Actualización</th>
                <th style={{ width: '40px' }}></th>
              </tr>
            </thead>
            <tbody>
              {datos.cambios.map((c, i) => (
                <tr key={i}>
                  <td>
                    <input placeholder="Ej. 01"
                      value={c.revision_anterior}
                      onChange={e => actualizarCambio(i, 'revision_anterior', e.target.value)} />
                  </td>
                  <td>
                    <input placeholder="Ej. 02"
                      value={c.revision_actual}
                      onChange={e => actualizarCambio(i, 'revision_actual', e.target.value)} />
                  </td>
                  <td>
                    <input placeholder="Causas de modificación. Si no aplica: NO APLICA"
                      value={c.razon}
                      onChange={e => actualizarCambio(i, 'razon', e.target.value)} />
                  </td>
                  <td>
                    <input type="date"
                      value={c.fecha}
                      onChange={e => actualizarCambio(i, 'fecha', e.target.value)} />
                  </td>
                  <td><button className="btn-eliminar" onClick={() => eliminarCambio(i)}>✕</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Nota final */}
      <div style={{
        marginTop: '20px', display: 'flex', gap: '10px', alignItems: 'flex-start',
        padding: '14px 16px', background: '#f0fdf4', borderRadius: '10px',
        border: '1px solid #bbf7d0', fontSize: '.78rem', color: '#14532d'
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: '1px' }}>
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        <span>
          Al guardar, el manual quedará en estado <strong>Borrador</strong>. Podrás continuar editándolo antes de enviarlo a revisión con el IMDAI.
        </span>
      </div>
    </div>
  )
}
