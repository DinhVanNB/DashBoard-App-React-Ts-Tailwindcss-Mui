import { createSlice, current } from "@reduxjs/toolkit";

interface typeState {
    eventsJob:any
}

const initialState:typeState={
    eventsJob:[{id:null, title:null, start:null, end:null }],
}

const calenderSlice = createSlice({
    name: 'calenderApp',
    initialState,
    reducers:{
       setCalenderEvents:(state,action)=>{
            const events = [...current(state.eventsJob), {...action.payload ,id: new Date().valueOf()}]
            if(!events[0].id) events.shift();
            state.eventsJob = events
       },
       deleteCalenderEvents: (state,action) =>{
            const prevState= [...current(state.eventsJob)];
            if(prevState.length===1){
                state.eventsJob = [{id:null, title:null, start:null, end:null }]
            }
            else if(action.payload.userId==='Admin'){
                state.eventsJob = prevState.filter(event=> event.id!==action.payload.id)
            }
       }

    }
});

export const {setCalenderEvents, deleteCalenderEvents} = calenderSlice.actions;


export default calenderSlice.reducer;