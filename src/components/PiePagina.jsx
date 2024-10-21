import React from 'react';
import { Link } from 'react-router-dom';

const PiePagina = ({ tareas, obtenerTareasFiltradas, setTareas }) => {

  // Contar cuántas tareas no están completadas
  const tareasPendientes = tareas.filter(tarea => !tarea.completada).length;

  return (
    <footer>
        <span>
          <strong>{tareasPendientes}</strong> {tareasPendientes === 1 ? 'tarea pendiente' : 'tareas pendientes'}
        </span>

      {/* Enlaces para los filtros en el pie de página */}
      <div>
        <Link to="/all">Todas</Link> | <Link to="/pending">Pendientes</Link> | <Link to="/completed">Completadas</Link>
      </div>

    </footer>
  );
};

export default PiePagina;
