import React from 'react'
import {Formik,Form, Field} from 'formik'
import {useNavigate} from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import  Spinner from './Spinner'
const Formulario = ({cliente, cargando}) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
        .min(3, 'El nombre es muy corto')
        .max(20, 'El nombre es muy largo')
        .required('El nombre del Cliente es Obligatorio'),
        empresa: Yup.string()
        .required('El nombre de la empresa es obligatorio'),
        email:  Yup.string()
        .email('Email no valido')
        .required('El email es obligatorio'),
        telefono: Yup.number()
        .integer('El numero no es valido')
        .positive('El numero no es valido')
        .typeError('El numero no es valido'),
        notas: Yup.string()
        .min(10, 'Las notas son muy cortas')
        .max(150,'El texto es muy largo')
        .required('Las notas son obligatorias')
        
    })
    const handleSubmit = async (valores) => {
        try{
            let resp
            if(cliente.id){
                //Editar Registro
                const url = `http://localhost:4000/clientes/${cliente.id}`
                 resp = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }

                })


            }else{
                //Nuevo registro
                const url = 'http://localhost:4000/clientes'
                 resp = await fetch(url, {
                     method: 'POST', 
                     body: JSON.stringify(valores),
                     headers: {
                         'Content-Type': 'application/json'
                     }
                 })
     
               
            }

            await resp.json()
            navigate('/clientes')

        }catch(error){
            console.log(error)
        }
    }
    return (
        cargando ? <Spinner /> : ( 
        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-2xl md:w-3/4 mx-auto'>
            <h1 className='text-gray-600 font-bold text-xl uppercase text-center'
            >{cliente?.nombre ? 'Editar Cliente ' : 'Agregar Cliente'}</h1>
            <Formik 
                initialValues={{
                    nombre: cliente?.nombre ?? "",
                    empresa: cliente?.empresa ?? "",
                    email: cliente?.email ?? "",
                    telefono: cliente?.telefono ?? "",
                    notas: cliente?.notas ?? ""
                }}
                enableReinitialize={true}
                onSubmit={ async (values, {resetForm}) => {
                    await handleSubmit(values)
                    resetForm()
                }}
                validationSchema={nuevoClienteSchema}
            >
                {({errors, touched}) => {
                    
                    return  (
                <Form
                className='mt-10 '>
                    <div className='mb-4'>
                        <label
                        className='text-gray-800'
                        htmlFor='nombre'
                        >Nombre: </label>
                        <Field id="nombre" type="text"
                        className="mt-2 block w-full p-3 bg-gray-200 rounded-lg" placeholder="Nombre del Cliente" name="nombre"  />
                        {errors.nombre && touched.nombre ? (
                            <Alerta>{errors.nombre}</Alerta>
                        ) : null}
                    </div>
                    
                    <div className='mb-4'>
                        <label
                        className='text-gray-800'
                        htmlFor='empresa'
                        >Empresa: </label>
                        <Field id="empresa" type="text"
                        className="mt-2 block w-full p-3 bg-gray-200 rounded-lg" placeholder="Empresa del cliente" name="empresa"  />
                            {errors.empresa && touched.empresa ? (
                            <Alerta>{errors.empresa}</Alerta>
                        ) : null}
                    </div>

                    <div className='mb-4'>
                        <label
                        className='text-gray-800'
                        htmlFor='email'
                        >Email: </label>
                        <Field id="email" type="email"
                        className="mt-2 block w-full p-3 bg-gray-200 rounded-lg" placeholder="Email del cliente" name="email"  />
                            {errors.email && touched.email ? (
                            <Alerta>{errors.email}</Alerta>
                        ) : null}
                    </div>
                    <div className='mb-4'>
                        <label
                        className='text-gray-800'
                        htmlFor='telefono'
                        >Telefono: </label>
                        <Field id="telefono" type="tel"
                        className="mt-2 block w-full p-3 bg-gray-200 rounded-lg" placeholder="Telefono del cliente" name="telefono"  />
                             {errors.telefono && touched.telefono ? (
                            <Alerta>{errors.telefono}</Alerta>
                        ) : null}
                    </div>

                    <div className='mb-4'>
                        <label
                        className='text-gray-800'
                        htmlFor='notas'
                        >Notas: </label>
                        <Field as="textarea" id="notas" type="text"
                        className="mt-2 block w-full p-3 bg-gray-200 h-40 rounded-lg" placeholder="Notas del cliente" name="notas" />
                            {errors.notas && touched.notas ? (
                            <Alerta>{errors.notas}</Alerta>
                        ) : null}
                    </div>

                   <input
                    type="submit"
                    value= {cliente?.nombre ? 'Editar Cliente ' : 'Agregar Cliente'}
                    className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg rounded-b-full shadow-xl  hover:bg-blue-600 cursor-pointer -translate-y-1 hover:scale-105  duration-300'
                   />
                </Form>
                )}}
            </Formik>
        </div>
        )
    )
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario
