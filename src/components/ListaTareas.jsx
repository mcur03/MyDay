import React from 'react';
import Tarea from './Tarea';

const ListaTareas = ({ tareas, eliminarTarea }) => {

  return (
    <ul>
      {tareas.map((tarea) => (
        <Tarea
          key={tarea.id}
          tarea={tarea}
        //   alternarCompletada={alternarCompletada}
          eliminarTarea={eliminarTarea}
        />
      ))}
    </ul>
  );
};

export default ListaTareas;










// const alternarCompletada = (id) => {
//     const tareasActualizadas = tareas.map((tarea) => {
//       if (tarea.id === id) {
//         return { ...tarea, completada: !tarea.completada };
//       }
//       return tarea;
//     });
//     setTareas(tareasActualizadas);
//   };

//   const eliminarTarea = (id) => {
//     const tareasActualizadas = tareas.filter((tarea) => tarea.id !== id);
//     setTareas(tareasActualizadas);
//   };
