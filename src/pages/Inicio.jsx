import {useEffect, useState} from 'react'
import Cliente from '../components/Cliente';


const Inicio = () => {

    const [clientes, setClientes] = useState([])

    useEffect(() => {
      const obtenerClientes = async() =>{
        try{
            const url = 'http://localhost:4000/clientes'
            const resp = await fetch(url)
            const resultado = await resp.json()

            setClientes(resultado)
        }catch(error){
            console.log(error)
        }
      }
      obtenerClientes()
    }, [])


    const handleEliminar = async id => {
        const confirmar = confirm('Deseas eliminar este cliente?')

        if(confirmar){
            try{
                const url = `http://localhost:4000/clientes/${id}`
                const resp = await fetch(url, {
                    method: 'DELETE'
                })

                await resp.json()

                const arrayClientes = clientes.filter(cliente => cliente.id !== id)
                setClientes(arrayClientes)
            }catch(e){
                console.log(e)
            }
            
        }
    }
    
    return (
        <>
        <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
        <p className='mt-3'>Administra tus clientes</p>

        <table className='w-full mt-5 table-auto shadow-xl bg-white  border-separate  ' >
            <thead className='bg-blue-800 text-white  '>
                <tr  className= 'rounded-xl'>
                    <th className='p-2'>Nombre</th>
                    <th className='p-2'>Contacto</th>
                    <th className='p-2'>Empresa</th>
                    <th className='p-2'>Acciones</th>
                </tr>
            </thead>

            <tbody>
                {clientes.map( cliente => (
                    <Cliente
                        key={cliente.id}
                        cliente={cliente}
                        handleEliminar = {handleEliminar}
                    
                    />
                ))}
            </tbody>
        </table>
        
        </>
    )
}

export default Inicio
