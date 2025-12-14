import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';


//PERSISTENCIA DE LA MEMORIA, react ofrece un componente para guardar estos "estados".

 interface SelectorProps {
   onOptionSelect: (option: string) => void;
}
export default function Selector({ onOptionSelect }: SelectorProps) {

  

   const [cityInput, setCityInput] = useState('');

   //uso la cache de la aplicacion solamente para ese componente -> usestate

   let handleChange = (event: SelectChangeEvent<string>) => {

      alert(event.target.value);

      setCityInput(event.target.value);
      onOptionSelect(event.target.value);

   };

   


   return (
      <FormControl fullWidth>
         <InputLabel id="city-select-label">Ciudad</InputLabel>
         <Select
            onChange={handleChange} 
            labelId="city-select-label"
            id="city-simple-select"
            label="Ciudad"
            value={cityInput}>
            <MenuItem disabled><em>Seleccione una ciudad</em></MenuItem>
            <MenuItem value={"guayaquil"}>Guayaquil</MenuItem>
            <MenuItem value={"quito"}>Quito</MenuItem>
            <MenuItem value={"manta"}>Manta</MenuItem>
            <MenuItem value={"cuenca"}>Cuenca</MenuItem>
         </Select>

         {cityInput && (
            <p>
                Información del clima en <span style={{textTransform: 'capitalize', fontWeight: 'bold'}}>{cityInput}</span>
            </p>
        )}

      </FormControl>



   )
}