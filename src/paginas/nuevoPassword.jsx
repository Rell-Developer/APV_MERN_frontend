import { useState, useEffect } from "react"
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import { useParams, Link } from "react-router-dom";

const nuevoPassword = () => {

    // States
    const [ password, setPassword ] = useState('');
    const [alerta, setAlerta] = useState({});
    const [ tokenValido, settokenValido] = useState(false)
    const [ passwordModificado, setPasswordModificado] = useState(false)


    const params = useParams();
    const { token } = params;   
    console.log(token);

    useEffect(() => {
        const comprobarToken = async () =>{
            try {
                const respuesta = await clienteAxios(`/veterinarios/olvide-password/${token}`);

                // Token no valido
                if(respuesta.data.error){
                    setAlerta({msg: 'Hubo un error con el enlace', error: true});
                    settokenValido(false);
                    return
                }

                // Token valido y se puede cambiar la contraseña
                setAlerta({msg: 'Coloca tu nuevo Password'});
                settokenValido(true);
            } catch (error) {
                setAlerta({msg: 'Hubo un error con el enlace', error: true});
                settokenValido(false)
            }
        }

        comprobarToken();
    }, [])

    // Funciones
    const handleSubmit = async (e) =>{
        e.preventDefault();

        if(password.length < 6){
            setAlerta({ msg: 'El password es muy corto, agrega minimo 6 caracteres', error: true});
            return
        }

        // setAlerta({});

        // Actualiza la nueva contraseña en la api

        try {
            const url = `/veterinarios/olvide-password/${token}`
            const { data } = await clienteAxios.post(url, { password });

            console.log(data);
            setAlerta({msg: data.msg})

            // console.log(respuesta)
            setAlerta({
                msg: 'Contraseña cambiada correctamente',
                error: false
            })
            setPasswordModificado(true);
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                // msg: 'Error',
                error:true
            });
        }
    }
    
    const { msg } = alerta;
    
    return ( 
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Establece una nueva contraseña y Administra Tus {""}
                    <span className="text-black">Pacientes</span>
                </h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {msg && 
                    <Alerta 
                        alerta={alerta}
                    />
                }

                {tokenValido && (

                    <>
                        <form 
                            onSubmit={handleSubmit}
                        >

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

                            <input 
                                type="submit" 
                                value="Guardar Contraseña" 
                                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white 
                                uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 
                                md:w-auto "/>
                        </form>
                        
                        {
                            passwordModificado &&

                            <nav className="mt-10 lg:flex lg:justify-between">
                                <Link 
                                    className="block text-center my-5 text-gray-500" 
                                    to="/">Inicia Sesion</Link>
                            </nav>
                        }
                    </>
                )}
            </div>
        </>
    );
}

export default nuevoPassword;