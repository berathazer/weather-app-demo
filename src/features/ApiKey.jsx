import { createSlice } from '@reduxjs/toolkit'
export const apiHandler = createSlice({
    name:"api",
    initialState:{
        apiKey: sessionStorage.getItem("userApiKey") || "",
        cityPlate:0,
        cityName:"",
        weatherData:"",
        error:""
    },
    
    reducers: {
        saveApiKey: (state,action) =>{
            state.apiKey = action.payload
            sessionStorage.setItem("userApiKey",state.apiKey)
        },

        savePlate: (state,action) =>{
            state.cityPlate = action.payload.plateNumber;
            state.cityName = action.payload.name
        },
        saveWeather:(state,action)=>{
            state.weatherData = action.payload;
        },

        setErrorMessage: (state,action) =>{
            state.error = action.payload
        }
    }
})  

export const {saveApiKey,savePlate,saveWeather,setErrorMessage} = apiHandler.actions

export default apiHandler.reducer   