import React, { useState }  from 'react';
import ListaTareas from './components/ListaTareas';
import PiePagina from './components/PiePagina';

const App = () => {
  const [tareas, setTareas] = useState([]);  // Estado para almacenar la lista de tareas
  const [nuevaTarea, setNuevaTarea] = useState('');  // Estado para la nueva tarea

  const agregarTarea = () => {
    if (nuevaTarea.trim()) {
      const nueva = { id: Date.now(), titulo: nuevaTarea.trim(), completada: false };
      setTareas([...tareas, nueva]);
      setNuevaTarea('');
    }
  };

    // Función para actualizar el título de una tarea
    const actualizarTarea = (id, nuevoTitulo) => {
      const tareasActualizadas = tareas.map((tarea) => 
        tarea.id === id ? { ...tarea, titulo: nuevoTitulo } : tarea
      );
      setTareas(tareasActualizadas);
    };

    // Función para eliminar una tarea
    const eliminarTarea = (id) => {
      const tareasFiltradas = tareas.filter((tarea) => tarea.id !== id); // Filtrar la tarea por su ID
      setTareas(tareasFiltradas);
    };

    const alternarCompletada = (id) => {
      const tareasActualizadas = tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
      );
      setTareas(tareasActualizadas);
    };

  return (
    <div>
      <h1>Mi Día</h1>
      <p>Todas mis tareas en un solo lugar</p>
      <input
        type="text"
        value={nuevaTarea}
        onChange={(e) => setNuevaTarea(e.target.value)}
        placeholder="Escribe una nueva tarea"
        onKeyDown={(e) => e.key === 'Enter' && agregarTarea()} // Agregar tarea cuando el usuario presiona Enter
      />
      {/* Componente ListaTareas, al que se le pasa la lista de tareas y la función para eliminar  */}
      <ListaTareas tareas={tareas}  eliminarTarea={eliminarTarea} actualizarTarea={actualizarTarea} alternarCompletada={alternarCompletada} />
       {/* Mostrar PiePagina solo si hay al menos una tarea */}
       {tareas.length > 0 && <PiePagina tareas={tareas} />}
    </div>
  );
};

export default App;

// setTareas={setTareas}