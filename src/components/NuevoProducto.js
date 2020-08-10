import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
/* Actions de redux */
import { crearNuevoProductoAction } from '../actions/productoActions';

const NuevoProducto = ({history}) => {

    /* State del componente */
    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState(0);

    /* Dispatch se usa para utlizar las funciones que estan en actions en este caso. Tambien retorna la funcion */
    const dispatch = useDispatch();


    /* Selector es la manera en que se accede al state desde el componente */
    const cargando = useSelector(state => state.productos.loading);
    const error = useSelector(state => state.productos.error);


    /* Llama el action de productoAction */
    const agregarProducto = producto => dispatch(crearNuevoProductoAction(producto)); //En este caso el dispatch es una funcion que toma otra funcion

    /* Cuando el usuario haga submit */
    const submitNuevoProducto = e => {

        e.preventDefault();

        /* Validar formulario */
        if (nombre.trim() === '' || precio <= 0) {
            return;
        }

        /* Revisar errores */

        /* Crear el nuevo producto */
        agregarProducto({
            nombre,
            precio
        });

        /* Redireccionar */
        history.push('/')
    }
    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>

                        <form
                            onSubmit={submitNuevoProducto}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={e => guardarNombre(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio producto"
                                    name="precio"
                                    value={precio}
                                    onChange={e => guardarPrecio(Number(e.target.value))}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Agregar producto</button>
                        </form>

                        {cargando ? <p>Cargando...</p> : null}
                        {error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NuevoProducto;