import React, { useState }  from 'react';
import ListaTareas from './components/ListaTareas';
import PiePagina from './components/PiePagina';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

  // Función para alternar el estado de completada de una tarea
    const alternarCompletada = (id) => {
      const tareasActualizadas = tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
      );
      setTareas(tareasActualizadas);
    };

      // Función para filtrar las tareas según el estado
  const obtenerTareasFiltradas = (filtro) => {
    if (filtro === 'pendientes') {
      return tareas.filter(tarea => !tarea.completada);
    }
    if (filtro === 'completadas') {
      return tareas.filter(tarea => tarea.completada);
    }
    return tareas; // Si el filtro es "todas"
  };

    // Función para eliminar todas las tareas completadas
    const eliminarTareasCompletadas = () => {
      const tareasNoCompletadas = tareas.filter(tarea => !tarea.completada);
      setTareas(tareasNoCompletadas);
    };

  return (
    <Router>
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

        {/* Botón para eliminar tareas completadas */}
        {tareas.some(tarea => tarea.completada) && (
          <button onClick={eliminarTareasCompletadas}>Eliminar tareas completadas</button>
        )}
        
        {/* Renderizar la lista de tareas según la ruta */}
        <Routes>
          <Route path="/all" element={<ListaTareas tareas={obtenerTareasFiltradas('todas')} eliminarTarea={eliminarTarea} actualizarTarea={actualizarTarea} alternarCompletada={alternarCompletada} />} />
          <Route path="/pending" element={<ListaTareas tareas={obtenerTareasFiltradas('pendientes')} eliminarTarea={eliminarTarea} actualizarTarea={actualizarTarea} alternarCompletada={alternarCompletada} />} />
          <Route path="/completed" element={<ListaTareas tareas={obtenerTareasFiltradas('completadas')} eliminarTarea={eliminarTarea} actualizarTarea={actualizarTarea} alternarCompletada={alternarCompletada} />} />
          
          {/* Ruta por defecto */}
          <Route path="/" element={<ListaTareas tareas={obtenerTareasFiltradas('todas')} eliminarTarea={eliminarTarea} actualizarTarea={actualizarTarea} alternarCompletada={alternarCompletada} />} />
        </Routes>

        {/* Mostrar PiePagina solo si hay al menos una tarea */}
        {tareas.length > 0 && <PiePagina tareas={tareas} />}
      </div>
    </Router>
  );
};

export default App;