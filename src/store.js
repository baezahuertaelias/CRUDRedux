import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers'

/* Thunk es para darle async a funciones */
/* El reducer es porque cada uno tiene su propio state, y store es quien almacena todas las funciones */

const store = createStore(
    reducer,
    compose(applyMiddleware(thunk), //se requiere usar el applyMiddleware porque se utiliza el thunk
    //Agrega un filtro en caso de que el navegador no tenga el Redux DevTools extension
        typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
            window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )

);

export default store;