import React, { useEffect, useRef, useState } from 'react';
import './tarea.css'

const Tarea = ({ tarea, eliminarTarea, actualizarTarea, alternarCompletada }) => {
    const [enEdicion, setEnEdicion] = useState(false); // Estado para controlar si la tarea está en modo edición
    const [nuevoTitulo, setNuevoTitulo] = useState(tarea.titulo); // Estado para almacenar el título mientras se edita

    const inputRef = useRef(null);
      // Activar el modo de edición al hacer doble clic en la tarea
    const activarEdicion = () => {
        console.log('Activando modo edición');
        setEnEdicion(true);
        setNuevoTitulo(tarea.titulo); // Sincroniza el estado del nuevo título con el título actual
    };

     // Manejar la actualización del título de la tarea
    const manejarActualizacion = (e) => {
    if (e.key === 'Enter' && nuevoTitulo.trim()) {
      actualizarTarea(tarea.id, nuevoTitulo.trim()); // Actualiza el título cuando se presiona Enter
      setEnEdicion(false); // Salir del modo de edición
    } else if (e.key === 'Escape') {
      setNuevoTitulo(tarea.titulo); // Restablecer el título original si se presiona Escape
      setEnEdicion(false); // Salir del modo de edición
    }
    };

      // Efecto para detectar clics fuera del campo de edición
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setEnEdicion(false);  // Salir del modo de edición si se hace clic fuera
      }
    };

    // Solo añadir el listener si está en modo edición
    if (enEdicion) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup: remover el listener cuando el componente se desmonta
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [enEdicion]);

    return (
    <li className={tarea.completada ? 'completada' : ''}>
        {!enEdicion ? (
            <>
                <input
                    type="checkbox"
                    checked={tarea.completada}
                    onChange={() => alternarCompletada(tarea.id)}
                />
                {/* Hacer doble clic activa el modo de edición */}
                <span className='span-lista-tarea' onClick={activarEdicion}>{tarea.titulo}</span>
                <button className="eliminar-boton" onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
            </>
        ) : (
          // Mostrar el campo de texto cuando la tarea está en modo de edición
            <input
                className='input-editar-tarea'
                ref={inputRef}
                type="text"
                value={nuevoTitulo}
                onChange={(e) => setNuevoTitulo(e.target.value)}
                onKeyDown={manejarActualizacion} // Manejar Enter y Escape
                autoFocus
            />
        )}
    </li>
    );
};

export default Tarea;




// alternarCompletada,      

{/* <li className={tarea.completada ? 'completada' : ''}>
      <span style={{ textDecoration: tarea.completada ? 'line-through' : 'none' }}>
        {tarea.titulo}
      </span>
      <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button> // Boton para eliminar tarea
    </li> */}