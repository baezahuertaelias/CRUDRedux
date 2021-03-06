import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editarProductoAction } from '../actions/productoActions';

const EditarProducto = () => {

    /* Nuevo state de producto */
    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: ''
    })

    /* Producto a editar */
    const productoeditar = useSelector(state => state.productos.productoeditar);
    

    /* Llenar state automaticamente */
    useEffect( () => {
        guardarProducto(productoeditar);
    }, [productoeditar]);

    /* Leer datos del formulario */
    const onChangeFormulario = e => {
        guardarProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }


    console.log('producto',{producto} );
    const { nombre, precio, id} = producto;

    const submitEditarProducto = e => {
        //e.preventDefault();

        editarProductoAction();
    }


    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Producto
                        </h2>

                        <form onSubmit={submitEditarProducto()}>
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre producto"
                                    name="nombre"
                                    value={nombre}
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
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Guardar cambios</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditarProducto;