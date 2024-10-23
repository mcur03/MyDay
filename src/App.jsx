import React, { useEffect, useState }  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ListaTareas from './components/ListaTareas';
import PiePagina from './components/PiePagina';
import TareasController from './components/TareasController';
import InputTarea from './components/InputTarea';

import './style.css'
// Define el componente
const App = () => {
  const [tareas, setTareas] = useState([]);  // Estado para almacenar la lista de tareas
  const [nuevaTarea, setNuevaTarea] = useState('');  // Estado para la nueva tarea
  
// Obtener funciones desde TareasController que ayudan a gestionar las tareas
  const{
    agregarTarea,
    actualizarTarea,
    eliminarTarea,
    alternarCompletada,
    eliminarTareasCompletadas,
    obtenerTareasFiltradas,
    cargarTareasGuardadas
  } = TareasController(tareas, setTareas, setNuevaTarea);
  
  //Efecto para cargar tareas guardadas
  useEffect(() => {
    cargarTareasGuardadas();
  }, []);
   
  return (
  // Router para la navegación.
    <Router>
      <div className='contInput'>
      <h1>Mi Día</h1>
        <p>Todas mis tareas en un solo lugar</p>

      {/* para ingresar una nueva tarea. */}
        <InputTarea
          nuevaTarea={nuevaTarea}
          setNuevaTarea={setNuevaTarea}
          agregarTarea={agregarTarea}
          
        />
      </div>
      {/* condicion para mostrar lista de tareas si existen */}
      {tareas.length > 0 && (
      <div className='contMain'>
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
      )}
    </Router>
  );
};

export default App;