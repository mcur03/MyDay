import React from 'react';

const PiePagina = ({ tareas }) => {
  // Contar cuántas tareas no están completadas
  const tareasPendientes = tareas.filter(tarea => !tarea.completada).length;

  return (
    <footer>
      <span>
        <strong>{tareasPendientes}</strong> {tareasPendientes === 1 ? 'tarea pendiente' : 'tareas pendientes'}
      </span>
    </footer>
  );
};

export default PiePagina;
