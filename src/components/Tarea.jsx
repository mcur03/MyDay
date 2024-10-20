import React from 'react';

const Tarea = ({ tarea, alternarCompletada, eliminarTarea }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={tarea.completada}
        onChange={() => alternarCompletada(tarea.id)}
      />
      <span style={{ textDecoration: tarea.completada ? 'line-through' : 'none' }}>
        {tarea.titulo}
      </span>
      <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
    </li>
  );
};

export default Tarea;
