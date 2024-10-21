import React, { useEffect, useState }  from 'react';
import ListaTareas from './components/ListaTareas';
import PiePagina from './components/PiePagina';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TareasController from './components/TareasController';
import InputTarea from './components/InputTarea';

const App = () => {
  const [tareas, setTareas] = useState([]);  // Estado para almacenar la lista de tareas
  const [nuevaTarea, setNuevaTarea] = useState('');  // Estado para la nueva tarea

  const{
    agregarTarea,
    actualizarTarea,
    eliminarTarea,
    alternarCompletada,
    eliminarTareasCompletadas,
    obtenerTareasFiltradas,
    cargarTareasGuardadas
  } = TareasController(tareas, setTareas, setNuevaTarea);
  
  useEffect(() => {
    cargarTareasGuardadas();
  }, []);
   
  return (
    <Router>
      <div>
        <h1>Mi Día</h1>
        <p>Todas mis tareas en un solo lugar</p>

        <InputTarea
          nuevaTarea={nuevaTarea}
          setNuevaTarea={setNuevaTarea}
          agregarTarea={agregarTarea}
          
        />
        
        {/* Renderizar la lista de tareas según la ruta */}
        <Routes>
          <Route path="/all" element={<ListaTareas tareas={obtenerTareasFiltradas('todas')} eliminarTarea={eliminarTarea} actualizarTarea={actualizarTarea} alternarCompletada={alternarCompletada} />} />
          <Route path="/pending" element={<ListaTareas tareas={obtenerTareasFiltradas('pendientes')} eliminarTarea={eliminarTarea} actualizarTarea={actualizarTarea} alternarCompletada={alternarCompletada} />} />
          <Route path="/completed" element={<ListaTareas tareas={obtenerTareasFiltradas('completadas')} eliminarTarea={eliminarTarea} actualizarTarea={actualizarTarea} alternarCompletada={alternarCompletada} />} />
          <Route path="/" element={<ListaTareas tareas={obtenerTareasFiltradas('todas')} eliminarTarea={eliminarTarea} actualizarTarea={actualizarTarea} alternarCompletada={alternarCompletada} />} />
        </Routes>

        {/* Mostrar PiePagina solo si hay al menos una tarea */}
        {tareas.length > 0 && <PiePagina tareas={tareas} 
        eliminarTareasCompletadas={eliminarTareasCompletadas} 
        />}
      </div>
    </Router>
  );
};

export default App;