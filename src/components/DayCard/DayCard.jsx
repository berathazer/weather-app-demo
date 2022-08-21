import React from 'react'
import Grid from "@mui/material/Grid";
import SelectIcon from '../SelectIcon/SelectIcon';
import { WiDayRain } from "react-icons/wi";
const DayCard = ({icon,day,temp,min,max,color,setStart,start}) => {

  return (
    <div className='' onClick={()=>{setStart(start)}}>
        <Grid container flexDirection={"column"} className='px-5 text-center items-center gap-y-3 cursor-pointer hover:opacity-80 '>
            <div  className='text-white font-bold text-2xl'>{day}</div>

            <div  className='text-8xl mt-2'><SelectIcon color={color} name={icon}/></div>

            <div  className='flex gap-2 text-white font-mono text-2xl'>

                <div className=''>{Math.round(min)}⁰C </div>
                 / 
                <div  className=''> {Math.round(max)}⁰C</div>

            </div>
        </Grid>
    </div>
  )
}

export default DayCard