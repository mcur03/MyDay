import React from 'react';

// componente que se encarga de la entrada de texto para agregar una nueva tarea
const InputTarea = ({ nuevaTarea, setNuevaTarea, agregarTarea }) => {
  return (
    <input
      className='input-tareas'
      type="text"
      value={nuevaTarea}
      onChange={(e) => setNuevaTarea(e.target.value)} // actualizar el estado
      placeholder="Escribe una nueva tarea"
      onKeyDown={(e) => e.key === 'Enter' && agregarTarea(nuevaTarea)} // Agregar tarea cuando el usuario presiona Enter
      autoFocus
    />
  );
};

export default InputTarea;
