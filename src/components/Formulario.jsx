import { useState, useEffect } from "react";
import Alerta from './Alerta.jsx';
import usePacientes from "../hooks/usePacientes.jsx";

const Formulario = () => {

    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [id, setID] = useState(null);

    const [alerta, setAlerta] = useState({});

    const { guardarPaciente, paciente } = usePacientes();

    useEffect(() => {
        if(paciente?.nombre){
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
            setID(paciente._id)
        }
    }, [paciente])

    const handleSubmit = e =>{
        e.preventDefault();

        // Validar el formulario
        if([nombre, propietario, email, fecha, sintomas].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true,
            });
            return
        }

        // Quitando la alerta del formulario
        setAlerta({})

        guardarPaciente({nombre, propietario, email, fecha, sintomas, id});
        setAlerta({
            msg: 'Guardado Correctamente'
        })

        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');
        setID('')
    }

    const {msg} = alerta;

    return (
        <>
            <h2 className='font-black text-3xl text-center'>Administrador de Pacientes</h2>

            <p className='text-xl mt-5 mb-10 text-center'>
                Añade tus {''}
                <span className='text-indigo-600 font-bold'>Pacientes y Administralos</span>
            </p>
        
            <form action=""
                className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"  
                onSubmit={handleSubmit}
            >
                <div className="mb-5">
                    <label className="text-gray-700 uppercase font-bold" 
                    htmlFor="nombre">
                        Nombre de Mascota
                    </label>
                    
                    <input 
                        type="text" 
                        id="nombre"
                        placeholder="Nombre de la mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label className="text-gray-700 uppercase font-bold" 
                    htmlFor="propietario">
                        Nombre del Propietario
                    </label>
                    
                    <input 
                        type="text" 
                        id="propietario"
                        placeholder="Nombre del Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={e => setPropietario(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label className="text-gray-700 uppercase font-bold" 
                    htmlFor="email">
                        Email
                    </label>
                    
                    <input 
                        type="email" 
                        id="email"
                        placeholder="Email"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label className="text-gray-700 uppercase font-bold" 
                    htmlFor="fecha">
                        Fecha Alta
                    </label>
                    
                    <input 
                        type="date" 
                        id="fecha"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={e => setFecha(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label className="text-gray-700 uppercase font-bold" 
                    htmlFor="sintomas">
                        Sintomas
                    </label>
                    
                    <textarea 
                        id="sintomas"
                        placeholder="Describe los sintomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={sintomas}
                        onChange={e => setSintomas(e.target.value)}
                    />
                </div>

                <input 
                    type="submit" 
                    className="bg-indigo-600 w-full p-3 
                    text-white uppercase font-bold hover:bg-indigo-800 
                    cursor-pointer transition-colors"
                    value={id ? 'Guardar Cambios' : 'Agregar Pacientes'}
                />
            </form>
            {msg && <Alerta alerta={alerta}/>}
        </>
    )
}

export default Formulario;