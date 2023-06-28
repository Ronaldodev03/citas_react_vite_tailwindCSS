/* eslint-disable react/prop-types */
import Paciente from "./Paciente";
//Este componente corresponde un mapeo del componente 'Paciente' siempre y cuando hayan objetos en el array, sino imprimirá otro mensaje.
const ListadoPacientes = ({ pacientes, setPaciente, eliminarPaciente }) => {
  return (
    <div className="md:w-1/2 lg:w-3/5  md:h-screen overflow-y-scroll">
      {pacientes && pacientes.length ? (
        <>
          <h2 className="font-black text-3xl text-center">ListadoPacientes</h2>
          <p className="text-xl mt-5 text-center mb-10">
            Administra tus{" "}
            <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
          </p>
          {pacientes.map((paciente) => (
            <Paciente
              key={paciente.id}
              paciente={paciente}
              setPaciente={setPaciente}
              eliminarPaciente={eliminarPaciente}
            />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
          <p className="text-xl mt-5 text-center mb-10">
            Comienza agregando{" "}
            <span className="text-indigo-600 font-bold">
              y apareceran en este lugar.
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default ListadoPacientes;
