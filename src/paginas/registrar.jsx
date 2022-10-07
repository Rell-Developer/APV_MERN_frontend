import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const registrar = () => {

    // States
    const [ nombre, setNombre ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ repetirPassword, setrepetirPassword ] = useState('');

    const [alerta, setAlerta] = useState({});

    // Funciones
    const handleSubmit = async (e) =>{
        e.preventDefault();

        if([nombre, email, password, repetirPassword].includes('')){
            setAlerta({ msg: 'Hay campos vacios', error: true});
            return
        }

        if(password != repetirPassword){
            setAlerta({ msg: 'Los password no son iguales', error: true});
            return
        }

        if(password.length < 6){
            setAlerta({ msg: 'El password es muy corto, agrega minimo 6 caracteres', error: true});
            return
        }

        setAlerta({});

        // Crear el usuario en la api

        try {
            const respuesta = await clienteAxios.post('/veterinarios', {nombre, email, password});

            // console.log(respuesta)
            setAlerta({
                msg: 'Creado Correctamente, revisa tu email',
                error: false
            })
        } catch (error) {
            setAlerta({
                // msg: error.response.data.msg,
                msg: 'Usuario ya registrado',
                error:true
            });
        }
    }

    const { msg } = alerta;

    // Retorno del componente
    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Crea tu Cuenta y Administra Tus {""}
                    <span className="text-black">Pacientes</span>
                </h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">


                {msg && 
                    <Alerta 
                        alerta={alerta}    
                    />
                }
                
                <form 
                    onSubmit={handleSubmit}
                >
                    <div className="my-5">
                        <label 
                            htmlFor=""
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >
                            Tu Nombre
                        </label>
                        <input 
                            type="text" 
                            placeholder="Tu Nombre"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={nombre}
                            onChange = { e => setNombre(e.target.value)}
                        />
                    </div>


                    <div className="my-5">
                        <label 
                            htmlFor=""
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >
                            Email
                        </label>
                        <input 
                            type="text" 
                            placeholder="Email de Registro"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={email}
                            onChange = { e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="my-5">
                        <label 
                            htmlFor=""
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >
                            Password
                        </label>
                        <input 
                            type="password" 
                            placeholder="Tu Password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={password}
                            onChange = { e => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="my-5">
                        <label 
                            htmlFor=""
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >
                            Repetir Password
                        </label>
                        <input 
                            type="password" 
                            placeholder="Repite tu Password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={repetirPassword}
                            onChange = { e => setrepetirPassword(e.target.value)}
                        />
                    </div>

                    <input 
                        type="submit" 
                        value="Iniciar Sesion" 
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white 
                        uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 
                        md:w-auto "/>
                </form>

                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link 
                        className="block text-center my-5 text-gray-500" 
                        to="/">¿Ya tienes una cuenta?, Inicia Sesion</Link>
                    <Link 
                        className="block text-center my-5 text-gray-500" 
                        to="/olvide-password">Olvide mi contraseña</Link>
                </nav>
            </div>
        </>
    )
}

export default registrar