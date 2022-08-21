import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import cities from "../cities.json";    
import { Navigate,useNavigate } from 'react-router-dom';

export default function SelectBox({city}) {
  
  const navigator = useNavigate();
  const handleChange = (event) => {
    sessionStorage.setItem("cityName",event.target.value)
    navigator("/map/"+event.target.value.toLowerCase(),{replace:true})
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Şehirler</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={city}
          label="Şehir"
          onChange={handleChange}
        >
          {cities.map(city =>(<MenuItem key={city.id} value={city.label}>{city.label}</MenuItem>))}
        </Select>
      </FormControl>
    </Box>
  );
}