import React, { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { fetchGenresData } from './components/api';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";


function ChatBot () {
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [type, setType] = useState("");

    const handleCheckboxChange = (event, name) => {
        const { checked } = event.target;
        if (checked) {
          setSelectedGenres([...selectedGenres, name]);
        } else {
          setSelectedGenres(selectedGenres.filter((genre) => genre !== name));
        }
	};

    const handleDropDownChange = (e) => {
        setType(e.target.value);
    };

    
    const fetchGenres = async () => {
		const data = await fetchGenresData(type);
		setGenres(data.genres);
	};

    useEffect(() => {
		fetchGenres();
		return () => {
			setGenres({});
		};
	}, []);

    useEffect(() => {
        console.log('Selected Genres:', selectedGenres);
      }, [selectedGenres]);

      useEffect(() => {
        fetchGenres(type);
        setSelectedGenres([]);
      }, [type]);

  return (
    <div>
    <div>
        <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select label="Type" onChange={handleDropDownChange}>
                <MenuItem value="movie">Movies</MenuItem>
                <MenuItem value="tv">TV Shows</MenuItem>
            </Select>
        </FormControl>
        
    </div>
    <div>
        {type != "" && (
        <FormGroup row='true'>
            {genres &&
            genres.map((genre) => (
                <FormControlLabel 
                control={<Checkbox color="success" />} 
                checked={selectedGenres.includes(genre.name)}
                onChange={(event)=>handleCheckboxChange(event, genre.name)}
                label={genre.name} 
                />
                
            ))}
        </FormGroup>
)}
    </div>
    <div>

    </div>
</div>
  )
}

export default ChatBot;