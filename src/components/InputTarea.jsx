import React from 'react';

const InputTarea = ({ nuevaTarea, setNuevaTarea, agregarTarea }) => {
  return (
    <input
      type="text"
      value={nuevaTarea}
      onChange={(e) => setNuevaTarea(e.target.value)}
      placeholder="Escribe una nueva tarea"
      onKeyDown={(e) => e.key === 'Enter' && agregarTarea(nuevaTarea)} // Agregar tarea cuando el usuario presiona Enter
    />
  );
};

export default InputTarea;
