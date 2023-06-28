/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Error from "./Error";
const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  //Estados para los campos del formulario.
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");

  // Estado booleano que señala error cuando presionamos el boton de submit y no estan todos los campos llenos.
  const [error, setError] = useState(false);

  // Este useEffect llena los campos del formulario cada vez que cambia 'paciente', y este cambia cuando se le da al boton de editar (está ubicado en el componente 'Paciente').
  // Tambien cambia cuando se le da al boton de Submit, para volverlo un objeto vacion, y no desarrolla el codigo despues del 'if' por no cumplir la condicion.
  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  }, [paciente]);

  // Funcion para generar un ID randomly
  const getRandomId = () => {
    const fecha = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2);
    return fecha + random;
  };

  // Funcion para Submit.
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validacion del formulario.
    if (
      [
        nombre.trim(),
        propietario.trim(),
        email.trim(),
        fecha.trim(),
        sintomas.trim(),
      ].includes("")
    ) {
      setError(true);
      return;
    }
    //Si no pasa por el 'if' el error lo setteamos a false siempre (en el 'if' se settea a true).
    setError(false);

    // Objeto de Paciente creado (notar que el objeto no tiene ID, se le agrega a posteriori).
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
    };

    // Condicional para saber si el objeto paciente proviene de edicion o es un registro nuevo (solo los que ya existen tienen ID, los nuevos registros no tienen ID, se le coloca en el else)
    if (paciente.id) {
      //Editando Registro
      objetoPaciente.id = paciente.id;
      const pacientesActualizados = pacientes.map((pacienteState) =>
        pacienteState.id === paciente.id ? objetoPaciente : pacienteState
      );
      setPacientes(pacientesActualizados);
      setPaciente({});
    } else {
      // Nuevo Registro
      objetoPaciente.id = getRandomId();
      setPacientes([...pacientes, objetoPaciente]);
    }

    // Reiniciamos los campos del formulario (esto es lo que se hace al final de todo el proceso de submit).
    setNombre("");
    setPropietario("");
    setEmail("");
    setFecha("");
    setSintomas("");
  };

  //Retorno del componente
  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-xl mt-5 text-center mb-10">
        Añade Pacientes y{" "}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
      >
        {error && (
          <Error>
            <p>Todos los campos son obligatorios</p>
          </Error>
        )}

        <div className="mb-5">
          <label
            htmlFor="mascota"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre Macota
          </label>
          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre Propietario
          </label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="gmail"
            className="block text-gray-700 uppercase font-bold"
          >
            Gmail
          </label>
          <input
            id="gmail"
            type="gmail"
            placeholder="Gmail Contacto Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="alta"
            className="block text-gray-700 uppercase font-bold"
          >
            Alta
          </label>
          <input
            id="alta"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="block text-gray-700 uppercase font-bold"
          >
            Sintomas
          </label>
          <textarea
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Describe sintomas"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value={paciente.id ? "Editar Paciente" : "Agregar Paciente"}
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
        />
      </form>
    </div>
  );
};

export default Formulario;
