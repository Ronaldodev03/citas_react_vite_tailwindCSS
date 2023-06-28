import { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Header from "./components/Header";
import ListadoPacientes from "./components/ListadoPacientes";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  // Estado para los pacientes cargados.
  const [pacientes, setPacientes] = useLocalStorage("pacientes", []);
  // Estado que se llenará cuando querramos editar un paciente ya existente (al presionar editar se ejecutará 'setPaciente(paciente-proveniente-del-mapeo-al-cual-se-le-presionó-editar)').
  const [paciente, setPaciente] = useState({});
  //Funcion para eliminar paciente cargado.
  const eliminarPaciente = (id) => {
    const pacientesActualizados = pacientes.filter(
      (pacienteState) => pacienteState.id !== id
    );
    setPacientes(pacientesActualizados);
  };

  return (
    <div className="container mx-auto mt-20">
      <Header />
      <div className="mt-12 md:flex  ">
        <Formulario
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
        <ListadoPacientes
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
        />
      </div>
    </div>
  );
}

export default App;
