import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import Alerta from '../components/Alerta.jsx';
import clienteAxios from '../config/axios';

const confirmarCuenta = () => {

  const params = useParams();
  const { id } = params;

  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({})

  useEffect(() => {
    const confirmarC = async() =>{
      try {
        const url = `veterinarios/confirmar/${id}`;
        const {data} = await clienteAxios(url);

        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg,
        })



      } catch (error) {
        setAlerta({
          msg:'Token no válido',
          error: true
        })
      }

      setCargando(false)
    }
    confirmarC();
  }, [])


  return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">
                Confirma tu Cuenta y Comienza a Administrar tus {""}
                <span className="text-black">Pacientes</span>
            </h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
          {!cargando &&
            <Alerta 
              alerta={alerta}
            />
          }

          {
            cuentaConfirmada && (
              <Link 
              className="block text-center my-5 text-gray-500" 
              to="/">Iniciar Sesion</Link>
            )
          }
          
        </div>
    </>
  )
}

export default confirmarCuenta