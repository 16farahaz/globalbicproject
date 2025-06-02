// Desc: authentification slice
import {createSlice} from "@reduxjs/toolkit";
//initial state : l'etat initiale de la slice
const initialState = { 
    user : localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo')) : null,
    isSidebarOpen:false,
 };
//authSlice : la slice qui va contenir les actions et les reducers pour modifier l'etat de la slice
 const authSlice = createSlice({  
    name:"auth ", //nom de la slice
    initialState, //etat initail de la slice
    reducers:{ //l'entité qui va modifier l'etat de la slice 
        setCredentials : (state,action )=>{ //on va modifier l'etat de la slice avec l'action effectué
            state.user = action.payload; //on'a changer la state de user avec le payload de l'action
            localStorage.setItem('userinfo', JSON.stringify(action.payload));
        },
        logout:(state,action)=>{
            state.user = null;
            localStorage.removeItem('userinfo');
        },
        setOpenSidebar:(state,action)=>{
            state.isSidebarOpen = action.payload;
        },
    }
   });
    export const {setCredentials,logout,setOpenSidebar} = authSlice.actions; //exporter les actions pour les utiliser dans les composants
    export default authSlice.reducer;  //exporter le reducer pour l'utiliser dans le store 
