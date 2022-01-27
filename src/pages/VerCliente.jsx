import React from 'react'
import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import NotFound from '../components/NotFound'

import Spinner from '../components/Spinner'

const VerCliente = () => {
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
          },1500)
          
      }
      obtenerCliente()
    }, []);
    
    return (
        
        cargando ? <Spinner /> : 
        Object.keys(cliente).length === 0 ? 
        <NotFound />:
         (
        <div >
                
            <h1 className='font-black text-4xl text-blue-900'>Ver Cliente</h1>
            <p className='mt-3'>Información del Cliente</p>

            <div className=' 
            bg-white ring-2 ring-blue-800 ring-offset-4 ring-offset-cyan-100 mt-10 px-5 py-10 rounded-lg 
            shadow-2xl md:w-3/4 mx-auto '>

            
            <p className='text-2xl text-gray-500 mt-10'>
                <span className='text-gray-800 uppercase font-bold'> Cliente: </span>
                {cliente.nombre} 
            </p>

            <p className='text-2xl  mt-5 text-gray-500  '>
                <span className='text-gray-800 uppercase font-bold'> Email: </span>
                {cliente.email} 
            </p>

                {cliente.telefono && (
                     <p className='text-2xl mt-5 text-gray-500 '>
                    <span className='text-gray-800 uppercase font-bold'> Telefono: </span>
                     {cliente.telefono} 
                    </p>
                )}


            <p className='text-2xl mt-5 text-gray-500 '>
                <span className='text-gray-800 uppercase font-bold'> Empresa: </span>
                {cliente.empresa} 
            </p>

            <p className='text-2xl mt-5 text-gray-500 '>
                <span className='text-gray-800 uppercase font-bold'> Notas: </span>
                {cliente.notas} 
            </p>
            </div>
            </div>
        ))
}

export default VerCliente
