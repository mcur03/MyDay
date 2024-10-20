import React from 'react';

const Tarea = ({ tarea,  eliminarTarea }) => {
  return (
    <li>
      <span style={{ textDecoration: tarea.completada ? 'line-through' : 'none' }}>
        {tarea.titulo}
      </span>
      <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button> // Boton para eliminar tarea
    </li>
  );
};

export default Tarea;




// alternarCompletada,      