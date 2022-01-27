import React from 'react'
import Formulario from '../components/Formulario'
import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import NotFound from '../components/NotFound'

const EditarCliente = () => {

    const [cliente, setCliente] = useState({});
    

    const [cargando, setCargando] = useState(true);

    const {id} = useParams()

    useEffect(() => {
      const obtenerCliente = async () => {
          try{
              const url = `${import.meta.env.VITE_API_URL}/${id}`
            const resp = await fetch(url)
            const resultado =  await resp.json()
            setCliente(resultado)
          }catch(error){

            console.log(error)

          }
          setTimeout(() => {
            setCargando(!cargando)
          }, 1500);
            
      }
      obtenerCliente()
    }, []);

    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
            <p className='mt-3'>Utiliza este formulario para editar los datos del cliente</p>

            {cliente?.nombre ? (
                            <Formulario 
                            cliente={cliente}
                            cargando={cargando}
                        />
            ): <NotFound />}

        </>
    )
}

export default EditarCliente
