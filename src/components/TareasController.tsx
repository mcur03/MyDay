// import { useState } from 'react';

const TareasController = (tareas, setTareas, setNuevaTarea) => {
  const agregarTarea = (nuevaTarea) => {
    if (nuevaTarea.trim()) {
      const nueva = { id: Date.now(), titulo: nuevaTarea.trim(), completada: false };
      const nuevasTareas = [...tareas, nueva];
      setTareas(nuevasTareas);
      setNuevaTarea('');
      guardarTareasPendientes(nuevasTareas);
    }
  };

  const actualizarTarea = (id, nuevoTitulo) => {
    const tareasActualizadas = tareas.map((tarea) =>
      tarea.id === id ? { ...tarea, titulo: nuevoTitulo } : tarea
    );
    setTareas(tareasActualizadas);
    guardarTareasPendientes(tareasActualizadas);
  };

  const eliminarTarea = (id) => {
    const tareasFiltradas = tareas.filter((tarea) => tarea.id !== id);
    setTareas(tareasFiltradas);
    guardarTareasPendientes(tareasFiltradas);
  };

  const alternarCompletada = (id) => {
    const tareasActualizadas = tareas.map((tarea) =>
      tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
    );
    setTareas(tareasActualizadas);
    guardarTareasPendientes(tareasActualizadas);
  };

  const eliminarTareasCompletadas = () => {
    const tareasNoCompletadas = tareas.filter((tarea) => !tarea.completada);
    setTareas(tareasNoCompletadas);
    guardarTareasPendientes(tareasNoCompletadas);
  };

  const obtenerTareasFiltradas = (filtro) => {
    if (filtro === 'pendientes') {
      return tareas.filter((tarea) => !tarea.completada);
    }
    if (filtro === 'completadas') {
      return tareas.filter((tarea) => tarea.completada);
    }
    return tareas;
  };

  const guardarTareasPendientes = (tareas) => {
    const tareasPendientes = tareas.filter((tarea) => !tarea.completada);
    localStorage.setItem('tareasPendientes', JSON.stringify(tareasPendientes));
  };

  const cargarTareasGuardadas = () => {
    const tareasGuardadas = localStorage.getItem('tareasPendientes');
    if (tareasGuardadas) {
      setTareas(JSON.parse(tareasGuardadas));
    }
  };

  return {
    agregarTarea,
    actualizarTarea,
    eliminarTarea,
    alternarCompletada,
    eliminarTareasCompletadas,
    obtenerTareasFiltradas,
    cargarTareasGuardadas,
  };
};

export default TareasController;
