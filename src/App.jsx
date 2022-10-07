import { BrowserRouter, Routes, Route} from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import RutaProtegida from './layout/RutaProtegida';
import AdministrarPacientes from './paginas/AdministrarPacientes.jsx';

import Login from './paginas/login';
import Registrar from './paginas/registrar';
import ConfirmarCuenta from './paginas/confirmarCuenta';
import OlvidePassword from './paginas/olvidePassword';
import NuevoPassword from './paginas/nuevoPassword';
import EditarPerfil from './paginas/EditarPerfil';
import CambiarPassword from './paginas/CambiarPassword';

import {AuthProvider} from './context/AuthProvider.jsx';
import {PacientesProvider} from './context/PacientesProvider.jsx';

function App() {



  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path="/" element={<AuthLayout/>}>
              <Route index element={<Login />}/>
              <Route path="registrar" element={<Registrar/>}/>
              <Route path="olvide-password" element={<OlvidePassword/> } />
              <Route path="olvide-password/:token" element={<NuevoPassword/> } />
              <Route path="confirmar/:id" element={<ConfirmarCuenta/> } />
            </Route>

            <Route path='/admin' element={<RutaProtegida />}>
              <Route index element={<AdministrarPacientes />}/>
              <Route path="perfil" element={<EditarPerfil/>} />
              <Route path="cambiar-password" element={<CambiarPassword/>} />
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
