export default function OrgPaso2CapituloI({ datos, actualizar }) {

  // ── Marco Normativo ────────────────────────────────────────────────────────
  const agregarNorma = () =>
    actualizar({ marco_normativo: [...datos.marco_normativo, { nombre: '', fecha: '', medio: '' }] })
  const actualizarNorma = (i, campo, val) => {
    const n = [...datos.marco_normativo]; n[i] = { ...n[i], [campo]: val }; actualizar({ marco_normativo: n })
  }
  const eliminarNorma = (i) =>
    actualizar({ marco_normativo: datos.marco_normativo.filter((_, idx) => idx !== i) })

  // ── Principios ─────────────────────────────────────────────────────────────
  const agregarPrincipio = () => actualizar({ principios: [...datos.principios, ''] })
  const actualizarPrincipio = (i, val) => {
    const p = [...datos.principios]; p[i] = val; actualizar({ principios: p })
  }
  const eliminarPrincipio = (i) =>
    actualizar({ principios: datos.principios.filter((_, idx) => idx !== i) })

  // ── Valores ────────────────────────────────────────────────────────────────
  const agregarValor = () => actualizar({ valores: [...datos.valores, ''] })
  const actualizarValor = (i, val) => {
    const v = [...datos.valores]; v[i] = val; actualizar({ valores: v })
  }
  const eliminarValor = (i) =>
    actualizar({ valores: datos.valores.filter((_, idx) => idx !== i) })

  // ── Políticas de Operación ─────────────────────────────────────────────────
  const agregarPolitica = () =>
    actualizar({ politicas_operacion: [...datos.politicas_operacion, { area: '', descripcion: '' }] })
  const actualizarPolitica = (i, campo, val) => {
    const p = [...datos.politicas_operacion]; p[i] = { ...p[i], [campo]: val }
    actualizar({ politicas_operacion: p })
  }
  const eliminarPolitica = (i) =>
    actualizar({ politicas_operacion: datos.politicas_operacion.filter((_, idx) => idx !== i) })

  // ── Marco Conceptual ───────────────────────────────────────────────────────
  const agregarConcepto = () =>
    actualizar({ marco_conceptual: [...datos.marco_conceptual, { termino: '', definicion: '' }] })
  const actualizarConcepto = (i, campo, val) => {
    const c = [...datos.marco_conceptual]; c[i] = { ...c[i], [campo]: val }
    actualizar({ marco_conceptual: c })
  }
  const eliminarConcepto = (i) =>
    actualizar({ marco_conceptual: datos.marco_conceptual.filter((_, idx) => idx !== i) })

  return (
    <div className="paso-container">
      <h3 className="paso-titulo">Capítulo I — Generales</h3>
      <p className="paso-sub">Información institucional de la dependencia conforme al formato oficial IMDAI</p>

      {/* 3.1 Introducción */}
      <div className="campo-grupo">
        <label>3.1 Introducción</label>
        <textarea
          placeholder="Describe brevemente el contenido del manual, su utilidad y propósito general. Incluye el nombre y cargo del superior jerárquico al final..."
          value={datos.introduccion}
          onChange={e => actualizar({ introduccion: e.target.value })}
          rows={5}
        />
      </div>

      <div className="campo-fila">
        <div className="campo-grupo">
          <label>Nombre del Superior Jerárquico</label>
          <input
            type="text"
            placeholder="Nombre completo"
            value={datos.superior_nombre}
            onChange={e => actualizar({ superior_nombre: e.target.value })}
          />
        </div>
        <div className="campo-grupo">
          <label>Cargo del Superior Jerárquico</label>
          <input
            type="text"
            placeholder="Ej. Director General de Administración"
            value={datos.superior_cargo}
            onChange={e => actualizar({ superior_cargo: e.target.value })}
          />
        </div>
      </div>

      {/* 3.2 Antecedentes */}
      <div className="campo-grupo">
        <label>3.2 Antecedentes</label>
        <textarea
          placeholder="Relata el origen y evolución de la dependencia, Unidad Administrativa y/o Entidad Municipal..."
          value={datos.antecedentes}
          onChange={e => actualizar({ antecedentes: e.target.value })}
          rows={5}
        />
      </div>

      {/* 3.3 Marco Normativo */}
      <div className="campo-grupo">
        <div className="campo-header">
          <label>3.3 Marco Normativo</label>
          <button className="btn-agregar" onClick={agregarNorma}>+ Agregar</button>
        </div>
        {datos.marco_normativo.length === 0 && (
          <p className="campo-vacio">Agrega las leyes, reglamentos y normativas aplicables (en orden de pirámide de Kelsen).</p>
        )}
        {datos.marco_normativo.map((norma, i) => (
          <div key={i} className="item-fila" style={{ alignItems: 'flex-start' }}>
            <span className="item-num">{i + 1}</span>
            <input
              placeholder="Nombre de la normatividad o documento"
              value={norma.nombre}
              onChange={e => actualizarNorma(i, 'nombre', e.target.value)}
              style={{ flex: 3 }}
            />
            <input
              type="date"
              title="Última fecha de publicación"
              value={norma.fecha}
              onChange={e => actualizarNorma(i, 'fecha', e.target.value)}
              style={{ flex: 1.5 }}
            />
            <input
              placeholder="Medio (DOF, POEQROO...)"
              value={norma.medio}
              onChange={e => actualizarNorma(i, 'medio', e.target.value)}
              style={{ flex: 2 }}
            />
            <button className="btn-eliminar" onClick={() => eliminarNorma(i)}>✕</button>
          </div>
        ))}
      </div>

      {/* 3.4 Atribuciones */}
      <div className="campo-grupo">
        <label>3.4 Atribuciones Institucionales</label>
        <textarea
          placeholder="Indica las facultades que le son conferidas a la dependencia por su normatividad aplicable..."
          value={datos.atribuciones}
          onChange={e => actualizar({ atribuciones: e.target.value })}
          rows={5}
        />
      </div>

      {/* 3.5 Objetivo General */}
      <div className="campo-grupo">
        <label>3.5 Objetivo General</label>
        <textarea
          placeholder="Propósito global que persigue la dependencia para el cumplimiento de sus atribuciones..."
          value={datos.objetivo_general}
          onChange={e => actualizar({ objetivo_general: e.target.value })}
          rows={3}
        />
      </div>

      {/* 3.6 Misión */}
      <div className="campo-grupo">
        <label>3.6 Misión</label>
        <textarea
          placeholder="Razón de ser de la dependencia; debe ser clara, concreta y específica..."
          value={datos.mision}
          onChange={e => actualizar({ mision: e.target.value })}
          rows={3}
        />
      </div>

      {/* 3.7 Visión */}
      <div className="campo-grupo">
        <label>3.7 Visión</label>
        <textarea
          placeholder="Escenario a donde se dirige la dependencia y cómo se ve a largo plazo..."
          value={datos.vision}
          onChange={e => actualizar({ vision: e.target.value })}
          rows={3}
        />
      </div>

      {/* 3.8 Principios y Valores */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="campo-grupo">
          <div className="campo-header">
            <label>3.8 Principios Institucionales</label>
            <button className="btn-agregar" onClick={agregarPrincipio}>+ Agregar</button>
          </div>
          {datos.principios.length === 0 && (
            <p className="campo-vacio">Sin principios agregados.</p>
          )}
          {datos.principios.map((p, i) => (
            <div key={i} className="item-fila">
              <span className="item-num">{i + 1}</span>
              <input
                placeholder="Principio institucional..."
                value={p}
                onChange={e => actualizarPrincipio(i, e.target.value)}
              />
              <button className="btn-eliminar" onClick={() => eliminarPrincipio(i)}>✕</button>
            </div>
          ))}
        </div>

        <div className="campo-grupo">
          <div className="campo-header">
            <label>Valores Institucionales</label>
            <button className="btn-agregar" onClick={agregarValor}>+ Agregar</button>
          </div>
          {datos.valores.length === 0 && (
            <p className="campo-vacio">Sin valores agregados.</p>
          )}
          {datos.valores.map((v, i) => (
            <div key={i} className="item-fila">
              <span className="item-num">{i + 1}</span>
              <input
                placeholder="Valor institucional..."
                value={v}
                onChange={e => actualizarValor(i, e.target.value)}
              />
              <button className="btn-eliminar" onClick={() => eliminarValor(i)}>✕</button>
            </div>
          ))}
        </div>
      </div>

      {/* 3.9 Políticas de Operación */}
      <div className="campo-grupo">
        <div className="campo-header">
          <label>3.9 Políticas de Operación</label>
          <button className="btn-agregar" onClick={agregarPolitica}>+ Agregar Área</button>
        </div>
        {datos.politicas_operacion.length === 0 && (
          <p className="campo-vacio">Agrega las políticas por área de la dependencia.</p>
        )}
        {datos.politicas_operacion.map((pol, i) => (
          <div key={i} style={{
            padding: '14px', background: '#fdf8f9',
            borderRadius: '10px', border: '1.5px solid #f5e8ea', marginBottom: '10px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '.72rem', fontWeight: '700', color: '#be123c', letterSpacing: '.5px' }}>
                {String.fromCharCode(65 + i)}. Área
              </span>
              <button className="btn-eliminar" onClick={() => eliminarPolitica(i)}>✕</button>
            </div>
            <input
              placeholder="Nombre del área"
              value={pol.area}
              onChange={e => actualizarPolitica(i, 'area', e.target.value)}
              style={{
                width: '100%', padding: '8px 12px', border: '1.5px solid #ffe4e6',
                borderRadius: '7px', fontFamily: 'Poppins, sans-serif',
                fontSize: '.82rem', marginBottom: '8px', outline: 'none',
                background: 'white'
              }}
            />
            <textarea
              placeholder="Políticas de operación del área, medios de contacto y demás aplicables..."
              value={pol.descripcion}
              onChange={e => actualizarPolitica(i, 'descripcion', e.target.value)}
              rows={3}
              style={{
                width: '100%', padding: '8px 12px', border: '1.5px solid #ffe4e6',
                borderRadius: '7px', fontFamily: 'Poppins, sans-serif',
                fontSize: '.82rem', outline: 'none', resize: 'vertical', background: 'white'
              }}
            />
          </div>
        ))}
      </div>

      {/* 3.10 Marco Conceptual */}
      <div className="campo-grupo">
        <div className="campo-header">
          <label>3.10 Marco Conceptual (Glosario)</label>
          <button className="btn-agregar" onClick={agregarConcepto}>+ Agregar</button>
        </div>
        {datos.marco_conceptual.length === 0 && (
          <p className="campo-vacio">Agrega los términos y conceptos clave del manual.</p>
        )}
        {datos.marco_conceptual.map((c, i) => (
          <div key={i} className="item-fila" style={{ alignItems: 'flex-start' }}>
            <span className="item-num">{i + 1}</span>
            <input
              placeholder="Término a definir"
              value={c.termino}
              onChange={e => actualizarConcepto(i, 'termino', e.target.value)}
              style={{ flex: 1 }}
            />
            <input
              placeholder="Definición del término..."
              value={c.definicion}
              onChange={e => actualizarConcepto(i, 'definicion', e.target.value)}
              style={{ flex: 2.5 }}
            />
            <button className="btn-eliminar" onClick={() => eliminarConcepto(i)}>✕</button>
          </div>
        ))}
      </div>

    </div>
  )
}
