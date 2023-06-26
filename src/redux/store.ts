import storage from "redux-persist/lib/storage";
import { encryptTransform } from 'redux-persist-transform-encrypt'
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import userSlice from "./userSlice";
import { REACT_APP_KEY_SERECT_PERSIST } from "../configs/constant";
import appSlice from "./appSlice";
import postSlice from "./postSlice";


const persistConfig  = {
    key:"root-persist",
    version: 1,
    storage,
    transforms: [
        encryptTransform({
            secretKey: REACT_APP_KEY_SERECT_PERSIST,
            onError: (e)=>console.log('encode persist error', e)
        })
    ]
};


const rootReducers = combineReducers({
    user: userSlice,
    appState: appSlice,
    post: postSlice

})

const persistedReducers = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
    reducer: persistedReducers,
    middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck:{
             ignoredActions:[FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
});

export const persistor =persistStore(store)

declare global {
    type RootState = ReturnType<typeof rootReducers>
}

