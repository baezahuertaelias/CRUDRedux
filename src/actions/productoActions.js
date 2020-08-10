import { AGREGAR_PRODUCTO, AGREGAR_PRODUCTO_EXITO, AGREGAR_PRODUCTO_ERROR } from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

/*Funciones para utilizar en la vista */

/* Crear nuevos productos */
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch(agregarProducto());

        try {
            /* Insertar en la API */
            await clienteAxios.post('/productos', producto);

            /* Actualizar state si salio bien */
            dispatch(agregarProductoExito(producto));

            /* Alerta */
            Swal.fire('Correcto', 'El producto se agrego correctamente', 'success');

        } catch (error) {
            console.log('error en agregarproducto',error);
            /* Actualizar state si salio mal */
            dispatch(agregarProductoError(true));
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            });
        }
    }
};

/* toda funcion creada aqui, tiene que ser referenciada en el reducer */

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
});

/* Producto guardado en la BD */
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload:producto
});

/* Producto NO guardado en la BD */

const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});