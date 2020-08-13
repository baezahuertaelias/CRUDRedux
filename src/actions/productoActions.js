import { AGREGAR_PRODUCTO, AGREGAR_PRODUCTO_EXITO, AGREGAR_PRODUCTO_ERROR, COMENZAR_DESCARGA_PRODUCTOS, DESCARGA_PRODUCTOS_ERROR, DESCARGA_PRODUCTOS_EXITO, OBTENER_PRODUCTO_ELIMINAR, PRODUCTO_ELIMINADO_EXITO, PRODUCTO_ELIMINADO_ERROR } from '../types';
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
            console.log('error en agregarproducto', error);
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
    payload: producto
});

/* Producto NO guardado en la BD */
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});

/* Func descarga productos desde BD */
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch(descargarProductos());

        try {
            const respuesta = await clienteAxios.get('/productos');
            dispatch(descargaProductosExitosa(respuesta.data));
        } catch (error) {
            console.log('error al obtenerproductos', error);
            dispatch(descargaProductosError());
        }
    }
};

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});

const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
});

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
});

/* Selecciona y elimina el producto */
export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id));

        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito())

            /* Si se elimina, mostrar alerta */
            Swal.fire(
                'Eliminado',
                'El producto fue eliminado',
                'success'
            )
        } catch (error) {
            console.log('error en eliminarproductoexito', { error });
            dispatch(eliminarProductoError());
        }
    }
};

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})