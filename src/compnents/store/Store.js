import {createSlice,configureStore} from '@reduxjs/toolkit'
const authslice=createSlice({
    name:'auth',
    initialState: {logeIn:false,idToken:"",email:"",emailid:""},
    reducers:{
  
        logedIn(state,action){
  
            state.logeIn=!state.logeIn; 
            state.idToken=action.payload;   
        },
        setEmail(state, action) {
          state.email = action.payload;
        },
        logOut(state){
             state.logeIn=false;
             state.idToken="";  
             state.emailid=""; 
             state.email="";
        },
        setEmailId(state,action)
        {
          state.emailid=action.payload
        }
    }
  })
 
const initialMailState = {
    inbox:[],
    outbox:[],
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