import {useState, useEffect, createContext} from 'react';
import clienteAxios from '../config/axios.jsx';
import Alerta from '../components/Alerta.jsx';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    
    const [cargando, setCargando] = useState(true)
    const [auth, setAuth] = useState({})
    const [alerta, setAlerta] = useState({});

    useEffect(() => {
        const autenticarUsuario = async() =>{

            const token = localStorage.getItem('token');

            if(!token || token == null) {
                setCargando(false)
                return
            }

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios('/veterinarios/perfil', config);

                setAuth(data);
            } catch (error) {
                setAuth({})
            }

            setCargando(false)
        }
        autenticarUsuario();
    }, []);

    const cerrarSesion = () =>{
        localStorage.removeItem('token')
        setAuth({})
    }

    const actualizarPerfil = async (datos) => {
        
        const token = localStorage.getItem('token');

        if(!token || token == null) {
            setCargando(false)
            return
        }

        const config = {
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }

        try {
            
            const url = `/veterinarios/perfil/${datos._id}`;
            const {data} = await clienteAxios.put(url, datos, config);

            console.log(data)

            if(data.error){
                return{ msg: 'El correo ya está en uso', error: true }
            }else{
                return { msg: 'Almacenado Correctamente'}
            }
        } catch (error) {
            
            return{
                msg: error.response.data.msg,
                error: true,
            }
        }
    }

    const guardarPassword = async (datos) => {
        
        const token = localStorage.getItem('token');

        if(!token || token == null) {
            setCargando(false)
            return
        }

        const config = {
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }

        try {
            const url = '/veterinarios/actualizar-password';
            const { data } = await clienteAxios.put(url, datos, config);

            if(data.error){
                return{msg: data.msg, error: true}
            }

            return {msg: data.msg};
        } catch (error) {
            console.log(error)
        }

    }

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}
        >

            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider  
} 

export default AuthContext