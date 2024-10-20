import React from 'react';
import ListaTareas from './components/ListaTareas';

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

  return (
    <div>
      <h1>Gestor de Tareas</h1>
      <input
        type="text"
        value={nuevaTarea}
        onChange={(e) => setNuevaTarea(e.target.value)}
        placeholder="Escribe una nueva tarea"
        onKeyDown={(e) => e.key === 'Enter' && agregarTarea()}
      />
      <ListaTareas tareas={tareas} setTareas={setTareas} />
    </div>
  );
};

export default App;
