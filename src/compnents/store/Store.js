import {createSlice,configureStore} from '@reduxjs/toolkit'
const authslice=createSlice({


    name:'auth',
    initialState: {logeIn:false,idToken:null},
    reducers:{
  
        logedIn(state){
  
            state.logeIn=!state.logeIn;
        },
        tokenId(state,action){
            state.idToken=action.payload;
        },
        logOut(state){
             state.idToken=null;   
        }
    }
  })
  const store=configureStore({
    reducer:{auth:authslice.reducer}
})
export const authSliceCreate=authslice.actions;
export default store;