import {createSlice,configureStore} from '@reduxjs/toolkit'
const authslice=createSlice({


    name:'auth',
    initialState: {logeIn:false,idToken:null,email:null},
    reducers:{
  
        logedIn(state){
  
            state.logeIn=!state.logeIn;    
        },
        setEmail(state, action) {
          state.email = action.payload;
        },
            
        tokenId(state,action){
            state.idToken=action.payload;
        },
        logOut(state){
             state.idToken=null;   
        },
      
    }
  })
 
const initialMailState = {
    inbox:{},
    outbox:{},
  };
  
  const mailSlice = createSlice({
    name: "mail",
    initialState: initialMailState,
    reducers: {
      setInbox(state, action) {
        state.inbox = action.payload;
      },
      setOutbox(state, action) {
        state.outbox = action.payload;
      },
    },
  });
  const store=configureStore({
    reducer:{auth:authslice.reducer,mail:mailSlice.reducer}
  })
  
export const mailActions = mailSlice.actions;
export const authSliceCreate=authslice.actions;

export default store;