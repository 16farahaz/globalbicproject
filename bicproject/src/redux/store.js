import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import {apiSlice} from "./slices/apiSlice";
//store : objet pour stock data que je veux partager entre les composants
const store = configureStore({
    reducer: { //les reducers qui vont modifier l'etat de la store

        [apiSlice.reducerPath]: apiSlice.reducer, //affcetation de la reducer de l'apiSlice pour modifier l'etat de la store
        auth: authReducer //auth est le nom de la slice et authReducer est le reducer qui va modifier l'etat de la slice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware), //middleware pour gerer les actions asynchrones pour l'api
    devTools:true, //pour activer le devtools de redux : pour voir les actions et les etats de la store
})
export default store;